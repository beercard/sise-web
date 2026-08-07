import CiudadHero from './components/CiudadHero/CiudadHero';
import CiudadTechnologyModule from './components/CiudadTechnologyModule/CiudadTechnologyModule';
import CiudadSolutionsModule from './components/CiudadSolutionsModule/CiudadSolutionsModule';

import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildLocalAreas,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema
} from '../lib/seo';

import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Videovigilancia y seguridad para ciudades',
  description:
    'Soluciones de seguridad para municipios y ciudades con videovigilancia urbana, conectividad, analítica y herramientas para la prevención del delito en el espacio público.',
  path: '/ciudad',
  image: '/image/og-ciudad.jpg',
  category: 'Seguridad urbana',
  keywords: [
    'seguridad para ciudades',
    'videovigilancia urbana',
    'monitoreo del espacio público',
    'seguridad municipal',
    'cámaras para municipios',
    'centro de monitoreo municipal',
    'prevención del delito con cámaras',
    'seguridad para espacio público',
    'seguridad urbana en Chaco',
    'videovigilancia para municipios',
    'videovigilancia urbana en Corrientes',
    'seguridad municipal en el NEA',
    'centro de monitoreo urbano'
  ]
});

const ciudadSolutions = [
  {
    name: 'Videovigilancia urbana',
    description: 'Cobertura visual para calles, plazas, avenidas y puntos críticos de la ciudad.'
  },
  {
    name: 'Centro de monitoreo',
    description: 'Herramientas para supervisión y gestión centralizada de eventos urbanos.'
  },
  {
    name: 'Conectividad y despliegue',
    description: 'Infraestructura para integrar cámaras, enlaces y nodos de seguridad pública.'
  },
  {
    name: 'Prevención y analítica',
    description: 'Tecnología orientada a detección temprana, trazabilidad y soporte operativo.'
  }
];

const ciudadStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/ciudad',
      title: 'Videovigilancia y seguridad para ciudades',
      description:
        'Soluciones de seguridad para municipios y ciudades con videovigilancia urbana, conectividad y herramientas para la prevención del delito.',
      type: 'CollectionPage'
    }),
    buildBreadcrumbSchema({ path: '/ciudad', name: 'Ciudad' }),
    buildServiceSchema({
      path: '/ciudad',
      name: 'Videovigilancia urbana y seguridad para ciudades',
      description:
        'Soluciones de seguridad para municipios y ciudades con videovigilancia urbana, monitoreo del espacio público y herramientas de supervisión.',
      serviceType: 'Seguridad urbana y videovigilancia',
      audience: 'Municipios, gobiernos y organismos públicos',
      areaServed: buildLocalAreas()
    }),
    buildItemListSchema({
      path: '/ciudad',
      name: 'Soluciones de seguridad urbana para ciudades',
      items: ciudadSolutions
    })
  ]
};

export default function CiudadPage() {
  return (
    <div className={styles.ciudad}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ciudadStructuredData) }}
      />

      <CiudadHero />
      <CiudadTechnologyModule />
      <CiudadSolutionsModule />
    </div>
  );
}
