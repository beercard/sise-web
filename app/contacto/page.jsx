import ContactoHero from './components/ContactoHero/ContactoHero';

import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildWebPageSchema,
  siteConfig
} from '../lib/seo';
import styles from './page.module.scss';

const PAGE_TITLE = 'Contacto y atención 24 horas';
const PAGE_DESCRIPTION =
  'Contactá a SISE Argentina por teléfono, WhatsApp o correo. Asesoramiento en seguridad electrónica y alarmas en Resistencia, Chaco y el NEA.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/contacto',
  image: '/image/og-contacto.jpg',
  keywords: [
    'contacto SISE Argentina',
    'empresa de seguridad en Resistencia',
    'empresa de alarmas en Chaco',
    'teléfono de monitoreo de alarmas',
    'asesoramiento en seguridad electrónica',
    'cotizar alarma monitoreada',
    'servicio técnico de alarmas en el NEA',
    'atención 24 horas'
  ]
});

const contactoStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...buildWebPageSchema({
        path: '/contacto',
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        type: 'ContactPage'
      }),
      mainEntity: {
        '@id': `${siteConfig.siteUrl}/#organization`
      }
    },
    buildBreadcrumbSchema({ path: '/contacto', name: 'Contacto' }),
    {
      '@type': 'ContactPoint',
      '@id': `${siteConfig.siteUrl}/contacto#contactpoint`,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: 'customer service',
      areaServed: ['AR', 'Resistencia', 'Chaco', 'Corrientes', 'NEA'],
      availableLanguage: ['es'],
      hoursAvailable: {
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
    }
  ]
};

export default function ContactoPage() {
  return (
    <div className={styles.contacto}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactoStructuredData) }}
      />
      <ContactoHero />
    </div>
  );
}
