'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const links = [
  { href: '/dashboard', label: 'Resumen', icon: '📊' },
  { href: '/dashboard/clientes', label: 'Clientes', icon: '👥' },
  { href: '/dashboard/cotizaciones', label: 'Cotizaciones', icon: '📋' },
  { href: '/dashboard/perfil', label: 'Mi Perfil', icon: '👤' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand">
        <Link href="/">Amargo Studios</Link>
        <span>Panel Admin</span>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`sidebar-link ${isActive(link.href) ? 'active' : ''}`}
          >
            <span aria-hidden>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>{user?.nombre_completo}</p>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => {
            logout();
            window.location.href = '/login';
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
