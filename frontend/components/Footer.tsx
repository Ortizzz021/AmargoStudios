import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-col">
            <h4>Amargo Studios</h4>
            <p>Productora audiovisual de alta gama.</p>
          </div>
          
          <div className="footer-col">
            <h4>Enlaces</h4>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/servicios">Servicios</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><a href="mailto:amargostudios@gmail.com">amargostudios@gmail.com</a></li>
              <li><a href="https://wa.me/573166123634" target="_blank" rel="noopener noreferrer">+57 316 612 3634</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Amargo Studios.</p>
        </div>
      </div>
    </footer>
  );
}
