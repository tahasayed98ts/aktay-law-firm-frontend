'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import adminApi from '../../../lib/adminApi';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';

interface Post {
  _id: string;
  title: { en: string; ar: string };
  slug: string;
  category: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
}

export default function PostsPage() {
  const [posts,   setPosts]   = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const { data } = await adminApi.get('/posts/admin/all');
      setPosts(data);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await adminApi.delete(`/posts/admin/${id}`);
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch {
      alert('Failed to delete post.');
    } finally {
      setDeleting(null);
    }
  };

  const handleTogglePublish = async (post: Post) => {
    try {
      const { data } = await adminApi.put(`/posts/admin/${post._id}`, {
        published: !post.published,
      });
      setPosts(prev => prev.map(p => p._id === post._id ? { ...p, published: data.published } : p));
    } catch {
      alert('Failed to update post.');
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>
            Blog Posts
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>
            {posts.length} total · {posts.filter(p => p.published).length} published
          </p>
        </div>
        <Link href="/admin/posts/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: '#e9ce8b', color: '#061219',
          padding: '0.65rem 1.25rem', borderRadius: '6px',
          fontFamily: "'Fira Code', monospace", fontWeight: 700,
          fontSize: '0.78rem', letterSpacing: '0.08em',
          textTransform: 'uppercase', textDecoration: 'none',
          transition: 'background 0.2s',
        }}>
          <Plus size={15} /> New Post
        </Link>
      </div>

      {/* Table */}
      <div style={{
        background: '#162830',
        border: '1px solid rgba(233,206,139,0.1)',
        borderRadius: '8px', overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 140px 120px 100px 100px',
          padding: '0.75rem 1.25rem',
          borderBottom: '1px solid rgba(233,206,139,0.1)',
          fontSize: '0.68rem', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
        }}>
          <span>Title</span>
          <span>Category</span>
          <span>Status</span>
          <span>Date</span>
          <span style={{ textAlign: 'right' }}>Actions</span>
        </div>

        {/* Rows */}
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
            Loading...
          </div>
        ) : posts.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              No posts yet.
            </p>
            <Link href="/admin/posts/new" style={{
              color: '#e9ce8b', fontSize: '0.82rem', textDecoration: 'none',
            }}>
              Create your first post →
            </Link>
          </div>
        ) : (
          posts.map((post, i) => (
            <div key={post._id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 140px 120px 100px 100px',
              padding: '1rem 1.25rem',
              borderBottom: i < posts.length - 1 ? '1px solid rgba(233,206,139,0.06)' : 'none',
              alignItems: 'center',
              transition: 'background 0.15s',
            }}
            className="post-row">
              {/* Title */}
              <div>
                <div style={{ fontSize: '0.88rem', color: 'white', marginBottom: '0.2rem', fontWeight: 500 }}>
                  {post.title.en}
                </div>
                {post.title.ar && (
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', direction: 'rtl' }}>
                    {post.title.ar}
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#e9ce8b', background: 'rgba(233,206,139,0.08)',
                  padding: '0.2rem 0.6rem', borderRadius: '4px',
                }}>
                  {post.category}
                </span>
              </div>

              {/* Status */}
              <div>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: post.published ? '#6ee7a0' : 'rgba(255,255,255,0.35)',
                  background: post.published ? 'rgba(46,160,87,0.12)' : 'rgba(255,255,255,0.05)',
                  padding: '0.2rem 0.6rem', borderRadius: '4px',
                }}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>

              {/* Date */}
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleTogglePublish(post)}
                  title={post.published ? 'Unpublish' : 'Publish'}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: post.published ? '#6ee7a0' : 'rgba(255,255,255,0.3)',
                    padding: '0.3rem', borderRadius: '4px', transition: 'color 0.2s',
                    display: 'flex', alignItems: 'center',
                  }}>
                  {post.published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <Link href={`/admin/posts/${post._id}`}
                  title="Edit"
                  style={{
                    color: 'rgba(255,255,255,0.3)', padding: '0.3rem',
                    borderRadius: '4px', transition: 'color 0.2s',
                    display: 'flex', alignItems: 'center',
                  }}
                  className="edit-btn">
                  <Pencil size={15} />
                </Link>
                <button
                  onClick={() => handleDelete(post._id, post.title.en)}
                  disabled={deleting === post._id}
                  title="Delete"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.3)', padding: '0.3rem',
                    borderRadius: '4px', transition: 'color 0.2s',
                    display: 'flex', alignItems: 'center',
                  }}
                  className="delete-btn">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .post-row:hover { background: rgba(233,206,139,0.03); }
        .edit-btn:hover   { color: #e9ce8b !important; }
        .delete-btn:hover { color: #ff8080 !important; }
      `}</style>
    </div>
  );
}