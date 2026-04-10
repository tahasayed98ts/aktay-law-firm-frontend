import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../globals.css';

const locales = ['en', 'ar'];

export const metadata: Metadata = {
  title: 'Aktay Law Firm — Where Justice Meets Innovation',
  description: 'Professional legal counsel in Cairo, Egypt. Corporate, litigation, real estate, family law, and more.',
};

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
      <Navbar locale={locale} />
      <main className="max-w-7xl mx-auto px-6">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}