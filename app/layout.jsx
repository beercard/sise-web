import './globals.scss';

import { League_Spartan } from 'next/font/google';

import { siteConfig } from './lib/seo';
import SiteFooter from './components/SiteFooter/SiteFooter';
import SiteHeader from './components/SiteHeader/SiteHeader';

import styles from './layout.module.scss';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700'],
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
  applicationName: siteConfig.name,
  authors: [{ name: 'Vektra Digital', url: 'https://vektra.digital' }],
  creator: 'Vektra Digital',
  publisher: siteConfig.legalName,
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
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
        height: 630,
        alt: `${siteConfig.name} - Seguridad electrónica`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImage]
  }
};

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
        publisher: {
          '@id': `${siteConfig.siteUrl}/#organization`
        }
      }
    ]
  };

  return (
    <html lang="es" className={leagueSpartan.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className={styles.page}>
          <SiteHeader />
          <main className={styles.main}>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

