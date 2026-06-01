import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorResponse } from '@/types';

const TOKEN_KEY = 'amargo_token';

export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setStoredToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearStoredToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const api = axios.create({ 
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1',
   headers: { 
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      clearStoredToken();
      const path = window.location.pathname;
      if (!path.startsWith('/admin') && !path.startsWith('/register')) {
        window.location.href = '/admin';
      }
    }
    return Promise.reject(error);
  },
);

export const getErrorMessage = (error: unknown, fallback = 'Ocurrió un error inesperado'): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};

export const getFieldErrors = (error: unknown): Record<string, string> => {
  if (axios.isAxiosError<ApiErrorResponse>(error) && error.response?.data?.errors) {
    const result: Record<string, string> = {};
    for (const [key, messages] of Object.entries(error.response.data.errors)) {
      result[key] = messages[0] ?? '';
    }
    return result;
  }
  return {};
};
