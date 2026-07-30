import EdificiosHero from './components/EdificiosHero/EdificiosHero';
import EdificiosTechnologyModule from './components/EdificiosTechnologyModule/EdificiosTechnologyModule';
import EdificiosSolutionsModule from './components/EdificiosSolutionsModule/EdificiosSolutionsModule';

import Cotizador from '../components/Cotizador/Cotizador';
import {
  buildBreadcrumbSchema,
  buildLocalAreas,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema
} from '../lib/seo';

import styles from './page.module.scss';

const PAGE_TITLE = 'Seguridad para edificios y consorcios';
const PAGE_DESCRIPTION =
  'Seguridad para edificios, consorcios y entornos urbanos con control de accesos, videovigilancia y monitoreo centralizado.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/edificios',
  image: '/image/og-edificios.jpg',
  keywords: [
    'seguridad para edificios',
    'seguridad para consorcios',
    'control de acceso para edificios',
    'guardia virtual',
    'cámaras para áreas comunes',
    'monitoreo de edificios 24 horas',
    'seguridad para consorcios en Resistencia',
    'videovigilancia de edificios en Chaco',
    'seguridad para edificios en Corrientes',
    'guardia virtual para consorcios en el NEA',
    'cámaras para áreas comunes en Posadas'
  ]
});

const edificiosStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/edificios', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/edificios', name: 'Edificios' }),
    buildServiceSchema({
      path: '/edificios',
      name: 'Seguridad para edificios y consorcios',
      description:
        'Control de accesos, guardia virtual, videovigilancia de áreas comunes y monitoreo centralizado para edificios y consorcios en Resistencia, Chaco y el NEA.',
      serviceType: 'Seguridad electrónica para edificios y consorcios',
      audience: 'Consorcios, administraciones y edificios',
      areaServed: buildLocalAreas()
    })
  ]
};

export default function EdificiosPage() {
  return (
    <div className={styles.edificios}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(edificiosStructuredData) }}
      />

      <EdificiosHero />
      <EdificiosTechnologyModule />
      <EdificiosSolutionsModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador variant="spaces" />
      </section>
    </div>
  );
}
