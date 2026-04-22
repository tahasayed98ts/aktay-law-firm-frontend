'use client';

import { useEffect } from 'react';

export default function Error({
  error, reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-site-dark)', padding: '2rem', textAlign: 'center',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚖️</div>
      <h2 style={{
        fontFamily: 'var(--font-serif)', fontSize: '2rem',
        fontWeight: 600, color: 'white', marginBottom: '1rem',
      }}>
        Something went wrong
      </h2>
      <p style={{
        fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)',
        marginBottom: '2rem', maxWidth: '400px', lineHeight: 1.7,
      }}>
        We encountered an unexpected error. Please try again.
      </p>
      <button onClick={reset} style={{
        background: 'var(--color-accent)', color: 'var(--color-site-deep)',
        border: 'none', padding: '0.875rem 2rem', cursor: 'pointer',
        fontFamily: 'var(--font-sans)', fontWeight: 700,
        fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        Try Again
      </button>
    </div>
  );
}