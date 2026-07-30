import CiudadHero from './components/CiudadHero/CiudadHero';
import CiudadTechnologyModule from './components/CiudadTechnologyModule/CiudadTechnologyModule';
import CiudadSolutionsModule from './components/CiudadSolutionsModule/CiudadSolutionsModule';

import Cotizador from '../components/Cotizador/Cotizador';
import {
  buildBreadcrumbSchema,
  buildLocalAreas,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema
} from '../lib/seo';

import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Seguridad para ciudades y espacio público',
  description:
    'Soluciones de seguridad para municipios y ciudades con videovigilancia, conectividad y herramientas para la prevención del delito.',
  path: '/ciudad',
  image: '/image/og-ciudad.jpg',
  keywords: [
    'seguridad para ciudades',
    'videovigilancia urbana',
    'monitoreo del espacio público',
    'seguridad municipal',
    'seguridad urbana en Chaco',
    'videovigilancia para municipios',
    'videovigilancia urbana en Corrientes',
    'seguridad municipal en el NEA',
    'centro de monitoreo urbano'
  ]
});

const ciudadStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/ciudad',
      title: 'Seguridad para ciudades y espacio público',
      description:
        'Soluciones de seguridad para municipios y ciudades con videovigilancia, conectividad y herramientas para la prevención del delito.'
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
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador variant="spaces" />
      </section>
    </div>
  );
}
