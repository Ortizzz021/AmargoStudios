import { api } from './api';
import type {
  ApiResponse,
  Cliente,
  CreateClientePayload,
  PaginatedResponse,
  UpdateClientePayload,
} from '@/types';

export interface ClienteFilters {
  nombre?: string;
  empresa?: string;
  page?: number;
  limit?: number;
}

export const clienteService = {
  async getAll(filters: ClienteFilters = {}): Promise<PaginatedResponse<Cliente>> {
    const { data } = await api.get<ApiResponse<Cliente[]>>('/clientes', {
      params: {
        nombre: filters.nombre,
        empresa: filters.empresa,
        page: filters.page ?? 1,
        limit: filters.limit ?? 10,
      },
    });
    return { data: data.data, meta: data.meta! };
  },

  async getById(id: string): Promise<Cliente> {
    const { data } = await api.get<ApiResponse<Cliente>>(`/clientes/${id}`);
    return data.data;
  },

  async create(payload: CreateClientePayload): Promise<Cliente> {
    const { data } = await api.post<ApiResponse<Cliente>>('/clientes', payload);
    return data.data;
  },

  async update(id: string, payload: UpdateClientePayload): Promise<Cliente> {
    const { data } = await api.put<ApiResponse<Cliente>>(`/clientes/${id}`, payload);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/clientes/${id}`);
  },
};
