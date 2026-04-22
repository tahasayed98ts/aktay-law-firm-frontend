'use client';

import { useEffect, useState } from 'react';
import adminApi from '../../../lib/adminApi';
import NextImage from 'next/image';
import { Upload, Check } from 'lucide-react';

interface ImageSlot {
  key:      string;
  label:    string;
  location: string;
  fallback: string;
  aspect:   string;
}

const IMAGE_SLOTS: ImageSlot[] = [
  {
    key:      'image.hero.bg',
    label:    'Home Page — Hero Background',
    location: 'Home page → Full-screen hero section background',
    fallback: '/court.jpg',
    aspect:   '16/5',
  },
  {
    key:      'image.about.teaser',
    label:    'Home Page — About Teaser Photo',
    location: 'Home page → About section → Left side portrait photo',
    fallback: '/dar-mez.jpg',
    aspect:   '4/5',
  },
  {
    key:      'image.about.hero.bg',
    label:    'About Page — Hero Background',
    location: 'About page → Top hero section background',
    fallback: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1600',
    aspect:   '16/5',
  },
  {
    key:      'image.about.story',
    label:    'About Page — Our Story Photo',
    location: 'About page → Our Story section → Right side image',
    fallback: 'https://images.unsplash.com/photo-1453906971074-ce568cccbc63?w=900',
    aspect:   '4/3',
  },
  {
    key:      'image.services.hero.bg',
    label:    'Services Page — Hero Background',
    location: 'Services page → Top hero section background',
    fallback: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600',
    aspect:   '16/5',
  },
  {
    key:      'image.blog.hero.bg',
    label:    'Blog Page — Hero Background',
    location: 'Blog listing page → Top hero section background',
    fallback: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1600',
    aspect:   '16/5',
  },
  {
    key:      'image.contact.hero.bg',
    label:    'Contact Page — Hero Background',
    location: 'Contact page → Top hero section background',
    fallback: 'https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=1600',
    aspect:   '16/5',
  },
  {
    key:      'image.joinus.hero.bg',
    label:    'Join Us Page — Hero Background',
    location: 'Join Us page → Top hero section background',
    fallback: 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=1600',
    aspect:   '16/5',
  },
];

export default function ImagesPage() {
  const [images,    setImages]    = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [saved,     setSaved]     = useState<string | null>(null);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await adminApi.get('/pages');
        const map: Record<string, string> = {};
        IMAGE_SLOTS.forEach(slot => {
          if (data[slot.key]?.en) map[slot.key] = data[slot.key].en;
        });
        setImages(map);
      } catch {}
      finally { setLoading(false); }
    };
    load();
  }, []);

  const handleUpload = async (
    slot: ImageSlot,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(slot.key);
    try {
      // Upload to Cloudinary
      const fd = new FormData();
      fd.append('image', file);
      const { data: uploadData } = await adminApi.post('/upload/image', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = uploadData.url;

      // Save to pages API
      await adminApi.put(`/pages/admin/${slot.key}`, {
        content: { en: url, ar: url },
      });

      setImages(prev => ({ ...prev, [slot.key]: url }));
      setSaved(slot.key);
      setTimeout(() => setSaved(null), 2500);
    } catch {
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  const handleReset = async (slot: ImageSlot) => {
    if (!confirm(`Reset "${slot.label}" to default image?`)) return;
    try {
      await adminApi.put(`/pages/admin/${slot.key}`, {
        content: { en: '', ar: '' },
      });
      setImages(prev => {
        const next = { ...prev };
        delete next[slot.key];
        return next;
      });
    } catch {
      alert('Reset failed.');
    }
  };


  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)' }}>
      Loading...
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2rem', fontWeight: 600,
          color: 'white', marginBottom: '0.25rem',
        }}>
          Site Images
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>
          Upload replacement images for any section. Changes apply immediately.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {IMAGE_SLOTS.map(slot => {
          const currentUrl = images[slot.key] || slot.fallback;
          const isCustom   = !!images[slot.key];
          const isUploading = uploading === slot.key;
          const isSaved     = saved === slot.key;

          return (
            <div key={slot.key} style={{
              background: '#162830',
              border: `1px solid ${isCustom ? 'rgba(233,206,139,0.25)' : 'rgba(233,206,139,0.1)'}`,
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '280px 1fr',
                gap: '0',
              }} className="image-slot-grid">

                {/* Preview */}
                <div style={{
                  position: 'relative',
                  aspectRatio: slot.aspect,
                  background: '#0d1e24',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <NextImage
                    src={currentUrl}
                    alt={slot.label}
                    fill
                    sizes="280px"
                    style={{ objectFit: 'cover', opacity: 0.85 }}
                  />
                  {isCustom && (
                    <div style={{
                      position: 'absolute', top: '0.5rem', left: '0.5rem',
                      background: 'rgba(46,160,87,0.85)',
                      color: 'white', fontSize: '0.62rem',
                      fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '0.2rem 0.5rem',
                      borderRadius: '3px', fontFamily: "'Fira Code', monospace",
                    }}>
                      Custom
                    </div>
                  )}
                  {!isCustom && (
                    <div style={{
                      position: 'absolute', top: '0.5rem', left: '0.5rem',
                      background: 'rgba(0,0,0,0.6)',
                      color: 'rgba(255,255,255,0.6)', fontSize: '0.62rem',
                      fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '0.2rem 0.5rem',
                      borderRadius: '3px', fontFamily: "'Fira Code', monospace",
                    }}>
                      Default
                    </div>
                  )}
                </div>

                {/* Info + actions */}
                <div style={{
                  padding: '1.5rem',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between', gap: '1rem',
                }}>
                  <div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.1rem', fontWeight: 600,
                      color: 'white', marginBottom: '0.35rem',
                    }}>
                      {slot.label}
                    </div>
                    <div style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: '0.72rem',
                      color: 'rgba(255,255,255,0.35)',
                      lineHeight: 1.6,
                    }}>
                      📍 {slot.location}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* Upload button */}
                    <label style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      background: isSaved ? 'rgba(46,160,87,0.15)' : 'rgba(233,206,139,0.08)',
                      border: `1px solid ${isSaved ? 'rgba(46,160,87,0.4)' : 'rgba(233,206,139,0.2)'}`,
                      borderRadius: '6px', padding: '0.65rem 1.25rem',
                      cursor: isUploading ? 'not-allowed' : 'pointer',
                      color: isSaved ? '#6ee7a0' : 'rgba(255,255,255,0.7)',
                      fontFamily: "'Fira Code', monospace", fontSize: '0.75rem',
                      fontWeight: 700, letterSpacing: '0.08em',
                      textTransform: 'uppercase', transition: 'all 0.2s',
                      pointerEvents: isUploading ? 'none' : 'auto',
                    }}>
                      {isSaved ? <Check size={13} /> : <Upload size={13} />}
                      {isUploading ? 'Uploading...' : isSaved ? 'Saved ✓' : 'Upload New Image'}
                      <input
                        type="file" accept="image/*"
                        onChange={e => handleUpload(slot, e)}
                        style={{ display: 'none' }}
                      />
                    </label>

                    {/* Reset to default */}
                    {isCustom && (
                      <button onClick={() => handleReset(slot)} style={{
                        background: 'none',
                        border: '1px solid rgba(220,50,50,0.2)',
                        borderRadius: '6px', padding: '0.65rem 1rem',
                        cursor: 'pointer', color: 'rgba(255,100,100,0.6)',
                        fontFamily: "'Fira Code', monospace", fontSize: '0.72rem',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        transition: 'all 0.2s',
                      }}>
                        Reset to Default
                      </button>
                    )}

                    {/* URL display */}
                    {isCustom && (
                      <a href={images[slot.key]} target="_blank" rel="noreferrer" style={{
                        color: 'rgba(255,255,255,0.25)',
                        fontFamily: "'Fira Code', monospace", fontSize: '0.68rem',
                        textDecoration: 'none', wordBreak: 'break-all',
                        maxWidth: '300px', lineHeight: 1.4,
                      }}>
                        {images[slot.key].slice(0, 60)}...
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .image-slot-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}