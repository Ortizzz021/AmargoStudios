import Link from 'next/link';
import Image from 'next/image';
import HeroVideo from '@/components/HeroVideo';
import AnimateOnScroll from '@/components/ScrollAnimations';
import { YOUTUBE_VIDEOS } from '@/lib/utils';

export default function HomePage() {
  return (
    <>
      <HeroVideo
        videoId={YOUTUBE_VIDEOS.home}
        subtitle="Productora Audiovisual"
        title="Transformamos Ideas en Cine"
        description="Cada proyecto es una pequeña película. Creamos piezas audiovisuales con alma cinematográfica, cuidando cada detalle para que cada frame cuente una historia."
      >
        <Link href="/contacto" className="btn btn-primary">
          Comienza tu Proyecto
        </Link>
      </HeroVideo>

      <section className="container">
        <AnimateOnScroll>
          <div className="section-header">
            <p className="section-subtitle">Quiénes Somos</p>
            <h2>Una Productora con Visión Cinematográfica</h2>
          </div>
          <div className="about-content-index">
            <div className="about-text">
              <p>
                Amargo Studios es una productora audiovisual joven y dinámica, formada por un equipo de
                apasionados por el cine y la creación visual.
              </p>
              <p>
                Nos especializamos en transformar ideas en piezas audiovisuales con un estilo cinematográfico
                único, cuidando cada detalle para que cada proyecto se sienta como una pequeña película.
              </p>
              <p>
                No buscamos solo producir contenido, sino elevarlo a un nivel donde cada frame tenga
                intención cinematográfica.
              </p>
              <Link href="/nosotros" className="btn btn-outline mt-md">
                Conoce Más Sobre Nosotros
              </Link>
            </div>
            <div className="media-container">
              <Image src="/images/logo.png" alt="Equipo de Amargo Studios trabajando" width={600} height={400} loading="lazy" />
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="container">
        <AnimateOnScroll delay={100}>
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Proyectos Completados</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Premios & Reconocimientos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Clientes Satisfechos</div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="container">
        <AnimateOnScroll>
          <div className="section-header text-center">
            <p className="section-subtitle">Nuestros Servicios</p>
            <h2>Soluciones Audiovisuales Integrales</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🎬</div>
                <h3>Producción de Video</h3>
                <p>
                  Desde la preproducción hasta la postproducción. Guion, planificación, filmación,
                  edición, colorización y diseño sonoro.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">📸</div>
                <h3>Fotografía Profesional</h3>
                <p>
                  Sesiones fotográficas profesionales para marcas, productos y contenido de redes sociales
                  con estilo cinematográfico.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">📱</div>
                <h3>Contenido para Redes</h3>
                <p>
                  Videos cortos, reels y piezas visuales que resaltan en plataformas digitales con
                  narrativa cinematográfica.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-lg">
            <Link href="/servicios" className="btn btn-primary">
              Ver Todos los Servicios
            </Link>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="container">
        <AnimateOnScroll>
          <div className="section-header text-center">
            <p className="section-subtitle">Nuestro Trabajo</p>
            <h2>Cada Proyecto es una Obra de Arte Visual</h2>
          </div>
          <div className="portfolio-grid">
            <div className="portfolio-item">
              <Image src="/images/jerless1.webp" alt="Campaña Jerless" width={500} height={400} style={{ objectFit: 'cover' }} loading="lazy" />
              <div className="portfolio-overlay">
                <p>Jerless - Campaña Cinematográfica</p>
              </div>
            </div>
            <div className="portfolio-item">
              <Image src="/images/sprinterz.webp" alt="Comercial Sprinterz" width={500} height={400} style={{ objectFit: 'cover' }} loading="lazy" />
              <div className="portfolio-overlay">
                <p>Sprinterz - Comercial de Marca</p>
              </div>
            </div>
            <div className="portfolio-item">
              <Image src="/images/fabian1.webp" alt="Proyecto Fabián" width={500} height={400} style={{ objectFit: 'cover' }} loading="lazy" />
              <div className="portfolio-overlay">
                <p>Fabián - Documental Corporativo</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="container">
        <AnimateOnScroll>
          <div className="card text-center" style={{ background: 'var(--gradient-accent)', borderColor: 'var(--color-accent-primary)' }}>
            <div className="card-content">
              <h2 className="mb-md">¿Listo para Crear Algo Extraordinario?</h2>
              <p className="mb-lg">
                Transformemos tu visión en una pieza audiovisual cinematográfica que cuente tu historia
                de manera única y profesional.
              </p>
              <Link href="/contacto" className="btn btn-primary">
                Solicitar Cotización
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
