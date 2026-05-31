'use client';

import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import toast from 'react-hot-toast';
import HeroVideo from '@/components/HeroVideo';
import AnimateOnScroll from '@/components/ScrollAnimations';
import { FormFieldInput, FormFieldSelect, FormFieldTextarea } from '@/components/FormField';
import PrivacyModal from '@/components/PrivacyModal';
import { contactService, getErrorMessage } from '@/services/contactService';
import { YOUTUBE_VIDEOS } from '@/lib/utils';

const contactSchema = z.object({
  nombre_completo: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  telefono: z.string().optional(),
  servicio: z.string().min(1, 'Selecciona un servicio'),
  mensaje: z.string().min(10, 'Describe tu proyecto (mínimo 10 caracteres)'),
  consent: z.literal(true, { message: 'Debes aceptar la política de datos' }),
});

const serviceOptions = [
  { value: '', label: 'Selecciona un servicio' },
  { value: 'Producción de Video', label: 'Producción de Video' },
  { value: 'Fotografía Profesional', label: 'Fotografía Profesional' },
  { value: 'Contenido para Redes Sociales', label: 'Contenido para Redes Sociales' },
  { value: 'Proyectos Especiales', label: 'Proyectos Especiales' },
  { value: 'Otro', label: 'Otro' },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    nombre_completo: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString() ?? 'form';
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await contactService.submit({
        nombre_completo: form.nombre_completo,
        email: form.email,
        telefono: form.telefono || undefined,
        servicio: form.servicio,
        mensaje: form.mensaje,
      });
      setSuccess(true);
      toast.success('¡Solicitud enviada! Nos pondremos en contacto pronto.');
      setForm({ nombre_completo: '', email: '', telefono: '', servicio: '', mensaje: '', consent: false });
    } catch (err) {
      const message = getErrorMessage(err, 'Hubo un error al enviar tu solicitud');
      toast.error(message);
      setErrors({ form: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeroVideo
        videoId={YOUTUBE_VIDEOS.contact}
        subtitle="Hablemos"
        title="Comienza Tu Proyecto"
        description="Estamos listos para transformar tu visión en una pieza audiovisual cinematográfica"
      />

      <section className="container">
        <AnimateOnScroll>
          <div className="section-header">
            <p className="section-subtitle">Contáctanos</p>
            <h2>Solicita una Cotización</h2>
            <p>Cuéntanos sobre tu proyecto y nos pondremos en contacto contigo lo antes posible</p>
          </div>

          {success && (
            <div className="form-message success show">
              <span className="message-icon">✅</span>
              <span>¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.</span>
            </div>
          )}
          {errors.form && (
            <div className="form-message error show">
              <span className="message-icon">❌</span>
              <span>{errors.form}</span>
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <FormFieldInput
              label="Nombre Completo *"
              name="nombre_completo"
              value={form.nombre_completo}
              onChange={handleChange}
              placeholder="Tu nombre"
              error={errors.nombre_completo}
            />
            <FormFieldInput
              label="Correo Electrónico *"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              error={errors.email}
            />
            <FormFieldInput
              label="Teléfono"
              name="telefono"
              type="tel"
              value={form.telefono}
              onChange={handleChange}
              placeholder="+57 300 123 4567"
              error={errors.telefono}
            />
            <FormFieldSelect
              label="Servicio de Interés *"
              name="servicio"
              value={form.servicio}
              onChange={handleChange}
              options={serviceOptions}
              error={errors.servicio}
            />
            <FormFieldTextarea
              label="Cuéntanos sobre tu proyecto *"
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              placeholder="Describe tu visión, objetivos y cualquier detalle relevante..."
              error={errors.mensaje}
            />
            <div className="consent-group">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
              />
              <label htmlFor="consent">
                He leído y acepto la{' '}
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-accent-primary)', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Política de Tratamiento de Datos Personales
                </button>
                . Autorizo a Amargo Studios para el tratamiento de mis datos conforme a la Ley 1581 de 2012.
              </label>
            </div>
            {errors.consent && <span className="field-error">{errors.consent}</span>}

            <div className="text-center">
              <button type="submit" className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'Enviando' : 'Enviar Solicitud'}
              </button>
            </div>
          </form>
        </AnimateOnScroll>
      </section>

      <section className="container">
        <AnimateOnScroll>
          <div className="section-header">
            <p className="section-subtitle">Información de Contacto</p>
            <h2>Otras Formas de Contactarnos</h2>
          </div>
          <div className="grid grid-3">
            <AnimateOnScroll delay={50}>
              <div className="card text-center">
                <div className="card-content">
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-sm)' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent-light)' }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <h3>Email</h3>
                  <p>amargostudios@gmail.com</p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
              <div className="card text-center">
                <div className="card-content">
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-sm)' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent-light)' }}>
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <h3>WhatsApp</h3>
                  <p>+57 316 612 3634</p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={250}>
              <div className="card text-center">
                <div className="card-content">
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-sm)' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent-light)' }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <h3>Ubicación</h3>
                  <p>Medellín, Colombia</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="container">
        <AnimateOnScroll>
          <div className="card text-center" style={{ background: 'var(--gradient-accent)', borderColor: 'var(--color-accent-primary)' }}>
            <div className="card-content">
              <h2 className="mb-md">Síguenos en Redes Sociales</h2>
              <p className="mb-lg">Descubre nuestro trabajo y mantente al día con nuestros últimos proyectos</p>
              <div className="social-links">
                <a href="https://www.instagram.com/amargo_studios?igsh=bGtpMjRhMWZiZjh5" className="btn btn-outline" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://youtube.com/@amargostudios?si=aLj1aZxRjH4eR8nf" className="btn btn-outline" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="https://www.tiktok.com/@amargostudios?_r=1&_t=ZS-94y4zadbrk1" className="btn btn-outline" target="_blank" rel="noopener noreferrer">TikTok</a>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <PrivacyModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
    </>
  );
}
