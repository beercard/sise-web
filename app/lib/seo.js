/*
 * Base absoluta del sitio para canónicas, og:image y sitemap. Mientras el
 * dominio propio no esté enganchado, usa el de producción que informa Vercel
 * (VERCEL_PROJECT_PRODUCTION_URL, que pasa a ser el dominio propio en cuanto
 * se lo asigna) para que los enlaces compartidos por WhatsApp o redes puedan
 * descargar la imagen. NEXT_PUBLIC_SITE_URL lo fuerza a mano si hace falta.
 */
const FALLBACK_SITE_URL = 'https://siseargentina.com';

function resolveSiteUrl() {
  const explicito = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicito) return explicito.replace(/\/$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;

  return FALLBACK_SITE_URL;
}

export const siteConfig = {
  siteUrl: resolveSiteUrl(),
  name: 'SISE Argentina',
  legalName: 'GRUPO SISE S.A.',
  defaultTitle: 'SISE Argentina | Soluciones de seguridad electrónica',
  description:
    'Soluciones de seguridad electrónica para hogares, comercios, industrias, edificios, obras, campo y ciudades.',
  locale: 'es_AR',
  themeColor: '#00408c',
  icon: '/image/mpr0za9r-avr9t9i.png',
  ogImage: '/image/og-home.jpg',
  phone: '+54 800 222 5153',
  email: 'info@siseargentina.com',
  whatsapp: '5493624231144',
  address: {
    streetAddress: 'Avenida 9 de julio 2514',
    addressLocality: 'Resistencia',
    addressRegion: 'Chaco',
    postalCode: '3500',
    addressCountry: 'AR'
  },
  geo: {
    latitude: -27.451,
    longitude: -58.9867
  },
  aggregateRating: {
    ratingValue: 4.6,
    reviewCount: 90
  },
  sameAs: [
    'https://www.instagram.com/sise.argentina',
    'https://www.facebook.com/sise.argentina',
    'https://www.tiktok.com/@sise.argentina',
    'https://www.youtube.com/@SISEArgentina'
  ],
  foundingDate: '2009',
  foundingLocation: 'Resistencia, Chaco, Argentina'
};

export const defaultSeoKeywords = [
  'SISE Argentina',
  'seguridad electrónica',
  'alarmas monitoreadas',
  'monitoreo de alarmas 24/7',
  'cámaras de seguridad',
  'videovigilancia',
  'control de accesos',
  'seguridad en Resistencia',
  'seguridad en Chaco',
  'seguridad en Corrientes',
  'seguridad en el NEA'
];

export const defaultRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1
  }
};

export const noIndexRobots = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1
  }
};

function uniqueKeywords(keywords = []) {
  return [...new Set([...defaultSeoKeywords, ...keywords].filter(Boolean))];
}

export const seoRoutes = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/hogar', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/comercio', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/industria', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/edificios', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/construccion', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/agro', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/ciudad', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/historia', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/rse', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contacto', changeFrequency: 'monthly', priority: 0.8 }
];

export function buildPageMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image = siteConfig.ogImage,
  category,
  robots = defaultRobots
}) {
  const canonicalPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle;
  const normalizedKeywords = uniqueKeywords(keywords);

  return {
    title: fullTitle,
    description,
    keywords: normalizedKeywords,
    category,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalPath,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title ?? 'Seguridad electrónica'}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image]
    },
    robots
  };
}

export function buildLocalAreas(extraAreas = []) {
  return [
    {
      '@type': 'City',
      name: siteConfig.address.addressLocality
    },
    {
      '@type': 'AdministrativeArea',
      name: siteConfig.address.addressRegion
    },
    {
      '@type': 'Country',
      name: 'Argentina'
    },
    ...extraAreas
  ];
}

export function buildWebPageSchema({ path = '/', title, description, type = 'WebPage' }) {
  const canonicalPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  const url = `${siteConfig.siteUrl}${canonicalPath}`;

  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'es-AR',
    isPartOf: {
      '@id': `${siteConfig.siteUrl}/#website`
    },
    mainEntityOfPage: url,
    about: {
      '@id': `${siteConfig.siteUrl}/#organization`
    },
    breadcrumb: {
      '@id': `${url}#breadcrumb`
    }
  };
}

export function buildBreadcrumbSchema({ path = '/', name, parents = [] }) {
  const canonicalPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  const url = `${siteConfig.siteUrl}${canonicalPath}`;

  const trail = [
    { name: 'Inicio', item: `${siteConfig.siteUrl}/` },
    ...parents,
    { name, item: url }
  ];

  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: trail.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item
    }))
  };
}

export function buildFAQPageSchema({ path = '/', questions = [] }) {
  const canonicalPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  const url = `${siteConfig.siteUrl}${canonicalPath}`;

  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function buildServiceSchema({
  path = '/',
  name,
  description,
  serviceType,
  audience,
  areaServed = buildLocalAreas()
}) {
  const canonicalPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  const url = `${siteConfig.siteUrl}${canonicalPath}`;

  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    url,
    name,
    description,
    serviceType,
    mainEntityOfPage: url,
    provider: {
      '@id': `${siteConfig.siteUrl}/#organization`
    },
    areaServed,
    audience: audience
      ? {
          '@type': 'Audience',
          audienceType: audience
        }
      : undefined,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: siteConfig.phone
    }
  };
}

export function buildItemListSchema({ path = '/', name, items = [] }) {
  const canonicalPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  const url = `${siteConfig.siteUrl}${canonicalPath}`;

  return {
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    url,
    name,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      description: item.description
    }))
  };
}
