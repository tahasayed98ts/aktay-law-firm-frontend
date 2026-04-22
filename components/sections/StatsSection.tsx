import AnimatedCounter from '../ui/AnimatedCounter';


interface Stat { val: string; label: string; }

export default function StatsSection({ stats }: { stats: Stat[] }) {
  return (
    <section style={{ background: 'var(--color-primary)', padding: '3.5rem 0' }}>
      <div className="site-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1rem',
          textAlign: 'center',
        }}>
          {stats.map(({ val, label }, i) => (
            <div key={i}>
              <AnimatedCounter
                value={val}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.4rem, 3vw, 3rem)',
                  fontWeight: 700,
                  color: 'var(--color-accent)',
                  lineHeight: 1,
                }}
              />
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.5rem, 1.2vw, 0.7rem)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                marginTop: '0.5rem',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}