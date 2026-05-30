import Link from 'next/link';
import Image from 'next/image';
import HeroVideo from '@/components/HeroVideo';
import AnimateOnScroll from '@/components/ScrollAnimations';
import { YOUTUBE_VIDEOS } from '@/lib/utils';

export default function ServicesPage() {
  return (
    <>
      <HeroVideo
        videoId={YOUTUBE_VIDEOS.services}
        subtitle="Nuestros Servicios"
        title="Soluciones Audiovisuales Integrales"
        description="Desde la preproducción hasta la entrega final, ofrecemos servicios completos con enfoque cinematográfico."
      />

      <section id="video" className="container">
        <AnimateOnScroll>
          <div className="about-content">
            <div className="about-text">
              <p className="section-subtitle">Servicio Principal</p>
              <h2>Producción de Video</h2>
              <p>
                Desde la preproducción hasta la postproducción, manejamos cada etapa del proceso
                con profesionalismo y visión cinematográfica.
              </p>
              <div className="card mt-md">
                <div className="card-content">
                  <h3 className="mb-sm" style={{ color: 'var(--color-accent-light)' }}>Incluye:</h3>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Preproducción:</strong> Desarrollo de guion y planificación detallada</li>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Filmación:</strong> Captura profesional con equipo cinematográfico</li>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Edición:</strong> Montaje narrativo y creativo</li>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Colorización:</strong> Corrección y gradación de color profesional</li>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Diseño Sonoro:</strong> Mezcla, masterización y efectos de audio</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="media-container">
              <Image src="/images/video-production.webp" alt="Producción de video" width={700} height={450} loading="lazy" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <section id="photo" className="container">
        <AnimateOnScroll>
          <div className="about-content">
            <div className="media-container">
              <Image src="/images/photography.webp" alt="Fotografía profesional" width={700} height={450} loading="lazy" style={{ objectFit: 'cover' }} />
            </div>
            <div className="about-text">
              <p className="section-subtitle">Captura Visual</p>
              <h2>Fotografía Profesional</h2>
              <p>
                Sesiones fotográficas profesionales para marcas, productos y contenido de redes sociales,
                siempre con un toque cinematográfico que eleva cada imagen.
              </p>
              <div className="card mt-md">
                <div className="card-content">
                  <h3 className="mb-sm" style={{ color: 'var(--color-accent-light)' }}>Especialidades:</h3>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Fotografía de Marca:</strong> Imágenes que reflejan la identidad de tu negocio</li>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Fotografía de Producto:</strong> Destacamos lo mejor de tus productos</li>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Contenido para Redes:</strong> Fotografías optimizadas para plataformas digitales</li>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Sesiones Corporativas:</strong> Retratos profesionales y fotografía de equipo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <section id="social" className="container">
        <AnimateOnScroll>
          <div className="about-content">
            <div className="about-text">
              <p className="section-subtitle">Marketing Digital</p>
              <h2>Contenido para Redes Sociales</h2>
              <p>
                Creación de videos cortos, reels y piezas visuales que resaltan en plataformas digitales,
                manteniendo siempre una narrativa cinematográfica que captura la atención.
              </p>
              <div className="card mt-md">
                <div className="card-content">
                  <h3 className="mb-sm" style={{ color: 'var(--color-accent-light)' }}>Formatos:</h3>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Reels Cinematográficos:</strong> Videos cortos con impacto visual</li>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Stories Dinámicos:</strong> Contenido vertical optimizado</li>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Videos para Feed:</strong> Piezas narrativas para publicaciones</li>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Contenido TikTok:</strong> Videos virales con calidad premium</li>
                    <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-accent-light)', marginRight: '0.5rem' }}>✓</span><strong>Campañas Publicitarias:</strong> Contenido estratégico para ads</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="media-container">
              <Image src="/images/social-media.webp" alt="Contenido para redes sociales" width={700} height={450} loading="lazy" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="container">
        <AnimateOnScroll>
          <div className="section-header text-center">
            <p className="section-subtitle">Creatividad Sin Límites</p>
            <h2>Proyectos Especiales</h2>
            <p>
              Desarrollo de teasers, miniseries y cualquier formato audiovisual creativo que requiera
              un enfoque único y cinematográfico.
            </p>
          </div>
          <div className="grid grid-3">
            <AnimateOnScroll delay={50}>
              <div className="card">
                <div className="card-content">
                  <div style={{ color: 'var(--color-accent-light)', marginBottom: 'var(--spacing-sm)' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                  <h3>Teasers y Trailers</h3>
                  <p>Piezas promocionales cinematográficas que generan expectativa y emoción.</p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
              <div className="card">
                <div className="card-content">
                  <div style={{ color: 'var(--color-accent-light)', marginBottom: 'var(--spacing-sm)' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                      <line x1="7" y1="2" x2="7" y2="22"></line>
                      <line x1="17" y1="2" x2="17" y2="22"></line>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <line x1="2" y1="7" x2="7" y2="7"></line>
                      <line x1="2" y1="17" x2="7" y2="17"></line>
                      <line x1="17" y1="17" x2="22" y2="17"></line>
                      <line x1="17" y1="7" x2="22" y2="7"></line>
                    </svg>
                  </div>
                  <h3>Miniseries</h3>
                  <p>Contenido episódico con narrativa visual y producción de alta calidad.</p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={250}>
              <div className="card">
                <div className="card-content">
                  <div style={{ color: 'var(--color-accent-light)', marginBottom: 'var(--spacing-sm)' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <h3>Proyectos Creativos</h3>
                  <p>Formatos audiovisuales únicos adaptados a tu visión creativa.</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="container">
        <AnimateOnScroll>
          <div className="section-header text-center">
            <p className="section-subtitle">Nuestro Método</p>
            <h2>Proceso de Trabajo</h2>
          </div>
          <div className="grid grid-2">
            {[
              ['Consulta Inicial', 'Entendemos tu visión, objetivos y necesidades específicas del proyecto.'],
              ['Desarrollo Creativo', 'Creamos un concepto cinematográfico adaptado a tu marca e identidad.'],
              ['Producción', 'Ejecutamos con profesionalismo, cuidando cada detalle técnico y creativo.'],
              ['Entrega Final', 'Postproducción completa y entrega en los formatos que necesites.'],
            ].map(([title, desc], idx) => (
              <AnimateOnScroll key={title} delay={idx * 100}>
                <div className="card">
                  <div className="card-content">
                    <div className="process-step-number">0{idx + 1}</div>
                    <h3 style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-xs)' }}>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      <section className="container">
        <AnimateOnScroll>
          <div className="card text-center" style={{ background: 'var(--gradient-accent)', borderColor: 'var(--color-accent-primary)' }}>
            <div className="card-content">
              <h2 className="mb-md">¿Interesado en Alguno de Nuestros Servicios?</h2>
              <p className="mb-lg">Contáctanos para discutir tu proyecto y recibir una cotización personalizada.</p>
              <Link href="/contacto" className="btn btn-primary">Solicitar Cotización</Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
