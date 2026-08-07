import AgroHero from './components/AgroHero/AgroHero';
import AgroTechnologyModule from './components/AgroTechnologyModule/AgroTechnologyModule';
import AgroSolutionsModule from './components/AgroSolutionsModule/AgroSolutionsModule';

import Cotizador from '../components/Cotizador/Cotizador';
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildLocalAreas,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema
} from '../lib/seo';

import styles from './page.module.scss';

const PAGE_TITLE = 'Seguridad rural y monitoreo para el campo';
const PAGE_DESCRIPTION =
  'Seguridad rural para el campo con monitoreo, videovigilancia, conectividad, energía solar y control remoto de establecimientos agropecuarios en Chaco y el NEA.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/agro',
  image: '/image/og-agro.jpg',
  category: 'Seguridad rural',
  keywords: [
    'seguridad rural',
    'camaras para el campo',
    'camara campo',
    'Camaras Vigilancia Para Campos',
    'monitoreo de campos',
    'videovigilancia rural',
    'cámaras de seguridad para el campo',
    'cámaras con energía solar',
    'GPS para maquinaria agrícola',
    'seguridad para establecimientos agropecuarios',
    'alarma para campo',
    'cámaras solares rurales',
    'control remoto de campo',
    'seguridad para establecimientos agropecuarios',
    'seguridad rural en Chaco y el NEA',
    'seguridad rural en Corrientes',
    'seguridad para el campo',
    'monitoreo de campos en Formosa',
    'cámaras solares para el campo en el NEA'
  ]
});

const agroSolutions = [
  {
    name: 'Monitoreo rural',
    description: 'Protección permanente de accesos, cascos, galpones y establecimientos agropecuarios.'
  },
  {
    name: 'Videovigilancia y cámaras solares',
    description: 'Supervisión remota en zonas rurales con soluciones autónomas y conectadas.'
  },
  {
    name: 'Conectividad y control remoto',
    description: 'Acceso a eventos y administración del sistema desde el celular.'
  },
  {
    name: 'GPS y telemetría',
    description: 'Seguimiento y control de vehículos, maquinaria y activos rurales.'
  }
];

const agroStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/agro',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'CollectionPage'
    }),
    buildBreadcrumbSchema({ path: '/agro', name: 'Agro' }),
    buildServiceSchema({
      path: '/agro',
      name: 'Seguridad rural y monitoreo para el campo',
      description:
        'Videovigilancia rural, cámaras con energía solar, conectividad, GPS y monitoreo 24/7 para campos y establecimientos agropecuarios del Chaco y el NEA.',
      serviceType: 'Seguridad electrónica rural',
      audience: 'Productores y establecimientos agropecuarios',
      areaServed: buildLocalAreas()
    }),
    buildItemListSchema({
      path: '/agro',
      name: 'Soluciones de seguridad rural para el campo',
      items: agroSolutions
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
