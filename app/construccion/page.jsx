import ConstruccionHero from './components/ConstruccionHero/ConstruccionHero';
import ConstruccionTechnologyModule from './components/ConstruccionTechnologyModule/ConstruccionTechnologyModule';
import ConstruccionSolutionsModule from './components/ConstruccionSolutionsModule/ConstruccionSolutionsModule';

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

const PAGE_TITLE = 'Seguridad para obras y construcción';
const PAGE_DESCRIPTION =
  'Seguridad para obras y desarrollos: monitoreo 24/7, videovigilancia, control perimetral y registro de accesos para proteger materiales y equipos.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/construccion',
  image: '/image/og-construccion.jpg',
  category: 'Seguridad para obras',
  keywords: [
    'seguridad para obras',
    'videovigilancia de obra',
    'robo de materiales en obra',
    'cámaras de seguridad para construcción',
    'cámaras solares autónomas',
    'control de acceso en obras',
    'timelapse de obra',
    'cerco eléctrico para obra',
    'monitoreo de obra 24 horas',
    'seguridad para obras en Resistencia',
    'monitoreo de obras en Chaco',
    'seguridad para obras en Corrientes',
    'videovigilancia de obra en el NEA',
    'cámaras solares para obra en Formosa'
  ]
});

const construccionSolutions = [
  {
    name: 'Alarmas y monitoreo',
    description: buildSolutionSeoDescription(
      'alarma-monitoreada',
      'Supervisión fuera del horario laboral para obras, predios y obradores.'
    )
  },
  {
    name: 'Cerco eléctrico',
    description: buildSolutionSeoDescription(
      'cerco-electrico',
      'Delimitación y protección perimetral temporal para obras y frentes de trabajo.'
    )
  },
  {
    name: 'CCTV y videovigilancia',
    description: buildSolutionSeoDescription(
      'cctv-videovigilancia',
      'Monitoreo preventivo y control remoto de cámaras en obra.'
    )
  },
  {
    name: 'Control de acceso y timelapse',
    description: buildSolutionSeoDescription(
      'control-acceso',
      'Registro de ingresos y documentación visual del avance del proyecto.'
    )
  }
];

const construccionStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/construccion',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'CollectionPage'
    }),
    buildBreadcrumbSchema({ path: '/construccion', name: 'Construcción' }),
    buildServiceSchema({
      path: '/construccion',
      name: 'Seguridad electrónica para obras y construcción',
      description:
        'Videovigilancia, cámaras solares autónomas, control de accesos y monitoreo perimetral 24/7 para obras y construcción en Resistencia, Chaco y el NEA.',
      serviceType: 'Seguridad electrónica para obras y construcción',
      audience: 'Constructoras, obras y desarrollos',
      areaServed: buildLocalAreas()
    }),
    buildItemListSchema({
      path: '/construccion',
      name: 'Soluciones de seguridad para obras y construcción',
      items: construccionSolutions
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
