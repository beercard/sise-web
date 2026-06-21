import ComercioHero from './components/ComercioHero/ComercioHero';
import ComercioTechnologyModule from './components/ComercioTechnologyModule/ComercioTechnologyModule';

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

const PAGE_TITLE = 'Seguridad para comercios';
const PAGE_DESCRIPTION =
  'Alarmas, cámaras, control de accesos y monitoreo para locales, oficinas y comercios con respuesta profesional y gestión remota.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/comercio',
  image: '/image/og-comercio.jpg',
  keywords: [
    'alarma para comercio',
    'seguridad para locales comerciales',
    'cámaras de seguridad para negocios',
    'control de acceso y fichaje de personal',
    'cortina de humo antirrobo',
    'monitoreo de comercios 24 horas',
    'seguridad para comercios en Resistencia',
    'alarmas para locales en Chaco',
    'seguridad para comercios en Corrientes',
    'empresa de seguridad para negocios en el NEA',
    'alarma para local con monitoreo 24 horas'
  ]
});

const comercioFaqs = [
  {
    question: '¿Qué sistema de seguridad conviene para un comercio o local?',
    answer:
      'Para un comercio recomendamos combinar alarma monitoreada, cámaras de videovigilancia, control de accesos y, según el rubro, cortina de humo antirrobo. El diseño se adapta al tamaño del local, el flujo de clientes y los horarios de apertura y cierre.'
  },
  {
    question: '¿Cómo ayuda el control de accesos y fichaje del personal?',
    answer:
      'El control de accesos gestiona el ingreso del personal mediante tarjetas, biometría o reconocimiento facial, y permite registrar horarios y presencia. Así mejorás el control interno y sabés quién entra y sale en cada momento.'
  },
  {
    question: '¿Qué es la cortina de humo y cómo protege ante un robo?',
    answer:
      'La cortina de humo libera una niebla densa e inofensiva ante una intrusión, reduciendo la visibilidad en segundos y neutralizando el accionar del delincuente antes de que pueda llevarse mercadería o dinero.'
  },
  {
    question: '¿Puedo monitorear varias sucursales desde un solo lugar?',
    answer:
      'Sí. Integramos las cámaras y alarmas de todos tus locales en una misma plataforma, con acceso remoto desde el celular y supervisión centralizada desde nuestro centro de monitoreo.'
  },
  {
    question: '¿El monitoreo de cámaras es en tiempo real y queda grabado?',
    answer:
      'Sí. Las cámaras permiten ver en vivo lo que sucede en el comercio y guardan grabaciones para revisar cualquier incidente, respaldar reclamos o aportar pruebas ante un hecho.'
  },
  {
    question: '¿Dónde instalan sistemas de seguridad para comercios?',
    answer:
      'Brindamos instalación y monitoreo de comercios en Resistencia, toda la provincia del Chaco y la región del NEA, con asesoramiento comercial y soporte técnico local.'
  }
];

const comercioStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/comercio', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
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
    buildFAQPageSchema({ path: '/comercio', questions: comercioFaqs })
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
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>

      <FaqSection
        intro="Resolvemos las dudas más habituales sobre seguridad para comercios y locales: alarmas, cámaras, control de accesos, cortina de humo y monitoreo profesional 24/7."
        faqs={comercioFaqs}
        ariaLabel="Preguntas frecuentes sobre seguridad para comercios"
      />
    </div>
  );
}
