import SectionLabel from './SectionLabel';
import GoldDivider from './GoldDivider';

interface Props {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function PageHeader({ label, title, subtitle, center = false }: Props) {
  return (
    <div style={{ textAlign: center ? 'center' : 'start', marginBottom: '3.5rem' }}>
      <SectionLabel>{label}</SectionLabel>
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(2rem, 3vw, 2.8rem)',
        fontWeight: 600,
        color: 'white',
        lineHeight: 1.15,
        marginBottom: '0.75rem',
      }}>
        {title}
      </h2>
      <GoldDivider center={center} />
      {subtitle && (
        <p style={{
          color: 'rgba(255,255,255,0.55)',
          fontFamily: 'var(--font-sans)',
          maxWidth: '500px',
          margin: center ? '0 auto' : undefined,
          lineHeight: 1.75,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}