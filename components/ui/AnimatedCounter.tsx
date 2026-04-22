'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  style?: React.CSSProperties;
}

function parseValue(val: string): { number: number; prefix: string; suffix: string } {
  const prefix = val.match(/^[^0-9]*/)?.[0] || '';
  const suffix = val.match(/[^0-9]*$/)?.[0] || '';
  const number = parseInt(val.replace(/[^0-9]/g, ''), 10) || 0;
  return { number, prefix, suffix };
}

export default function AnimatedCounter({ value, style }: Props) {
  const { number, prefix, suffix } = parseValue(value);
  const [count,   setCount]   = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 2000;
    const steps    = 60;
    const interval = duration / steps;
    let current    = 0;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * number));

      if (current >= steps) {
        setCount(number);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [started, number]);

  return (
    <div ref={ref} style={style}>
      {prefix}{count}{suffix}
    </div>
  );
}