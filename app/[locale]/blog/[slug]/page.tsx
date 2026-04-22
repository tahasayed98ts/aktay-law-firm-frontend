import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from '../../../../lib/i18n';
import { localePath } from '../../../../lib/navigation';
import GoldDivider from '../../../../components/ui/GoldDivider';
import CtaBanner from '../../../../components/sections/CtaBanner';
import DownloadButton from '../../../../components/ui/DownloadButton';

import type { Metadata } from 'next';
import { BlogPostJsonLd, BreadcrumbJsonLd } from '../../../../components/seo/JsonLd';

import { siteConfig, buildTitle } from '../../../../lib/metadata';


interface Post {
  _id:        string;
  slug:       string;
  title:      { en: string; ar: string };
  content:    { en: string; ar: string };
  excerpt:    { en: string; ar: string };
  category:   string;
  publishedAt:string;
  coverImage: string;
  pdfUrl:     string;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title   = post.title[locale as 'en' | 'ar']   || post.title.en;
  const excerpt = post.excerpt[locale as 'en' | 'ar'] || post.excerpt.en;

  return {
    title:       buildTitle(title, locale),
    description: excerpt,
    alternates:  { canonical: `${siteConfig.url}/${locale}/blog/${slug}` },
    openGraph: {
      title,
      description: excerpt,
      type:        'article',
      images:      post.coverImage ? [{ url: post.coverImage }] : [],
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t    = getTranslations(locale);
  const lp   = (p: string) => localePath(locale, p);
  const post = await getPost(slug);

  if (!post) notFound();

  const title   = post.title[locale as 'en' | 'ar']   || post.title.en;
  const content = post.content[locale as 'en' | 'ar'] || post.content.en;
  const isRtl   = locale === 'ar';

  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <>
      <BlogPostJsonLd
        title={title}
        description={post.excerpt[locale as 'en' | 'ar'] || post.excerpt.en}
        url={`${siteConfig.url}/${locale}/blog/${post.slug}`}
        image={post.coverImage}
        datePublished={post.publishedAt}
        locale={locale}
      />

      <BreadcrumbJsonLd items={[
        { name: locale === 'ar' ? 'الرئيسية' : 'Home',  url: `${siteConfig.url}/${locale}` },
        { name: locale === 'ar' ? 'المدونة'  : 'Blog',  url: `${siteConfig.url}/${locale}/blog` },
        { name: title, url: `${siteConfig.url}/${locale}/blog/${post.slug}` },
      ]} />
      
      {/* Hero */}
      <section style={{
        paddingTop: '160px', paddingBottom: '60px',
        background: post.coverImage
          ? `linear-gradient(to bottom, rgba(13,30,36,0.92) 0%, rgba(13,30,36,0.98) 100%),
             url('${post.coverImage}') center/cover no-repeat`
          : `linear-gradient(135deg, rgba(13,30,36,0.98) 0%, rgba(59,91,102,0.7) 100%)`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          [isRtl ? 'right' : 'left']: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)',
        }} />
        <div className="site-container">
          <Link href={lp('/blog')} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: 'var(--font-sans)', fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
            marginBottom: '2rem', transition: 'color 0.2s',
          }}>
            ← {t('blog.backToBlog')}
          </Link>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--color-accent)', background: 'rgba(233,206,139,0.1)',
              padding: '0.3rem 0.85rem',
            }}>
              {post.category}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>
              {t('blog.publishedOn')} {date}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 600, color: 'white',
            lineHeight: 1.12, maxWidth: '800px',
          }}>
            {title}
          </h1>
        </div>
      </section>

      {/* Article body */}
      <section style={{ padding: '5rem 0', background: 'var(--color-site-dark)' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem', alignItems: 'start' }}
               className="article-grid">

            {/* Content */}
            <article>
              <GoldDivider />
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </article>

            {/* Sidebar */}
            <aside>
              <div style={{
                background: 'var(--color-site-card)',
                border: '1px solid rgba(233,206,139,0.12)',
                padding: '2rem', position: 'sticky', top: '100px',
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.7rem',
                  fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'var(--color-accent)',
                  marginBottom: '1.25rem',
                }}>
                  {locale === 'ar' ? 'استشارة مجانية' : 'Free Consultation'}
                </h4>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.88rem',
                  color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '1.5rem',
                }}>
                  {locale === 'ar'
                    ? 'هل لديك سؤال قانوني؟ تواصل مع فريقنا اليوم.'
                    : 'Have a legal question? Reach out to our team today.'}
                </p>
                <Link href={lp('/contact')} style={{
                  display: 'block', textAlign: 'center',
                  background: 'var(--color-accent)', color: 'var(--color-site-deep)',
                  fontFamily: 'var(--font-sans)', fontWeight: 700,
                  fontSize: '0.75rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase', padding: '0.875rem',
                  textDecoration: 'none',
                }}>
                  {t('nav.appointment')} →
                </Link>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(233,206,139,0.1)' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-sans)', fontSize: '0.7rem',
                    fontWeight: 700, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'var(--color-accent)',
                    marginBottom: '1rem',
                  }}>
                    {locale === 'ar' ? 'التواصل' : 'Contact'}
                  </h4>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.5)', lineHeight: 2,
                  }}>
                    <div>📞 011 011 077 88</div>
                    <div>✉️ info@aktaylawfirmeg.com</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <style>{`
          .article-grid { grid-template-columns: 1fr 300px; }
          @media (max-width: 900px) { .article-grid { grid-template-columns: 1fr !important; } }
          .article-content {
            font-family: var(--font-sans);
            font-size: 1rem;
            color: rgba(255,255,255,0.75);
            line-height: 1.9;
          }
          .article-content h1,
          .article-content h2,
          .article-content h3 {
            font-family: var(--font-serif);
            color: white;
            margin: 2rem 0 1rem;
            line-height: 1.2;
          }
          .article-content h2 { font-size: 1.75rem; }
          .article-content h3 { font-size: 1.35rem; }
          .article-content p  { margin-bottom: 1.25rem; }
          .article-content ul, .article-content ol {
            padding-inline-start: 1.5rem;
            margin-bottom: 1.25rem;
          }
          .article-content li { margin-bottom: 0.5rem; }
          .article-content strong { color: white; font-weight: 600; }
          .article-content a { color: var(--color-accent); }
          .article-content blockquote {
            border-inline-start: 2px solid var(--color-accent);
            padding-inline-start: 1.25rem;
            color: rgba(255,255,255,0.6);
            font-style: italic;
            margin: 1.5rem 0;
          }
        `}</style>
      </section>

      {/* Download section */}
      {post.pdfUrl && (
        <section style={{ padding: '4rem 0', background: 'var(--color-site-card)' }}>
          <div className="site-container">
            <div style={{
              maxWidth: '680px', margin: '0 auto',
              background: 'var(--color-site-dark)',
              border: '1px solid rgba(233,206,139,0.15)',
              borderRadius: '8px', padding: '2.5rem',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{
                  width: '52px', height: '52px', flexShrink: 0,
                  background: 'rgba(233,206,139,0.08)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="var(--color-accent)" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.3rem', fontWeight: 600,
                    color: 'white', marginBottom: '0.4rem',
                  }}>
                    {locale === 'ar' ? 'تحميل المقال' : 'Download Article'}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.6,
                  }}>
                    {locale === 'ar'
                      ? 'قم بتحميل المقال والاستفادة من المحتوى'
                      : 'Download the article and benefit from the content'}
                  </p>
                </div>
              </div>

              
                <DownloadButton
                  url={post.pdfUrl}
                  label={locale === 'ar' ? 'تحميل PDF' : 'Download PDF'}
                />
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        heading={locale === 'ar' ? 'هل تحتاج إلى استشارة قانونية؟' : 'Need Legal Guidance?'}
        sub={locale === 'ar' ? 'تواصل معنا اليوم.' : 'Contact us today to schedule your free consultation.'}
        ctaLabel={t('nav.appointment')}
        ctaHref={lp('/contact')}
      />
    </>
  );
}