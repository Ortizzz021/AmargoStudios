'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useCotizaciones } from '@/hooks/useCotizaciones';
import { useAuth } from '@/hooks/useAuth';
import EmptyState from '@/components/EmptyState';
import ErrorMessage from '@/components/ErrorMessage';
import { LoadingSkeleton } from '@/components/LoadingSpinner';
import { getErrorMessage } from '@/services/api';
import { ESTADOS_COTIZACION, type Cotizacion } from '@/types';
import { formatDate, formatEstado } from '@/lib/utils';

export default function CotizacionesDashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, error, filters, fetchCotizaciones, updateCotizacion } = useCotizaciones();
  const [estadoFilter, setEstadoFilter] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      void fetchCotizaciones({ page: 1, limit: 10 });
    }
  }, []);

  const assigneeOptions = useMemo(() => {
    const map = new Map<string, string>();
    data?.data.forEach((c) => {
      if (c.perfil) map.set(c.perfil.id, c.perfil.nombre_completo);
    });
    if (user) map.set(user.id, user.nombre_completo);
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [data, user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    void fetchCotizaciones({
      page: 1,
      limit: 10,
      estado: estadoFilter || undefined,
      fecha_desde: fechaDesde || undefined,
      fecha_hasta: fechaHasta || undefined,
    });
  };

  const handleEstadoChange = async (cotizacion: Cotizacion, estado: string) => {
    try {
      await updateCotizacion(cotizacion.id, { estado });
      toast.success('Estado actualizado');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleAssignChange = async (cotizacion: Cotizacion, asignado_a: string) => {
    try {
      await updateCotizacion(cotizacion.id, { asignado_a: asignado_a || null });
      toast.success('Asignación actualizada');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const changePage = (page: number) => {
    void fetchCotizaciones({ ...filters, page });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Cotizaciones</h1>
      </div>

      <form className="filters-bar" onSubmit={handleSearch}>
        <select value={estadoFilter} onChange={(e) => setEstadoFilter(e.target.value)}>
          <option value="">Todos los estados</option>
          {ESTADOS_COTIZACION.map((e) => (
            <option key={e} value={e}>{formatEstado(e)}</option>
          ))}
        </select>
        <input type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
        <input type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} />
        <button type="submit" className="btn btn-outline btn-sm">Filtrar</button>
      </form>

      {isLoading && <LoadingSkeleton rows={5} />}
      {error && <ErrorMessage message={error} onRetry={() => void fetchCotizaciones()} />}
      {!isLoading && !error && data?.data.length === 0 && (
        <EmptyState title="No hay cotizaciones" description="Las solicitudes del formulario de contacto aparecerán aquí." />
      )}

      {!isLoading && !error && data && data.data.length > 0 && (
        <>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Estado</th>
                  <th>Asignado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((cot) => (
                  <tr key={cot.id}>
                    <td>{cot.cliente?.nombre_completo ?? '—'}</td>
                    <td>{cot.servicio}</td>
                    <td>
                      <select
                        className="inline-select"
                        value={cot.estado}
                        onChange={(e) => void handleEstadoChange(cot, e.target.value)}
                      >
                        {ESTADOS_COTIZACION.map((e) => (
                          <option key={e} value={e}>{formatEstado(e)}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="inline-select"
                        value={cot.asignado_a ?? ''}
                        onChange={(e) => void handleAssignChange(cot, e.target.value)}
                      >
                        <option value="">Sin asignar</option>
                        {assigneeOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>{opt.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>{formatDate(cot.fecha_creacion)}</td>
                    <td>
                      <Link href={`/dashboard/cotizaciones/${cot.id}`} className="btn btn-outline btn-sm">Ver detalle</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.meta.totalPages > 1 && (
            <div className="pagination">
              <button type="button" disabled={data.meta.page <= 1} onClick={() => changePage(data.meta.page - 1)}>Anterior</button>
              <span>Página {data.meta.page} de {data.meta.totalPages}</span>
              <button type="button" disabled={data.meta.page >= data.meta.totalPages} onClick={() => changePage(data.meta.page + 1)}>Siguiente</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
