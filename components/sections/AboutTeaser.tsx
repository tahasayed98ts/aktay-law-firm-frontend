import Link from 'next/link';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import SlowTypewriter from '../ui/SlowTypewriter';
import Image from 'next/image';



interface Props {
  locale: string;
  label: string;
  heading: string;
  body: string;
  mission: string;
  values: string[];
  ctaLabel: string;
  ctaHref: string;
  experienceLabel: string;
  image?: string;
}

export default function AboutTeaser({ locale, label, body, mission, values, ctaLabel, ctaHref, experienceLabel, image = '/dar-mez.jpg' }: Props) {
  const isRtl = locale === 'ar';

  return (
    <section style={{ padding: '7rem 0', background: 'var(--color-site-dark)' }}>
      <div className="site-container">
        <div className="about-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}>
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5', background: 'var(--color-primary-dark)' }}>
              <Image
                src={image}
                alt="Law office"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover', opacity: 0.5, mixBlendMode: 'luminosity' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-site-dark) 0%, transparent 55%)' }} />
            </div>
            {/* Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-1.5rem',
              [isRtl ? 'left' : 'right']: '-1.5rem',
              background: 'var(--color-accent)',
              color: 'var(--color-site-deep)',
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              zIndex: 10,
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 700,
                lineHeight: 1,
              }}>
                20+
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.55rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginTop: '4px',
              }}>
                {experienceLabel}
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <SectionLabel>{label}</SectionLabel>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.9rem, 3vw, 2.8rem)',
              fontWeight: 600, color: 'white',
              lineHeight: 1.15, marginBottom: '0.75rem',
            }}>
              {locale === 'ar'
                ? <>ممارسة قانونية رائدة في القاهرة منذ <SlowTypewriter text="2004" /></>
                : <>A Leading Legal Practice in Cairo Since <SlowTypewriter text="2004" /></>
              }
            </h2>
            <GoldDivider />
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: '1.25rem', fontFamily: 'var(--font-sans)' }}>
              {body}
            </p>
            <blockquote style={{
              borderInlineStart: '2px solid var(--color-accent)',
              paddingInlineStart: '1.25rem',
              color: 'rgba(255,255,255,0.75)',
              fontStyle: 'italic',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              marginBottom: '2rem',
            }}>
              &ldquo;{mission}&rdquo;
            </blockquote>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {values.map(v => (
                <span key={v} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }} />
                  {v}
                </span>
              ))}
            </div>
            <Link href={ctaHref} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--color-accent)', color: 'var(--color-site-deep)',
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: '0.75rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', padding: '1rem 2.5rem',
              textDecoration: 'none',
            }}>
              {ctaLabel} →
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 5rem !important; }
        }
      `}</style>
    </section>
  );
}