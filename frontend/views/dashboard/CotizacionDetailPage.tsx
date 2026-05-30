'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { cotizacionService } from '@/services/cotizacionService';
import { useSeguimiento } from '@/hooks/useSeguimiento';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { FormFieldTextarea } from '@/components/FormField';
import { getErrorMessage } from '@/services/api';
import type { Cotizacion } from '@/types';
import { formatDate, formatDateTime, formatEstado } from '@/lib/utils';

interface Props {
  id: string;
}

export default function CotizacionDetailPage({ id }: Props) {
  const [cotizacion, setCotizacion] = useState<Cotizacion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nota, setNota] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, fetchSeguimientos, createSeguimiento } = useSeguimiento();

  const loadCotizacion = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await cotizacionService.getById(id);
      setCotizacion(data);
      await fetchSeguimientos(data.cliente_id);
    } catch {
      setError('No se pudo cargar la cotización');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadCotizacion();
  }, [id]);

  const handleAddNota = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cotizacion || !nota.trim()) return;
    setIsSubmitting(true);
    try {
      await createSeguimiento({ cliente_id: cotizacion.cliente_id, contenido: nota.trim() });
      setNota('');
      toast.success('Nota de seguimiento agregada');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner label="Cargando cotización..." />;
  if (error || !cotizacion) return <ErrorMessage message={error ?? 'Cotización no encontrada'} onRetry={() => void loadCotizacion()} />;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <Link href="/dashboard/cotizaciones" className="back-link">← Volver a cotizaciones</Link>
          <h1>Detalle de Cotización</h1>
        </div>
        <span className={`status-badge status-${cotizacion.estado}`}>{formatEstado(cotizacion.estado)}</span>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h2>Datos del Cliente</h2>
          <dl className="detail-list">
            <dt>Nombre</dt><dd>{cotizacion.cliente?.nombre_completo ?? '—'}</dd>
            <dt>Email</dt><dd>{cotizacion.cliente?.email ?? '—'}</dd>
            <dt>Empresa</dt><dd>{cotizacion.cliente?.empresa ?? '—'}</dd>
          </dl>
        </div>
        <div className="detail-card">
          <h2>Información de Cotización</h2>
          <dl className="detail-list">
            <dt>Servicio</dt><dd>{cotizacion.servicio}</dd>
            <dt>Mensaje</dt><dd>{cotizacion.mensaje ?? '—'}</dd>
            <dt>Presupuesto</dt><dd>{cotizacion.presupuesto_estimado ? `$${cotizacion.presupuesto_estimado}` : '—'}</dd>
            <dt>Fecha tentativa</dt><dd>{cotizacion.fecha_tentativa ? formatDate(cotizacion.fecha_tentativa) : '—'}</dd>
            <dt>Asignado a</dt><dd>{cotizacion.perfil?.nombre_completo ?? 'Sin asignar'}</dd>
            <dt>Creada</dt><dd>{formatDateTime(cotizacion.fecha_creacion)}</dd>
          </dl>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Historial de Seguimiento</h2>
        <div className="timeline">
          {items.length === 0 ? (
            <p className="text-muted">No hay notas de seguimiento aún.</p>
          ) : (
            items.map((item) => (
              <div className="timeline-item" key={item.id}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-header">
                    <strong>{item.autor?.nombre_completo ?? 'Usuario'}</strong>
                    <span>{formatDateTime(item.fecha_creacion)}</span>
                  </div>
                  <p>{item.contenido}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <form className="seguimiento-form" onSubmit={handleAddNota}>
          <FormFieldTextarea
            label="Agregar nota de seguimiento"
            name="nota"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Escribe una nota sobre el seguimiento con este cliente..."
          />
          <button type="submit" className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting || !nota.trim()}>
            {isSubmitting ? 'Guardando' : 'Agregar nota'}
          </button>
        </form>
      </div>
    </div>
  );
}
