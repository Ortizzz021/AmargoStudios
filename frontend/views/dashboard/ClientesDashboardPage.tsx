'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useClientes } from '@/hooks/useClientes';
import Modal from '@/components/Modal';
import EmptyState from '@/components/EmptyState';
import ErrorMessage from '@/components/ErrorMessage';
import { LoadingSkeleton } from '@/components/LoadingSpinner';
import { FormFieldInput } from '@/components/FormField';
import { getErrorMessage } from '@/services/api';
import type { Cliente } from '@/types';

const emptyForm = { nombre_completo: '', email: '', telefono: '', empresa: '' };

export default function ClientesDashboardPage() {
  const { data, isLoading, error, filters, fetchClientes, createCliente, updateCliente, deleteCliente } = useClientes();
  const [searchNombre, setSearchNombre] = useState('');
  const [searchEmpresa, setSearchEmpresa] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selected, setSelected] = useState<Cliente | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      void fetchClientes({ page: 1, limit: 10 });
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    void fetchClientes({ page: 1, limit: 10, nombre: searchNombre, empresa: searchEmpresa });
  };

  const openCreate = () => {
    setSelected(null);
    setForm(emptyForm);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEdit = (cliente: Cliente) => {
    setSelected(cliente);
    setForm({
      nombre_completo: cliente.nombre_completo,
      email: cliente.email,
      telefono: cliente.telefono ?? '',
      empresa: cliente.empresa ?? '',
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const openDelete = (cliente: Cliente) => {
    setSelected(cliente);
    setDeleteModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!form.nombre_completo.trim()) errors.nombre_completo = 'Requerido';
    if (!form.email.trim()) errors.email = 'Requerido';
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      if (selected) {
        await updateCliente(selected.id, form);
        toast.success('Cliente actualizado');
      } else {
        await createCliente(form);
        toast.success('Cliente creado');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteCliente(selected.id);
      toast.success('Cliente eliminado');
      setDeleteModalOpen(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const changePage = (page: number) => {
    void fetchClientes({ ...filters, page });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Clientes</h1>
        <button type="button" className="btn btn-primary btn-sm" onClick={openCreate}>+ Nuevo Cliente</button>
      </div>

      <form className="filters-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={searchNombre}
          onChange={(e) => setSearchNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por empresa"
          value={searchEmpresa}
          onChange={(e) => setSearchEmpresa(e.target.value)}
        />
        <button type="submit" className="btn btn-outline btn-sm">Buscar</button>
      </form>

      {isLoading && <LoadingSkeleton rows={5} />}
      {error && <ErrorMessage message={error} onRetry={() => void fetchClientes()} />}
      {!isLoading && !error && data?.data.length === 0 && (
        <EmptyState title="No hay clientes" description="Crea tu primer cliente para comenzar." action={<button type="button" className="btn btn-primary" onClick={openCreate}>Crear cliente</button>} />
      )}

      {!isLoading && !error && data && data.data.length > 0 && (
        <>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Empresa</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.nombre_completo}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefono ?? '—'}</td>
                    <td>{cliente.empresa ?? '—'}</td>
                    <td className="table-actions">
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => openEdit(cliente)}>Editar</button>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => openDelete(cliente)}>Eliminar</button>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={selected ? 'Editar Cliente' : 'Nuevo Cliente'}>
        <form onSubmit={handleSave}>
          <FormFieldInput label="Nombre completo *" name="nombre_completo" value={form.nombre_completo} onChange={(e) => setForm({ ...form, nombre_completo: e.target.value })} error={formErrors.nombre_completo} />
          <FormFieldInput label="Email *" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={formErrors.email} />
          <FormFieldInput label="Teléfono" name="telefono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
          <FormFieldInput label="Empresa" name="empresa" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} />
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancelar</button>
            <button type="submit" className={`btn btn-primary ${isSaving ? 'loading' : ''}`} disabled={isSaving}>{isSaving ? 'Guardando' : 'Guardar'}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirmar eliminación" size="sm">
        <p>¿Estás seguro de eliminar a <strong>{selected?.nombre_completo}</strong>? Esta acción no se puede deshacer.</p>
        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={() => setDeleteModalOpen(false)}>Cancelar</button>
          <button type="button" className="btn btn-danger" onClick={() => void handleDelete()}>Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}
