'use client';

import { useState } from 'react';
import axios from 'axios';

interface Props {
  locale: string;
  translations: {
    name: string; email: string; phone: string;
    subject: string; message: string;
    send: string; success: string; error: string;
  };
}

export default function ContactForm({ locale, translations: tr }: Props) {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', subject: '', body: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/messages`, form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', body: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.875rem 1rem',
    background: 'var(--color-site-dark)',
    border: '1px solid rgba(233,206,139,0.15)',
    color: 'white',
    fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.72rem', fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.55)',
    marginBottom: '0.5rem',
  };

  return (
    <div style={{
      background: 'var(--color-site-card)',
      border: '1px solid rgba(233,206,139,0.12)',
      padding: '3rem',
    }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>
        {locale === 'ar' ? 'أرسل لنا رسالة' : 'Send Us a Message'}
      </h3>
      <div style={{ width: '40px', height: '2px', background: 'var(--color-accent)', marginBottom: '2rem' }} />

      {status === 'success' && (
        <div style={{
          background: 'rgba(233,206,139,0.1)', border: '1px solid rgba(233,206,139,0.3)',
          padding: '1rem 1.25rem', marginBottom: '1.5rem',
          fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-accent)',
        }}>
          ✓ {tr.success}
        </div>
      )}

      {status === 'error' && (
        <div style={{
          background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.3)',
          padding: '1rem 1.25rem', marginBottom: '1.5rem',
          fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#ff8080',
        }}>
          ✗ {tr.error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
          <div>
            <label style={labelStyle}>{tr.name}</label>
            <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{tr.email}</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
          <div>
            <label style={labelStyle}>{tr.phone}</label>
            <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{tr.subject}</label>
            <input name="subject" value={form.subject} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>{tr.message}</label>
          <textarea name="body" value={form.body} onChange={handleChange} required rows={6}
            style={{ ...inputStyle, resize: 'vertical' }} />
        </div>

        <button type="submit" disabled={status === 'loading'} style={{
          background: status === 'loading' ? 'rgba(233,206,139,0.5)' : 'var(--color-accent)',
          color: 'var(--color-site-deep)',
          fontFamily: 'var(--font-sans)', fontWeight: 700,
          fontSize: '0.75rem', letterSpacing: '0.14em',
          textTransform: 'uppercase', padding: '1rem 2.5rem',
          border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s', alignSelf: 'flex-start',
        }}>
          {status === 'loading' ? '...' : `${tr.send} →`}
        </button>
      </form>

      <style>{`
        @media (max-width: 560px) { .form-row { grid-template-columns: 1fr !important; } }
        input:focus, textarea:focus { border-color: rgba(233,206,139,0.5) !important; }
      `}</style>
    </div>
  );
}