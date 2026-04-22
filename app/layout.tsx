import type { Metadata } from 'next';
import './globals.css';
import GavelCursor from '../components/ui/GavelCursor';
import { siteConfig } from '../lib/metadata';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Aktay Law Firm — Where Justice Meets Innovation | Cairo, Egypt',
    template: '%s | Aktay Law Firm',
  },
  description: 'Aktay Law Firm delivers expert legal services in Cairo, Egypt across corporate law, real estate, family law, labor law, criminal defense, and more. Founded 2004.',
  keywords: ['law firm Cairo', 'lawyer Egypt', 'legal services Cairo', 'corporate law Egypt', 'family lawyer Cairo', 'مكتب محاماة القاهرة', 'محامي مصر'],
  authors: [{ name: 'Aktay Law Firm' }],
  creator: 'Aktay Law Firm',
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type:   'website',
    locale: 'en_US',
    url:    siteConfig.url,
    siteName: siteConfig.name,
    title:    'Aktay Law Firm — Where Justice Meets Innovation',
    description: 'Expert legal counsel in Cairo, Egypt. Corporate, real estate, family, labor, and criminal law since 2004.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aktay Law Firm' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Aktay Law Firm — Cairo, Egypt',
    description: 'Expert legal counsel in Cairo, Egypt since 2004.',
    images:      ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <GavelCursor />
        {children}
      </body>
    </html>
  );
}