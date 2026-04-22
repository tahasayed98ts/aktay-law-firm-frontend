'use client';

import { useEffect, useState } from 'react';
import adminApi from '../../../lib/adminApi';
import { Mail, MailOpen, Trash2, Phone, User, Clock } from 'lucide-react';

interface Message {
  _id:       string;
  name:      string;
  email:     string;
  phone:     string;
  subject:   string;
  body:      string;
  read:      boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages,  setMessages]  = useState<Message[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [selected,  setSelected]  = useState<Message | null>(null);
  const [deleting,  setDeleting]  = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const { data } = await adminApi.get('/messages/admin');
      setMessages(data);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleSelect = async (msg: Message) => {
    setSelected(msg);
    if (!msg.read) {
      try {
        await adminApi.patch(`/messages/admin/${msg._id}/read`);
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, read: true } : m));
      } catch {}
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    setDeleting(id);
    try {
      await adminApi.delete(`/messages/admin/${id}`);
      setMessages(prev => prev.filter(m => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch {
      alert('Failed to delete message.');
    } finally {
      setDeleting(null);
    }
  };

  const unread = messages.filter(m => !m.read).length;

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>
          Messages
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>
          {messages.length} total · {unread} unread
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.5rem', alignItems: 'start' }}
           className="messages-grid">

        {/* List */}
        <div style={{
          background: '#162830',
          border: '1px solid rgba(233,206,139,0.1)',
          borderRadius: '8px', overflow: 'hidden',
        }}>
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
              Loading...
            </div>
          ) : messages.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
              No messages yet.
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={msg._id}
                onClick={() => handleSelect(msg)}
                style={{
                  padding: '1rem 1.25rem',
                  borderBottom: i < messages.length - 1 ? '1px solid rgba(233,206,139,0.06)' : 'none',
                  cursor: 'pointer',
                  background: selected?._id === msg._id
                    ? 'rgba(233,206,139,0.06)'
                    : 'transparent',
                  borderLeft: selected?._id === msg._id
                    ? '2px solid var(--color-accent)'
                    : '2px solid transparent',
                  transition: 'all 0.15s',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {!msg.read && (
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />
                    )}
                    <span style={{ fontSize: '0.88rem', fontWeight: msg.read ? 400 : 600, color: 'white' }}>
                      {msg.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
                    {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {msg.subject || msg.body}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Detail */}
        {selected ? (
          <div style={{
            background: '#162830',
            border: '1px solid rgba(233,206,139,0.1)',
            borderRadius: '8px', padding: '2rem',
          }}>
            {/* Message header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>
                  {selected.subject || 'No subject'}
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
                    <User size={13} strokeWidth={1.5} />
                    {selected.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
                    <Mail size={13} strokeWidth={1.5} />
                    <a href={`mailto:${selected.email}`} style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>
                      {selected.email}
                    </a>
                  </div>
                  {selected.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
                      <Phone size={13} strokeWidth={1.5} />
                      {selected.phone}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
                    <Clock size={13} strokeWidth={1.5} />
                    {formatDate(selected.createdAt)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(selected._id)}
                disabled={deleting === selected._id}
                style={{
                  background: 'rgba(220,50,50,0.08)',
                  border: '1px solid rgba(220,50,50,0.2)',
                  borderRadius: '6px', padding: '0.5rem',
                  cursor: 'pointer', color: 'rgba(255,100,100,0.6)',
                  transition: 'all 0.2s', display: 'flex', alignItems: 'center',
                }}>
                <Trash2 size={15} />
              </button>
            </div>

            <div style={{ height: '1px', background: 'rgba(233,206,139,0.1)', marginBottom: '1.5rem' }} />

            {/* Message body */}
            <div style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.85,
              whiteSpace: 'pre-wrap',
            }}>
              {selected.body}
            </div>

            {/* Reply button */}
            <div style={{ marginTop: '2rem' }}>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--color-accent)', color: 'var(--color-site-deep)',
                fontFamily: "'Fira Code', monospace", fontWeight: 700,
                fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '0.75rem 1.5rem', borderRadius: '4px', textDecoration: 'none',
              }}>
                <Mail size={14} /> Reply via Email
              </a>
            </div>
          </div>
        ) : (
          <div style={{
            background: '#162830',
            border: '1px solid rgba(233,206,139,0.1)',
            borderRadius: '8px', padding: '4rem 2rem',
            textAlign: 'center',
          }}>
            <MailOpen size={40} color="rgba(233,206,139,0.2)" strokeWidth={1} style={{ marginBottom: '1rem' }} />
            <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem' }}>
              Select a message to read it
            </p>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .messages-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}