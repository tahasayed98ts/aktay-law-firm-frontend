'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { authStore } from '../../lib/auth';
import adminApi from '../../lib/adminApi';
import {
  LayoutDashboard, FileText, BookOpen,
  MessageSquare, Settings, LogOut, Menu, X, Image,
} from 'lucide-react';


const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/posts',     icon: BookOpen,         label: 'Blog Posts' },
  { href: '/admin/pages',     icon: FileText,         label: 'Page Content' },
  { href: '/admin/images',    icon: Image,            label: 'Site Images' },
  { href: '/admin/messages',  icon: MessageSquare,    label: 'Messages' },
  { href: '/admin/settings',  icon: Settings,         label: 'Settings' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const isLogin  = pathname === '/admin/login';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checked,     setChecked]     = useState(false);

useEffect(() => {
  if (isLogin) {
    setTimeout(() => setChecked(true), 0);
    return;
  }
  if (!authStore.isLoggedIn()) {
    router.replace('/admin/login');
  } else {
    setTimeout(() => setChecked(true), 0);
  }
}, [isLogin, router]);

  const handleLogout = async () => {
    try { await adminApi.post('/auth/logout'); } catch {}
    authStore.clearToken();
    router.replace('/admin/login');
  };

  if (isLogin) return <>{children}</>;
  if (!checked) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="admin-spinner" />
      <style>{`
        .admin-spinner {
          width: 36px; height: 36px;
          border: 3px solid rgba(233,206,139,0.15);
          border-top-color: #e9ce8b;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px', flexShrink: 0,
        background: '#061219',
        borderRight: '1px solid rgba(233,206,139,0.1)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: 100,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
        transition: 'transform 0.3s ease',
      }}
      className="admin-sidebar">

        {/* Logo */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(233,206,139,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>Aktay</div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e9ce8b' }}>Admin Panel</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="sidebar-close"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'none' }}>
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1.5rem',
                textDecoration: 'none',
                fontFamily: "'Fira Code', monospace",
                fontSize: '0.82rem',
                color: active ? '#e9ce8b' : 'rgba(255,255,255,0.55)',
                background: active ? 'rgba(233,206,139,0.06)' : 'transparent',
                borderLeft: active ? '2px solid #e9ce8b' : '2px solid transparent',
                transition: 'all 0.2s',
              }}>
                <Icon size={16} strokeWidth={1.5} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(233,206,139,0.1)' }}>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: "'Fira Code', monospace", fontSize: '0.82rem',
            padding: '0.5rem 0', width: '100%',
            transition: 'color 0.2s',
          }}>
            <LogOut size={16} strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 99,
        }} />
      )}

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: '240px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
           className="admin-main">

        {/* Top bar */}
        <header style={{
          height: '60px', padding: '0 1.5rem',
          borderBottom: '1px solid rgba(233,206,139,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#061219', position: 'sticky', top: 0, zIndex: 50,
        }}>
          <button onClick={() => setSidebarOpen(true)} className="menu-btn"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', display: 'none' }}>
            <Menu size={20} />
          </button>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
            {navItems.find(n => pathname.startsWith(n.href))?.label ?? 'Admin'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
            admin@lawfirm.com
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%);
            width: 240px !important;
          }
          .admin-sidebar.open { transform: translateX(0) !important; }
          .admin-main { margin-left: 0 !important; }
          .menu-btn { display: flex !important; }
          .sidebar-close { display: block !important; }
        }
      `}</style>
    </div>
  );
}