'use client';

import { useCallback, useState } from 'react';
import { clienteService, type ClienteFilters } from '@/services/clienteService';
import { getErrorMessage } from '@/services/api';
import type { Cliente, CreateClientePayload, PaginatedResponse, UpdateClientePayload } from '@/types';

export function useClientes(initialFilters: ClienteFilters = {}) {
  const [data, setData] = useState<PaginatedResponse<Cliente> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ClienteFilters>(initialFilters);

  const fetchClientes = useCallback(async (override?: ClienteFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const merged = { ...filters, ...override };
      const result = await clienteService.getAll(merged);
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

  const createCliente = useCallback(async (payload: CreateClientePayload) => {
    const created = await clienteService.create(payload);
    await fetchClientes();
    return created;
  }, [fetchClientes]);

  const updateCliente = useCallback(async (id: string, payload: UpdateClientePayload) => {
    const updated = await clienteService.update(id, payload);
    await fetchClientes();
    return updated;
  }, [fetchClientes]);

  const deleteCliente = useCallback(async (id: string) => {
    await clienteService.delete(id);
    await fetchClientes();
  }, [fetchClientes]);

  return {
    data,
    isLoading,
    error,
    filters,
    setFilters,
    fetchClientes,
    createCliente,
    updateCliente,
    deleteCliente,
  };
}
