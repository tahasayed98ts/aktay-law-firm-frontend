interface ContentMap {
  [key: string]: { en: string; ar: string };
}

let cache: ContentMap | null = null;
let cacheTime = 0;
const CACHE_TTL = 30_000;

export async function getPageContent(): Promise<ContentMap> {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_TTL) return cache;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pages`,
      { cache: 'no-store' }
    );
    if (!res.ok) return {};
    const data = await res.json();
    cache = data;
    cacheTime = now;
    return data;
  } catch {
    return {};
  }
}

export function pick(
  content: ContentMap,
  key: string,
  locale: string,
  fallback: string
): string {
  const block = content[key];
  if (!block) return fallback;
  return block[locale as 'en' | 'ar'] || fallback;
}

// Images are locale-independent — stored in the `en` field
export function pickImage(
  content: ContentMap,
  key: string,
  fallback: string
): string {
  const block = content[key];
  if (!block || !block.en) return fallback;
  return block.en;
}