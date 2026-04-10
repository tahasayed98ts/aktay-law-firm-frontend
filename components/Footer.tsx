'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    { icon: '📍', text: t('contact.address') },
    { icon: '📞', text: t('contact.tel') },
    { icon: '✉️', text: t('contact.emailAddr') },
    { icon: '🕐', text: t('contact.hours') },
  ];

  return (
    <footer className="bg-dark-deep border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Aktay" width={44} height={44} className="object-contain" />
              <div>
                <div className="font-serif text-xl font-bold text-white leading-none">Aktay</div>
                <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-accent">Law Firm</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">{t('footer.tagline')}</p>
            <div className="flex gap-2">
              {['f', 'in', 'tw'].map(s => (
                <a key={s} href="#"
                  className="w-9 h-9 border border-accent/20 flex items-center justify-center text-white/40 text-xs font-bold hover:border-accent hover:text-accent transition-all no-underline">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-[11px] tracking-[0.15em] uppercase text-accent mb-5">
              {t('footer.quickLinks')}
            </h4>
            {quickLinks.map(([href, label]) => (
              <Link key={href} href={lp(href as string)}
                className="block text-white/50 text-sm mb-2.5 no-underline hover:text-accent transition-colors">
                → {label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans text-[11px] tracking-[0.15em] uppercase text-accent mb-5">
              {t('nav.services')}
            </h4>
            {serviceKeys.map(k => (
              <Link key={k} href={lp('/services')}
                className="block text-white/50 text-sm mb-2.5 no-underline hover:text-accent transition-colors">
                → {t(`services.${k}`)}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[11px] tracking-[0.15em] uppercase text-accent mb-5">
              {t('footer.contactInfo')}
            </h4>
            {contactItems.map(({ icon, text }) => (
              <div key={text} className="flex gap-2.5 mb-3 items-start">
                <span className="text-sm mt-0.5 shrink-0">{icon}</span>
                <span className="text-white/50 text-sm leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-accent/10 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Aktay Law Firm. {t('footer.rights')}
          </p>
          <p className="text-white/30 text-xs">Cairo, Egypt · www.aktaylawfirm.com</p>
        </div>
      </div>
    </footer>
  );
}