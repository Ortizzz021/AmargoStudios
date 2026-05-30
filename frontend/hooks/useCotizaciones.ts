'use client';

import { useCallback, useState } from 'react';
import { cotizacionService, type CotizacionFilters } from '@/services/cotizacionService';
import { getErrorMessage } from '@/services/api';
import type {
  Cotizacion,
  CreateCotizacionPayload,
  PaginatedResponse,
  UpdateCotizacionPayload,
} from '@/types';

export function useCotizaciones(initialFilters: CotizacionFilters = {}) {
  const [data, setData] = useState<PaginatedResponse<Cotizacion> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CotizacionFilters>(initialFilters);

  const fetchCotizaciones = useCallback(async (override?: CotizacionFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const merged = { ...filters, ...override };
      const result = await cotizacionService.getAll(merged);
      setData(result);
      setFilters(merged);
      return result;
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const getCotizacion = useCallback(async (id: string) => {
    return cotizacionService.getById(id);
  }, []);

  const createCotizacion = useCallback(async (payload: CreateCotizacionPayload) => {
    const created = await cotizacionService.create(payload);
    await fetchCotizaciones();
    return created;
  }, [fetchCotizaciones]);

  const updateCotizacion = useCallback(async (id: string, payload: UpdateCotizacionPayload) => {
    const updated = await cotizacionService.update(id, payload);
    await fetchCotizaciones();
    return updated;
  }, [fetchCotizaciones]);

  const deleteCotizacion = useCallback(async (id: string) => {
    await cotizacionService.delete(id);
    await fetchCotizaciones();
  }, [fetchCotizaciones]);

  return {
    data,
    isLoading,
    error,
    filters,
    setFilters,
    fetchCotizaciones,
    getCotizacion,
    createCotizacion,
    updateCotizacion,
    deleteCotizacion,
  };
}
