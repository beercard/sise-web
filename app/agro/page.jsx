import AgroHero from './components/AgroHero/AgroHero';
import AgroTechnologyModule from './components/AgroTechnologyModule/AgroTechnologyModule';
import AgroSolutionsModule from './components/AgroSolutionsModule/AgroSolutionsModule';

import Cotizador from '../components/Cotizador/Cotizador';
import {
  buildBreadcrumbSchema,
  buildLocalAreas,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema
} from '../lib/seo';

import styles from './page.module.scss';

const PAGE_TITLE = 'Seguridad para el campo';
const PAGE_DESCRIPTION =
  'Seguridad electrónica para el campo con monitoreo rural, videovigilancia, conectividad y control remoto de establecimientos agropecuarios.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/agro',
  image: '/image/og-agro.jpg',
  keywords: [
    'seguridad rural',
    'monitoreo de campos',
    'videovigilancia rural',
    'cámaras de seguridad para el campo',
    'cámaras con energía solar',
    'GPS para maquinaria agrícola',
    'seguridad para establecimientos agropecuarios',
    'seguridad rural en Chaco y el NEA',
    'seguridad rural en Corrientes',
    'monitoreo de campos en Formosa',
    'cámaras solares para el campo en el NEA'
  ]
});

const agroStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/agro', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/agro', name: 'Agro' }),
    buildServiceSchema({
      path: '/agro',
      name: 'Seguridad rural y monitoreo para el campo',
      description:
        'Videovigilancia rural, cámaras con energía solar, conectividad, GPS y monitoreo 24/7 para campos y establecimientos agropecuarios del Chaco y el NEA.',
      serviceType: 'Seguridad electrónica rural',
      audience: 'Productores y establecimientos agropecuarios',
      areaServed: buildLocalAreas()
    })
  ]
};

export default function AgroPage() {
  return (
    <div className={styles.agro}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agroStructuredData) }}
      />

      <AgroHero />
      <AgroTechnologyModule />
      <AgroSolutionsModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador variant="agro" />
      </section>
    </div>
  );
}
