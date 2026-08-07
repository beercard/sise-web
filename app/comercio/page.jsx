import ComercioHero from './components/ComercioHero/ComercioHero';
import ComercioSolutionsModule from './components/ComercioSolutionsModule/ComercioSolutionsModule';
import ComercioTechnologyModule from './components/ComercioTechnologyModule/ComercioTechnologyModule';

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

const PAGE_TITLE = 'Alarmas y seguridad para comercios';
const PAGE_DESCRIPTION =
  'Alarmas, cámaras, control de accesos y cortina de humo para locales, oficinas y comercios, con monitoreo 24/7 en Resistencia, Chaco y el NEA.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/comercio',
  image: '/image/og-comercio.jpg',
  category: 'Seguridad para comercios',
  keywords: [
    'alarma para comercio',
    'seguridad para locales comerciales',
    'cámaras de seguridad para negocios',
    'control de acceso y fichaje de personal',
    'cortina de humo antirrobo',
    'monitoreo de comercios 24 horas',
    'alarma para local comercial',
    'cámaras para local',
    'seguridad para oficina',
    'control de horario del personal',
    'seguridad para comercios en Resistencia',
    'alarmas para locales en Chaco',
    'seguridad para comercios en Corrientes',
    'empresa de seguridad para negocios en el NEA',
    'alarma para local con monitoreo 24 horas'
  ]
});

const comercioSolutions = [
  {
    name: 'Monitoreo de alarmas',
    description: 'Respuesta inmediata ante emergencias y eventos de seguridad en el local.'
  },
  {
    name: 'CCTV y videovigilancia',
    description: 'Control visual para salón, caja, depósitos y accesos del comercio.'
  },
  {
    name: 'Cortina de humo',
    description: 'Sistema antirrobo que reduce la visibilidad y frena intrusiones en segundos.'
  },
  {
    name: 'Control de acceso y fichaje',
    description: 'Gestión de horarios, ingresos y presentismo del personal.'
  }
];

const comercioStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/comercio',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'CollectionPage'
    }),
    buildBreadcrumbSchema({ path: '/comercio', name: 'Comercio' }),
    buildServiceSchema({
      path: '/comercio',
      name: 'Seguridad electrónica para comercios',
      description:
        'Alarmas monitoreadas, cámaras, control de accesos y cortina de humo para locales, oficinas y comercios en Resistencia, Chaco y el NEA.',
      serviceType: 'Seguridad electrónica para comercios',
      audience: 'Comercios, locales y oficinas',
      areaServed: buildLocalAreas()
    }),
    buildItemListSchema({
      path: '/comercio',
      name: 'Soluciones de seguridad para comercios',
      items: comercioSolutions
    })
  ]
};

export default function ComercioPage() {
  return (
    <div className={styles.comercio}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comercioStructuredData) }}
      />

      <ComercioHero />
      <ComercioTechnologyModule />
      <ComercioSolutionsModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador variant="enterprise" />
      </section>
    </div>
  );
}
