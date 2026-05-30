'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authService } from '@/services/authService';
import { perfilService } from '@/services/perfilService';
import { getStoredToken, clearStoredToken } from '@/services/api';
import type { LoginPayload, Perfil, RegisterPayload } from '@/types';

interface AuthContextValue {
  user: Perfil | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const PERFIL_KEY = 'amargo_perfil';

const getStoredPerfil = (): Perfil | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(PERFIL_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Perfil;
  } catch {
    return null;
  }
};

const setStoredPerfil = (perfil: Perfil): void => {
  localStorage.setItem(PERFIL_KEY, JSON.stringify(perfil));
};

const clearStoredPerfil = (): void => {
  localStorage.removeItem(PERFIL_KEY);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Perfil | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getStoredToken();
    const stored = getStoredPerfil();
    if (!token || !stored) {
      setUser(null);
      return;
    }
    try {
      const perfil = await perfilService.getById(stored.id);
      setUser(perfil);
      setStoredPerfil(perfil);
    } catch {
      clearStoredToken();
      clearStoredPerfil();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const stored = getStoredPerfil();
      if (stored && getStoredToken()) {
        setUser(stored);
        await refreshUser();
      }
      setIsLoading(false);
    };
    void init();
  }, [refreshUser]);

  const login = useCallback(async (payload: LoginPayload) => {
    const result = await authService.login(payload);
    setUser(result.perfil);
    setStoredPerfil(result.perfil);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const result = await authService.register(payload);
    setUser(result.perfil);
    setStoredPerfil(result.perfil);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    clearStoredPerfil();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      isAdmin: user?.rol === 'admin',
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
