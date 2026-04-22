import { getPageContent, pickImage } from '../../../lib/pageContent';
import JoinUsClient from './JoinUsClient';

import type { Metadata } from 'next';
import { siteConfig, buildTitle } from '../../../lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: buildTitle(isAr ? 'انضم إلى فريقنا' : 'Join Our Team', locale),
    description: isAr
      ? 'انضم إلى مكتب أكتاي للمحاماة — نبحث دائماً عن متخصصين قانونيين موهوبين.'
      : 'Join Aktay Law Firm — we are always looking for talented legal professionals.',
    alternates: { canonical: `${siteConfig.url}/${locale}/join-us` },
  };
}

export default async function JoinUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = await getPageContent();

  return (
    <JoinUsClient
      locale={locale}
      bgImage={pickImage(content, 'image.joinus.hero.bg', 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=1600')}
    />
  );
}