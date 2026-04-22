'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PageLoader() {
  const [phase, setPhase] = useState<'loading' | 'burst' | 'hidden'>('loading');

  useEffect(() => {
    const burstTimer = setTimeout(() => setPhase('burst'), 2000);
    const hideTimer  = setTimeout(() => setPhase('hidden'), 2800);
    return () => {
      clearTimeout(burstTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: phase === 'burst' ? 'transparent' : 'var(--color-site-deep)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      transition: 'background 0.3s ease',
      pointerEvents: phase === 'burst' ? 'none' : 'all',
    }}>

      {/* Logo */}
      <div className={`loader-logo ${phase === 'burst' ? 'logo-burst' : ''}`}>
        <Image
          src="/logo.png"
          alt="Aktay Law Firm"
          width={120}
          height={120}
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      {/* Firm name — hides on burst */}
      <div style={{
        textAlign: 'center',
        opacity: phase === 'burst' ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'white',
          letterSpacing: '0.08em',
          lineHeight: 1,
          marginBottom: '0.35rem',
        }}>
          AKATY
        </div>
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.62rem',
          letterSpacing: '0.85em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
        }}>
          Law Firm
        </div>
      </div>

      {/* Progress bar — hides on burst */}
      <div style={{
        width: '140px',
        height: '1px',
        background: 'rgba(233,206,139,0.15)',
        position: 'relative',
        overflow: 'hidden',
        opacity: phase === 'burst' ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}>
        <div className="loader-bar" style={{
          position: 'absolute',
          top: 0, left: 0,
          height: '100%',
          background: 'var(--color-accent)',
        }} />
      </div>

      {/* Tagline — hides on burst */}
      <p className="loader-tagline" style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.68rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        opacity: phase === 'burst' ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}>
        Where Justice Meets Innovation
      </p>

      <style>{`
        .loader-logo {
          animation: logoIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                     logoPulse 1.4s ease-in-out 0.8s 1;
          opacity: 0;
          transform-origin: center center;
        }

        @keyframes logoIn {
          0%   { opacity: 0; transform: scale(0.6); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes logoPulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }

        /* Burst: logo rockets toward viewer and fills screen */
        .logo-burst {
          animation: logoBurst 0.75s cubic-bezier(0.4, 0, 0.8, 1) forwards !important;
        }

        @keyframes logoBurst {
          0%   { transform: scale(1);    opacity: 1; }
          60%  { transform: scale(8);    opacity: 1; }
          100% { transform: scale(30);   opacity: 0; }
        }

        .loader-bar {
          animation: barFill 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          width: 0%;
        }

        @keyframes barFill {
          0%   { width: 0%; }
          60%  { width: 75%; }
          100% { width: 100%; }
        }

        .loader-tagline {
          animation: fadeInUp 0.8s ease 0.5s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}