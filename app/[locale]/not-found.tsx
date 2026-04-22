import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-site-dark)', padding: '2rem', textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)', fontSize: 'clamp(6rem, 15vw, 10rem)',
        fontWeight: 700, color: 'rgba(233,206,139,0.15)', lineHeight: 1,
        marginBottom: '1rem',
      }}>
        404
      </div>
      <h1 style={{
        fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        fontWeight: 600, color: 'white', marginBottom: '1rem',
      }}>
        Page Not Found
      </h1>
      <p style={{
        fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)',
        maxWidth: '420px', lineHeight: 1.7, marginBottom: '2.5rem',
      }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/en" style={{
        background: 'var(--color-accent)', color: 'var(--color-site-deep)',
        fontFamily: 'var(--font-sans)', fontWeight: 700,
        fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
        padding: '0.875rem 2.5rem', textDecoration: 'none',
      }}>
        Back to Home →
      </Link>
    </div>
  );
}