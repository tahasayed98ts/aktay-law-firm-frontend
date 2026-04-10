import Link from 'next/link';
import { getTranslations } from '../../lib/i18n';
import { localePath } from '../../lib/navigation';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t  = getTranslations(locale);
  const lp = (p: string) => localePath(locale, p);

  const services = [
    { key: 's1', icon: '⚖️' },
    { key: 's2', icon: '🏛️' },
    { key: 's3', icon: '🏠' },
    { key: 's4', icon: '👨‍👩‍👧' },
    { key: 's5', icon: '💼' },
    { key: 's6', icon: '©️' },
    { key: 's7', icon: '🔒' },
    { key: 's8', icon: '📋' },
    { key: 's9', icon: '🛡️' },
  ];

  const stats = [
    { val: t('stats.foundedVal'),  label: t('stats.founded') },
    { val: t('stats.casesVal'),    label: t('stats.cases') },
    { val: t('stats.areasVal'),    label: t('stats.areas') },
    { val: t('stats.clientsVal'),  label: t('stats.clients') },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(13,30,36,0.96) 0%, rgba(59,91,102,0.75) 100%),
            url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gold left border accent */}
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-accent to-transparent" />

        <div className="max-w-7xl mx-auto px-6 w-full pt-28 pb-20">
          <div className="max-w-2xl">
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
              {t('hero.tagline')}
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-6">
              {t('hero.heading')}
            </h1>
            <div className="w-12 h-0.5 bg-accent mb-6" />
            <p className="font-sans text-base text-white/60 leading-relaxed mb-10 max-w-lg">
              {t('hero.sub')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={lp('/contact')}
                className="inline-flex items-center gap-2 bg-accent text-dark-deep font-sans font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-accent-dark transition-colors no-underline">
                {t('hero.cta')} →
              </Link>
              <Link href={lp('/services')}
                className="inline-flex items-center gap-2 bg-transparent text-white font-sans font-medium text-xs tracking-widest uppercase px-8 py-4 border border-white/30 hover:border-accent hover:text-accent transition-colors no-underline">
                {t('hero.cta2')}
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-accent/5 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full border border-accent/8 pointer-events-none" />
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-6">   {/* ← add this wrapper */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ val, label }) => (
              <div key={label}>
                <div className="font-serif text-4xl font-bold text-accent leading-none">{val}</div>
                <div className="font-sans text-xs tracking-[0.12em] uppercase text-white/60 mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About teaser ──────────────────────────────────────────────── */}
      <section className="py-24 bg-dark"
        style={{
          backgroundImage: `linear-gradient(rgba(13,30,36,0.92), rgba(13,30,36,0.92)),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e9ce8b' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Image side */}
            <div className="relative">
              <div className="relative overflow-hidden aspect-[4/5] bg-primary-dark">
                <img
                  src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800"
                  alt="Law office"
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
              </div>
              {/* Gold stat box */}
              <div className={`absolute -bottom-5 ${locale === 'ar' ? '-left-5' : '-right-5'} bg-accent text-dark-deep px-7 py-5 text-center`}>
                <div className="font-serif text-4xl font-bold leading-none">20+</div>
                <div className="font-sans text-[10px] tracking-[0.12em] uppercase font-semibold mt-1">
                  {locale === 'ar' ? 'سنوات الخبرة' : 'Years Experience'}
                </div>
              </div>
            </div>

            {/* Text side */}
            <div>
              <span className="inline-block font-sans text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
                {t('about.label')}
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight mb-4">
                {t('about.heading')}
              </h2>
              <div className="w-12 h-0.5 bg-accent mb-6" />
              <p className="text-white/60 leading-relaxed mb-5">{t('about.body')}</p>
              <blockquote className={`border-accent text-white/75 italic leading-relaxed mb-8 px-4 py-1 ${
                locale === 'ar' ? 'border-r-2 pr-4' : 'border-l-2 pl-4'
              }`}>
                "{t('about.mission')}"
              </blockquote>

              <div className="flex gap-6 mb-10 flex-wrap">
                {['val1','val2','val3'].map(v => (
                  <div key={v} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="font-sans text-sm text-white/80">{t(`about.${v}`)}</span>
                  </div>
                ))}
              </div>

              <Link href={lp('/about')}
                className="inline-flex items-center gap-2 bg-accent text-dark-deep font-sans font-semibold text-xs tracking-widest uppercase px-8 py-4 hover:bg-accent-dark transition-colors no-underline">
                {t('about.cta')} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services grid ─────────────────────────────────────────────── */}
      <section className="py-24 bg-dark-card">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
              {t('services.label')}
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mb-4">{t('services.heading')}</h2>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
            <p className="text-white/50 max-w-md mx-auto font-sans">{t('services.sub')}</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ key, icon }) => (
              <div key={key}
                className="group relative bg-dark border border-accent/10 p-8 overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:border-accent/30">
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-serif text-xl text-white mb-2">{t(`services.${key}`)}</h3>
                <p className="font-sans text-sm text-white/50 leading-relaxed">{t(`services.${key}d`)}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={lp('/services')}
              className="inline-flex items-center gap-2 bg-transparent text-white font-sans font-medium text-xs tracking-widest uppercase px-8 py-4 border border-white/20 hover:border-accent hover:text-accent transition-colors no-underline">
              {t('services.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl text-white mb-4">
            {locale === 'ar' ? 'هل تحتاج إلى استشارة قانونية؟' : 'Need Legal Guidance?'}
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-white/70 mb-10 font-sans max-w-lg mx-auto">
            {locale === 'ar'
              ? 'تواصل معنا اليوم لجدولة استشارتك المجانية.'
              : 'Contact us today to schedule your free consultation.'}
          </p>
          <Link href={lp('/contact')}
            className="inline-flex items-center gap-2 bg-accent text-dark-deep font-sans font-semibold text-xs tracking-widest uppercase px-10 py-4 hover:bg-accent-dark transition-colors no-underline">
            {t('nav.appointment')} →
          </Link>
        </div>
      </section>
    </>
  );
}