import IndustriaHero from './components/IndustriaHero/IndustriaHero';
import IndustriaTechnologyModule from './components/IndustriaTechnologyModule/IndustriaTechnologyModule';

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

const industriaFaqs = [
  {
    question: '¿Cómo se protege el perímetro de una planta o predio industrial?',
    answer:
      'La protección perimetral combina cerco eléctrico, cámaras de vigilancia, sensores y cartelería disuasiva, integrados al monitoreo 24/7 para detectar y frenar cualquier intento de intrusión antes de que ingrese al predio.'
  },
  {
    question: '¿Qué soluciones hay para el control de accesos de personal y proveedores?',
    answer:
      'Implementamos control de accesos por niveles de autorización con tarjetas, biometría o reconocimiento facial, ideal para ordenar el ingreso de personal, proveedores y visitas, y llevar registro de horarios y movimientos.'
  },
  {
    question: '¿El sistema permite monitoreo y respuesta 24/7 ante intrusiones?',
    answer:
      'Sí. Nuestra central supervisa la planta las 24 horas: ante un evento, verifica la alerta y coordina la respuesta inmediata, garantizando continuidad operativa y protección de activos en tiempo real.'
  },
  {
    question: '¿Pueden integrar cámaras, alarmas y cerco eléctrico en un solo sistema?',
    answer:
      'Sí. Diseñamos soluciones integrales que unifican videovigilancia, alarmas, control de accesos y cerco eléctrico en una misma plataforma, con gestión remota y supervisión centralizada.'
  },
  {
    question: '¿Ofrecen rastreo satelital y GPS para flotas y activos?',
    answer:
      'Sí. Sumamos GPS corporativo para monitorear la flota en tiempo real, detectar desvíos, optimizar recorridos y reducir riesgos en la operación logística de la empresa.'
  },
  {
    question: '¿En qué zonas brindan seguridad para industrias y empresas?',
    answer:
      'Trabajamos con industrias, parques industriales y empresas en Resistencia, toda la provincia del Chaco y la región del NEA, con proyectos a medida y soporte técnico local.'
  }
];

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
    }),
    buildFAQPageSchema({ path: '/industria', questions: industriaFaqs })
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
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>

      <FaqSection
        intro="Respondemos las consultas más frecuentes sobre seguridad industrial: protección perimetral, cerco eléctrico, control de accesos, videovigilancia y monitoreo 24/7 para empresas."
        faqs={industriaFaqs}
        ariaLabel="Preguntas frecuentes sobre seguridad para industrias y empresas"
      />
    </div>
  );
}
