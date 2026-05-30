'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clienteService } from '@/services/clienteService';
import { cotizacionService } from '@/services/cotizacionService';
import { seguimientoService } from '@/services/seguimientoService';
import LoadingSpinner, { LoadingSkeleton } from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { ESTADOS_COTIZACION, type Cotizacion, type Seguimiento } from '@/types';
import { formatDateTime, formatEstado } from '@/lib/utils';

export default function DashboardHomePage() {
  const [totalClientes, setTotalClientes] = useState(0);
  const [estadoCounts, setEstadoCounts] = useState<Record<string, number>>({});
  const [recentActivity, setRecentActivity] = useState<Seguimiento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [clientesRes, cotizacionesRes] = await Promise.all([
        clienteService.getAll({ page: 1, limit: 1 }),
        cotizacionService.getAll({ page: 1, limit: 100 }),
      ]);

      setTotalClientes(clientesRes.meta.total);

      const counts: Record<string, number> = {};
      ESTADOS_COTIZACION.forEach((e) => { counts[e] = 0; });
      cotizacionesRes.data.forEach((c: Cotizacion) => {
        counts[c.estado] = (counts[c.estado] ?? 0) + 1;
      });
      setEstadoCounts(counts);

      const uniqueClientIds = [...new Set(cotizacionesRes.data.map((c) => c.cliente_id))].slice(0, 10);
      const seguimientosArrays = await Promise.all(
        uniqueClientIds.map((id) => seguimientoService.getByCliente(id).catch(() => [])),
      );
      const allSeguimientos = seguimientosArrays.flat().sort(
        (a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime(),
      );
      setRecentActivity(allSeguimientos.slice(0, 5));
    } catch {
      setError('No se pudo cargar el resumen del dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  if (isLoading) return <LoadingSkeleton rows={6} />;
  if (error) return <ErrorMessage message={error} onRetry={() => void loadData()} />;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Resumen General</h1>
        <p>Vista general de clientes, cotizaciones y actividad reciente</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Clientes</span>
          <span className="stat-value">{totalClientes}</span>
        </div>
        {ESTADOS_COTIZACION.map((estado) => (
          <div className="stat-card" key={estado}>
            <span className="stat-label">{formatEstado(estado)}</span>
            <span className="stat-value">{estadoCounts[estado] ?? 0}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-section">
        <div className="section-title-row">
          <h2>Últimas Actividades de Seguimiento</h2>
          <Link href="/dashboard/cotizaciones" className="btn btn-outline btn-sm">Ver cotizaciones</Link>
        </div>
        {recentActivity.length === 0 ? (
          <p className="text-muted">No hay actividad de seguimiento reciente.</p>
        ) : (
          <div className="activity-list">
            {recentActivity.map((item) => (
              <div className="activity-item" key={item.id}>
                <div className="activity-meta">
                  <strong>{item.autor?.nombre_completo ?? 'Usuario'}</strong>
                  <span>{formatDateTime(item.fecha_creacion)}</span>
                </div>
                <p>{item.contenido}</p>
                {item.cliente && <span className="activity-client">Cliente: {item.cliente.nombre_completo}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
