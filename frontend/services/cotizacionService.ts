import { api } from './api';
import type {
  ApiResponse,
  Cotizacion,
  CreateCotizacionPayload,
  PaginatedResponse,
  UpdateCotizacionPayload,
} from '@/types';

export interface CotizacionFilters {
  estado?: string;
  cliente_id?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
  page?: number;
  limit?: number;
}

export const cotizacionService = {
  async getAll(filters: CotizacionFilters = {}): Promise<PaginatedResponse<Cotizacion>> {
    const { data } = await api.get<ApiResponse<Cotizacion[]>>('/cotizaciones', {
      params: {
        estado: filters.estado,
        cliente_id: filters.cliente_id,
        fecha_desde: filters.fecha_desde,
        fecha_hasta: filters.fecha_hasta,
        page: filters.page ?? 1,
        limit: filters.limit ?? 10,
      },
    });
    return { data: data.data, meta: data.meta! };
  },

  async getById(id: string): Promise<Cotizacion> {
    const { data } = await api.get<ApiResponse<Cotizacion>>(`/cotizaciones/${id}`);
    return data.data;
  },

  async create(payload: CreateCotizacionPayload): Promise<Cotizacion> {
    const { data } = await api.post<ApiResponse<Cotizacion>>('/cotizaciones', payload);
    return data.data;
  },

  async update(id: string, payload: UpdateCotizacionPayload): Promise<Cotizacion> {
    const { data } = await api.put<ApiResponse<Cotizacion>>(`/cotizaciones/${id}`, payload);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/cotizaciones/${id}`);
  },
};
