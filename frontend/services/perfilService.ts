import { api } from './api';
import type { ApiResponse, Perfil, UpdatePerfilPayload } from '@/types';

export const perfilService = {
  async getById(id: string): Promise<Perfil> {
    const { data } = await api.get<ApiResponse<Perfil>>(`/perfiles/${id}`);
    return data.data;
  },

  async update(id: string, payload: UpdatePerfilPayload): Promise<Perfil> {
    const { data } = await api.put<ApiResponse<Perfil>>(`/perfiles/${id}`, payload);
    return data.data;
  },
};
