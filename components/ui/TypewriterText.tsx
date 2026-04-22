'use client';

import { useEffect, useState } from 'react';

const phrases = [
  'Excellent Service',
  'Trusted Counsel',
  'Real Results',
  'Justice First',
];

const phraseAr = [
  'خدمة متميزة',
  'استشارات موثوقة',
  'نتائج حقيقية',
  'العدالة أولاً',
];

export default function TypewriterText({ locale }: { locale: string }) {
  const list = locale === 'ar' ? phraseAr : phrases;

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed,   setDisplayed]   = useState('');
  const [isDeleting,  setIsDeleting]  = useState(false);
  const [isPaused,    setIsPaused]    = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pause = setTimeout(() => setIsPaused(false), 1600);
      return () => clearTimeout(pause);
    }

    const current = list[phraseIndex];
    const speed   = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === current) {
          setIsPaused(true);
          setIsDeleting(true);
        }
      } else {
        const next = current.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next === '') {
          setIsDeleting(false);
          setPhraseIndex(i => (i + 1) % list.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, isPaused, phraseIndex, list]);

  return (
    <span style={{ color: 'var(--color-accent)', whiteSpace: 'nowrap' }}>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '0.85em',
        background: 'var(--color-accent)',
        marginInlineStart: '3px',
        verticalAlign: 'middle',
        animation: 'blink 0.8s step-end infinite',
      }} />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </span>
  );
}