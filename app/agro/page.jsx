import AgroHero from './components/AgroHero/AgroHero';
import AgroTechnologyModule from './components/AgroTechnologyModule/AgroTechnologyModule';

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

const PAGE_TITLE = 'Seguridad para el campo';
const PAGE_DESCRIPTION =
  'Seguridad electrónica para el campo con monitoreo rural, videovigilancia, conectividad y control remoto de establecimientos agropecuarios.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/agro',
  image: '/image/og-agro.jpg',
  keywords: [
    'seguridad rural',
    'monitoreo de campos',
    'videovigilancia rural',
    'cámaras de seguridad para el campo',
    'cámaras con energía solar',
    'GPS para maquinaria agrícola',
    'seguridad para establecimientos agropecuarios',
    'seguridad rural en Chaco y el NEA',
    'seguridad rural en Corrientes',
    'monitoreo de campos en Formosa',
    'cámaras solares para el campo en el NEA'
  ]
});

const agroFaqs = [
  {
    question: '¿Cómo se protege un campo o establecimiento rural alejado?',
    answer:
      'Integramos videovigilancia, monitoreo rural, conectividad y control remoto para proteger tranqueras, galpones, silobolsas, maquinaria y casco de estancia, incluso en establecimientos extensos o de difícil acceso.'
  },
  {
    question: '¿Funciona la videovigilancia rural sin luz ni señal?',
    answer:
      'Sí. Utilizamos cámaras con energía solar y conectividad propia, pensadas para zonas rurales sin red eléctrica ni cobertura, de modo que el campo queda vigilado las 24 horas.'
  },
  {
    question: '¿Pueden rastrear maquinaria, hacienda y activos con GPS?',
    answer:
      'Sí. Sumamos rastreo satelital y GPS para seguir la ubicación de maquinaria agrícola, vehículos y activos en tiempo real, detectar movimientos no autorizados y reaccionar a tiempo.'
  },
  {
    question: '¿Cómo llega el monitoreo a zonas rurales del NEA y Chaco?',
    answer:
      'Diseñamos la conectividad de cada establecimiento según su ubicación, combinando distintas tecnologías para que las alertas lleguen a nuestra central de monitoreo aun en zonas alejadas del Chaco y el NEA.'
  },
  {
    question: '¿Qué pasa ante un intento de intrusión en el campo?',
    answer:
      'Ante una alerta, nuestra central de monitoreo verifica el evento de inmediato y coordina la respuesta, dando aviso al productor y a las fuerzas de seguridad para actuar a tiempo.'
  }
];

const agroStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/agro', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/agro', name: 'Agro' }),
    buildServiceSchema({
      path: '/agro',
      name: 'Seguridad rural y monitoreo para el campo',
      description:
        'Videovigilancia rural, cámaras con energía solar, conectividad, GPS y monitoreo 24/7 para campos y establecimientos agropecuarios del Chaco y el NEA.',
      serviceType: 'Seguridad electrónica rural',
      audience: 'Productores y establecimientos agropecuarios',
      areaServed: buildLocalAreas()
    }),
    buildFAQPageSchema({ path: '/agro', questions: agroFaqs })
  ]
};

export default function AgroPage() {
  return (
    <div className={styles.agro}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agroStructuredData) }}
      />

      <AgroHero />
      <AgroTechnologyModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>

      <FaqSection
        intro="Respondemos las dudas más frecuentes sobre seguridad rural: videovigilancia para el campo, cámaras con energía solar, conectividad, GPS y monitoreo 24/7 de establecimientos agropecuarios."
        faqs={agroFaqs}
        ariaLabel="Preguntas frecuentes sobre seguridad para el campo"
      />
    </div>
  );
}
