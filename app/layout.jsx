import './globals.scss';

import { League_Spartan } from 'next/font/google';
import Script from 'next/script';

import { defaultRobots, defaultSeoKeywords, siteConfig } from './lib/seo';
import SiteFooter from './components/SiteFooter/SiteFooter';
import SiteHeader from './components/SiteHeader/SiteHeader';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton/WhatsAppFloatingButton';

import styles from './layout.module.scss';

/* El 400 es imprescindible: sin esa cara, cualquier `font-weight: 400` del
   sitio se resuelve con la de 500 y el texto se lee como negrita. */
const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteConfig.themeColor
};

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  keywords: defaultSeoKeywords,
  applicationName: siteConfig.name,
  authors: [{ name: 'Vektra Digital', url: 'https://vektra.digital' }],
  creator: 'Vektra Digital',
  publisher: siteConfig.legalName,
  /* Sin canonical global: cada página declara el suyo vía buildPageMetadata;
     un canonical acá haría que cualquier ruta que lo olvide herede el del home. */
  robots: defaultRobots,
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    url: '/',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 1200,
        alt: `${siteConfig.name} - Seguridad electrónica`
      },
      {
        url: siteConfig.ogImageWide,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Seguridad electrónica`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImageWide]
  }
};

const GA_MEASUREMENT_ID = 'G-G1WY55DRWQ';

export default function RootLayout({ children }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        description: siteConfig.description,
        slogan: 'Seguridad electrónica y monitoreo de alarmas 24/7 en todo el NEA',
        url: siteConfig.siteUrl,
        logo: `${siteConfig.siteUrl}${siteConfig.icon}`,
        image: `${siteConfig.siteUrl}${siteConfig.ogImage}`,
        foundingDate: siteConfig.foundingDate,
        foundingLocation: {
          '@type': 'Place',
          name: siteConfig.foundingLocation
        },
        email: siteConfig.email,
        telephone: siteConfig.phone,
        priceRange: '$$',
        currenciesAccepted: 'ARS',
        knowsAbout: [
          'Alarmas monitoreadas',
          'Monitoreo de alarmas 24/7',
          'Seguridad electrónica',
          'Videovigilancia y cámaras de seguridad',
          'Control de accesos',
          'Cerco eléctrico y protección perimetral',
          'Seguridad rural',
          'Seguridad urbana y videovigilancia para municipios'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Soluciones de seguridad SISE',
          itemListElement: [
            { '@type': 'OfferCatalog', name: 'Seguridad para hogares' },
            { '@type': 'OfferCatalog', name: 'Seguridad para comercios' },
            { '@type': 'OfferCatalog', name: 'Seguridad para industrias y empresas' },
            { '@type': 'OfferCatalog', name: 'Seguridad para edificios y consorcios' },
            { '@type': 'OfferCatalog', name: 'Seguridad para obras y construcción' },
            { '@type': 'OfferCatalog', name: 'Seguridad rural para el campo' },
            { '@type': 'OfferCatalog', name: 'Seguridad para ciudades y espacio público' }
          ]
        },
        sameAs: siteConfig.sameAs,
        address: {
          '@type': 'PostalAddress',
          ...siteConfig.address
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude
        },
        ...(siteConfig.aggregateRating
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: siteConfig.aggregateRating.ratingValue,
                reviewCount: siteConfig.aggregateRating.reviewCount,
                bestRating: 5,
                worstRating: 1
              }
            }
          : {}),
        areaServed: [
          { '@type': 'City', name: 'Resistencia' },
          { '@type': 'City', name: 'Corrientes' },
          { '@type': 'City', name: 'Formosa' },
          { '@type': 'City', name: 'Posadas' },
          { '@type': 'AdministrativeArea', name: 'Chaco' },
          { '@type': 'AdministrativeArea', name: 'Corrientes' },
          { '@type': 'AdministrativeArea', name: 'Formosa' },
          { '@type': 'AdministrativeArea', name: 'Misiones' },
          { '@type': 'Place', name: 'NEA - Nordeste Argentino' }
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday'
            ],
            opens: '00:00',
            closes: '23:59'
          }
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: siteConfig.phone,
            contactType: 'customer service',
            areaServed: 'AR',
            availableLanguage: ['es']
          }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.siteUrl}/#website`,
        url: siteConfig.siteUrl,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: 'es-AR',
        keywords: defaultSeoKeywords.join(', '),
        about: {
          '@id': `${siteConfig.siteUrl}/#organization`
        },
        publisher: {
          '@id': `${siteConfig.siteUrl}/#organization`
        }
      }
    ]
  };

  return (
    <html lang="es-AR" className={leagueSpartan.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className={styles.page}>
          <SiteHeader />
          <main className={styles.main}>{children}</main>
          <SiteFooter />
          <WhatsAppFloatingButton />
        </div>
      </body>
    </html>
  );
}

