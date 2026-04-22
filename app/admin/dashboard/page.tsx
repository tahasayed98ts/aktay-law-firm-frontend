'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import adminApi from '../../../lib/adminApi';
import {
  BookOpen, MessageSquare, FileText,
  Settings, Plus, Eye,
} from 'lucide-react';

interface Stats {
  totalPosts:      number;
  publishedPosts:  number;
  draftPosts:      number;
  totalMessages:   number;
  unreadMessages:  number;
}

export default function DashboardPage() {
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsRes, messagesRes] = await Promise.all([
          adminApi.get('/posts/admin/all'),
          adminApi.get('/messages/admin'),
        ]);
        const posts    = postsRes.data as { published: boolean }[];
        const messages = messagesRes.data as { read: boolean }[];
        setStats({
          totalPosts:     posts.length,
          publishedPosts: posts.filter(p => p.published).length,
          draftPosts:     posts.filter(p => !p.published).length,
          totalMessages:  messages.length,
          unreadMessages: messages.filter(m => !m.read).length,
        });
      } catch {
        setStats({ totalPosts: 0, publishedPosts: 0, draftPosts: 0, totalMessages: 0, unreadMessages: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = stats ? [
    { label: 'Total Posts',     value: stats.totalPosts,     icon: BookOpen,      color: '#3b5b66', href: '/admin/posts' },
    { label: 'Published',       value: stats.publishedPosts, icon: Eye,           color: '#2d7a4f', href: '/admin/posts' },
    { label: 'Drafts',          value: stats.draftPosts,     icon: FileText,      color: '#7a5c2d', href: '/admin/posts' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: MessageSquare, color: stats.unreadMessages > 0 ? '#7a2d2d' : '#3b5b66', href: '/admin/messages' },
  ] : [];

  const quickActions = [
    { label: 'New Blog Post',    href: '/admin/posts/new',  icon: Plus },
    { label: 'View Messages',    href: '/admin/messages',   icon: MessageSquare },
    { label: 'Edit Page Content',href: '/admin/pages',      icon: FileText },
    { label: 'Site Settings',    href: '/admin/settings',   icon: Settings },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2rem', fontWeight: 600,
          color: 'white', marginBottom: '0.35rem',
        }}>
          Dashboard
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>
          Welcome back — here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stat cards */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              height: '110px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(233,206,139,0.08)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}
             className="stat-grid">
          {statCards.map(({ label, value, icon: Icon, color, href }) => (
            <Link key={label} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#162830',
                border: '1px solid rgba(233,206,139,0.1)',
                borderRadius: '8px', padding: '1.5rem',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{
                    width: '40px', height: '40px',
                    borderRadius: '8px',
                    background: `${color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={color === '#7a2d2d' ? '#ff8080' : '#e9ce8b'} strokeWidth={1.5} />
                  </div>
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2.2rem', fontWeight: 700,
                  color: 'white', lineHeight: 1,
                  marginBottom: '0.35rem',
                }}>
                  {value}
                </div>
                <div style={{
                  fontSize: '0.72rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                }}>
                  {label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.3rem', fontWeight: 600,
          color: 'white', marginBottom: '1.25rem',
        }}>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}
             className="action-grid">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#162830',
                border: '1px solid rgba(233,206,139,0.1)',
                borderRadius: '8px', padding: '1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                transition: 'border-color 0.2s, color 0.2s',
                color: 'rgba(255,255,255,0.6)',
              }}
              className="action-card">
                <Icon size={16} strokeWidth={1.5} />
                <span style={{ fontSize: '0.82rem' }}>{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stat-grid   { grid-template-columns: repeat(2,1fr) !important; }
          .action-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 500px) {
          .stat-grid   { grid-template-columns: 1fr !important; }
          .action-grid { grid-template-columns: 1fr !important; }
        }
        .stat-card:hover   { border-color: rgba(233,206,139,0.3) !important; transform: translateY(-2px); }
        .action-card:hover { border-color: rgba(233,206,139,0.3) !important; color: #e9ce8b !important; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}