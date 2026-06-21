import ConstruccionHero from './components/ConstruccionHero/ConstruccionHero';
import ConstruccionTechnologyModule from './components/ConstruccionTechnologyModule/ConstruccionTechnologyModule';

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

const PAGE_TITLE = 'Seguridad para obras y construcción';
const PAGE_DESCRIPTION =
  'Seguridad electrónica para obras y construcción con monitoreo, videovigilancia y control perimetral para proteger materiales, equipos y accesos.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/construccion',
  image: '/image/og-construccion.jpg',
  keywords: [
    'seguridad para obras',
    'videovigilancia de obra',
    'robo de materiales en obra',
    'cámaras de seguridad para construcción',
    'cámaras solares autónomas',
    'control de acceso en obras',
    'seguridad para obras en Resistencia',
    'monitoreo de obras en Chaco',
    'seguridad para obras en Corrientes',
    'videovigilancia de obra en el NEA',
    'cámaras solares para obra en Formosa'
  ]
});

const construccionFaqs = [
  {
    question: '¿Cómo se evita el robo de materiales y herramientas en una obra?',
    answer:
      'Combinamos videovigilancia, control perimetral y monitoreo 24/7 para detectar movimientos sospechosos y actuar antes de que se concrete el robo de materiales, herramientas o equipos, una de las pérdidas más frecuentes en la construcción.'
  },
  {
    question: '¿Sirve la videovigilancia en obras sin luz ni internet?',
    answer:
      'Sí. Contamos con sistemas autónomos de videovigilancia con energía solar y conectividad propia, ideales para obras en etapas iniciales o zonas sin infraestructura eléctrica ni señal.'
  },
  {
    question: '¿Cómo se controla el ingreso de personal y proveedores a la obra?',
    answer:
      'Implementamos control de accesos para ordenar el ingreso de personal, contratistas y proveedores, con registro de movimientos que aporta trazabilidad y seguridad a la obra.'
  },
  {
    question: '¿El sistema es temporal y se puede trasladar a otra obra?',
    answer:
      'Sí. Las soluciones para construcción están pensadas para ser escalables y reubicables: cuando termina una etapa o la obra, el equipamiento puede trasladarse al próximo proyecto.'
  },
  {
    question: '¿Hay monitoreo 24/7 del perímetro de la obra?',
    answer:
      'Sí. Nuestra central supervisa el perímetro las 24 horas y, ante cualquier alerta, verifica el evento y coordina la respuesta inmediata para proteger el predio en todo momento.'
  },
  {
    question: '¿En qué zonas brindan seguridad para obras y construcción?',
    answer:
      'Trabajamos en obras y construcciones de Resistencia, toda la provincia del Chaco y la región del NEA, con instalación y soporte técnico local.'
  }
];

const construccionStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/construccion', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/construccion', name: 'Construcción' }),
    buildServiceSchema({
      path: '/construccion',
      name: 'Seguridad electrónica para obras y construcción',
      description:
        'Videovigilancia, cámaras solares autónomas, control de accesos y monitoreo perimetral 24/7 para obras y construcción en Resistencia, Chaco y el NEA.',
      serviceType: 'Seguridad electrónica para obras y construcción',
      audience: 'Constructoras, obras y desarrollos',
      areaServed: buildLocalAreas()
    }),
    buildFAQPageSchema({ path: '/construccion', questions: construccionFaqs })
  ]
};

export default function ConstruccionPage() {
  return (
    <div className={styles.construccion}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(construccionStructuredData) }}
      />

      <ConstruccionHero />
      <ConstruccionTechnologyModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>

      <FaqSection
        intro="Resolvemos las consultas más frecuentes sobre seguridad para obras y construcción: videovigilancia, cámaras solares autónomas, control de accesos y monitoreo perimetral 24/7."
        faqs={construccionFaqs}
        ariaLabel="Preguntas frecuentes sobre seguridad para obras y construcción"
      />
    </div>
  );
}
