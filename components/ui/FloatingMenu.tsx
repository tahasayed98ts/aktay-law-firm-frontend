'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const CONTACT = {
  whatsapp: 'https://wa.me/201101107788',
  phone:    'tel:+201101107788',
  email:    'mailto:info@aktaylawfirmeg.com',
};

export default function FloatingMenu({ locale }: { locale: string }) {
  const [active,      setActive]      = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Show tooltip after 3s
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(prev => !prev);
    setShowTooltip(false);
  };

  const items = [
    {
      href:      CONTACT.whatsapp,
      bg:        '#25D366',
      icon:      <FaWhatsapp size={20} color="white" />,
      label:     'WhatsApp',
      transform: active ? 'translate3d(-1em, -4.2em, 0) scale(1)' : 'translate3d(0,0,0) scale(0.5)',
      delay:     '0s',
    },
    {
      href:      CONTACT.phone,
      bg:        '#007bff',
      icon:      <Phone size={18} strokeWidth={2} color="white" />,
      label:     'Call us',
      transform: active ? 'translate3d(-4em, -2em, 0) scale(1)' : 'translate3d(0,0,0) scale(0.5)',
      delay:     '0.05s',
    },
    {
      href:      CONTACT.email,
      bg:        '#ff5722',
      icon:      <Mail size={18} strokeWidth={2} color="white" />,
      label:     'Email us',
      transform: active ? 'translate3d(-4em, 1.5em, 0) scale(1)' : 'translate3d(0,0,0) scale(0.5)',
      delay:     '0.1s',
    },
  ];

  return (
    <div ref={menuRef} style={{
      position: 'fixed',
      bottom: '30px',
      right: '10px',
      zIndex: 9000,
    }}>
      {/* Tooltip */}
      <div style={{
        position: 'absolute',
        bottom: 'calc(100% + 14px)',
        right: 0,
        width: '220px',
        maxWidth: '220px',
        background: '#fff',
        color: '#1a1a2e',
        fontSize: '13px',
        fontWeight: 500,
        fontFamily: 'var(--font-sans)',
        lineHeight: 1.6,
        padding: '12px 16px',
        borderRadius: '12px',
        boxShadow: '0 4px 18px rgba(0,0,0,0.14)',
        pointerEvents: showTooltip ? 'auto' : 'none',
        opacity: showTooltip && !active ? 1 : 0,
        transform: showTooltip && !active ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        whiteSpace: 'normal',
        textAlign: 'center',
        }}>
        {locale === 'ar' ? 'للدعم والمساعدة تواصل معنا' : 'For support and assistance, contact us'}
        {/* Tail */}
        <div style={{
          position: 'absolute',
          bottom: '-7px',
          right: '20px',
          width: '14px',
          height: '7px',
          background: '#fff',
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
        }} />
      </div>

{/* Items wrapper */}
<div style={{ position: 'relative', width: '60px', height: '60px' }}>
  {items.map(({ href, bg, icon, label, transform, delay }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      title={label}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '43px',
        height: '43px',
        marginTop: '-25px',
        marginLeft: '-25px',
        borderRadius: '50%',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        textDecoration: 'none',
        opacity: active ? 1 : 0,
        transform,
        transition: `transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}, opacity 0.3s ease ${delay}`,
        pointerEvents: active ? 'auto' : 'none',
      }}
    >
      {icon}
    </a>
  ))}

        {/* Main toggle button */}
        <button
            onClick={handleToggle}
            aria-label="Contact us"
            style={{
                position: 'relative',
                zIndex: 2,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: `url('/customer-service.jpg') center / cover no-repeat`,
                border: '2px solid var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'none',
                boxShadow: '0 4px 15px rgba(233,206,139,0.35)',
                transform: active ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                overflow: 'hidden',
            }}
            >
            {active && (
                <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'rgba(13,30,36,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <span style={{ fontSize: '1.4rem', color: 'var(--color-accent)', fontWeight: 700, lineHeight: 1 }}></span>
                </div>
            )}
            </button>
      </div>
    </div>
  );
}