import Link from 'next/link';

import CiudadHero from './components/CiudadHero/CiudadHero';
import CiudadTechnologyModule from './components/CiudadTechnologyModule/CiudadTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';
import {
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
  keywords: [
    'seguridad para ciudades',
    'videovigilancia urbana',
    'monitoreo del espacio público',
    'seguridad municipal',
    'seguridad urbana en Chaco',
    'videovigilancia para municipios'
  ]
});

const ciudadAuthorityItems = [
  {
    eyebrow: 'Escalable',
    title: 'Proyectos por etapas y prioridades',
    text: 'Diseñamos implementaciones que pueden comenzar por accesos, espacios públicos o edificios estratégicos y crecer según el plan del municipio.'
  },
  {
    eyebrow: 'En tiempo real',
    title: 'Monitoreo y control operativo',
    text: 'Integramos videovigilancia, alertas y herramientas de supervisión para mejorar la lectura del territorio y la capacidad de respuesta.'
  },
  {
    eyebrow: 'Resistencia, Chaco',
    title: 'Base técnica para proyectos locales',
    text: 'Acompañamos iniciativas urbanas desde nuestra sede en Resistencia con una mirada práctica sobre despliegue, continuidad y gestión de recursos.'
  }
];

const ciudadInternalLinks = [
  {
    href: '/edificios',
    title: 'Edificios y consorcios',
    text: 'Soluciones aplicables a halls, ingresos, cocheras y administración de accesos en edificios públicos o residenciales.'
  },
  {
    href: '/comercio',
    title: 'Corredores comerciales',
    text: 'Tecnología para entornos con alta circulación, aperturas frecuentes y necesidad de control operativo.'
  },
  {
    href: '/industria',
    title: 'Áreas industriales y logísticas',
    text: 'Protección de perímetros, ingresos, activos y movimientos en polos productivos o parques industriales.'
  },
  {
    href: '/contacto',
    title: 'Asesoramiento institucional',
    text: 'Analizamos necesidades, alcance y prioridades para ordenar una estrategia de seguridad urbana a medida.'
  }
];

const ciudadFaqs = [
  {
    question: '¿Qué tipo de soluciones puede implementar un municipio con SISE?',
    answer:
      'SISE puede desarrollar propuestas de videovigilancia urbana, monitoreo del espacio público, control de accesos y esquemas de supervisión para puntos críticos según el objetivo del proyecto.'
  },
  {
    question: '¿Se puede empezar con una etapa inicial y ampliar el sistema después?',
    answer:
      'Sí. Una estrategia por etapas permite priorizar zonas, accesos o edificios clave y escalar la infraestructura a medida que evolucionan las necesidades operativas.'
  },
  {
    question: '¿Las soluciones se adaptan a plazas, avenidas, barrios y edificios públicos?',
    answer:
      'Sí. Cada entorno urbano tiene requerimientos distintos, por eso el diseño contempla circulación, visibilidad, puntos de control y necesidades de supervisión específicas.'
  },
  {
    question: '¿Cómo ayuda la videovigilancia a mejorar la gestión del espacio público?',
    answer:
      'La videovigilancia aporta información en tiempo real para seguimiento de eventos, evaluación de incidencias y mejor coordinación entre las áreas responsables de la seguridad.'
  },
  {
    question: '¿SISE puede asesorar proyectos para municipios de Chaco?',
    answer:
      'Sí. Desde la base operativa en Resistencia, Chaco, SISE brinda asesoramiento técnico y comercial para evaluar alcances, prioridades y soluciones de seguridad urbana.'
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
    buildServiceSchema({
      path: '/ciudad',
      name: 'Videovigilancia urbana y seguridad para ciudades',
      description:
        'Soluciones de seguridad para municipios y ciudades con videovigilancia urbana, monitoreo del espacio público y herramientas de supervisión.',
      serviceType: 'Seguridad urbana y videovigilancia',
      audience: 'Municipios, gobiernos y organismos públicos',
      areaServed: buildLocalAreas()
    }),
    buildFAQPageSchema({
      path: '/ciudad',
      questions: ciudadFaqs
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

      <section className={styles.authoritySection} aria-label="Autoridad y experiencia en seguridad urbana">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>AUTORIDAD INSTITUCIONAL</p>
            <h2 className={styles.sectionTitle}>Seguridad urbana pensada para gestión, control y escalabilidad</h2>
            <p className={styles.sectionText}>
              Una estrategia para ciudades no se limita a instalar cámaras. Requiere
              lectura del territorio, prioridades claras, infraestructura confiable y una
              ejecución ordenada. Desde Resistencia, Chaco, acompañamos proyectos con foco
              en prevención y capacidad operativa.
            </p>
          </div>

          <div className={styles.authorityGrid}>
            {ciudadAuthorityItems.map((item) => (
              <article key={item.title} className={styles.authorityCard}>
                <p className={styles.authorityCardEyebrow}>{item.eyebrow}</p>
                <h3 className={styles.authorityCardTitle}>{item.title}</h3>
                <p className={styles.authorityCardText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contextSection} aria-label="Enlaces internos relacionados">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>ENLAZADO CONTEXTUAL</p>
            <h2 className={styles.sectionTitle}>Conectá la estrategia urbana con otros entornos críticos</h2>
            <p className={styles.sectionText}>
              Los proyectos municipales suelen involucrar edificios públicos, zonas
              comerciales, accesos logísticos y espacios de alta circulación. Si querés
              ampliar el análisis, también podés revisar soluciones para{' '}
              <Link href="/hogar">hogares</Link> o volver a la{' '}
              <Link href="/">visión general de SISE</Link>.
            </p>
          </div>

          <div className={styles.contextGrid}>
            {ciudadInternalLinks.map((item) => (
              <Link key={item.href} href={item.href} className={styles.contextCard}>
                <span className={styles.contextCardTitle}>{item.title}</span>
                <span className={styles.contextCardText}>{item.text}</span>
                <span className={styles.contextCardLink}>Explorar página</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-label="Preguntas frecuentes sobre seguridad urbana">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>FAQS</p>
            <h2 className={styles.sectionTitle}>Preguntas frecuentes sobre videovigilancia urbana</h2>
            <p className={styles.sectionText}>
              Este bloque responde dudas habituales de municipios y organismos que buscan
              ordenar una estrategia de seguridad para el espacio público.
            </p>
          </div>

          <div className={styles.faqList}>
            {ciudadFaqs.map((item, index) => (
              <details key={item.question} className={styles.faqItem} open={index === 0}>
                <summary className={styles.faqQuestion}>{item.question}</summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>
    </div>
  );
}
