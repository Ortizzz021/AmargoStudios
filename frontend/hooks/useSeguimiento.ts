'use client';

import { useCallback, useState } from 'react';
import { seguimientoService } from '@/services/seguimientoService';
import { getErrorMessage } from '@/services/api';
import type { CreateSeguimientoPayload, Seguimiento } from '@/types';

export function useSeguimiento(clienteId?: string) {
  const [items, setItems] = useState<Seguimiento[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSeguimientos = useCallback(async (id?: string) => {
    const targetId = id ?? clienteId;
    if (!targetId) return [];
    setIsLoading(true);
    setError(null);
    try {
      const result = await seguimientoService.getByCliente(targetId);
      setItems(result);
      return result;
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [clienteId]);

  const createSeguimiento = useCallback(async (payload: CreateSeguimientoPayload) => {
    const created = await seguimientoService.create(payload);
    setItems((prev) => [created, ...prev]);
    return created;
  }, []);

  const deleteSeguimiento = useCallback(async (id: string) => {
    await seguimientoService.delete(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    items,
    isLoading,
    error,
    fetchSeguimientos,
    createSeguimiento,
    deleteSeguimiento,
  };
}
