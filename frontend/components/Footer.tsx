import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="nav-logo">
              <img src="/images/logo.png" alt="Amargo Studios" className="nav-logo-img" />
              <span className="nav-logo-text">Amargo <span>Studios</span></span>
            </Link>
            <p className="mt-sm">
              Productora audiovisual de alta gama especializada en cinematografía, fotografía profesional y gestión de redes sociales.
            </p>
          </div>
          
          <div className="footer-col">
            <h4>Explora</h4>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/nosotros">Nosotros</Link></li>
              <li><Link href="/servicios">Servicios</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Servicios</h4>
            <ul>
              <li><Link href="/servicios#video">Producción de Video</Link></li>
              <li><Link href="/servicios#photo">Fotografía Profesional</Link></li>
              <li><Link href="/servicios#social">Redes Sociales</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li>info@amargostudios.com</li>
              <li>+57 300 123 4567</li>
              <li>Medellín, Colombia</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Amargo Studios. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
