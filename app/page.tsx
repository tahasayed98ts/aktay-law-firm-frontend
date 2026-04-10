import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('nav');
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome to the Law Firm</h1>
      <nav style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <span>{t('home')}</span>
        <span>{t('about')}</span>
        <span>{t('services')}</span>
        <span>{t('blog')}</span>
        <span>{t('contact')}</span>
      </nav>
    </main>
  );
}