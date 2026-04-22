'use client';

import { useState } from 'react';

interface Props {
  url:   string;
  label: string;
}

export default function DownloadButton({ url, label }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      // Fetch the PDF directly from Cloudinary as a blob
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const blob    = await response.blob();
      const blobUrl = window.URL.createObjectURL(
        new Blob([blob], { type: 'application/pdf' })
      );

      const a    = document.createElement('a');
      a.href     = blobUrl;
      a.download = 'article.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback — open directly in new tab
      window.open(url, '_blank');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        background: loading ? 'rgba(233,206,139,0.5)' : 'var(--color-accent)',
        color: 'var(--color-site-deep)',
        fontFamily: 'var(--font-sans)', fontWeight: 700,
        fontSize: '0.75rem', letterSpacing: '0.12em',
        textTransform: 'uppercase', padding: '0.875rem 1.75rem',
        borderRadius: '4px', border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap', transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      {loading ? '...' : label}
    </button>
  );
}