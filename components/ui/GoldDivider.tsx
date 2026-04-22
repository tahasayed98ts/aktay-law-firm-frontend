export default function GoldDivider({ center = false }: { center?: boolean }) {
  return (
    <div style={{
      width: '48px',
      height: '2px',
      background: 'var(--color-accent)',
      margin: center ? '0 auto 1.5rem' : '0 0 1.5rem',
    }} />
  );
}