import { api } from './api';
import type { ApiResponse, CreateSeguimientoPayload, Seguimiento } from '@/types';

export const seguimientoService = {
  async getByCliente(clienteId: string): Promise<Seguimiento[]> {
    const { data } = await api.get<ApiResponse<Seguimiento[]>>('/seguimiento', {
      params: { cliente_id: clienteId },
    });
    return data.data;
  },

  async create(payload: CreateSeguimientoPayload): Promise<Seguimiento> {
    const { data } = await api.post<ApiResponse<Seguimiento>>('/seguimiento', payload);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/seguimiento/${id}`);
  },
};
