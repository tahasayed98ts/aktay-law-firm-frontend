import Link from 'next/link';
import PageHeader from '../ui/PageHeader';

import {
  Scale, Landmark, Home, Users, Briefcase,
  Copyright, Shield, FileText, ShieldCheck,
} from 'lucide-react';

const serviceIcons = {
  s1: Scale,
  s2: Landmark,
  s3: Home,
  s4: Users,
  s5: Briefcase,
  s6: Copyright,
  s7: Shield,
  s8: FileText,
  s9: ShieldCheck,
};

interface Service { key: string; title: string; desc: string; }

interface Props {
  label: string;
  heading: string;
  subtitle: string;
  services: Service[];
  ctaLabel: string;
  ctaHref: string;
}

export default function ServicesGrid({ label, heading, subtitle, services, ctaLabel, ctaHref }: Props) {
  return (
    <section style={{ padding: '7rem 0', background: 'var(--color-site-card)', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative background icon */}
      <div className="services-bg-icon-right">
        <Scale size={600} strokeWidth={0.25} color="rgba(233,206,139,0.04)" />
      </div>
      <div className="services-bg-icon-left">
        <Scale size={600} strokeWidth={0.25} color="rgba(233,206,139,0.04)" />
      </div>

      <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader label={label} title={heading} subtitle={subtitle} center />

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {services.map(({ key, title, desc }) => {
            const Icon = serviceIcons[key as keyof typeof serviceIcons];
            return (
              <div key={key} className="service-card" style={{
                background: 'var(--color-site-dark)',
                textAlign: 'center',
                borderRadius: '8px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}>
                {/* Icon box */}
                <div style={{
                  width: '48px', height: '48px',
                  background: 'rgba(233,206,139,0.08)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}>
                  <Icon size={22} color="var(--color-accent)" strokeWidth={1.5} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.2rem', fontWeight: 600,
                  color: 'white', marginBottom: '0.6rem',
                  transition: 'color 0.3s ease',
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.7,
                }}>
                  {desc}
                </p>

                {/* Bottom accent line */}
                <div className="card-accent" style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: '0', height: '2px',
                  background: 'var(--color-accent)',
                  transition: 'width 0.4s ease',
                }} />
              </div>
            );
          })}
        </div>

        <div className="services-cta" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href={ctaHref} className="services-cta-link" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'transparent', color: 'rgba(255,255,255,0.85)',
            fontFamily: 'var(--font-sans)', fontWeight: 500,
            fontSize: '0.75rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', padding: '1rem 2.5rem',
            textDecoration: 'none', border: '2px solid rgba(255,255,255,0.2)',
            transition: 'border-color 0.3s ease, color 0.3s ease',
            borderRadius: '10px',
          }}>
            {ctaLabel}
          </Link>
        </div>
      </div>

      <style>{`
        .services-bg-icon-right {
          position: absolute;
          top: -80px;
          right: -150px;
          animation: scaleRotate 20s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        .services-bg-icon-left {
          position: absolute;
          bottom: -80px;
          left: -150px;
          animation: scaleRotate 24s linear infinite reverse;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes scaleRotate {
          0%   { transform: rotate(0deg); }
          50%  { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg); }
        }

        .services-grid { grid-template-columns: repeat(3,1fr); }
        @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr !important; } }

        .service-card:hover { transform: translateY(-4px); border-color: rgba(233,206,139,0.3) !important; }
        .service-card:hover .card-accent { width: 100% !important; }
        .service-card:hover h3 { color: var(--color-accent) !important; }

        .services-cta-link:hover {
          color: var(--color-accent) !important;
          border-color: var(--color-accent) !important;
        }
      `}</style>
    </section>
  );
}