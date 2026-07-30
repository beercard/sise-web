import IndustriaHero from './components/IndustriaHero/IndustriaHero';
import IndustriaTechnologyModule from './components/IndustriaTechnologyModule/IndustriaTechnologyModule';
import IndustriaSolutionsModule from './components/IndustriaSolutionsModule/IndustriaSolutionsModule';

import Cotizador from '../components/Cotizador/Cotizador';
import {
  buildBreadcrumbSchema,
  buildLocalAreas,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema
} from '../lib/seo';

import styles from './page.module.scss';

const PAGE_TITLE = 'Seguridad para industrias y empresas';
const PAGE_DESCRIPTION =
  'Seguridad electrónica para industrias y empresas con videovigilancia, control de accesos, alarmas y monitoreo 24/7.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/industria',
  image: '/image/og-industria.jpg',
  keywords: [
    'seguridad industrial',
    'protección perimetral para industrias',
    'cerco eléctrico industrial',
    'control de accesos para empresas',
    'videovigilancia para plantas industriales',
    'monitoreo de flota y GPS corporativo',
    'seguridad para empresas en Resistencia',
    'seguridad industrial en Chaco',
    'seguridad industrial en Corrientes',
    'empresa de seguridad para industrias en el NEA',
    'protección perimetral en Formosa'
  ]
});

const industriaStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/industria', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/industria', name: 'Industria' }),
    buildServiceSchema({
      path: '/industria',
      name: 'Seguridad electrónica para industrias y empresas',
      description:
        'Protección perimetral, cerco eléctrico, videovigilancia, control de accesos y monitoreo 24/7 para industrias y empresas en Resistencia, Chaco y el NEA.',
      serviceType: 'Seguridad electrónica industrial',
      audience: 'Industrias, parques industriales y empresas',
      areaServed: buildLocalAreas()
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
