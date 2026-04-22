'use client';

import { useEffect, useRef, useState } from 'react';

export default function GavelCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);
  const [ripples,  setRipples]  = useState<{ id: number; x: number; y: number }[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top  = `${e.clientY}px`;
    };

    const down = (e: MouseEvent) => {
      setClicking(true);
      const id = counter.current++;
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
    };

    const up = () => {
      setTimeout(() => setClicking(false), 300);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup',   up);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup',   up);
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} className={`gavel-cursor ${clicking ? 'striking' : ''}`}>
        <svg
          width="36" height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: 'rotate(260deg)' }}
        >
          {/* Handle */}
          <line
            x1="10" y1="26"
            x2="28" y2="8"
            stroke="#e9ce8b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Gavel head */}
          <rect
            x="18" y="3"
            width="14" height="8"
            rx="2"
            fill="#e9ce8b"
            transform="rotate(45 18 3)"
          />
          {/* Head shine */}
          <rect
            x="19.5" y="4.5"
            width="11" height="3"
            rx="1"
            fill="rgba(255,255,255,0.25)"
            transform="rotate(45 19.5 4.5)"
          />
        </svg>
      </div>

      {/* Click ripples */}
      {ripples.map(({ id, x, y }) => (
        <div key={id} className="gavel-ripple" style={{ left: x, top: y }} />
      ))}

      <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }

        .gavel-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-4px, -4px);
          transform-origin: 4px 4px;
          transition: transform 0.08s ease;
          will-change: transform, left, top;
        }

        .gavel-cursor.striking {
          animation: gavelStrike 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes gavelStrike {
          0%   { transform: translate(-4px, -4px) rotate(0deg)   scale(1); }
          40%  { transform: translate(-4px, -4px) rotate(-35deg) scale(1.15); }
          70%  { transform: translate(-4px, -4px) rotate(10deg)  scale(0.95); }
          100% { transform: translate(-4px, -4px) rotate(0deg)   scale(1); }
        }

        .gavel-ripple {
            position: fixed;
            pointer-events: none;
            z-index: 99998;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: transparent;
            border: 1.5px solid var(--color-accent);
            transform: translate(-50%, -50%) scale(0);
            animation: rippleOut 0.65s ease-out forwards;
            margin-top: 10px;
            }

        @keyframes rippleOut {
          0%   { transform: translate(-50%, -50%) scale(0);  opacity: 0.9; }
          60%  { transform: translate(-50%, -50%) scale(6);  opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(10); opacity: 0;   }
        }

        @media (hover: none) {
          *, *::before, *::after { cursor: auto !important; }
          .gavel-cursor { display: none; }
        }
      `}</style>
    </>
  );
}