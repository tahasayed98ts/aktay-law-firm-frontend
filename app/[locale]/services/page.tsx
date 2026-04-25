import { getTranslations } from '../../../lib/i18n';
import { localePath } from '../../../lib/navigation';
import SectionLabel from '../../../components/ui/SectionLabel';
import GoldDivider from '../../../components/ui/GoldDivider';
import CtaBanner from '../../../components/sections/CtaBanner';
import { getPageContent, pickImage } from '../../../lib/pageContent';
import {
  Building2, Home, Gavel, Users, Briefcase,
  Scale, Shield, ScrollText, Globe,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ServiceSubDetail {
  text:      string;
  arrows?:   string[];
}

interface ServiceDetail {
  heading:  string;
  bullets:  ServiceSubDetail[];
}

interface Service {
  key:     string;
  icon:    LucideIcon;
  title:   string;
  desc:    string;
  details: (string | ServiceDetail)[];
  numbered?: boolean;
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t     = getTranslations(locale);
  const lp    = (p: string) => localePath(locale, p);
  const isRtl = locale === 'ar';

  const content = await getPageContent();

  const services: Service[] = [
    {
      key: 's1', icon: Building2, numbered: true,
      title: locale === 'ar' ? 'خدمات التعاون' : 'Corporate Services',
      desc:  locale === 'ar'
        ? 'تأسيس الشركات بكافة أنواعها وأنماطها وفقاً لجميع القوانين داخل جمهورية مصر العربية وخارجها.'
        : 'Establishing and incorporating all types and forms of companies, in accordance with all applicable laws both inside and outside the Arab Republic of Egypt.',
      details: locale === 'ar'
        ? [
            'تأسيس الشركات بكافة أنواعها وأنماطها وفقاً لجميع القوانين داخل جمهورية مصر العربية وخارجها',
            'تقديم كافة الخدمات بعد التأسيس التي تشمل أعمال التأمينات الاجتماعية والقيد بالغرف التجارية والصناعية والتعامل مع الهيئة العامة للتنمية الصناعية والاتحاد المصري لمقاولي التشييد والبناء والهيئة العامة للرقابة المالية وشركة مصر للمقاصة والإيداع المركزي وبورصة الأوراق المالية ومصلحة الجمارك المصرية وكافة المنافذ والموانئ المصرية فضلاً عن جميع المنازعات التي تخص الشركات المحلي منها والدولي',
            'تسجيل العلامات التجارية وبراءة الاختراع داخل وخارج جمهورية مصر العربية وتقديم جميع الاستشارات القانونية في كافة فروع القانون',
          ]
        : [
            'Establishing and incorporating all types and forms of companies, in accordance with all applicable laws both inside and outside the Arab Republic of Egypt.',
            {
              heading: 'Comprehensive Post-Incorporation Services:',
              bullets: [
                { text: 'Providing all necessary services after company formation, which include:' },
                { text: 'Handling social insurance procedures.' },
                { text: 'Registration with commercial and industrial chambers.' },
                {
                  text: 'Representing clients and managing transactions with key authorities, including:',
                  arrows: [
                    'The Industrial Development Authority (IDA)',
                    'The Egyptian Federation for Construction and Building Contractors',
                    'The Financial Regulatory Authority (FRA)',
                    'Misr for Central Clearing, Depository and Registry (MCDR)',
                    'The Egyptian Exchange (EGX)',
                    'The Egyptian Customs Authority, as well as all Egyptian ports and border outlets.',
                  ],
                },
                { text: 'Handling and resolving all corporate disputes, both domestic and international.' },
              ],
            },
            'Registration of trademarks and patents both inside and outside the Arab Republic of Egypt, in addition to providing comprehensive legal consultancy across all branches of law.',
          ],
        },
    {
      key: 's2', icon: Home,
      title: locale === 'ar' ? 'الخدمات العقارية' : 'Real Estate Services',
      desc:  locale === 'ar'
        ? 'تقديم كافة الخدمات التي تخص العقارات سواء الأراضي أو المباني.'
        : 'Providing comprehensive real estate services for both lands and buildings.',
      details: locale === 'ar'
        ? [
            'تقديم كافة الخدمات التي تخص العقارات سواء الأراضي أو المباني',
            'تسجيل العقارات أمام مصلحة الشهر العقاري داخل وخارج المدن الجديدة',
            'الحصول على الإعفاءات الضريبية في شأن بعض العقارات وخاصةً الضرائب العقارية وضريبة التصرفات العقارية',
            'التعامل مع أجهزة المدن الجديدة وهيئة المجتمعات العمرانية فيما يخص رد ما تم سداده بدون وجه حق للدولة',
            'إعداد ومراجعة جميع العقود التي تخص العقارات',
          ]
        : [
            'Providing comprehensive real estate services for both lands and buildings',
            'Registering properties at the Real Estate Registry, both within and outside new cities',
            'Obtaining tax exemptions for certain properties, particularly regarding real estate taxes and property disposal taxes',
            'Dealing with New City Authorities and the New Urban Communities Authority to recover any undue payments made to the state',
            'Drafting and reviewing all types of real estate contracts',
          ],
    },
    {
      key: 's3', icon: Gavel,
      title: locale === 'ar' ? 'خدمات التنفيذ' : 'Execution Services',
      desc:  locale === 'ar'
        ? 'تنفيذ جميع الأحكام واجبة النفاذ وتحصيل الشيكات محلياً ودولياً.'
        : 'Enforcing all legal rulings that must be implemented, both locally and internationally.',
      details: locale === 'ar'
        ? [
            'تنفيذ جميع الأحكام واجبة النفاذ',
            'تنفيذ الأحكام المصرية بالدول الأجنبية',
            'تنفيذ الأحكام الأجنبية بجمهورية مصر العربية',
            'تحصيل جميع أنواع الشيكات',
            'التفاوض في شأن تحصيل المبالغ المالية والاتفاقات',
          ]
        : [
            'Enforcing all legal rulings that must be implemented',
            'Enforcing to apply Egyptian court decisions in other countries',
            'Enforcing to apply international court decisions within Egypt',
            'Collecting and handling the process of getting payments for all types of cheques',
            'Negotiating with others to collect money and reach formal payment agreements',
          ],
    },
    {
      key: 's4', icon: Users,
      title: locale === 'ar' ? 'قانون الأسرة' : 'Family Law',
      desc:  locale === 'ar'
        ? 'إعداد جميع العرائض والحضور في نزاعات الأسرة وإبرام الاتفاقات الودية.'
        : 'Writing family court documents and handling all types of family-related legal problems.',
      details: locale === 'ar'
        ? [
            'إعداد جميع العرائض التي تخص دعاوى الأسرة',
            'الحضور في جميع النزاعات التي تخص المشاكل الأسرية',
            'إبرام الاتفاقات الودية التي تتم بين الطرفين في دعاوى الأسرة',
            'تمكين الزوجة من مسكن الزوجية',
            'الحصول على مبالغ عادلة نفقة للزوجة والأطفال (المأكل / الملبس / مصاريف دراسة / الحضانة / الخادمة)',
          ]
        : [
            'Writing family court documents',
            'Attending court and handling all types of family-related legal problems',
            'Helping both sides reach peaceful agreements outside of court',
            'Securing the wife the legal right to stay in the marital home',
            'Getting fair spousal and child support: obtaining money for the wife and children to cover basic needs (food, clothing, school fees, housing, and childcare)',
          ],
    },
    {
      key: 's5', icon: Briefcase,
      title: locale === 'ar' ? 'قانون العمل' : 'Labor Law',
      desc:  locale === 'ar'
        ? 'إعداد عقود العمل وتسجيل العاملين بالتأمينات والمرافعة في القضايا العمالية.'
        : 'Preparing employment contracts and defending your rights in all work-related court cases.',
      details: locale === 'ar'
        ? [
            'إعداد جميع عقود العمل بكافة أنواعها',
            'قيد جميع العاملين بالتأمينات الاجتماعية',
            'إجراء جميع التحقيقات الداخلية مع جميع العاملين بالشركة',
            'المرافعة والمدافعة في جميع القضايا العمالية',
            'التعامل مع جميع مكاتب العمل',
            'الحصول على تراخيص العمل والإقامة لجميع العاملين الأجانب',
          ]
        : [
            'Preparing employment contracts (all types of work agreements and contracts)',
            'Registering all employees in the social insurance system',
            'Conducting legal interviews and investigations with staff inside the company',
            'Defending and arguing for your rights in all work-related court cases',
            'Managing all necessary communication and paperwork with government labor offices',
            'Getting work permits and residency, and obtaining the required legal papers and visas for foreign employees to work and stay in the country',
          ],
    },
    {
      key: 's6', icon: Scale,
      title: locale === 'ar' ? 'القانون المدني' : 'Civil Law',
      desc:  locale === 'ar'
        ? 'صياغة كافة العقود المدنية وكتابة العرائض والمرافعة في القضايا المدنية.'
        : 'Drafting all types of personal and legal agreements and representing clients in all civil legal matters.',
      details: locale === 'ar'
        ? [
            'صياغة كافة العقود المدنية',
            'كتابة كافة العرائض المدنية',
            'المرافعة والمدافعة في كافة القضايا المدنية',
          ]
        : [
            'Drafting all types of personal and legal agreements',
            'Writing all civil court petitions',
            'Representing, defending, and arguing for clients in all civil legal matters',
          ],
    },
    {
      key: 's7', icon: Shield,
      title: locale === 'ar' ? 'القانون الجنائي' : 'Criminal Law',
      desc:  locale === 'ar'
        ? 'الحضور في التحقيقات والمرافعة في القضايا الجنائية وتقديم الطعون أمام جميع المحاكم.'
        : 'Attending investigations and defending all criminal cases at all levels of the court system.',
      details: locale === 'ar'
        ? [
            'الحضور في جميع التحقيقات أمام كافة النيابات',
            'المرافعة والمدافعة في جميع القضايا التي تخص الرأي',
            'الحضور في جميع القضايا الجنائية',
            'عمل الطعون أمام جميع المحاكم بكافة درجاتها',
          ]
        : [
            "Attending with clients during questioning at any prosecutor's office",
            'Defending public opinion cases',
            'Attending and defending all criminal cases in all types of criminal court trials',
            'Filing appeals in all levels of the court system to seek a better outcome',
          ],
    },
    {
      key: 's8', icon: ScrollText,
      title: locale === 'ar' ? 'قانون الأحوال الشخصية للمسلمين وغير المسلمين' : 'Personal Status Law (for Muslims and Non-Muslims)',
      desc:  locale === 'ar'
        ? 'تمثيل الموكلين في قضايا المال والميراث وإعداد عقود القسمة بين الورثة.'
        : 'Representing clients in all personal status cases including inheritance and legal dependents.',
      details: locale === 'ar'
        ? [
            'الحضور في جميع القضايا التي تخص المال',
            'الحضور في جميع القضايا التي تخص ناقصي الأهلية',
            'إعلام الوراثة',
            'إعداد عقود القسمة بين الورثة',
          ]
        : [
            'Representing clients in all legal cases related to money and assets',
            'Representing legal dependents',
            'Inheritance certificates',
            'Drafting inheritance division contracts',
          ],
    },
    {
      key: 's9', icon: Globe,
      title: locale === 'ar' ? 'الخدمات العامة' : 'General Services',
      desc:  locale === 'ar'
        ? 'القيام بكافة الأعمال القانونية التي تخص الشركات والأشخاص بكافة فروع القانون بجمهورية مصر العربية وخارجها.'
        : 'Providing all legal services for companies and individuals in all areas of law, both inside Egypt and abroad.',
      details: locale === 'ar'
        ? [
            'القيام بكافة الأعمال القانونية التي تخص الشركات والأشخاص بكافة فروع القانون بجمهورية مصر العربية وخارجها',
            'المؤسسة على أتم الاستعداد للقيام بكافة الأعمال القانونية المذكورة لغير القادرين مادياً',
          ]
        : [
            'Providing all legal services for companies and individuals in all areas of law, both inside Egypt and abroad',
            'Our firm is fully prepared to provide all the legal services mentioned above for free to those who are unable to pay',
          ],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section style={{
        paddingTop: '160px', paddingBottom: '80px',
        background: `linear-gradient(135deg, rgba(13,30,36,0.98) 0%, rgba(59,91,102,0.6) 100%),
          url('${pickImage(content, 'image.services.hero.bg', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600')}') center/cover no-repeat`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          [isRtl ? 'right' : 'left']: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)',
        }} />
        <div className="site-container">
          <SectionLabel>{t('services.label')}</SectionLabel>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 600, color: 'white',
            lineHeight: 1.1, marginBottom: '1.25rem',
          }}>
            {t('services.heading')}
          </h1>
          <GoldDivider />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '520px', lineHeight: 1.8, fontFamily: 'var(--font-sans)' }}>
            {t('services.sub')}
          </p>
        </div>
      </section>

      {/* Services list */}
      <section style={{ padding: '7rem 0', background: 'var(--color-site-dark)' }}>
        <div className="site-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {services.map(({ key, icon: Icon, title, desc, details }, i) => (
              <div key={key} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0',
                background: 'var(--color-site-card)',
                borderRadius: '1rem 0 0 1rem',
                overflow: 'hidden',
              }} className="service-row">

                {/* Left — title block */}
                <div style={{
                  padding: '3rem',
                  borderRadius: '1rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  background: i % 2 === 0 ? 'var(--color-site-card)' : 'var(--color-site-dark)',
                }}>
                  <div style={{
                    width: '56px', height: '56px',
                    background: 'rgba(233,206,139,0.08)',
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}>
                    <Icon size={26} color="var(--color-accent)" strokeWidth={1.5} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem', fontWeight: 600,
                    color: 'white', marginBottom: '0.75rem',
                  }}>
                    {title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                    {desc}
                  </p>
                </div>

                {/* Right — details */}
                <div style={{
                  padding: '3rem',
                  background: i % 2 === 0 ? 'var(--color-site-dark)' : 'var(--color-site-card)',
                  borderRadius: '1rem',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.7rem', fontWeight: 700,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--color-accent)', marginBottom: '1.25rem',
                  }}>
                    {locale === 'ar' ? 'يشمل' : 'Includes'}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {details.map((d, idx) =>
                      typeof d === 'string' ? (
                        <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          {/* Number or dot */}
                          <span style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.9rem',
                            color: 'var(--color-accent)',
                            flexShrink: 0,
                            fontWeight: 700,
                            minWidth: '1.25rem',
                          }}>
                            {idx + 1}.
                          </span>
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                            {d}
                          </span>
                        </li>
                      ) : (
                        <li key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>

                          {/* Numbered heading */}
                          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <span style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.9rem',
                              color: 'var(--color-accent)',
                              flexShrink: 0,
                              fontWeight: 700,
                              minWidth: '1.25rem',
                            }}>
                              {idx + 1}.
                            </span>
                            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontWeight: 600 }}>
                              {d.heading}
                            </span>
                          </div>

                          {/* Bullet sub-items */}
                          <ul style={{ listStyle: 'none', paddingInlineStart: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {d.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                  <span style={{
                                    color: 'rgba(233,206,139,0.7)', flexShrink: 0,
                                    fontSize: '1rem', lineHeight: 1.6,
                                  }}>
                                    ·
                                  </span>
                                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                                    {bullet.text}
                                  </span>
                                </div>

                                {/* Arrow sub-sub-items */}
                                {bullet.arrows && (
                                  <ul style={{ listStyle: 'none', paddingInlineStart: '2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                    {bullet.arrows.map((arrow, aIdx) => (
                                      <li key={aIdx} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                                        <span style={{
                                          color: 'var(--color-accent)', flexShrink: 0,
                                          fontSize: '0.8rem', marginTop: '3px',
                                        }}>
                                          →
                                        </span>
                                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                                          {arrow}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .service-row { grid-template-columns: 1fr !important; }
            .service-row > div:first-child { border-inline-end: none !important; border-bottom: 1px solid rgba(233,206,139,0.1); }
          }
        `}</style>
      </section>

      <CtaBanner
        heading={locale === 'ar' ? 'هل تحتاج إلى استشارة قانونية؟' : 'Need Legal Guidance?'}
        sub={locale === 'ar' ? 'تواصل معنا اليوم لجدولة استشارتك .' : 'Contact us today to schedule your consultation.'}
        ctaLabel={t('nav.appointment')}
        ctaHref={lp('/contact')}
      />
    </>
  );
}