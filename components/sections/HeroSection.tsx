import Link from 'next/link';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import TypewriterText from '../ui/TypewriterText';

interface Props {
  locale:    string;
  tagline:   string;
  heading:   string;
  sub:       string;
  ctaLabel:  string;
  ctaHref:   string;
  cta2Label: string;
  cta2Href:  string;
  bgImage?:  string;
}

export default function HeroSection({
  locale, tagline, heading, sub,
  ctaLabel, ctaHref, cta2Label, cta2Href,
  bgImage = '/court.jpg',
}: Props) {
  const isRtl = locale === 'ar';

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `
        linear-gradient(135deg, rgba(13,30,36,0.97) 0%, rgba(59,91,102,0.72) 100%),
        url('${bgImage}')
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Gold vertical accent */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        [isRtl ? 'right' : 'left']: 0,
        width: '3px',
        background: 'linear-gradient(to bottom, transparent, var(--color-accent) 40%, transparent)',
      }} />

      {/* Decorative circles */}
      <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', border: '1px solid rgba(233,206,139,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '320px', height: '320px', borderRadius: '50%', border: '1px solid rgba(233,206,139,0.09)', pointerEvents: 'none' }} />

      <div className="site-container" style={{ paddingTop: '140px', paddingBottom: '90px' }}>
        <div style={{ maxWidth: '680px' }}>
          <SectionLabel>{tagline}</SectionLabel>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 5.5vw, 3.2rem)',
            fontWeight: 600,
            color: 'white',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
          }}>
            {locale === 'ar' ? 'محامونا يقدمون دائماً ' : 'Our Attorneys Always Provide '}
            <br />
            <TypewriterText locale={locale} />
          </h1>
          <GoldDivider />
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.8,
            marginBottom: '2.75rem',
            maxWidth: '520px',
          }}>
            {sub}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href={ctaHref} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--color-accent)', color: 'var(--color-site-deep)',
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: '0.75rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', padding: '1rem 2.5rem',
              textDecoration: 'none', transition: 'background 0.2s',
            }}>
              {ctaLabel} →
            </Link>
            <Link href={cta2Href} style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'transparent', color: 'rgba(255,255,255,0.85)',
              fontFamily: 'var(--font-sans)', fontWeight: 500,
              fontSize: '0.75rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', padding: '1rem 2.5rem',
              textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)',
              transition: 'border-color 0.2s, color 0.2s',
            }}>
              {cta2Label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}