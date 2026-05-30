import Link from 'next/link';
import Image from 'next/image';
import HeroVideo from '@/components/HeroVideo';
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

      <section className="container">
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
                <h3 className="mb-sm">Incluye:</h3>
                <ul>
                  <li><strong>Preproducción:</strong> Desarrollo de guion y planificación detallada</li>
                  <li><strong>Filmación:</strong> Captura profesional con equipo cinematográfico</li>
                  <li><strong>Edición:</strong> Montaje narrativo y creativo</li>
                  <li><strong>Colorización:</strong> Corrección y gradación de color profesional</li>
                  <li><strong>Diseño Sonoro:</strong> Mezcla, masterización y efectos de audio</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="media-container">
            <Image src="/images/video-production.webp" alt="Producción de video" width={700} height={450} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="about-content">
          <div className="media-container">
            <Image src="/images/photography.webp" alt="Fotografía profesional" width={700} height={450} loading="lazy" />
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
                <h3 className="mb-sm">Especialidades:</h3>
                <ul>
                  <li><strong>Fotografía de Marca:</strong> Imágenes que reflejan la identidad de tu negocio</li>
                  <li><strong>Fotografía de Producto:</strong> Destacamos lo mejor de tus productos</li>
                  <li><strong>Contenido para Redes:</strong> Fotografías optimizadas para plataformas digitales</li>
                  <li><strong>Sesiones Corporativas:</strong> Retratos profesionales y fotografía de equipo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
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
                <h3 className="mb-sm">Formatos:</h3>
                <ul>
                  <li><strong>Reels Cinematográficos:</strong> Videos cortos con impacto visual</li>
                  <li><strong>Stories Dinámicos:</strong> Contenido vertical optimizado</li>
                  <li><strong>Videos para Feed:</strong> Piezas narrativas para publicaciones</li>
                  <li><strong>Contenido TikTok:</strong> Videos virales con calidad premium</li>
                  <li><strong>Campañas Publicitarias:</strong> Contenido estratégico para ads</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="media-container">
            <Image src="/images/social-media.webp" alt="Contenido para redes sociales" width={700} height={450} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="section-header">
          <p className="section-subtitle">Creatividad Sin Límites</p>
          <h2>Proyectos Especiales</h2>
          <p>
            Desarrollo de teasers, miniseries y cualquier formato audiovisual creativo que requiera
            un enfoque único y cinematográfico.
          </p>
        </div>
        <div className="grid grid-3">
          <div className="card">
            <div className="card-content">
              <h3>Teasers y Trailers</h3>
              <p>Piezas promocionales cinematográficas que generan expectativa y emoción.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3>Miniseries</h3>
              <p>Contenido episódico con narrativa visual y producción de alta calidad.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3>Proyectos Creativos</h3>
              <p>Formatos audiovisuales únicos adaptados a tu visión creativa.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="section-header">
          <p className="section-subtitle">Nuestro Método</p>
          <h2>Proceso de Trabajo</h2>
        </div>
        <div className="grid grid-2">
          {[
            ['Consulta Inicial', 'Entendemos tu visión, objetivos y necesidades específicas del proyecto.'],
            ['Desarrollo Creativo', 'Creamos un concepto cinematográfico adaptado a tu marca e identidad.'],
            ['Producción', 'Ejecutamos con profesionalismo, cuidando cada detalle técnico y creativo.'],
            ['Entrega Final', 'Postproducción completa y entrega en los formatos que necesites.'],
          ].map(([title, desc]) => (
            <div className="card" key={title}>
              <div className="card-content">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="card text-center">
          <div className="card-content">
            <h2 className="mb-md">¿Interesado en Alguno de Nuestros Servicios?</h2>
            <p className="mb-lg">Contáctanos para discutir tu proyecto y recibir una cotización personalizada.</p>
            <Link href="/contacto" className="btn btn-primary">Solicitar Cotización</Link>
          </div>
        </div>
      </section>
    </>
  );
}
