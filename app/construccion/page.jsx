import ConstruccionHero from './components/ConstruccionHero/ConstruccionHero';
import ConstruccionTechnologyModule from './components/ConstruccionTechnologyModule/ConstruccionTechnologyModule';
import ConstruccionSolutionsModule from './components/ConstruccionSolutionsModule/ConstruccionSolutionsModule';

import Cotizador from '../components/Cotizador/Cotizador';
import {
  buildBreadcrumbSchema,
  buildLocalAreas,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema
} from '../lib/seo';

import styles from './page.module.scss';

const PAGE_TITLE = 'Seguridad para obras y construcción';
const PAGE_DESCRIPTION =
  'Seguridad electrónica para obras y construcción con monitoreo, videovigilancia y control perimetral para proteger materiales, equipos y accesos.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/construccion',
  image: '/image/og-construccion.jpg',
  keywords: [
    'seguridad para obras',
    'videovigilancia de obra',
    'robo de materiales en obra',
    'cámaras de seguridad para construcción',
    'cámaras solares autónomas',
    'control de acceso en obras',
    'seguridad para obras en Resistencia',
    'monitoreo de obras en Chaco',
    'seguridad para obras en Corrientes',
    'videovigilancia de obra en el NEA',
    'cámaras solares para obra en Formosa'
  ]
});

const construccionStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/construccion', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/construccion', name: 'Construcción' }),
    buildServiceSchema({
      path: '/construccion',
      name: 'Seguridad electrónica para obras y construcción',
      description:
        'Videovigilancia, cámaras solares autónomas, control de accesos y monitoreo perimetral 24/7 para obras y construcción en Resistencia, Chaco y el NEA.',
      serviceType: 'Seguridad electrónica para obras y construcción',
      audience: 'Constructoras, obras y desarrollos',
      areaServed: buildLocalAreas()
    })
  ]
};

export default function ConstruccionPage() {
  return (
    <div className={styles.construccion}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(construccionStructuredData) }}
      />

      <ConstruccionHero />
      <ConstruccionTechnologyModule />
      <ConstruccionSolutionsModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador variant="spaces" />
      </section>
    </div>
  );
}
