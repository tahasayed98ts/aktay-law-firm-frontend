import { getTranslations } from '../../lib/i18n';
import { localePath } from '../../lib/navigation';
import { getPageContent, pick, pickImage } from '../../lib/pageContent';
import HeroSection    from '../../components/sections/HeroSection';
import StatsSection   from '../../components/sections/StatsSection';
import AboutTeaser    from '../../components/sections/AboutTeaser';
import ServicesGrid   from '../../components/sections/ServicesGrid';
import CtaBanner from '../../components/sections/CtaBanner';

import type { Metadata } from 'next';
import { siteConfig } from '../../lib/metadata';

import { OrganizationJsonLd } from '../../components/seo/JsonLd';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'مكتب أكتاي للمحاماة — حيث يلتقي العدل بالابتكار'
      : 'Aktay Law Firm — Where Justice Meets Innovation | Cairo',
    description: isAr
      ? 'مكتب أكتاي للمحاماة يقدم استشارات قانونية متخصصة في القاهرة، مصر. تأسس عام 2004. نخدم في القانون التجاري، العقاري، الأسري، العمالي، والجنائي.'
      : 'Aktay Law Firm delivers expert legal counsel in Cairo, Egypt since 2004. Corporate, real estate, family, labor, and criminal law.',
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        'en': `${siteConfig.url}/en`,
        'ar': `${siteConfig.url}/ar`,
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t       = getTranslations(locale);
  const lp      = (path: string) => localePath(locale, path);
  const content = await getPageContent();
  const p       = (key: string, fallback: string) => pick(content, key, locale, fallback);

  return (
    <>
    <OrganizationJsonLd />
      <HeroSection
        locale={locale}
        tagline={p('home.hero.tagline',  t('hero.tagline'))}
        heading={p('home.hero.heading',  t('hero.heading'))}
        sub={p('home.hero.sub',          t('hero.sub'))}
        ctaLabel={p('home.hero.cta',     t('hero.cta'))}
        ctaHref={lp('/contact')}
        cta2Label={p('home.hero.cta2',   t('hero.cta2'))}
        cta2Href={lp('/services')}
        bgImage={pickImage(content, 'image.hero.bg', '/court.jpg')}
      />

      <StatsSection stats={[
        { val: p('home.stats.foundedVal',   t('stats.foundedVal')),   label: p('home.stats.founded',   t('stats.founded')) },
        { val: p('home.stats.casesVal',     t('stats.casesVal')),     label: p('home.stats.cases',     t('stats.cases')) },
        { val: p('home.stats.areasVal',     t('stats.areasVal')),     label: p('home.stats.areas',     t('stats.areas')) },
        { val: p('home.stats.countriesVal', t('stats.countriesVal')), label: p('home.stats.countries', t('stats.countries')) },
        { val: p('home.stats.clientsVal',   t('stats.clientsVal')),   label: p('home.stats.clients',   t('stats.clients')) },
      ]} />

      <AboutTeaser
        locale={locale}
        label={p('home.about.label',        t('about.label'))}
        heading={p('home.about.heading',    t('about.heading'))}
        body={p('home.about.body',          t('about.body'))}
        mission={p('home.about.mission',    t('about.mission'))}
        values={[
          p('home.about.val1', t('about.val1')),
          p('home.about.val2', t('about.val2')),
          p('home.about.val3', t('about.val3')),
        ]}
        ctaLabel={p('home.about.cta',       t('about.cta'))}
        ctaHref={lp('/about')}
        experienceLabel={p(
          'home.about.experienceLbl',
          locale === 'ar' ? 'سنوات الخبرة' : 'Years Experience'
        )}
        image={pickImage(content, 'image.about.teaser', '/dar-mez.jpg')}
      />

      <ServicesGrid
        label={p('home.services.label',     t('services.label'))}
        heading={p('home.services.heading', t('services.heading'))}
        subtitle={p('home.services.sub',    t('services.sub'))}
        services={[
          { key: 's1', title: p('home.services.s1',  t('services.s1')),  desc: p('home.services.s1d', t('services.s1d')) },
          { key: 's2', title: p('home.services.s2',  t('services.s2')),  desc: p('home.services.s2d', t('services.s2d')) },
          { key: 's3', title: p('home.services.s3',  t('services.s3')),  desc: p('home.services.s3d', t('services.s3d')) },
          { key: 's4', title: p('home.services.s4',  t('services.s4')),  desc: p('home.services.s4d', t('services.s4d')) },
          { key: 's5', title: p('home.services.s5',  t('services.s5')),  desc: p('home.services.s5d', t('services.s5d')) },
          { key: 's6', title: p('home.services.s6',  t('services.s6')),  desc: p('home.services.s6d', t('services.s6d')) },
          { key: 's7', title: p('home.services.s7',  t('services.s7')),  desc: p('home.services.s7d', t('services.s7d')) },
          { key: 's8', title: p('home.services.s8',  t('services.s8')),  desc: p('home.services.s8d', t('services.s8d')) },
          { key: 's9', title: p('home.services.s9',  t('services.s9')),  desc: p('home.services.s9d', t('services.s9d')) },
        ]}
        ctaLabel={p('home.services.cta',    t('services.cta'))}
        ctaHref={lp('/services')}
      />

      <CtaBanner
        heading={p('home.cta.heading', locale === 'ar'
          ? 'هل تحتاج إلى استشارة قانونية؟'
          : 'Need Legal Guidance?'
        )}
        sub={p('home.cta.sub', locale === 'ar'
          ? 'تواصل معنا اليوم لجدولة استشارتك المجانية.'
          : 'Contact us today to schedule your free consultation.'
        )}
        ctaLabel={p('nav.appointment', t('nav.appointment'))}
        ctaHref={lp('/contact')}
      />
    </>
  );
}