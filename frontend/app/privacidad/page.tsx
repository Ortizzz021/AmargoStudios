import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';

export const metadata = { title: 'Política de Privacidad' };

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content fade-in-up">
          <p className="hero-subtitle">Legal</p>
          <h1 className="hero-title">Política de Tratamiento de Datos Personales</h1>
        </div>
      </section>

      <section className="container privacy-content">
        <div className="privacy-section">
          <h2>1. Responsable del Tratamiento</h2>
          <div className="privacy-info-card">
            <p><strong>Razón Social:</strong> Amargo Studios</p>
            <p><strong>Email:</strong> amargostudios@gmail.com</p>
            <p><strong>Ubicación:</strong> Medellín, Colombia</p>
          </div>
        </div>

        <div className="privacy-section">
          <h2>2. Finalidad del Tratamiento</h2>
          <p>
            Los datos personales recolectados a través de nuestros formularios de contacto serán utilizados
            exclusivamente para:
          </p>
          <ul>
            <li>Responder a solicitudes de cotización y consultas sobre nuestros servicios</li>
            <li>Gestionar la relación comercial con clientes potenciales y actuales</li>
            <li>Enviar información relevante sobre nuestros servicios audiovisuales</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>3. Derechos del Titular</h2>
          <p>
            Conforme a la Ley 1581 de 2012, usted tiene derecho a conocer, actualizar, rectificar y
            suprimir sus datos personales. Para ejercer estos derechos, contáctenos en amargostudios@gmail.com
          </p>
        </div>

        <div className="privacy-footer">
          <p>Última actualización: Enero 2026</p>
          <Link href="/contacto" className="btn btn-primary">Volver al Contacto</Link>
        </div>
      </section>
    </PublicLayout>
  );
}
