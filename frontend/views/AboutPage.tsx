import Link from 'next/link';
import Image from 'next/image';
import HeroVideo from '@/components/HeroVideo';
import { YOUTUBE_VIDEOS } from '@/lib/utils';

const team = [
  {
    name: 'Samuel',
    role: 'Director General',
    image: '/images/samuel.webp',
    bio: 'Lidera la visión estratégica de Amargo Studios, asegurando que cada proyecto mantenga los más altos estándares de calidad y coherencia con la identidad del estudio.',
  },
  {
    name: 'Pablo',
    role: 'Director Creativo',
    image: '/images/pablo.webp',
    bio: 'El cerebro creativo detrás de cada concepto visual. Transforma ideas en narrativas cinematográficas que conectan y emocionan.',
  },
  {
    name: 'Yeiner',
    role: 'Foto y Video',
    image: '/images/yeiner.webp',
    bio: 'Encargado de capturar cada momento con precisión técnica y ojo artístico, tanto en fotografía como en producción de video.',
  },
];

export default function AboutPage() {
  return (
    <>
      <HeroVideo
        videoId={YOUTUBE_VIDEOS.about}
        subtitle="Nuestra Historia"
        title="Pasión por el Cine y la Creación Visual"
      />

      <section className="container">
        <div className="section-header">
          <p className="section-subtitle">Quiénes Somos</p>
          <h2>Una Productora Joven y Dinámica</h2>
        </div>
        <div className="about-intro">
          <p>
            Amargo Studios es una productora audiovisual joven y dinámica, formada por un equipo de
            apasionados por el cine y la creación visual.
          </p>
          <p>
            Nos especializamos en transformar ideas en piezas audiovisuales con un estilo cinematográfico
            único, cuidando cada detalle para que cada proyecto se sienta como una pequeña película.
          </p>
          <p>
            Más que acumular clientes, nos dedicamos a crear piezas audiovisuales con alma cinematográfica.
            Queremos ser reconocidos no solo por la cantidad de proyectos, sino por la calidad y la
            narrativa visual de cada uno de ellos.
          </p>
        </div>
      </section>

      <section className="container">
        <div className="section-header">
          <p className="section-subtitle">Nuestro Equipo</p>
          <h2>Las Mentes Detrás de Cada Proyecto</h2>
        </div>
        <div className="grid grid-3">
          {team.map((member) => (
            <div className="team-card" key={member.name}>
              <div className="team-img-container">
                <Image src={member.image} alt={`${member.name} - ${member.role}`} width={400} height={280} loading="lazy" />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="section-header">
          <p className="section-subtitle">Nuestro Propósito</p>
          <h2>Visión y Misión</h2>
        </div>
        <div className="vision-mission">
          <div className="vision-card">
            <h3 className="mb-md">Nuestra Visión</h3>
            <p>
              Nuestra visión es simple pero ambiciosa: queremos ser un estudio que transforma cualquier
              proyecto, desde un reel hasta un cortometraje, en una pieza de cine en miniatura.
            </p>
            <p>
              No buscamos solo producir contenido, sino elevarlo a un nivel donde cada frame tenga
              intención cinematográfica.
            </p>
          </div>
          <div className="mission-card">
            <h3 className="mb-md">Nuestra Misión</h3>
            <p>
              Nuestra misión es ofrecer soluciones audiovisuales integrales, accesibles y de alta calidad,
              adaptándonos a las necesidades de cada proyecto y construyendo relaciones duraderas con
              nuestros clientes.
            </p>
            <p>
              Nos esforzamos por que cada producción sea un reflejo de la identidad de la marca, con un
              toque de originalidad y profesionalismo.
            </p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="section-header">
          <p className="section-subtitle">Nuestros Valores</p>
          <h2>Lo Que Nos Define</h2>
        </div>
        <div className="grid grid-2">
          {[
            ['Creatividad Cinematográfica', 'Cada proyecto es una oportunidad para innovar y crear algo único con enfoque de cine.'],
            ['Calidad Premium', 'No comprometemos la calidad. Cada detalle importa en la creación de piezas audiovisuales.'],
            ['Compromiso con el Cliente', 'Construimos relaciones duraderas, adaptándonos a las necesidades de cada proyecto.'],
            ['Profesionalismo', 'Soluciones integrales y accesibles con el más alto nivel de profesionalismo.'],
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
            <h2 className="mb-md">¿Quieres Trabajar con Nosotros?</h2>
            <p className="mb-lg">
              Estamos listos para transformar tu visión en una pieza audiovisual cinematográfica única.
            </p>
            <Link href="/contacto" className="btn btn-primary">Contáctanos</Link>
          </div>
        </div>
      </section>
    </>
  );
}
