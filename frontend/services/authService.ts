import { api, setStoredToken, clearStoredToken } from './api';
import type { ApiResponse, AuthResponse, LoginPayload, RegisterPayload } from '@/types';

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', payload);
    setStoredToken(data.data.token);
    return data.data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/register', payload);
    setStoredToken(data.data.token);
    return data.data;
  },

  logout(): void {
    clearStoredToken();
  },
};
