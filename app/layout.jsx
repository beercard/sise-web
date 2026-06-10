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

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  applicationName: siteConfig.name,
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
  icons: {
    icon: siteConfig.icon,
    shortcut: siteConfig.icon,
    apple: siteConfig.icon
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
        alt: `${siteConfig.name} - Seguridad electronica`
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
        '@type': 'Organization',
        '@id': `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.legalName,
        url: siteConfig.siteUrl,
        logo: `${siteConfig.siteUrl}${siteConfig.icon}`,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        sameAs: siteConfig.sameAs,
        address: {
          '@type': 'PostalAddress',
          ...siteConfig.address
        },
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

