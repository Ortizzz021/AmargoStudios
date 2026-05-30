'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const publicLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <div className="header-container">
        <Link href="/" className="nav-logo">
          <img src="/images/logo.png" alt="Amargo Studios" className="nav-logo-img" />
          <span className="nav-logo-text">Amargo <span>Studios</span></span>
        </Link>
        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="mainNav" className={menuOpen ? 'active' : ''}>
          <ul>
            {publicLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={isActive(link.href) ? 'active' : ''}>
                  {link.label}
                </Link>
              </li>
            ))}
            {isAuthenticated && isAdmin && (
              <li>
                <Link href="/dashboard" className={pathname?.startsWith('/dashboard') ? 'active' : ''}>
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated ? (
              <li>
                <button type="button" className="nav-logout-btn" onClick={() => { logout(); window.location.href = '/login'; }}>
                  Salir
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login" className={pathname === '/login' ? 'active' : ''}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
