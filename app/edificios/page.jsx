import EdificiosHero from './components/EdificiosHero/EdificiosHero';
import EdificiosTechnologyModule from './components/EdificiosTechnologyModule/EdificiosTechnologyModule';
import EdificiosSolutionsModule from './components/EdificiosSolutionsModule/EdificiosSolutionsModule';

import Cotizador from '../components/Cotizador/Cotizador';
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildLocalAreas,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema
} from '../lib/seo';
import { buildSolutionSeoDescription } from '../lib/solutionsInfo';

import styles from './page.module.scss';

const PAGE_TITLE = 'Seguridad para edificios y consorcios';
const PAGE_DESCRIPTION =
  'Seguridad para edificios, consorcios y barrios privados con control de accesos, guardia virtual, videovigilancia y monitoreo centralizado en Chaco y el NEA.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/edificios',
  image: '/image/og-edificios.jpg',
  category: 'Seguridad para consorcios',
  keywords: [
    'seguridad para edificios',
    'seguridad para consorcios',
    'seguridad para barrios privados',
    'control de acceso para edificios',
    'guardia virtual',
    'cámaras para áreas comunes',
    'monitoreo de edificios 24 horas',
    'alarma para consorcio',
    'videovigilancia para consorcios',
    'control de acceso para barrio cerrado',
    'seguridad para consorcios en Resistencia',
    'videovigilancia de edificios en Chaco',
    'seguridad para edificios en Corrientes',
    'guardia virtual para consorcios en el NEA',
    'cámaras para áreas comunes en Posadas'
  ]
});

const edificiosSolutions = [
  {
    name: 'Control de acceso',
    description: 'Ingreso digitalizado y registro de residentes, visitas y proveedores.'
  },
  {
    name: 'Guardia virtual',
    description: buildSolutionSeoDescription(
      'guardia-virtual',
      'Supervisión remota 24/7 para maximizar seguridad y reducir costos operativos.'
    )
  },
  {
    name: 'Alarmas y monitoreo',
    description: buildSolutionSeoDescription(
      'alarma-monitoreada',
      'Respuesta inmediata ante emergencias en espacios comunes y accesos.'
    )
  },
  {
    name: 'CCTV y videovigilancia',
    description: buildSolutionSeoDescription(
      'cctv-videovigilancia',
      'Videovigilancia de áreas comunes para edificios y complejos.'
    )
  },
  {
    name: 'Acceso vehicular autónomo (LPR)',
    description: buildSolutionSeoDescription(
      'acceso-vehicular',
      'Ingreso a cocheras por lectura de patente, sin controles remotos.'
    )
  }
];

const edificiosStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/edificios',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'CollectionPage'
    }),
    buildBreadcrumbSchema({ path: '/edificios', name: 'Edificios' }),
    buildServiceSchema({
      path: '/edificios',
      name: 'Seguridad para edificios y consorcios',
      description:
        'Control de accesos, guardia virtual, videovigilancia de áreas comunes y monitoreo centralizado para edificios y consorcios en Resistencia, Chaco y el NEA.',
      serviceType: 'Seguridad electrónica para edificios y consorcios',
      audience: 'Consorcios, administraciones y edificios',
      areaServed: buildLocalAreas()
    }),
    buildItemListSchema({
      path: '/edificios',
      name: 'Soluciones de seguridad para edificios y consorcios',
      items: edificiosSolutions
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
