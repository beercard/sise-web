import Cotizador from '../components/Cotizador/Cotizador';
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildLocalAreas,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema
} from '../lib/seo';

import HeroModule from './components/HeroModule/HeroModule';
import SolutionsModule from './components/SolutionsModule/SolutionsModule';
import TechnologyModule from './components/TechnologyModule/TechnologyModule';

import styles from './page.module.scss';

const PAGE_TITLE = 'Alarmas monitoreadas para el hogar';
const PAGE_DESCRIPTION =
  'Alarmas monitoreadas para el hogar con sensores, sirenas, cámaras y control desde el celular para proteger tu casa con monitoreo profesional 24/7 en Chaco y el NEA.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/hogar',
  image: '/image/og-hogar.jpg',
  category: 'Seguridad para el hogar',
  keywords: [
    'alarma monitoreada para casa',
    'alarmas para el hogar',
    'seguridad para el hogar',
    'cuánto cuesta una alarma para casa',
    'cámaras de seguridad para el hogar',
    'monitoreo de alarmas 24 horas',
    'alarma con cámaras y app',
    'alarma para departamento',
    'alarma para vivienda familiar',
    'sensor de movimiento para casa',
    'cerco eléctrico residencial',
    'seguridad para el hogar en Resistencia',
    'alarmas monitoreadas en Chaco',
    'alarmas monitoreadas en Corrientes',
    'empresa de alarmas en el NEA',
    'abono mensual de alarma monitoreada'
  ]
});

const hogarSolutions = [
  {
    name: 'Monitoreo de alarmas',
    description: 'Respuesta profesional 24/7 ante eventos de seguridad en viviendas y casas.'
  },
  {
    name: 'CCTV y videovigilancia',
    description: 'Cámaras para ver tu hogar en tiempo real desde el celular.'
  },
  {
    name: 'Cerco eléctrico monitoreado',
    description: 'Protección perimetral disuasiva conectada a la central de monitoreo.'
  },
  {
    name: 'Sistema de barrio seguro',
    description: 'Soluciones vecinales con cámaras y monitoreo compartido.'
  }
];

const hogarStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/hogar',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'CollectionPage'
    }),
    buildBreadcrumbSchema({ path: '/hogar', name: 'Hogar' }),
    buildServiceSchema({
      path: '/hogar',
      name: 'Alarmas monitoreadas para el hogar',
      description:
        'Alarmas monitoreadas, sensores, cámaras de videovigilancia y monitoreo profesional 24/7 para proteger hogares en Resistencia, Chaco y el NEA.',
      serviceType: 'Seguridad electrónica y monitoreo para hogares',
      audience: 'Hogares y familias',
      areaServed: buildLocalAreas()
    }),
    buildItemListSchema({
      path: '/hogar',
      name: 'Soluciones de seguridad para el hogar',
      items: hogarSolutions
    })
  ]
};

export default function HogarPage() {
  return (
    <div className={styles.hogar}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hogarStructuredData) }}
      />

      <HeroModule />

      <TechnologyModule />
      <SolutionsModule />

      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>
    </div>
  );
}
