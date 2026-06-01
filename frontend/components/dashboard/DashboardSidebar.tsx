'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Users, ClipboardList, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const iconMap: Record<string, React.ReactNode> = {
  '/dashboard': <BarChart3 size={18} />,
  '/dashboard/clientes': <Users size={18} />,
  '/dashboard/cotizaciones': <ClipboardList size={18} />,
  '/dashboard/perfil': <User size={18} />,
};

const links = [
  { href: '/dashboard', label: 'Resumen' },
  { href: '/dashboard/clientes', label: 'Clientes' },
  { href: '/dashboard/cotizaciones', label: 'Cotizaciones' },
  { href: '/dashboard/perfil', label: 'Mi Perfil' },
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
            <span aria-hidden className="sidebar-link-icon">{iconMap[link.href]}</span>
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
            window.location.href = '/';
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
