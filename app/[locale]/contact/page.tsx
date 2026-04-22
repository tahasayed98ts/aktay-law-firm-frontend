import { getTranslations } from '../../../lib/i18n';
import ContactForm from '../../../components/sections/ContactForm';
import SectionLabel from '../../../components/ui/SectionLabel';
import GoldDivider from '../../../components/ui/GoldDivider';
import { getPageContent, pick, pickImage } from '../../../lib/pageContent';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

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
    title: buildTitle(isAr ? 'تواصل معنا' : 'Contact Us', locale),
    description: isAr
      ? 'تواصل مع مكتب أكتاي للمحاماة في القاهرة الجديدة. 103 نرجس 1 — 011 011 077 88.'
      : 'Contact Aktay Law Firm in New Cairo. 103 Narges 1 — 011 011 077 88.',
    alternates: { canonical: `${siteConfig.url}/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t       = getTranslations(locale);
  const isRtl   = locale === 'ar';
  const content = await getPageContent();
  const p       = (key: string, fallback: string) => pick(content, key, locale, fallback);

  const MAPS_URL = 'https://www.google.com/maps/place/30%C2%B001%2730.8%22N+31%C2%B027%2728.5%22E/@30.0252132,31.4553433,743m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d30.0252132!4d31.4579182';

  const address = p('contact.info.address', t('contact.address'));
  const phone   = p('contact.info.phone',   t('contact.tel'));
  const email   = p('contact.info.email',   t('contact.emailAddr'));
  const hours   = p('contact.info.hours',   t('contact.hours'));

  return (
    <>
      {/* Hero */}
      <section style={{
        paddingTop: '160px', paddingBottom: '80px',
        background: `linear-gradient(135deg, rgba(13,30,36,0.98) 0%, rgba(59,91,102,0.6) 100%),
          url('${pickImage(content, 'image.contact.hero.bg', 'https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=1600')}') center/cover no-repeat`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          [isRtl ? 'right' : 'left']: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)',
        }} />
        <div className="site-container">
          <SectionLabel>{p('contact.hero.label', t('contact.label'))}</SectionLabel>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 600, color: 'white',
            lineHeight: 1.1, marginBottom: '1.25rem',
          }}>
            {p('contact.hero.heading', t('contact.heading'))}
          </h1>
          <GoldDivider />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '500px', lineHeight: 1.8, fontFamily: 'var(--font-sans)' }}>
            {p('contact.hero.sub', t('contact.sub'))}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '7rem 0', background: 'var(--color-site-dark)' }}>
        <div className="site-container">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '4rem', alignItems: 'start' }}>

            {/* Info panel */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, color: 'white', marginBottom: '0.75rem' }}>
                {p('contact.info.heading', locale === 'ar' ? 'معلومات التواصل' : 'Contact Information')}
              </h2>
              <GoldDivider />
              <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-sans)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                {p('contact.info.sub', locale === 'ar'
                  ? 'نرحب بتواصلكم في أي وقت للاستفسار عن خدماتنا القانونية.'
                  : 'We welcome your inquiries at any time regarding our legal services.'
                )}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Address — links to maps */}
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                  style={{
                    display: 'flex', gap: '1rem', alignItems: 'center',
                    padding: '1.25rem',
                    background: 'var(--color-site-card)',
                    border: '1px solid rgba(233,206,139,0.1)',
                    borderRadius: '6px', textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: 'rgba(233,206,139,0.08)',
                    border: '1px solid rgba(233,206,139,0.12)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <MapPin size={18} color="var(--color-accent)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '4px', fontWeight: 700 }}>
                      {locale === 'ar' ? 'العنوان' : 'Address'}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
                      {address}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="contact-item"
                  style={{
                    display: 'flex', gap: '1rem', alignItems: 'center',
                    padding: '1.25rem',
                    background: 'var(--color-site-card)',
                    border: '1px solid rgba(233,206,139,0.1)',
                    borderRadius: '6px', textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: 'rgba(233,206,139,0.08)',
                    border: '1px solid rgba(233,206,139,0.12)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Phone size={18} color="var(--color-accent)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '4px', fontWeight: 700 }}>
                      {locale === 'ar' ? 'الهاتف' : 'Phone'}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
                      {phone}
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${email}`}
                  className="contact-item"
                  style={{
                    display: 'flex', gap: '1rem', alignItems: 'center',
                    padding: '1.25rem',
                    background: 'var(--color-site-card)',
                    border: '1px solid rgba(233,206,139,0.1)',
                    borderRadius: '6px', textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: 'rgba(233,206,139,0.08)',
                    border: '1px solid rgba(233,206,139,0.12)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Mail size={18} color="var(--color-accent)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '4px', fontWeight: 700 }}>
                      {locale === 'ar' ? 'البريد' : 'Email'}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
                      {email}
                    </div>
                  </div>
                </a>

                {/* Hours — no link */}
                <div style={{
                  display: 'flex', gap: '1rem', alignItems: 'center',
                  padding: '1.25rem',
                  background: 'var(--color-site-card)',
                  border: '1px solid rgba(233,206,139,0.1)',
                  borderRadius: '6px',
                }}>
                  <div style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: 'rgba(233,206,139,0.08)',
                    border: '1px solid rgba(233,206,139,0.12)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Clock size={18} color="var(--color-accent)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '4px', fontWeight: 700 }}>
                      {locale === 'ar' ? 'ساعات العمل' : 'Hours'}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
                      {hours}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Form */}
            <ContactForm locale={locale} translations={{
              name:    p('contact.form.name',    t('contact.name')),
              email:   p('contact.form.email',   t('contact.email')),
              phone:   p('contact.form.phone',   t('contact.phone')),
              subject: p('contact.form.subject', t('contact.subject')),
              message: p('contact.form.message', t('contact.message')),
              send:    p('contact.form.send',    t('contact.send')),
              success: p('contact.form.success', t('contact.success')),
              error:   p('contact.form.error',   t('contact.error')),
            }} />
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
          .contact-item:hover {
            border-color: rgba(233,206,139,0.35) !important;
          }
        `}</style>
      </section>

      {/* Map */}
      <section style={{ paddingBottom: '7rem', background: 'var(--color-site-dark)' }}>
        <div className="site-container">
          <div style={{
            background: 'var(--color-site-card)',
            border: '1px solid rgba(233,206,139,0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {/* Map header */}
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid rgba(233,206,139,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px', height: '40px',
                  background: 'rgba(233,206,139,0.08)',
                  border: '1px solid rgba(233,206,139,0.12)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <MapPin size={18} color="var(--color-accent)" strokeWidth={1.5} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>
                    {locale === 'ar' ? 'موقعنا' : 'Our Location'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                    {locale === 'ar' ? '103 نرجس 1، القاهرة الجديدة، مصر' : '103 Narges 1, New Cairo, Egypt'}
                  </div>
                </div>
              </div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontFamily: 'var(--font-sans)', fontSize: '0.72rem',
                  fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--color-accent)', textDecoration: 'none',
                  border: '1px solid rgba(233,206,139,0.25)',
                  padding: '0.5rem 1rem', borderRadius: '4px',
                  transition: 'border-color 0.2s',
                }}
              >
                <MapPin size={13} />
                {locale === 'ar' ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}
              </a>
            </div>

            {/* Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3234.0075336736036!2d31.455343275552924!3d30.02521317493335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDAxJzMwLjgiTiAzMcKwMjcnMjguNSJF!5e1!3m2!1sen!2seg!4v1776654209502!5m2!1sen!2seg"
              width="100%"
              height="450"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aktay Law Firm Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}