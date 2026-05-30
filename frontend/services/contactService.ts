import axios from 'axios';
import type { ApiResponse, ContactPayload, Cotizacion } from '@/types';
import { getErrorMessage } from './api';

const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

export const contactService = {
  async submit(payload: ContactPayload): Promise<Cotizacion> {
    const { data } = await publicApi.post<ApiResponse<Cotizacion>>('/contact', payload);
    return data.data;
  },
};

export { getErrorMessage };
