'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { getTranslations } from '../lib/i18n';
import { localePath } from '../lib/navigation';

export default function Navbar({ locale }: { locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname = usePathname();
  const router   = useRouter();
  const t        = getTranslations(locale);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const toggleLocale = () => {
    const next    = locale === 'en' ? 'ar' : 'en';
    const without = pathname.replace(`/${locale}`, '') || '';
    router.push(`/${next}${without}`);
  };

  const lp = (p: string) => localePath(locale, p);

  const links = [
    { href: '/',         label: t('nav.home') },
    { href: '/about',    label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/blog',     label: t('nav.blog') },
    { href: '/contact',  label: t('nav.contact') },
  ];

  const isActive = (href: string) => {
    const full = lp(href);
    return pathname === full || (href !== '/' && pathname.startsWith(full));
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-dark/95 backdrop-blur-md border-b border-accent/10'
        : 'bg-dark/70 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">

        {/* Logo */}
        <Link href={lp('/')} className="flex items-center gap-3 no-underline">
          <Image src="/logo.png" alt="Aktay" width={44} height={44} className="object-contain" />
          <div>
            <div className="font-serif text-xl font-bold text-white leading-none">Aktay</div>
            <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-accent">Law Firm</div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={lp(link.href)}
                className={`font-sans text-sm font-medium tracking-wide no-underline transition-colors duration-200 pb-1 border-b ${
                  isActive(link.href)
                    ? 'text-accent border-accent'
                    : 'text-white/80 border-transparent hover:text-accent hover:border-accent/50'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="font-sans text-xs font-semibold tracking-widest text-accent border border-accent/40 px-3 py-1.5 bg-transparent hover:bg-accent/10 transition-colors cursor-pointer"
          >
            {locale === 'en' ? 'ع' : 'EN'}
          </button>

          <Link
            href={lp('/contact')}
            className="hidden md:inline-flex items-center gap-2 bg-accent text-dark-deep text-xs font-semibold tracking-widest uppercase px-5 py-2.5 hover:bg-accent-dark transition-colors no-underline"
          >
            {t('nav.appointment')}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
          >
            <span className={`block w-5 h-px bg-accent transition-all duration-300 ${open ? 'rotate-45 translate-y-2.5' : ''}`} />
            <span className={`block w-5 h-px bg-accent transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-accent transition-all duration-300 ${open ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark-deep/98 border-t border-accent/10 px-6 py-4">
          {links.map(link => (
            <Link
              key={link.href}
              href={lp(link.href)}
              onClick={() => setOpen(false)}
              className={`block py-3 border-b border-accent/10 font-sans text-sm no-underline transition-colors ${
                isActive(link.href) ? 'text-accent' : 'text-white/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={lp('/contact')}
            onClick={() => setOpen(false)}
            className="mt-4 flex justify-center bg-accent text-dark-deep text-xs font-semibold tracking-widest uppercase px-5 py-3 no-underline"
          >
            {t('nav.appointment')}
          </Link>
        </div>
      )}
    </nav>
  );
}