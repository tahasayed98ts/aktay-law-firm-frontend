'use client';

import { useState } from 'react';
import axios from 'axios';
import { getTranslations } from '../../../lib/i18n';
import SectionLabel from '../../../components/ui/SectionLabel';
import GoldDivider from '../../../components/ui/GoldDivider';
import CtaBanner from '../../../components/sections/CtaBanner';
import { localePath } from '../../../lib/navigation';
import { Briefcase, Users, Star, DollarSign, Upload, CheckCircle } from 'lucide-react';

interface Props {
  locale:  string;
  bgImage: string;
}

export default function JoinUsClient({ locale, bgImage }: Props) {
  const t     = getTranslations(locale);
  const lp    = (p: string) => localePath(locale, p);
  const isRtl = locale === 'ar';

  const [form,     setForm]     = useState({ name: '', email: '', phone: '', position: '', message: '' });
  const [cv,       setCv]       = useState<File | null>(null);
  const [status,   setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [dragOver, setDragOver] = useState(false);

  const perks = [
    { icon: Briefcase,  title: t('joinUs.p1Title'), desc: t('joinUs.p1Desc') },
    { icon: Users,      title: t('joinUs.p2Title'), desc: t('joinUs.p2Desc') },
    { icon: Star,       title: t('joinUs.p3Title'), desc: t('joinUs.p3Desc') },
    { icon: DollarSign, title: t('joinUs.p4Title'), desc: t('joinUs.p4Desc') },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) { alert('File must be under 5MB'); return; }
    setCv(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv) { alert('Please upload your CV'); return; }
    setStatus('loading');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('cv', cv);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/applications`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', position: '', message: '' });
      setCv(null);
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.875rem 1rem',
    background: 'var(--color-site-card)',
    border: '1px solid rgba(233,206,139,0.15)',
    color: 'white', borderRadius: '4px',
    fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    direction: isRtl ? 'rtl' : 'ltr',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-sans)',
    fontSize: '0.7rem', fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.45)', marginBottom: '0.5rem',
  };

  return (
    <>
      {/* Hero */}
      <section style={{
        paddingTop: '160px', paddingBottom: '80px',
        background: `linear-gradient(135deg, rgba(13,30,36,0.98) 0%, rgba(59,91,102,0.6) 100%),
          url('${bgImage}') center/cover no-repeat`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          [isRtl ? 'right' : 'left']: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)',
        }} />
        <div className="site-container">
          <SectionLabel>{t('joinUs.label')}</SectionLabel>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 600, color: 'white',
            lineHeight: 1.1, marginBottom: '1.25rem',
          }}>
            {t('joinUs.heading')}
          </h1>
          <GoldDivider />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '540px', lineHeight: 1.8, fontFamily: 'var(--font-sans)' }}>
            {t('joinUs.sub')}
          </p>
        </div>
      </section>

      {/* Why join us */}
      <section style={{ padding: '7rem 0', background: 'var(--color-site-dark)' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel>{t('joinUs.whyUs')}</SectionLabel>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.9rem, 3vw, 2.6rem)',
              fontWeight: 600, color: 'white',
            }}>
              {t('joinUs.whyUs')}
            </h2>
            <GoldDivider center />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }}
               className="perks-grid">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{
                background: 'var(--color-site-card)',
                border: '1px solid rgba(233,206,139,0.1)',
                borderRadius: '8px', padding: '2rem',
                display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
              }}>
                <div style={{
                  width: '48px', height: '48px', flexShrink: 0,
                  background: 'rgba(233,206,139,0.08)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} color="var(--color-accent)" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem', fontWeight: 600,
                    color: 'white', marginBottom: '0.5rem',
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.7,
                  }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 700px) { .perks-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* Application form */}
      <section style={{ padding: '7rem 0', background: 'var(--color-site-card)' }}>
        <div className="site-container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionLabel>{t('joinUs.label')}</SectionLabel>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.9rem, 3vw, 2.6rem)',
                fontWeight: 600, color: 'white',
              }}>
                {t('joinUs.heading')}
              </h2>
              <GoldDivider center />
            </div>

            {status === 'success' ? (
              <div style={{
                textAlign: 'center', padding: '4rem 2rem',
                background: 'var(--color-site-dark)',
                border: '1px solid rgba(233,206,139,0.15)',
                borderRadius: '8px',
              }}>
                <CheckCircle size={48} color="var(--color-accent)" strokeWidth={1} style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'white', marginBottom: '0.75rem' }}>
                  {locale === 'ar' ? 'تم إرسال طلبك!' : 'Application Submitted!'}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)', lineHeight: 1.7 }}>
                  {t('joinUs.success')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                background: 'var(--color-site-dark)',
                border: '1px solid rgba(233,206,139,0.12)',
                borderRadius: '8px', padding: '2.5rem',
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
              }}>
                {status === 'error' && (
                  <div style={{
                    background: 'rgba(220,50,50,0.1)',
                    border: '1px solid rgba(220,50,50,0.3)',
                    borderRadius: '4px', padding: '0.875rem 1rem',
                    color: '#ff8080', fontFamily: 'var(--font-sans)', fontSize: '0.875rem',
                  }}>
                    ✗ {t('joinUs.error')}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{t('joinUs.name')}</label>
                    <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t('joinUs.email')}</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
                  <div>
                    <label style={labelStyle}>{t('joinUs.phone')}</label>
                    <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t('joinUs.position')}</label>
                    <input name="position" value={form.position} onChange={handleChange} style={inputStyle}
                      placeholder={locale === 'ar' ? 'مثال: محامي مدني' : 'e.g. Lawyer'} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{t('joinUs.message')}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                <div>
                  <label style={labelStyle}>{t('joinUs.cv')}</label>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    style={{
                      border: `2px dashed ${dragOver ? 'var(--color-accent)' : 'rgba(233,206,139,0.2)'}`,
                      borderRadius: '6px', padding: '2rem',
                      textAlign: 'center', cursor: 'pointer',
                      background: dragOver ? 'rgba(233,206,139,0.04)' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                    onClick={() => document.getElementById('cv-input')?.click()}
                  >
                    {cv ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={16} color="var(--color-accent)" />
                        <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
                          {cv.name}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} color="rgba(233,206,139,0.4)" style={{ marginBottom: '0.75rem' }} />
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                          {locale === 'ar' ? 'اسحب وأفلت ملفك هنا أو انقر للتحميل' : 'Drag & drop your file here or click to browse'}
                        </p>
                        <p style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>
                          {t('joinUs.cvHint')}
                        </p>
                      </>
                    )}
                    <input id="cv-input" type="file" accept=".pdf,.doc,.docx"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                      style={{ display: 'none' }} />
                  </div>
                </div>

                <button type="submit" disabled={status === 'loading'} style={{
                  background: status === 'loading' ? 'rgba(233,206,139,0.5)' : 'var(--color-accent)',
                  color: 'var(--color-site-deep)', border: 'none', borderRadius: '4px',
                  padding: '1rem 2.5rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-sans)', fontWeight: 700,
                  fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  alignSelf: 'flex-start', transition: 'background 0.2s',
                }}>
                  {status === 'loading' ? '...' : `${t('joinUs.send')} →`}
                </button>
              </form>
            )}
          </div>
        </div>
        <style>{`
          @media (max-width: 560px) { .form-row { grid-template-columns: 1fr !important; } }
          input:focus, textarea:focus { border-color: rgba(233,206,139,0.4) !important; }
        `}</style>
      </section>

      <CtaBanner
        heading={locale === 'ar' ? 'هل لديك سؤال؟' : 'Have a Question?'}
        sub={locale === 'ar' ? 'تواصل معنا مباشرة وسنرد عليك في أقرب وقت.' : 'Reach out directly and we will get back to you shortly.'}
        ctaLabel={t('nav.contact')}
        ctaHref={lp('/contact')}
      />
    </>
  );
}