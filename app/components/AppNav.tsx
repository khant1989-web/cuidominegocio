'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/actions/auth';

const MODULES = [
  { href: '/beneficiarios', label: 'Gestión de Beneficiarios', icon: 'pi-users' },
  { href: '/modulo2',       label: 'Módulo 2',                 icon: 'pi-box' },
  { href: '/modulo3',       label: 'Módulo 3',                 icon: 'pi-chart-bar' },
  { href: '/modulo4',       label: 'Módulo 4',                 icon: 'pi-cog' },
  { href: '/modulo5',       label: 'Módulo 5',                 icon: 'pi-file' },
];

export default function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="app-nav">
      <Link href="/beneficiarios" className="app-logo">
        <div className="app-logo-badge">SE+</div>
        <div>
          <span className="app-logo-name">Cuido Mi Negocio</span>
          <span className="app-logo-ver">v2</span>
        </div>
      </Link>

      <div className="app-tabs">
        {MODULES.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`app-tab${pathname.startsWith(m.href) ? ' active' : ''}`}
          >
            <i className={`pi ${m.icon}`} />
            {m.label}
          </Link>
        ))}
      </div>

      <form action={signOut}>
        <button type="submit" className="app-logout" title="Cerrar sesión">
          <i className="pi pi-sign-out" />
        </button>
      </form>
    </nav>
  );
}
