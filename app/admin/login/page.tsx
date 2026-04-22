'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { authStore } from '../../../lib/auth';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form,     setForm]     = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        form,
        { withCredentials: true }
      );
      authStore.setToken(data.accessToken);
      router.replace('/admin/dashboard');
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : (err as { response?: { data?: { message?: string } } })?.response?.data?.message
                ?? 'Login failed. Please try again.';
    setError(message);  
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.875rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(233,206,139,0.15)',
    borderRadius: '6px', color: 'white',
    fontFamily: "'Fira Code', monospace", fontSize: '0.88rem',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, #061219 0%, #0d1e24 100%)`,
      padding: '1.5rem',
    }}>
      <div style={{
        width: '100%', maxWidth: '400px',
        background: '#162830',
        border: '1px solid rgba(233,206,139,0.12)',
        borderRadius: '12px',
        padding: '2.5rem',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Image src="/logo.png" alt="Aktay" width={64} height={64} loading="eager" style={{ objectFit: 'contain' }} />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 700, color: 'white', marginTop: '0.75rem' }}>
            Aktay Law Firm
          </div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e9ce8b', marginTop: '0.25rem' }}>
            Admin Panel
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(233,206,139,0.1)', marginBottom: '2rem' }} />

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(220,50,50,0.1)',
            border: '1px solid rgba(220,50,50,0.3)',
            borderRadius: '6px', padding: '0.75rem 1rem',
            fontSize: '0.82rem', color: '#ff8080',
            marginBottom: '1.25rem',
            fontFamily: "'Fira Code', monospace",
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{
              display: 'block', fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)', marginBottom: '0.5rem',
              fontFamily: "'Fira Code', monospace",
            }}>
              Email
            </label>
            <input
              type="email" required
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="Enter your email"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(233,206,139,0.5)'}
              onBlur={e  => e.target.style.borderColor = 'rgba(233,206,139,0.15)'}
            />
          </div>

          <div>
            <label style={{
              display: 'block', fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)', marginBottom: '0.5rem',
              fontFamily: "'Fira Code', monospace",
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'} required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                style={{ ...inputStyle, paddingRight: '3rem' }}
                onFocus={e => e.target.style.borderColor = 'rgba(233,206,139,0.5)'}
                onBlur={e  => e.target.style.borderColor = 'rgba(233,206,139,0.15)'}
              />
              <button type="button" onClick={() => setShowPass(p => !p)} style={{
                position: 'absolute', right: '0.875rem', top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.35)', padding: 0,
              }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            background: loading ? 'rgba(233,206,139,0.4)' : '#e9ce8b',
            color: '#061219', border: 'none', borderRadius: '6px',
            padding: '0.875rem', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'Fira Code', monospace", fontWeight: 700,
            fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'background 0.2s', marginTop: '0.5rem',
          }}>
            {loading ? (
              <div style={{
                width: '16px', height: '16px',
                border: '2px solid rgba(6,18,25,0.3)',
                borderTopColor: '#061219',
                borderRadius: '50%',
                animation: 'spin 0.7s linear infinite',
              }} />
            ) : (
              <><LogIn size={15} /> Sign In</>
            )}
          </button>
        </form>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          input::placeholder { color: rgba(255,255,255,0.2); }
        `}</style>
      </div>
    </div>
  );
}