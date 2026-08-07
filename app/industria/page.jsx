import IndustriaHero from './components/IndustriaHero/IndustriaHero';
import IndustriaTechnologyModule from './components/IndustriaTechnologyModule/IndustriaTechnologyModule';
import IndustriaSolutionsModule from './components/IndustriaSolutionsModule/IndustriaSolutionsModule';

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

const PAGE_TITLE = 'Seguridad electrónica para industrias y empresas';
const PAGE_DESCRIPTION =
  'Seguridad electrónica para industrias y empresas con videovigilancia, control de accesos, alarmas, GPS corporativo y monitoreo 24/7 en Chaco y el NEA.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/industria',
  image: '/image/og-industria.jpg',
  category: 'Seguridad industrial',
  keywords: [
    'seguridad industrial',
    'seguridad electrónica para empresas',
    'protección perimetral para industrias',
    'cerco eléctrico industrial',
    'control de accesos para empresas',
    'videovigilancia para plantas industriales',
    'monitoreo de flota y GPS corporativo',
    'seguridad para planta industrial',
    'seguridad para parque industrial',
    'alarmas para industrias',
    'seguridad para empresas en Resistencia',
    'seguridad industrial en Chaco',
    'seguridad industrial en Corrientes',
    'empresa de seguridad para industrias en el NEA',
    'protección perimetral en Formosa'
  ]
});

const industriaSolutions = [
  {
    name: 'Monitoreo de alarmas industriales',
    description: 'Protección 24/7 para infraestructura crítica, plantas y depósitos.'
  },
  {
    name: 'CCTV industrial',
    description: 'Auditoría visual de procesos, perímetro, accesos y sectores operativos.'
  },
  {
    name: 'Cerco eléctrico',
    description: 'Defensa perimetral de alta tensión para predios industriales y logísticos.'
  },
  {
    name: 'Control de acceso y GPS corporativo',
    description: 'Gestión de ingresos y telemetría para personal, vehículos y flota.'
  }
];

const industriaStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/industria',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'CollectionPage'
    }),
    buildBreadcrumbSchema({ path: '/industria', name: 'Industria' }),
    buildServiceSchema({
      path: '/industria',
      name: 'Seguridad electrónica para industrias y empresas',
      description:
        'Protección perimetral, cerco eléctrico, videovigilancia, control de accesos y monitoreo 24/7 para industrias y empresas en Resistencia, Chaco y el NEA.',
      serviceType: 'Seguridad electrónica industrial',
      audience: 'Industrias, parques industriales y empresas',
      areaServed: buildLocalAreas()
    }),
    buildItemListSchema({
      path: '/industria',
      name: 'Soluciones de seguridad para industrias y empresas',
      items: industriaSolutions
    })
  ]
};

export default function IndustriaPage() {
  return (
    <div className={styles.industria}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industriaStructuredData) }}
      />

      <IndustriaHero />
      <IndustriaTechnologyModule />
      <IndustriaSolutionsModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador variant="enterprise" />
      </section>
    </div>
  );
}
