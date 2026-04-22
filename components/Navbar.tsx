'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { getTranslations } from '../lib/i18n';
import { localePath } from '../lib/navigation';
import Flag from 'react-world-flags';

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
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/join-us',   label: t('nav.joinUs') },
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
            <div className="font-serif text-xl font-bold text-white leading-none">AKTAY</div>
            <div className="font-sans text-[10px] tracking-[0.4em] uppercase text-accent">Law Firm</div>
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
            title={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              opacity: 0.85,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
          >
            <Flag
              code={locale === 'en' ? 'EG' : 'US'}
              style={{ width: '28px', height: '20px', objectFit: 'cover', borderRadius: '3px' }}
            />
          </button>

          <Link
            href={lp('/contact')}
            className="hidden md:inline-flex items-center consulting-btn no-underline"
          >
            {t('nav.appointment')}
          </Link>

          <style>{`
            .consulting-btn {
              position: relative;
              padding: 0.6rem 1.4rem;
              font-family: var(--font-sans);
              font-size: 0.75rem;
              font-weight: 600;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: white;
              background: transparent;
              border-radius: 15px;
              overflow: hidden;
              z-index: 0;
              transition: color 0.3s ease;
            }

            .consulting-btn::before {
              content: '';
              position: absolute;
              inset: -2px;
              border-radius: 15px;
              background: conic-gradient(
                from var(--angle, 0deg),
                transparent 0deg,
                var(--color-accent) 60deg,
                transparent 120deg
              );
              animation: rotate-border 3s linear infinite;
              z-index: -2;
            }

            .consulting-btn::after {
              content: '';
              position: absolute;
              inset: 1.5px;
              border-radius: 13px;
              background: var(--color-site-dark);
              z-index: -1;
            }

            .consulting-btn:hover {
              color: var(--color-accent);
              transition: color 0.3s ease;
            }

            @property --angle {
              syntax: '<angle>';
              initial-value: 0deg;
              inherits: false;
            }

            @keyframes rotate-border {
              to { --angle: 360deg; }
            }
          `}</style>

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