import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageLoader from '../../components/ui/PageLoader';
import FloatingMenu from '../../components/ui/FloatingMenu';
import { siteConfig } from '../../lib/metadata';
import '../globals.css';

const locales = ['en', 'ar'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    alternates: {
      canonical:  `${siteConfig.url}/${locale}`,
      languages: {
        'en': `${siteConfig.url}/en`,
        'ar': `${siteConfig.url}/ar`,
      },
    },
    openGraph: {
      locale: isAr ? 'ar_EG' : 'en_US',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  return (
    <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <PageLoader />
      <Navbar locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <FloatingMenu locale={locale} />
    </div>
  );
}