import { api } from './api';
import type { ApiResponse, ContactPayload, Cotizacion } from '@/types';

export const contactService = {
  async submit(payload: ContactPayload): Promise<Cotizacion> {
    const { data } = await api.post<ApiResponse<Cotizacion>>('/contact', payload);
    return data.data;
  },
};
