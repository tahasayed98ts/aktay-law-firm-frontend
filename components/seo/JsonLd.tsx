import { siteConfig } from '../../lib/metadata';

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    name:    siteConfig.name,
    url:     siteConfig.url,
    logo:    siteConfig.logo,
    image:   siteConfig.logo,
    description: 'Expert legal services in Cairo, Egypt since 2004.',
    foundingDate: siteConfig.founded,
    telephone:    siteConfig.phone,
    email:        siteConfig.email,
    address: {
      '@type':          'PostalAddress',
      streetAddress:    '103 Narges 1',
      addressLocality:  'New Cairo',
      addressRegion:    'Cairo',
      addressCountry:   'EG',
    },
    geo: {
      '@type':     'GeoCoordinates',
      latitude:    siteConfig.lat,
      longitude:   siteConfig.lng,
    },
    openingHoursSpecification: {
      '@type':       'OpeningHoursSpecification',
      dayOfWeek:     ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens:         '09:00',
      closes:        '17:00',
    },
    sameAs: Object.values(siteConfig.socials),
    areaServed: ['Egypt', 'International'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    'Legal Services',
      itemListElement: [
        'Corporate Services', 'Real Estate Services', 'Execution Services',
        'Family Law', 'Labor Law', 'Civil Law',
        'Criminal Law', 'Personal Status Law', 'General Legal Services',
      ].map(name => ({
        '@type':       'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPostJsonLd({
  title, description, url, image, datePublished, locale,
}: {
  title: string; description: string; url: string;
  image?: string; datePublished: string; locale: string;
}) {
  const schema = {
    '@context':       'https://schema.org',
    '@type':          'BlogPosting',
    headline:         title,
    description,
    url,
    image,
    datePublished,
    dateModified:     datePublished,
    inLanguage:       locale === 'ar' ? 'ar-EG' : 'en-US',
    author: {
      '@type': 'Organization',
      name:    siteConfig.name,
      url:     siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name:    siteConfig.name,
      logo:  { '@type': 'ImageObject', url: siteConfig.logo },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      item.name,
      item:      item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}