const clientsRow1 = [
  { en: 'Akmy for Construction and Building',       ar: 'شركة اكمي للتشييد والبناء' },
  { en: 'Gold Star Man for Leather',                ar: 'شركة جولد ستار مان للجلود' },
  { en: 'Amlak Taiba for Construction',             ar: 'شركة املاك طيبة للإنشاءات' },
  { en: 'Konzonia Management and Engineering',      ar: 'شركة كونزونيا للاستشارات' },
  { en: 'Iconic Software and Integrated Solutions', ar: 'شركة أيكونك للبرمجيات' },
  { en: 'Ark International for Trading',            ar: 'شركة ارك الدولية للتجارة' },
  { en: 'iBuild Real Estate Development',           ar: 'شركة اي بيلد للتطوير العقاري' },
  { en: 'Dar Heliopolis for Engineering',           ar: 'شركة دار هليوبوليس للهندسة' },
  { en: 'Heliopower Technology HPT',                ar: 'شركة هليوباور تكنولوجي' },
  { en: 'Taiba for Import',                         ar: 'شركة طيبة للاستيراد' },
  { en: 'Cairo International Automobile Club',      ar: 'نادي القاهرة الدولي للسيارات' },
  { en: 'Gulf Union for Automotive',                ar: 'شركة اتحاد الخليج للسيارات' },
  { en: 'Talgo for Software',                       ar: 'شركة تالجو للبرمجيات' },
];

const clientsRow2 = [
  { en: 'Maaden Al-Andalus for Natural Resources',  ar: 'شركة معادن الاندلس للثروات الطبيعية' },
  { en: 'Maaden Misr for Natural Resources',        ar: 'شركة معادن مصر للثروات الطبيعية' },
  { en: 'Zahran for Manufacturing',                 ar: 'شركة زهران للتصنيع' },
  { en: 'Egyptian Office for Construction',         ar: 'المكتب المصري للإنشاءات' },
  { en: 'Zidni for Printing and Publishing',        ar: 'شركة زدني للطباعة والنشر' },
  { en: 'Abu Al-Naga Car for Trading',              ar: 'شركة ابو النجا لتجارة السيارات' },
  { en: 'Magenta for Wedding and Party Halls',      ar: 'شركة ماجينتا لتجهيز قاعات الأفراح' },
  { en: 'Java Beverage for Trading',                ar: 'شركة جافا لتجارة المواد الغذائية' },
  { en: 'Caesar for Manufacturing',                 ar: 'شركة سيزر للتصنيع' },
  { en: 'Zohoor for Natural and Dried Flowers',     ar: 'شركة زهور للزهور الطبيعية والمجففة' },
  { en: 'Flower Story',                             ar: 'شركة فلاور ستوري' },
  { en: 'Wadi El Nile Cement',                      ar: 'شركة وادي النيل للاسمنت' },
  { en: 'Heliopower Technology HPT',                ar: 'شركة هيليوباور تكنولوجي هبت' },
];

interface Props {
  locale: string;
  label?: string;
  heading?: string;
}

export default function ClientsMarquee({ locale, label, heading }: Props) {
  const isAr = locale === 'ar';
  const row1 = [...clientsRow1, ...clientsRow1];
  const row2 = [...clientsRow2, ...clientsRow2];

  const font = isAr ? "'Outfit', sans-serif" : "'Bungee', sans-serif";
  const fontSize = isAr ? '1rem' : '0.85rem';
  const fontWeight = isAr ? 500 : 400;

  return (
    <section style={{
      padding: '5rem 0',
      background: 'var(--color-site-deep)',
      borderTop: '1px solid rgba(233,206,139,0.08)',
      borderBottom: '1px solid rgba(233,206,139,0.08)',
      /* Force LTR on the entire section so marquee works in both locales */
      direction: 'ltr',
    }}>

      {/* Header — restore RTL for Arabic text */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        direction: isAr ? 'rtl' : 'ltr',
      }}>
        <span style={{
          display: 'inline-block',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: '1rem',
        }}>
          {label || (isAr ? 'عملاؤنا' : 'Our Clients')}
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
          fontWeight: 600,
          color: 'white',
          lineHeight: 1.2,
        }}>
          {heading || (isAr ? 'شركاء نجاحنا' : 'Trusted by Leading Companies')}
        </h2>
        <div style={{
          width: '48px', height: '2px',
          background: 'var(--color-accent)',
          margin: '1.25rem auto 0',
        }} />
      </div>

      {/* Row 1 — scrolls left, faster */}
      <div style={{ marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(to right, var(--color-site-deep), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(to left, var(--color-site-deep), transparent)',
          pointerEvents: 'none',
        }} />
        <div className="marquee-track marquee-left">
          {row1.map((client, i) => (
            <div key={i} className="marquee-item">
              <span style={{
                fontFamily: font,
                fontSize,
                fontWeight,
                color: 'rgba(255,255,255,0.75)',
                letterSpacing: isAr ? '0.01em' : '0.03em',
              }}>
                {isAr ? client.ar : client.en}
              </span>
              <span className="marquee-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right, slower */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(to right, var(--color-site-deep), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(to left, var(--color-site-deep), transparent)',
          pointerEvents: 'none',
        }} />
        <div className="marquee-track marquee-right">
          {row2.map((client, i) => (
            <div key={i} className="marquee-item">
              <span style={{
                fontFamily: font,
                fontSize,
                fontWeight,
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: isAr ? '0.01em' : '0.03em',
              }}>
                {isAr ? client.ar : client.en}
              </span>
              <span className="marquee-dot" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          direction: ltr;
        }
        .marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .marquee-right {
          animation: marquee-right 60s linear infinite;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 0 2rem;
          white-space: nowrap;
        }
        .marquee-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-accent);
          opacity: 0.5;
          flex-shrink: 0;
          display: inline-block;
        }
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-left, .marquee-right { animation: none !important; }
        }
      `}</style>
    </section>
  );
}