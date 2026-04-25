'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FaFacebookF,  FaInstagram, FaYoutube } from 'react-icons/fa6';
import { getTranslations } from '../lib/i18n';
import { localePath } from '../lib/navigation';

export default function Footer({ locale }: { locale: string }) {
  const t  = getTranslations(locale);
  const lp = (p: string) => localePath(locale, p);

  const quickLinks = [
    ['/',         t('nav.home')],
    ['/about',    t('nav.about')],
    ['/services', t('nav.services')],
    ['/blog',     t('nav.blog')],
    ['/contact',  t('nav.contact')],
  ];

  const serviceKeys = ['s1','s2','s3','s4','s5','s6'];

  const contactItems = [
    { icon: <MapPin size={15} strokeWidth={1.5} />, text: t('contact.address') },
    { icon: <Phone size={15} strokeWidth={1.5} />, text: t('contact.tel') },
    { icon: <Phone  size={15} strokeWidth={1.5} />, text: locale === 'ar' ? '431 31 31 022' : '022 31 31 431' },
    { icon: <Mail   size={15} strokeWidth={1.5} />, text: t('contact.emailAddr') },
    { icon: <Clock  size={15} strokeWidth={1.5} />, text: t('contact.hours') },
  ];

  const socials = [
    { icon: <FaFacebookF  size={14} />, href: 'https://www.facebook.com/share/1E3TakzbZv/?mibextid=wwXIfr' },
    
    { icon: <FaInstagram  size={14} />, href: 'https://www.instagram.com/aktay.law.firm?igsh=am5wMTBwb3FiODB4' },
    { icon: <FaYoutube   size={14} />, href: 'https://youtube.com/@aktaylawfirm?si=T4lbw0_YGuUDnIie' },
  ];

  const headingStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: '0.95rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-accent)',
    marginBottom: '1.25rem',
  };

  return (
    <footer className="bg-dark-deep border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Aktay" width={44} height={44} className="object-contain" />
              <div>
                <div className="font-serif text-xl font-bold text-white leading-none">AKTAY</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>Law Firm</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">{t('footer.tagline')}</p>
            <div className="flex gap-2">
              {socials.map(({ icon, href }, i) => (
                <a key={i} href={href}
                  className="footer-social w-9 h-9 border border-accent/20 flex items-center justify-center text-white/40 rounded-full no-underline transition-all duration-300">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={headingStyle}>{t('footer.quickLinks')}</h4>
            {quickLinks.map(([href, label]) => (
              <Link key={href} href={lp(href as string)} className="footer-link block text-white/50 text-sm mb-1 no-underline">
                <span className="footer-arrow">→</span> {label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={headingStyle}>{t('nav.services')}</h4>
            {serviceKeys.map(k => (
              <Link key={k} href={lp('/services')} className="footer-link block text-white/50 text-sm mb-1 no-underline">
                <span className="footer-arrow">→</span> {t(`services.${k}`)}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={headingStyle}>{t('footer.contactInfo')}</h4>
            {contactItems.map(({ icon, text }) => (
              <div key={text} className="flex gap-2.5 mb-3 items-start">
                <span className="mt-0.5 shrink-0" style={{ color: 'var(--color-accent)' }}>{icon}</span>
                <span className="text-white/50 text-sm leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-accent/10 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Aktay Law Firm. {t('footer.rights')}</p>
          <a
            href="https://taha-ts-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.72rem', color: '#059669', textDecoration: 'none', transition: 'color 0.2s' }}
            className="footer-powered"
          >
            Powered by TS
          </a>
          <p className="text-white/30 text-xs">Cairo, Egypt · www.aktaylawfirm.com</p>
        </div>
      </div>

      <style>{`
        .footer-link {
          line-height: 2.2;
          transition: color 0.25s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .footer-link:hover { color: var(--color-accent) !important; }
        .footer-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }
        .footer-link:hover .footer-arrow {
          transform: translateX(5px);
        }
        .footer-social:hover {
          border-color: var(--color-accent) !important;
          color: var(--color-accent) !important;
        }
        .footer-social { color: rgba(255,255,255,0.4); }
      `}</style>
    </footer>
  );
}