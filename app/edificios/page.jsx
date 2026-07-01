import EdificiosHero from './components/EdificiosHero/EdificiosHero';
import EdificiosTechnologyModule from './components/EdificiosTechnologyModule/EdificiosTechnologyModule';

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

const PAGE_TITLE = 'Seguridad para edificios y consorcios';
const PAGE_DESCRIPTION =
  'Seguridad para edificios, consorcios y entornos urbanos con control de accesos, videovigilancia y monitoreo centralizado.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/edificios',
  image: '/image/og-edificios.jpg',
  keywords: [
    'seguridad para edificios',
    'seguridad para consorcios',
    'control de acceso para edificios',
    'guardia virtual',
    'cámaras para áreas comunes',
    'monitoreo de edificios 24 horas',
    'seguridad para consorcios en Resistencia',
    'videovigilancia de edificios en Chaco',
    'seguridad para edificios en Corrientes',
    'guardia virtual para consorcios en el NEA',
    'cámaras para áreas comunes en Posadas'
  ]
});

const edificiosFaqs = [
  {
    question: '¿Qué es la guardia virtual y cómo complementa al portero?',
    answer:
      'La guardia virtual es la supervisión remota del edificio las 24 horas desde nuestro centro de monitoreo: controla accesos, hall y áreas comunes, atiende eventos e interviene en tiempo real. Permite reforzar o reemplazar la portería física reduciendo costos de expensas.'
  },
  {
    question: '¿Cómo se gestiona el control de acceso de residentes y visitas?',
    answer:
      'El ingreso se digitaliza con tarjetas, códigos o reconocimiento, diferenciando residentes de visitas y registrando cada movimiento. Así el consorcio tiene trazabilidad de quién entra y sale del edificio y sus cocheras.'
  },
  {
    question: '¿Conviene instalar cámaras en las áreas comunes del edificio?',
    answer:
      'Sí. Las cámaras en hall, cocheras, ascensores y perímetro brindan registro y respaldo ante incidentes, aumentan la seguridad de los residentes y suelen aprobarse en asamblea de consorcio para proteger los espacios compartidos.'
  },
  {
    question: '¿Cómo se cotiza la seguridad para un consorcio?',
    answer:
      'Realizamos un relevamiento del edificio (accesos, áreas comunes y cantidad de unidades) y armamos una propuesta a medida. El costo puede prorratearse en las expensas, lo que vuelve la inversión accesible para todo el consorcio.'
  },
  {
    question: '¿El monitoreo cubre cocheras, hall y perímetro?',
    answer:
      'Sí. Integramos alarmas, cámaras y control de accesos de todas las áreas comunes en un mismo sistema, con monitoreo centralizado 24/7 y respuesta inmediata ante cualquier evento.'
  },
  {
    question: '¿En qué zonas instalan seguridad para edificios y consorcios?',
    answer:
      'Brindamos soluciones para edificios y consorcios en Resistencia, toda la provincia del Chaco y la región del NEA, con instalación profesional y soporte técnico local.'
  }
];

const edificiosStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/edificios', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/edificios', name: 'Edificios' }),
    buildServiceSchema({
      path: '/edificios',
      name: 'Seguridad para edificios y consorcios',
      description:
        'Control de accesos, guardia virtual, videovigilancia de áreas comunes y monitoreo centralizado para edificios y consorcios en Resistencia, Chaco y el NEA.',
      serviceType: 'Seguridad electrónica para edificios y consorcios',
      audience: 'Consorcios, administraciones y edificios',
      areaServed: buildLocalAreas()
    }),
    buildFAQPageSchema({ path: '/edificios', questions: edificiosFaqs })
  ]
};

export default function EdificiosPage() {
  return (
    <div className={styles.edificios}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(edificiosStructuredData) }}
      />

      <EdificiosHero />
      <EdificiosTechnologyModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>

      <FaqSection
        intro="Reunimos las dudas más frecuentes sobre seguridad para edificios y consorcios: guardia virtual, control de accesos, videovigilancia de áreas comunes y monitoreo centralizado."
        faqs={edificiosFaqs}
        ariaLabel="Preguntas frecuentes sobre seguridad para edificios y consorcios"
      />
    </div>
  );
}
