import RseHero from './components/RseHero/RseHero';
import RseInitiativesCarousel from './components/RseInitiativesCarousel/RseInitiativesCarousel';

import { buildBreadcrumbSchema, buildItemListSchema, buildPageMetadata, buildWebPageSchema } from '../lib/seo';
import styles from './page.module.scss';

const PAGE_TITLE = 'Responsabilidad social empresarial';
const PAGE_DESCRIPTION =
  'Acciones de responsabilidad social de SISE Argentina en comunidad, inclusión, deporte, educación y ambiente en Resistencia, Chaco y el NEA.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/rse',
  image: '/image/og-rse.jpg',
  category: 'Institucional',
  keywords: [
    'responsabilidad social empresarial SISE',
    'RSE seguridad electrónica',
    'compromiso con la comunidad en el Chaco',
    'inclusión y deporte en Resistencia',
    'empresa comprometida con el NEA',
    'acciones sociales empresa de seguridad',
    'programas sociales en Chaco',
    'empresa con impacto social'
  ]
});

const rseAreas = [
  {
    name: 'Comunidad',
    description: 'Acciones de apoyo y presencia activa en la comunidad local.'
  },
  {
    name: 'Inclusión y educación',
    description: 'Iniciativas con foco en desarrollo social, formación y oportunidades.'
  },
  {
    name: 'Deporte y ambiente',
    description: 'Programas que impulsan hábitos saludables y compromiso ambiental.'
  }
];

const rseStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/rse',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'AboutPage'
    }),
    buildBreadcrumbSchema({ path: '/rse', name: 'Responsabilidad social' }),
    buildItemListSchema({
      path: '/rse',
      name: 'Ejes de responsabilidad social SISE',
      items: rseAreas
    })
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
