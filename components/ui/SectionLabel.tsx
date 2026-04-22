export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.7rem',
      fontWeight: 700,
      letterSpacing: '0.22em',
      textTransform: 'uppercase' as const,
      color: 'var(--color-accent)',
      marginBottom: '0.75rem',
    }}>
      {children}
    </span>
  );
}