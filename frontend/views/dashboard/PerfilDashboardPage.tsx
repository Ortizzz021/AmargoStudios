'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { perfilService } from '@/services/perfilService';
import { FormFieldInput } from '@/components/FormField';
import { getErrorMessage } from '@/services/api';

export default function PerfilDashboardPage() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({
    nombre_completo: user?.nombre_completo ?? '',
    avatar_url: user?.avatar_url ?? '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        nombre_completo: user.nombre_completo,
        avatar_url: user.avatar_url ?? '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      await perfilService.update(user.id, {
        nombre_completo: form.nombre_completo,
        avatar_url: form.avatar_url || null,
      });
      await refreshUser();
      toast.success('Perfil actualizado');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Mi Perfil</h1>
        <p>Edita tu información personal</p>
      </div>

      <div className="detail-card profile-card">
        <form onSubmit={handleSubmit}>
          <FormFieldInput
            label="Nombre completo"
            name="nombre_completo"
            value={form.nombre_completo}
            onChange={(e) => setForm({ ...form, nombre_completo: e.target.value })}
          />
          <FormFieldInput
            label="URL del avatar"
            name="avatar_url"
            type="url"
            value={form.avatar_url}
            onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
            placeholder="https://..."
          />
          <div className="profile-preview">
            {form.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.avatar_url} alt="Avatar preview" className="avatar-preview" />
            ) : (
              <div className="avatar-placeholder">{form.nombre_completo.charAt(0).toUpperCase()}</div>
            )}
            <div>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.rol}</p>
            </div>
          </div>
          <button type="submit" className={`btn btn-primary ${isSaving ? 'loading' : ''}`} disabled={isSaving}>
            {isSaving ? 'Guardando' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}
