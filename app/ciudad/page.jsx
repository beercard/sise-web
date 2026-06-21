import CiudadHero from './components/CiudadHero/CiudadHero';
import CiudadTechnologyModule from './components/CiudadTechnologyModule/CiudadTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';
import FaqSection from '../components/FaqSection/FaqSection';
import {
  buildBreadcrumbSchema,
  buildFAQPageSchema,
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

const ciudadFaqs = [
  {
    question: '¿Qué soluciones de seguridad puede implementar un municipio?',
    answer:
      'Un municipio puede implementar videovigilancia urbana, monitoreo del espacio público, control de accesos, puntos y paradas seguras, GPS institucional y herramientas de supervisión, integrados a un centro de monitoreo para mejorar la prevención del delito.'
  },
  {
    question: '¿Se puede empezar por una etapa e ir ampliando el sistema?',
    answer:
      'Sí. Diseñamos proyectos escalables que pueden iniciar por accesos, avenidas o puntos críticos y crecer por etapas según las prioridades y el presupuesto del municipio.'
  },
  {
    question: '¿Cómo funciona un centro de monitoreo urbano?',
    answer:
      'El centro de monitoreo concentra las cámaras y alertas de la ciudad en tiempo real, permitiendo seguir eventos, evaluar incidencias y coordinar la respuesta entre las áreas responsables de la seguridad.'
  },
  {
    question: '¿La videovigilancia urbana ayuda a prevenir el delito y gestionar el espacio público?',
    answer:
      'Sí. Aporta información en tiempo real para la prevención del delito, la lectura del territorio y la gestión del espacio público, mejorando la capacidad de respuesta y la coordinación operativa.'
  },
  {
    question: '¿SISE trabaja con municipios de Chaco y el NEA?',
    answer:
      'Sí. Desde nuestra base en Resistencia brindamos asesoramiento técnico y comercial a municipios y organismos del Chaco y la región del NEA para desarrollar proyectos de seguridad urbana a medida.'
  }
];

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
    }),
    buildFAQPageSchema({ path: '/ciudad', questions: ciudadFaqs })
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

      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>

      <FaqSection
        intro="Reunimos las consultas más frecuentes de municipios y organismos sobre videovigilancia urbana, monitoreo del espacio público y prevención del delito."
        faqs={ciudadFaqs}
        ariaLabel="Preguntas frecuentes sobre seguridad para ciudades"
      />
    </div>
  );
}
