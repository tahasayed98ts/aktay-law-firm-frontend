'use client';
import NextImage from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import adminApi from '../../../../lib/adminApi';
import RichEditor from '../../../../components/admin/RichEditor';
import { Save, Upload, ArrowLeft, Eye, EyeOff, FileText } from 'lucide-react';
import Link from 'next/link';

interface PostForm {
  title:      { en: string; ar: string };
  excerpt:    { en: string; ar: string };
  content:    { en: string; ar: string };
  category:   string;
  published:  boolean;
  coverImage: string;
  pdfUrl:     string;
}

const empty: PostForm = {
  title:     { en: '', ar: '' },
  excerpt:   { en: '', ar: '' },
  content:   { en: '', ar: '' },
  category:  '',
  published: false,
  coverImage: '',
  pdfUrl:    '',
};

export default function PostEditorPage() {
  const params   = useParams();
  const router   = useRouter();
  const id       = params.id as string;
  const isNew    = id === 'new';

  const [form,       setForm]       = useState<PostForm>(empty);
  const [tab,        setTab]        = useState<'en' | 'ar'>('en');
  const [loading,    setLoading]    = useState(!isNew);
  const [saving,     setSaving]     = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [saved,      setSaved]      = useState(false);

  // Load existing post
  useEffect(() => {
    if (isNew) return;
    const load = async () => {
      try {
        const { data } = await adminApi.get('/posts/admin/all');
        const post = data.find((p: { _id: string }) => p._id === id);
        if (post) {
          setForm({
            title:      post.title      || { en: '', ar: '' },
            excerpt:    post.excerpt    || { en: '', ar: '' },
            content:    post.content    || { en: '', ar: '' },
            category:   post.category   || '',
            published:  post.published  || false,
            coverImage: post.coverImage || '',
            pdfUrl:     post.pdfUrl     || '',
          });
        }
      } catch {
        router.replace('/admin/posts');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isNew, router]);

  const handleSave = async () => {
    if (!form.title.en.trim()) { alert('English title is required.'); return; }
    console.log('Saving form with pdfUrl:', form.pdfUrl);
    setSaving(true);
    try {
      if (isNew) {
        await adminApi.post('/posts/admin', form);
      } else {
        await adminApi.put(`/posts/admin/${id}`, form);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      if (isNew) router.replace('/admin/posts');
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? (err instanceof Error ? err.message : 'Unknown error');
      alert(`Failed to save post: ${message}`);
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const { data } = await adminApi.post('/upload/image', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm(prev => ({ ...prev, coverImage: data.url }));
    } catch {
      alert('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const { data } = await adminApi.post('/upload/image', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('PDF URL:', data.url);
      console.log('Full response:', JSON.stringify(data));
      setForm(prev => {
        const updated = { ...prev, pdfUrl: data.url };
        console.log('Form pdfUrl after set:', updated.pdfUrl);
        return updated;
      });
    } catch (err) {
      console.error('PDF upload error:', err);
      alert('PDF upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const setField = useCallback(<K extends keyof PostForm>(
    key: K, value: PostForm[K]
  ) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem',
    background: '#0d1e24',
    border: '1px solid rgba(233,206,139,0.15)',
    borderRadius: '6px', color: 'white',
    fontFamily: "'Fira Code', monospace", fontSize: '0.88rem',
    outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.68rem', fontWeight: 700,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem',
    fontFamily: "'Fira Code', monospace",
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)' }}>
      Loading...
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/posts" style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={18} />
          </Link>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: 'white' }}>
            {isNew ? 'New Post' : 'Edit Post'}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* Publish toggle */}
          <button onClick={() => setField('published', !form.published)} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: form.published ? 'rgba(46,160,87,0.12)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${form.published ? 'rgba(46,160,87,0.3)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '6px', padding: '0.6rem 1rem',
            color: form.published ? '#6ee7a0' : 'rgba(255,255,255,0.45)',
            fontFamily: "'Fira Code', monospace", fontSize: '0.78rem',
            cursor: 'pointer', transition: 'all 0.2s',
          }}>
            {form.published ? <Eye size={14} /> : <EyeOff size={14} />}
            {form.published ? 'Published' : 'Draft'}
          </button>

          {/* Save button */}
          <button onClick={handleSave} disabled={saving} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: saved ? 'rgba(46,160,87,0.8)' : '#e9ce8b',
            color: '#061219', border: 'none', borderRadius: '6px',
            padding: '0.6rem 1.25rem',
            fontFamily: "'Fira Code', monospace", fontWeight: 700,
            fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s', opacity: saving ? 0.7 : 1,
          }}>
            <Save size={14} />
            {saved ? 'Saved ✓' : saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}
           className="editor-grid">

        {/* Main editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Language tabs */}
          <div style={{
            display: 'flex', gap: '0',
            background: '#162830',
            border: '1px solid rgba(233,206,139,0.1)',
            borderRadius: '6px', overflow: 'hidden',
            width: 'fit-content',
          }}>
            {(['en', 'ar'] as const).map(l => (
              <button key={l} onClick={() => setTab(l)} style={{
                padding: '0.5rem 1.25rem',
                background: tab === l ? 'rgba(233,206,139,0.12)' : 'transparent',
                border: 'none', cursor: 'pointer',
                color: tab === l ? '#e9ce8b' : 'rgba(255,255,255,0.4)',
                fontFamily: "'Fira Code', monospace", fontSize: '0.78rem',
                fontWeight: tab === l ? 700 : 400,
                transition: 'all 0.2s',
                borderRight: l === 'en' ? '1px solid rgba(233,206,139,0.1)' : 'none',
              }}>
                {l === 'en' ? '🇺🇸 English' : '🇪🇬 Arabic'}
              </button>
            ))}
          </div>

          {/* Title */}
          <div>
            <label style={labelStyle}>Title ({tab.toUpperCase()})</label>
            <input
              value={form.title[tab]}
              onChange={e => setField('title', { ...form.title, [tab]: e.target.value })}
              placeholder={tab === 'en' ? 'Post title in English' : 'عنوان المقال بالعربية'}
              style={{ ...inputStyle, direction: tab === 'ar' ? 'rtl' : 'ltr', fontSize: '1.1rem' }}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label style={labelStyle}>Excerpt ({tab.toUpperCase()})</label>
            <textarea
              value={form.excerpt[tab]}
              onChange={e => setField('excerpt', { ...form.excerpt, [tab]: e.target.value })}
              placeholder={tab === 'en' ? 'Short summary...' : 'ملخص قصير...'}
              rows={2}
              style={{ ...inputStyle, resize: 'vertical', direction: tab === 'ar' ? 'rtl' : 'ltr' }}
            />
          </div>

          {/* Content */}
          <div>
            <label style={labelStyle}>Content ({tab.toUpperCase()})</label>
            <RichEditor
              key={tab}
              content={form.content[tab]}
              onChange={val => setField('content', { ...form.content, [tab]: val })}
              placeholder={tab === 'en' ? 'Write your article...' : 'اكتب مقالك...'}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Category */}
          <div style={{
            background: '#162830',
            border: '1px solid rgba(233,206,139,0.1)',
            borderRadius: '8px', padding: '1.25rem',
          }}>
            <label style={labelStyle}>Category</label>
            <input
              value={form.category}
              onChange={e => setField('category', e.target.value)}
              placeholder="e.g. Corporate Law"
              style={inputStyle}
            />
          </div>

          {/* Cover image */}
          <div style={{
            background: '#162830',
            border: '1px solid rgba(233,206,139,0.1)',
            borderRadius: '8px', padding: '1.25rem',
          }}>
            <label style={labelStyle}>Cover Image</label>

            {form.coverImage && (
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '140px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  background: '#0d1e24',
                }}>
                  <NextImage
                    src={form.coverImage}
                    alt="Cover"
                    fill
                    sizes="280px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            )}

            <label style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(233,206,139,0.06)',
              border: '1px dashed rgba(233,206,139,0.2)',
              borderRadius: '6px', padding: '0.75rem',
              cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
              fontFamily: "'Fira Code', monospace", fontSize: '0.78rem',
              justifyContent: 'center', transition: 'all 0.2s',
            }}>
              <Upload size={14} />
              {uploading ? 'Uploading...' : 'Upload image'}
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>

            {form.coverImage && (
              <button onClick={() => setField('coverImage', '')} style={{
                marginTop: '0.5rem', background: 'none', border: 'none',
                color: 'rgba(255,100,100,0.6)', cursor: 'pointer',
                fontSize: '0.75rem', fontFamily: "'Fira Code', monospace",
                width: '100%', textAlign: 'center',
              }}>
                Remove image
              </button>
            )}
          </div>

          {/* PDF Upload */}
          <div style={{
            background: '#162830',
            border: '1px solid rgba(233,206,139,0.1)',
            borderRadius: '8px', padding: '1.25rem',
          }}>
            <label style={labelStyle}>Article PDF</label>

            {form.pdfUrl ? (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(233,206,139,0.06)',
                border: '1px solid rgba(233,206,139,0.15)',
                borderRadius: '6px', padding: '0.75rem 1rem',
                marginBottom: '0.75rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={14} color="var(--color-accent)" />
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-accent)', fontFamily: "'Fira Code', monospace" }}>
                    PDF uploaded
                  </span>
                </div>
                <a href={form.pdfUrl} target="_blank" rel="noreferrer" style={{
                  fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none', fontFamily: "'Fira Code', monospace",
                }}>
                  Preview →
                </a>
              </div>
            ) : null}

            <label style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(233,206,139,0.06)',
              border: '1px dashed rgba(233,206,139,0.2)',
              borderRadius: '6px', padding: '0.75rem',
              cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
              fontFamily: "'Fira Code', monospace", fontSize: '0.78rem',
              justifyContent: 'center', transition: 'all 0.2s',
            }}>
              <Upload size={14} />
              {uploading ? 'Uploading...' : form.pdfUrl ? 'Replace PDF' : 'Upload PDF'}
              <input
                type="file" accept=".pdf"
                onChange={handlePdfUpload}
                style={{ display: 'none' }}
              />
            </label>

            {form.pdfUrl && (
              <button onClick={() => setField('pdfUrl', '')} style={{
                marginTop: '0.5rem', background: 'none', border: 'none',
                color: 'rgba(255,100,100,0.6)', cursor: 'pointer',
                fontSize: '0.75rem', fontFamily: "'Fira Code', monospace",
                width: '100%', textAlign: 'center',
              }}>
                Remove PDF
              </button>
            )}
          </div>
          {/* Slug preview */}
          {!isNew && (
            <div style={{
              background: '#162830',
              border: '1px solid rgba(233,206,139,0.1)',
              borderRadius: '8px', padding: '1.25rem',
            }}>
              <label style={labelStyle}>Slug</label>
              <p style={{
                fontFamily: "'Fira Code', monospace", fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.35)', wordBreak: 'break-all',
              }}>
                /blog/{form.title.en.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .editor-grid { grid-template-columns: 1fr !important; }
        }
        input:focus, textarea:focus {
          border-color: rgba(233,206,139,0.4) !important;
          outline: none;
        }
      `}</style>
    </div>
  );
}