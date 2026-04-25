
import Image from 'next/image';
import { getTranslations } from '../../../lib/i18n';
import { localePath } from '../../../lib/navigation';
import PageHeader from '../../../components/ui/PageHeader';
import SectionLabel from '../../../components/ui/SectionLabel';
import GoldDivider from '../../../components/ui/GoldDivider';
import CtaBanner from '../../../components/sections/CtaBanner';
import { getPageContent, pick, pickImage } from '../../../lib/pageContent';

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
    title: buildTitle(isAr ? 'من نحن' : 'About Us', locale),
    description: isAr
      ? 'تعرف على مكتب أكتاي للمحاماة — ممارسة قانونية رائدة في القاهرة منذ 2004 بقيادة المحامي أحمد إبراهيم البدري.'
      : 'Learn about Aktay Law Firm — a leading legal practice in Cairo since 2004, founded by Ahmed Ibrahim El-Badry.',
    alternates: { canonical: `${siteConfig.url}/${locale}/about` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t  = getTranslations(locale);
  const lp = (p: string) => localePath(locale, p);
  const isRtl = locale === 'ar';

  const content = await getPageContent();
  const p = (key: string, fallback: string) => pick(content, key, locale, fallback);



  const values = [
    {
      icon: '⚖️',
      title: locale === 'ar' ? 'النزاهة' : 'Integrity',
      desc:  locale === 'ar'
        ? 'نلتزم بأعلى معايير الأخلاق المهنية في كل ما نقوم به.'
        : 'We uphold the highest ethical standards in everything we do.',
    },
    {
      icon: '🏆',
      title: locale === 'ar' ? 'التميز' : 'Excellence',
      desc:  locale === 'ar'
        ? 'نسعى لتحقيق أفضل النتائج الممكنة لكل عميل.'
        : 'We strive to achieve the best possible outcomes for every client.',
    },
    {
      icon: '🤝',
      title: locale === 'ar' ? 'الشراكة' : 'Partnership',
      desc:  locale === 'ar'
        ? 'نبني علاقات قائمة على الثقة والشفافية مع عملائنا.'
        : 'We build relationships grounded in trust and transparency.',
    },
    {
      icon: '💡',
      title: locale === 'ar' ? 'الابتكار' : 'Innovation',
      desc:  locale === 'ar'
        ? 'نجمع بين الخبرة القانونية التقليدية والاستراتيجيات الحديثة.'
        : 'We combine traditional legal expertise with modern strategies.',
    },
  ];

  const team = [
    {
      name:  'Ahmed Ibrahim El-Badry',
      role:  locale === 'ar' ? 'المؤسس والمحامي الرئيسي' : 'Founder & Senior Partner',
      bio:   locale === 'ar'
        ? 'أسس المكتب عام 2004 بخبرة تمتد لأكثر من عقدين في القانون المدني والتجاري.'
        : 'Founded the firm in 2004 with over two decades of expertise in civil and commercial law.',
    },
    {
      name:  locale === 'ar' ? 'فريق المحامين' : 'Our Legal Team',
      role:  locale === 'ar' ? 'محامون متخصصون' : 'Specialist Attorneys',
      bio:   locale === 'ar'
        ? 'فريق من المحامين المتخصصين في مختلف مجالات القانون المصري والدولي.'
        : 'A team of attorneys specialized across Egyptian and international law practice areas.',
    },
  ];

  return (
    <>
      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: '160px', paddingBottom: '80px',
        background: `linear-gradient(135deg, rgba(13,30,36,0.98) 0%, rgba(59,91,102,0.6) 100%),
          url('${pickImage(content, 'image.about.hero.bg', 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1600')}') center/cover no-repeat`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          [isRtl ? 'right' : 'left']: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)',
        }} />
        <div className="site-container">
          <SectionLabel>{locale === 'ar' ? 'من نحن' : 'About Us'}</SectionLabel>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 600, color: 'white',
            lineHeight: 1.1, marginBottom: '1.25rem', maxWidth: '680px',
          }}>
            {locale === 'ar' ? 'ممارسة قانونية رائدة في القاهرة منذ 2004' : 'A Leading Legal Practice in Cairo Since 2004'}
          </h1>
          <GoldDivider />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '540px', lineHeight: 1.8, fontFamily: 'var(--font-sans)' }}>
            {locale === 'ar'
              ? 'أسسه المحامي أحمد إبراهيم البدري، ورسّخ مكتب أكتاي للمحاماة مكانته كمزود متميز للخدمات القانونية.'
              : 'Founded by Ahmed Ibrahim El-Badry, Aktay Law Firm has established itself as a premier provider of legal services in Egypt.'}
          </p>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 0', background: 'var(--color-site-dark)' }}>
        <div className="site-container">
          <div className="story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <SectionLabel>{locale === 'ar' ? 'قصتنا' : 'Our Story'}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', fontWeight: 600, color: 'white', lineHeight: 1.15, marginBottom: '0.75rem' }}>
                {locale === 'ar' ? 'بداية مسيرتنا' : 'The Beginning of Our Journey'}
              </h2>
              <GoldDivider />
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: '1.5rem', fontFamily: 'var(--font-sans)' }}>
                {locale === 'ar'
                  ? 'تأسس مكتب أكتاي للمحاماة عام 2004 على يد المحامي أحمد إبراهيم البدري في القاهرة، مصر. بدأ المكتب بفريق صغير من المحامين المتخصصين، وسرعان ما نما ليصبح أحد المكاتب القانونية الرائدة في مصر.'
                  : 'Aktay Law Firm was founded in 2004 by Ahmed Ibrahim El-Badry in Cairo, Egypt. Starting with a small team of specialist attorneys, the firm quickly grew to become one of Egypt\'s leading legal practices.'}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, fontFamily: 'var(--font-sans)' }}>
                {locale === 'ar'
                  ? 'نؤمن بأن كل عميل يستحق التمثيل القانوني الأفضل، ونلتزم بتقديم خدمات مخصصة تلبي احتياجات كل حالة على حدة.'
                  : 'We believe every client deserves the best legal representation, and we are committed to delivering personalized service tailored to each unique situation.'}
              </p>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: 'var(--color-primary-dark)' }}>
                <Image
                  src={pickImage(content, 'image.about.story', 'https://images.unsplash.com/photo-1453906971074-ce568cccbc63?w=900')}
                  alt="Cairo courthouse"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover', opacity: 0.55, mixBlendMode: 'luminosity' }}
                />
              </div>
              <div style={{
                position: 'absolute', [isRtl ? 'right' : 'left']: '-1.5rem', bottom: '-1.5rem',
                border: '1px solid rgba(233,206,139,0.2)',
                padding: '1.5rem 2rem',
              }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent)', lineHeight: 1 }}>2004</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                  {locale === 'ar' ? 'سنة التأسيس' : 'Year Founded'}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`.story-grid { @media (max-width: 900px) { grid-template-columns: 1fr !important; gap: 4rem !important; } }`}</style>
      </section>

      {/* ── Mission ───────────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 0', background: 'var(--color-site-card)' }}>
        <div className="site-container">
          <PageHeader
            label={locale === 'ar' ? 'مهمتنا' : 'Our Mission'}
            title={locale === 'ar' ? 'رسالتنا وفلسفتنا' : 'Our Mission & Philosophy'}
            center
          />
          <div style={{
            maxWidth: '760px', margin: '0 auto',
            background: 'var(--color-site-dark)',
            
            padding: '3rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>⚖️</div>
            <blockquote style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              color: 'rgba(255,255,255,0.9)',
              fontStyle: 'italic',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}>
              &quot;{locale === 'ar'
                ? 'مهمتنا هي تقديم خدمات قانونية عالية الجودة مع الحفاظ على أعلى المعايير الأخلاقية — مع الاهتمام الشخصي بكل عميل.'
                : 'Our mission is to deliver high-quality legal services while upholding the highest ethical standards — providing personalized attention to every client.'}&quot;
            </blockquote>
            <div style={{ width: '48px', height: '2px', background: 'var(--color-accent)', margin: '0 auto' }} />
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 0', background: 'var(--color-site-dark)' }}>
        <div className="site-container">
          <PageHeader
            label={locale === 'ar' ? 'قيمنا' : 'Our Values'}
            title={locale === 'ar' ? 'ما يميزنا' : 'What Sets Us Apart'}
            center
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' ,  }} className="values-grid">
            {values.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: 'var(--color-site-card)',
                borderRadius: '12px',
                padding: '2.25rem',
                display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
              }}>
                <div style={{
                  fontSize: '1.75rem', flexShrink: 0,
                  width: '56px', height: '56px',
                  background: 'rgba(233,206,139,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>
                    {title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 700px) { .values-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 900px) { .story-grid { grid-template-columns: 1fr !important; gap: 4rem !important; } }
        `}</style>
      </section>

      {/* ── Team ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 0', background: 'var(--color-site-card)' }}>
        <div className="site-container">
          <PageHeader
            label={locale === 'ar' ? 'فريقنا' : 'Our Team'}
            title={locale === 'ar' ? 'فريق قانوني متخصص' : 'Experienced Legal Professionals'}
            center
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', maxWidth: '800px', margin: '0 auto' }} className="team-grid">
            {team.map(({ name, role, bio }) => (
              <div key={name} style={{
                background: 'var(--color-site-dark)',
                
                padding: '2.5rem',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'var(--color-primary)',
                  border: '2px solid var(--color-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-accent)',
                }}>
                  ⚖
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: 'white', marginBottom: '0.35rem' }}>
                  {name}
                </h3>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '1rem' }}>
                  {role}
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                  {bio}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 600px) { .team-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <CtaBanner
        heading={locale === 'ar' ? 'هل تحتاج إلى استشارة قانونية؟' : 'Ready to Work With Us?'}
        sub={locale === 'ar' ? 'تواصل معنا اليوم لجدولة استشارتك.' : 'Contact us today to schedule your consultation.'}
        ctaLabel={t('nav.appointment')}
        ctaHref={lp('/contact')}
      />
    </>
  );
}