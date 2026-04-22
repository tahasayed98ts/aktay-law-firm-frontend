'use client';

import { useEffect, useState } from 'react';
import adminApi from '../../../lib/adminApi';
import NextImage from 'next/image';
import { Save, Upload } from 'lucide-react';

interface Settings {
  primaryColor:   string;
  secondaryColor: string;
  logoUrl:        string;
  socialLinks: {
    facebook:  string;
    linkedin:  string;
    twitter:   string;
    instagram: string;
  };
}

const defaults: Settings = {
  primaryColor:   '#3b5b66',
  secondaryColor: '#e9ce8b',
  logoUrl:        '',
  socialLinks: { facebook: '', linkedin: '', twitter: '', instagram: '' },
};

export default function SettingsPage() {
  const [settings,  setSettings]  = useState<Settings>(defaults);
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const { data } = await adminApi.get('/settings');
        setSettings({ ...defaults, ...data, socialLinks: { ...defaults.socialLinks, ...data.socialLinks } });
      } catch {}
      finally { setLoading(false); }
    };
    fetch_();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.put('/admin/settings', settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const { data } = await adminApi.post('/upload/image', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSettings(prev => ({ ...prev, logoUrl: data.url }));
    } catch {
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem',
    background: '#0d1e24',
    border: '1px solid rgba(233,206,139,0.15)',
    borderRadius: '4px', color: 'white',
    fontFamily: "'Fira Code', monospace", fontSize: '0.85rem',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.68rem', fontWeight: 700,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem',
    fontFamily: "'Fira Code', monospace",
  };

  const sectionStyle: React.CSSProperties = {
    background: '#162830',
    border: '1px solid rgba(233,206,139,0.1)',
    borderRadius: '8px', padding: '1.75rem',
    marginBottom: '1.5rem',
  };

  const sectionTitle: React.CSSProperties = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.2rem', fontWeight: 600,
    color: 'white', marginBottom: '1.25rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid rgba(233,206,139,0.1)',
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>
            Settings
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>
            Manage site-wide configuration.
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: saved ? 'rgba(46,160,87,0.8)' : 'var(--color-accent)',
          color: 'var(--color-site-deep)', border: 'none', borderRadius: '6px',
          padding: '0.7rem 1.5rem', cursor: saving ? 'not-allowed' : 'pointer',
          fontFamily: "'Fira Code', monospace", fontWeight: 700,
          fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase',
          transition: 'all 0.2s', opacity: saving ? 0.7 : 1,
        }}>
          <Save size={14} />
          {saved ? 'Saved ✓' : saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      {/* Logo */}
      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Logo</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: '#0d1e24',
            border: '1px solid rgba(233,206,139,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0, position: 'relative',
          }}>
            {settings.logoUrl ? (
              <NextImage src={settings.logoUrl} alt="Logo" fill style={{ objectFit: 'contain' }} sizes="80px" />
            ) : (
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>No logo</span>
            )}
          </div>
          <label style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(233,206,139,0.06)',
            border: '1px dashed rgba(233,206,139,0.2)',
            borderRadius: '6px', padding: '0.75rem 1.25rem',
            cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
            fontFamily: "'Fira Code', monospace", fontSize: '0.78rem',
            transition: 'all 0.2s',
          }}>
            <Upload size={14} />
            {uploading ? 'Uploading...' : 'Upload new logo'}
            <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Colors */}
      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Brand Colors</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="colors-grid">
          <div>
            <label style={labelStyle}>Primary Color</label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input type="color" value={settings.primaryColor}
                onChange={e => setSettings(p => ({ ...p, primaryColor: e.target.value }))}
                style={{ width: '44px', height: '44px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'none' }} />
              <input value={settings.primaryColor}
                onChange={e => setSettings(p => ({ ...p, primaryColor: e.target.value }))}
                style={{ ...inputStyle, flex: 1 }} placeholder="#3b5b66" />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Accent Color</label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input type="color" value={settings.secondaryColor}
                onChange={e => setSettings(p => ({ ...p, secondaryColor: e.target.value }))}
                style={{ width: '44px', height: '44px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'none' }} />
              <input value={settings.secondaryColor}
                onChange={e => setSettings(p => ({ ...p, secondaryColor: e.target.value }))}
                style={{ ...inputStyle, flex: 1 }} placeholder="#e9ce8b" />
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Social Links</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {(['facebook', 'linkedin', 'twitter', 'instagram'] as const).map(platform => (
            <div key={platform}>
              <label style={labelStyle}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
              <input
                value={settings.socialLinks[platform]}
                onChange={e => setSettings(p => ({
                  ...p,
                  socialLinks: { ...p.socialLinks, [platform]: e.target.value },
                }))}
                placeholder={`https://${platform}.com/aktaylawfirm`}
                style={inputStyle}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) { .colors-grid { grid-template-columns: 1fr !important; } }
        input:focus { border-color: rgba(233,206,139,0.4) !important; }
      `}</style>
    </div>
  );
}