export const siteConfig = {
  siteUrl: 'https://siseargentina.com',
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
  // Reseñas reales de la ficha de Google Business de SISE Argentina.
  aggregateRating: {
    ratingValue: 4.6,
    reviewCount: 90
  },
  sameAs: [
    'https://www.instagram.com/sise.argentina',
    'https://www.facebook.com/sise.argentina',
    'https://www.tiktok.com/@sise.argentina',
    'https://www.youtube.com/@SISEArgentina'
  ]
};

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
  { path: '/contacto', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/legales', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/privacidad', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/cookies', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/arrepentimiento', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/baja', changeFrequency: 'yearly', priority: 0.3 }
];

export function buildPageMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image = siteConfig.ogImage
}) {
  const canonicalPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle;

  return {
    title: fullTitle,
    description,
    keywords,
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
    }
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
    about: {
      '@id': `${siteConfig.siteUrl}/#organization`
    },
    breadcrumb: {
      '@id': `${url}#breadcrumb`
    }
  };
}

/**
 * Migas de pan para Search (rich result de breadcrumb). Siempre arranca en
 * Inicio y agrega el tramo actual; admite niveles intermedios opcionales.
 */
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
