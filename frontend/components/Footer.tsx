export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-inner">
          <a href="mailto:amargostudios@gmail.com" className="footer-link">amargostudios@gmail.com</a>
          <span className="footer-separator">|</span>
          <a href="https://wa.me/573166123634" target="_blank" rel="noopener noreferrer" className="footer-link">+57 316 612 3634</a>
          <span className="footer-separator">|</span>
          <span>&copy; {new Date().getFullYear()} Amargo Studios</span>
        </div>
      </div>
    </footer>
  );
}
