import Link from 'next/link';
import GoldDivider from '../ui/GoldDivider';

interface Props {
  heading: string;
  sub: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function CtaBanner({ heading, sub, ctaLabel, ctaHref }: Props) {
  return (
    <section style={{ background: 'var(--color-primary)', padding: '6rem 0', borderRadius: '0 0 10px 10px' }}>
      <div className="site-container" style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 600, color: 'white',
          marginBottom: '0.75rem',
        }}>
          {heading}
        </h2>
        <GoldDivider center />
        <p style={{
          fontFamily: 'var(--font-sans)',
          color: 'rgba(255,255,255,0.65)',
          maxWidth: '460px', margin: '0 auto 2.5rem',
          lineHeight: 1.75,
        }}>
          {sub}
        </p>
        <Link href={ctaHref} style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'var(--color-accent)', color: 'var(--color-site-deep)',
          fontFamily: 'var(--font-sans)', fontWeight: 700,
          fontSize: '0.75rem', letterSpacing: '0.14em',
          textTransform: 'uppercase', padding: '1rem 2.75rem',
          textDecoration: 'none',
        }}>
          {ctaLabel} →
        </Link>
      </div>
    </section>
  );
}