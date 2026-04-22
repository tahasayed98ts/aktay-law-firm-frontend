import { MetadataRoute } from 'next';
import { siteConfig } from '../lib/metadata';

const locales = ['en', 'ar'];
const staticPages = ['', '/about', '/services', '/blog', '/contact', '/join-us'];

async function getPosts(): Promise<{ slug: string; updatedAt: string }[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?limit=100`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts ?? [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap(locale =>
    staticPages.map(page => ({
      url:              `${siteConfig.url}/${locale}${page}`,
      lastModified:     new Date(),
      changeFrequency:  page === '' ? 'weekly' : 'monthly' as const,
      priority:         page === '' ? 1 : 0.8,
    }))
  );

  const blogRoutes: MetadataRoute.Sitemap = locales.flatMap(locale =>
    posts.map(post => ({
      url:             `${siteConfig.url}/${locale}/blog/${post.slug}`,
      lastModified:    new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority:        0.7,
    }))
  );

  return [...staticRoutes, ...blogRoutes];
}