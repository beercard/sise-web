import Cotizador from '../components/Cotizador/Cotizador';
import {
  buildBreadcrumbSchema,
  buildLocalAreas,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema
} from '../lib/seo';

import HeroModule from './components/HeroModule/HeroModule';
import SolutionsModule from './components/SolutionsModule/SolutionsModule';
import TechnologyModule from './components/TechnologyModule/TechnologyModule';

import styles from './page.module.scss';

const PAGE_TITLE = 'Seguridad para el hogar';
const PAGE_DESCRIPTION =
  'Alarmas monitoreadas, sensores, sirenas, cámaras y control desde tu celular para proteger tu hogar con monitoreo profesional 24/7.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/hogar',
  image: '/image/og-hogar.jpg',
  keywords: [
    'alarma monitoreada para casa',
    'alarmas para el hogar',
    'cuánto cuesta una alarma para casa',
    'cámaras de seguridad para el hogar',
    'monitoreo de alarmas 24 horas',
    'alarma con cámaras y app',
    'seguridad para el hogar en Resistencia',
    'alarmas monitoreadas en Chaco',
    'alarmas monitoreadas en Corrientes',
    'empresa de alarmas en el NEA',
    'abono mensual de alarma monitoreada'
  ]
});

const hogarStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/hogar', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/hogar', name: 'Hogar' }),
    buildServiceSchema({
      path: '/hogar',
      name: 'Alarmas monitoreadas para el hogar',
      description:
        'Alarmas monitoreadas, sensores, cámaras de videovigilancia y monitoreo profesional 24/7 para proteger hogares en Resistencia, Chaco y el NEA.',
      serviceType: 'Seguridad electrónica y monitoreo para hogares',
      audience: 'Hogares y familias',
      areaServed: buildLocalAreas()
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
