'use client';

import { useEffect, useState } from 'react';

export default function SlowTypewriter({ text }: { text: string }) {
  const [displayed,  setDisplayed]  = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused,   setIsPaused]   = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pause = setTimeout(() => setIsPaused(false), 3000);
      return () => clearTimeout(pause);
    }

    const speed = isDeleting ? 180 : 220;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = text.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === text) {
          setIsPaused(true);
          setIsDeleting(true);
        }
      } else {
        const next = text.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next === '') setIsDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, isPaused, text]);

  return (
    <span style={{
      display: 'inline-block',
      minWidth: `${text.length}ch`,  // reserves exact character width
      verticalAlign: 'bottom',
      color: 'var(--color-accent)',
    }}>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '0.75em',
        background: 'var(--color-accent)',
        marginInlineStart: '2px',
        verticalAlign: 'middle',
        animation: 'blink 1s step-end infinite',
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