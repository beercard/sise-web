import HeroCarousel from './components/HeroCarousel/HeroCarousel';
import Cotizador from '../components/Cotizador/Cotizador';
import HomePillarsCarousel from './components/HomePillarsCarousel/HomePillarsCarousel';
import HomeSeoContent from './components/HomeSeoContent/HomeSeoContent';
import {
  buildFAQPageSchema,
  buildLocalAreas,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema
} from '../lib/seo';
import WhyChooseSise from './components/WhyChooseSise/WhyChooseSise';

import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Soluciones de seguridad electronica para hogares, empresas y ciudades',
  description:
    'Alarmas monitoreadas, camaras, videovigilancia, control de accesos y monitoreo 24/7 para hogares, empresas, edificios, campo y ciudades en Resistencia, Chaco y todo el NEA.',
  path: '/',
  keywords: [
    'alarmas monitoreadas',
    'seguridad electronica',
    'camaras de seguridad',
    'control de accesos',
    'monitoreo 24/7',
    'seguridad electronica en el NEA',
    'alarmas en Resistencia',
    'seguridad electronica en Chaco'
  ]
});

const homeFaqs = [
  {
    question: '¿Cómo funciona el Cerco Eléctrico?',
    answer:
      'Funciona emitiendo pulsos de repulsión que alejan al intruso de forma inmediata, pero es un sistema 100% seguro y homologado que no es letal ni daña la salud de personas o animales. Es tecnología diseñada para ser accesible y humana.'
  },
  {
    question: '¿El Cerco Eléctrico es monitoreado?',
    answer:
      'Por sí solo, el cerco funciona con una sirena local de alta potencia. Para que tu perímetro esté vigilado 24/7, se le suma nuestro servicio de alarma monitoreada. Al integrarlos, cualquier intento de intrusión o corte envía una alerta inmediata a nuestro Centro de Operaciones para actuar al instante.'
  },
  {
    question: '¿Puedo controlar la Alarma desde mi celular?',
    answer:
      'Sí. Como empresa ágil y tecnológica, te damos el control total. Podés gestionar tu seguridad y recibir notificaciones en tiempo real desde la app, estés donde estés.'
  },
  {
    question: '¿Cuánto cuesta instalar una Alarma?',
    answer:
      'Nuestros presupuestos son a medida y adaptados a cada cliente. Realizamos un relevamiento técnico sin cargo para ofrecerte soluciones confiables y una cotización personalizada, asegurando que inviertas exactamente en lo que necesitás.'
  },
  {
    question: '¿Cuál es el beneficio de una Alarma Monitoreada frente a una común?',
    answer:
      'Porque una sirena sonando no detiene a nadie ni garantiza asistencia. Con el monitoreo, si el perímetro o el interior se vulnera, nuestra central recibe la alerta, verifica el evento y coordina el envío inmediato de las fuerzas de seguridad.'
  }
];

const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/',
      title: 'Soluciones de seguridad electronica para hogares, empresas y ciudades',
      description:
        'Alarmas monitoreadas, camaras, videovigilancia, control de accesos y monitoreo 24/7 para hogares, empresas, edificios, campo y ciudades en Resistencia, Chaco y todo el NEA.'
    }),
    buildServiceSchema({
      path: '/',
      name: 'Seguridad electronica integral SISE Argentina',
      description:
        'Soluciones integrales de alarmas monitoreadas, camaras, videovigilancia y control de accesos para hogares, empresas, edificios, campo y ciudades en todo el NEA.',
      serviceType: 'Seguridad electronica y monitoreo',
      audience: 'Hogares, empresas y organismos',
      areaServed: buildLocalAreas()
    }),
    buildFAQPageSchema({
      path: '/',
      questions: homeFaqs
    })
  ]
};

export default function HomePage() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />

      <HeroCarousel />
      <HomeSeoContent />
      <HomePillarsCarousel />

      <section className={styles.quote} aria-label="Cotizador">
        <Cotizador showHeader />
      </section>

      <WhyChooseSise />

      <section className={styles.faqSection} aria-label="Preguntas frecuentes">
        <div className={styles.faqInner}>
          <div className={styles.faqHeader}>
            <h2 className={styles.faqTitle}>Preguntas frecuentes</h2>
            <p className={styles.faqIntro}>
              Sabemos que la seguridad no admite dudas; por eso, estamos cerca para
              responderte con claridad y ofrecerte la tranquilidad cotidiana que vos y tu
              familia necesitan.
            </p>
          </div>

          <div className={styles.faqList}>
            {homeFaqs.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.question}</summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
