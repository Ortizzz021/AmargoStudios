'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cotizacionService, type CotizacionFilters } from '@/services/cotizacionService';
import { getErrorMessage } from '@/services/api';
import type {
  Cotizacion,
  CreateCotizacionPayload,
  PaginatedResponse,
  UpdateCotizacionPayload,
} from '@/types';

export function useCotizaciones(initialFilters: CotizacionFilters = {}) {
  const [cotizaciones, setCotizaciones] = useState<PaginatedResponse<Cotizacion> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CotizacionFilters>(initialFilters);
  const filtersRef = useRef<CotizacionFilters>(initialFilters);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const fetchCotizaciones = useCallback(async (override?: CotizacionFilters) => {
  setIsLoading(true);
  setError(null);
  try {
    const merged = { ...filtersRef.current, ...override };
    const result = await cotizacionService.getAll(merged);
    setCotizaciones(result);
    setFilters(merged);
    return result;
  } catch (err) {
    const message = getErrorMessage(err);
    setError(message);
    throw err;
  } finally {
    setIsLoading(false);
  }
}, []);

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
    cotizaciones,
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
