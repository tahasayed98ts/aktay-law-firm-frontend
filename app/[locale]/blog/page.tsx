import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from '../../../lib/i18n';
import { localePath } from '../../../lib/navigation';
import SectionLabel from '../../../components/ui/SectionLabel';
import GoldDivider from '../../../components/ui/GoldDivider';
import { getPageContent, pick, pickImage } from '../../../lib/pageContent';

import type { Metadata } from 'next';
import { siteConfig, buildTitle } from '../../../lib/metadata';

interface Post {
  _id:        string;
  slug:       string;
  title:      { en: string; ar: string };
  excerpt:    { en: string; ar: string };
  category:   string;
  publishedAt:string;
  coverImage: string;
}

interface Pagination {
  page:  number;
  limit: number;
  total: number;
  pages: number;
}

const POSTS_PER_PAGE = 12;

async function getPosts(page: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${page}&limit=${POSTS_PER_PAGE}`,
      {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!res.ok) return { posts: [] as Post[], pagination: null as Pagination | null };
    const data = await res.json();
    return { posts: data.posts as Post[], pagination: data.pagination as Pagination };
  } catch {
    return { posts: [] as Post[], pagination: null as Pagination | null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: buildTitle(isAr ? 'المدونة القانونية' : 'Legal Blog', locale),
    description: isAr
      ? 'رؤى ومقالات قانونية من مكتب أكتاي للمحاماة حول القانون المصري والدولي.'
      : 'Legal insights and articles from Aktay Law Firm on Egyptian and international law.',
    alternates: { canonical: `${siteConfig.url}/${locale}/blog` },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10) || 1);

  const t       = getTranslations(locale);
  const lp      = (path: string) => localePath(locale, path);
  const { posts, pagination } = await getPosts(currentPage);
  const isRtl   = locale === 'ar';
  const content = await getPageContent();
  const p       = (key: string, fallback: string) => pick(content, key, locale, fallback);

  return (
    <>
      {/* Hero */}
      <section style={{
        paddingTop: '160px', paddingBottom: '80px',
        background: `linear-gradient(135deg, rgba(13,30,36,0.98) 0%, rgba(59,91,102,0.6) 100%),
          url('${pickImage(content, 'image.blog.hero.bg', 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1600')}') center/cover no-repeat`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          [isRtl ? 'right' : 'left']: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)',
        }} />
        <div className="site-container">
          <SectionLabel>{p('blog.hero.label', t('blog.label'))}</SectionLabel>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 600, color: 'white',
            lineHeight: 1.1, marginBottom: '1.25rem',
          }}>
            {p('blog.hero.heading', t('blog.heading'))}
          </h1>
          <GoldDivider />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '500px', lineHeight: 1.8, fontFamily: 'var(--font-sans)' }}>
            {p('blog.hero.sub', t('blog.sub'))}
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section style={{ padding: '7rem 0', background: 'var(--color-site-dark)' }}>
        <div className="site-container">
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>
                {p('blog.noPosts', t('blog.noPosts'))}
              </p>
            </div>
          ) : (
            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {posts.map((post) => {
                const title   = post.title[locale as 'en' | 'ar']   || post.title.en;
                const excerpt = post.excerpt[locale as 'en' | 'ar'] || post.excerpt.en;
                const date    = new Date(post.publishedAt).toLocaleDateString(
                  locale === 'ar' ? 'ar-EG' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                );

                return (
                  <article key={post._id} style={{
                    background: 'var(--color-site-card)',
                    border: '1px solid rgba(233,206,139,0.1)',
                    overflow: 'hidden',
                    transition: 'transform 0.3s, border-color 0.3s',
                    display: 'flex', flexDirection: 'column',
                  }}
                  className="blog-card">
                    {/* Cover */}
                    <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: 'var(--color-primary-dark)' }}>
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={title}
                          fill
                          sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 33vw"
                          className="blog-card-img"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%',
                          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '2.5rem',
                        }}>⚖️</div>
                      )}
                    </div>

                    {/* Body */}
                    <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-sans)', fontSize: '0.68rem',
                          fontWeight: 700, letterSpacing: '0.12em',
                          textTransform: 'uppercase', color: 'var(--color-accent)',
                          background: 'rgba(233,206,139,0.08)',
                          padding: '0.25rem 0.75rem',
                        }}>
                          {post.category}
                        </span>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                          {date}
                        </span>
                      </div>
                      <h3 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.25rem', fontWeight: 600,
                        color: 'white', marginBottom: '0.75rem',
                        lineHeight: 1.3, flex: 1,
                      }}>
                        {title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.7, marginBottom: '1.5rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      } as React.CSSProperties}>
                        {excerpt}
                      </p>
                      <Link href={lp(`/blog/${post.slug}`)} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontFamily: 'var(--font-sans)', fontSize: '0.78rem',
                        fontWeight: 600, letterSpacing: '0.1em',
                        textTransform: 'uppercase', color: 'var(--color-accent)',
                        textDecoration: 'none', transition: 'gap 0.2s',
                        marginTop: 'auto',
                      }}>
                        {p('blog.readMore', t('blog.readMore'))} →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {pagination && pagination.pages > 1 && (
            <nav
              aria-label="Pagination"
              style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                gap: '0.5rem', marginTop: '4rem', flexWrap: 'wrap',
              }}
            >
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((n) => {
                const isActive = n === currentPage;
                const href = n === 1 ? lp('/blog') : lp(`/blog?page=${n}`);
                return (
                  <Link
                    key={n}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      minWidth: '2.5rem', height: '2.5rem', padding: '0 0.5rem',
                      fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 600,
                      color: isActive ? 'var(--color-site-dark)' : 'rgba(255,255,255,0.6)',
                      background: isActive ? 'var(--color-accent)' : 'transparent',
                      border: '1px solid rgba(233,206,139,0.2)',
                      textDecoration: 'none',
                    }}
                  >
                    {n}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
        <style>{`
          .blog-grid { grid-template-columns: repeat(3,1fr); }
          @media (max-width: 900px) { .blog-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 580px) { .blog-grid { grid-template-columns: 1fr !important; } }
          .blog-card:hover { transform: translateY(-4px); border-color: rgba(233,206,139,0.3) !important; }
          .blog-card:hover .blog-card-img { transform: scale(1.04); }
        `}</style>
      </section>
    </>
  );
}