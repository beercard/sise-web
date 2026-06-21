import Image from 'next/image';

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

import MonitoreoCarousel from './components/MonitoreoCarousel/MonitoreoCarousel';
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

const hogarFaqs = [
  {
    question: '¿Cuánto cuesta instalar una alarma monitoreada en una casa?',
    answer:
      'El precio de una alarma monitoreada para el hogar depende del tamaño de la casa, la cantidad de ambientes y los accesos a proteger. Hacemos un relevamiento sin cargo y te pasamos una cotización a medida; podés estimarla al instante con nuestro cotizador online.'
  },
  {
    question: '¿Qué incluye un sistema de alarma para el hogar?',
    answer:
      'Un sistema completo combina sensores de movimiento, sensores magnéticos en puertas y ventanas, sirena, cámaras de videovigilancia y control total desde tu celular. Todo integrado a nuestro monitoreo profesional 24/7.'
  },
  {
    question: '¿Cómo funciona el monitoreo 24/7 cuando se activa la alarma?',
    answer:
      'Ante cualquier evento, nuestra central de monitoreo recibe la alerta en segundos, verifica la situación y coordina la respuesta inmediata, dando aviso a la familia y a las fuerzas de seguridad cuando corresponde.'
  },
  {
    question: '¿Puedo ver las cámaras de mi casa desde el celular?',
    answer:
      'Sí. Desde la app controlás la alarma, recibís notificaciones en tiempo real y ves las cámaras en vivo y las grabaciones, estés donde estés.'
  },
  {
    question: '¿La alarma sigue funcionando si se corta la luz o internet?',
    answer:
      'Sí. Los equipos cuentan con batería de respaldo y comunicación celular, de modo que el sistema continúa protegido y comunicado con la central aunque se interrumpa la energía o la conexión a internet.'
  },
  {
    question: '¿En qué zonas instalan alarmas monitoreadas para el hogar?',
    answer:
      'Trabajamos en Resistencia, toda la provincia del Chaco y la región del NEA, con instalación profesional y soporte técnico local.'
  }
];

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
    }),
    buildFAQPageSchema({ path: '/hogar', questions: hogarFaqs })
  ]
};

export default function HogarPage() {
  return (
    <div className={styles.hogar}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hogarStructuredData) }}
      />

      <section className={styles.hero} aria-label="SISE Hogar">
        <div className={styles.heroMedia}>
          <Image
            src="/image/mpudc5hr-8gb1yso.webp"
            alt="Alarma monitoreada y cámaras de seguridad en una vivienda"
            className={styles.heroImage}
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.heroGradient} aria-hidden="true" />

          <div className={styles.heroTitleGroup}>
            <Image
              src="/image/mpudc5hr-7mihfr3.png"
              alt="SISE Hogar"
              className={styles.heroLogo}
              width={334}
              height={60}
              priority
            />

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLight}>Protección integral para </span>
              <span className={styles.heroTitleStrong}>vivir con tranquilidad</span>
            </h1>
          </div>
        </div>

        <div className={styles.heroBottom} aria-label="Información">
          <div className={styles.heroBottomInner}>
            <div className={styles.heroText}>
              <p className={styles.heroLead}>
                <span className={styles.heroLeadLight}>
                  Una alarma monitoreada no es solo tecnología,&nbsp;
                </span>
                <span className={styles.heroLeadStrong}>es la paz de tu familia.</span>
              </p>

              <p className={styles.heroBody}>
                Desarrollamos soluciones confiables que protegen tu hogar antes, durante y después
                de cualquier intrusión.
                <br />
                <br />
                Nuestro sistema combina sensores, sirena, cámaras, monitoreo profesional 24/7 y
                control total desde tu celular, para que puedas trabajar, viajar o descansar con la
                certeza de que un equipo experto cuida lo que más querés en todo momento.
              </p>

              <p className={styles.heroPunch}>Con SISE, no solo alertamos: actuamos.</p>
            </div>

            <MonitoreoCarousel />
          </div>
        </div>
      </section>

      <TechnologyModule />

      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>

      <FaqSection
        intro="Sabemos que la seguridad de tu casa no admite dudas. Por eso reunimos las consultas más frecuentes sobre alarmas monitoreadas, cámaras y monitoreo 24/7 para el hogar."
        faqs={hogarFaqs}
        ariaLabel="Preguntas frecuentes sobre seguridad para el hogar"
      />
    </div>
  );
}
