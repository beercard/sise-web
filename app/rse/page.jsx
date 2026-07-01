import RseHero from './components/RseHero/RseHero';
import RseInitiativesCarousel from './components/RseInitiativesCarousel/RseInitiativesCarousel';

import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from '../lib/seo';
import styles from './page.module.scss';

const PAGE_TITLE = 'Responsabilidad social empresarial';
const PAGE_DESCRIPTION =
  'Acciones de responsabilidad social de SISE Argentina: comunidad, inclusión, deporte, educación y ambiente en el NEA.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/rse',
  image: '/image/og-rse.jpg',
  keywords: [
    'responsabilidad social empresarial SISE',
    'RSE seguridad electrónica',
    'compromiso con la comunidad en el Chaco',
    'inclusión y deporte en Resistencia',
    'empresa comprometida con el NEA',
    'acciones sociales empresa de seguridad'
  ]
});

const rseStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/rse',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'AboutPage'
    }),
    buildBreadcrumbSchema({ path: '/rse', name: 'Responsabilidad social' })
  ]
};

export default function RsePage() {
  return (
    <div className={styles.rse}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rseStructuredData) }}
      />
      <RseHero />
      <RseInitiativesCarousel />
    </div>
  );
}
