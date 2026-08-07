import HistoriaHero from './components/HistoriaHero/HistoriaHero';
import HistoriaRecognition from './components/HistoriaRecognition/HistoriaRecognition';
import HistoriaTimeline from './components/HistoriaTimeline/HistoriaTimeline';

import { buildBreadcrumbSchema, buildItemListSchema, buildPageMetadata, buildWebPageSchema } from '../lib/seo';
import styles from './page.module.scss';

const PAGE_TITLE = 'Historia, trayectoria y experiencia';
const PAGE_DESCRIPTION =
  'Conocé la historia de SISE Argentina: trayectoria, reconocimientos y evolución en seguridad electrónica y monitoreo de alarmas en Resistencia, Chaco y el NEA.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/historia',
  image: '/image/og-historia.jpg',
  category: 'Institucional',
  keywords: [
    'historia de SISE Argentina',
    'empresa de seguridad electrónica en el NEA',
    'trayectoria en monitoreo de alarmas',
    'empresa de alarmas en Resistencia',
    'experiencia en seguridad electrónica',
    'empresa de seguridad en Chaco',
    'trayectoria empresarial en seguridad',
    'reconocimientos SISE',
    'CAME',
    'CASEL'
  ]
});

const historiaHighlights = [
  {
    name: 'Trayectoria en seguridad electrónica',
    description: 'Evolución sostenida de SISE en monitoreo, videovigilancia y soluciones integrales.'
  },
  {
    name: 'Reconocimientos institucionales',
    description: 'Participación y reconocimiento en cámaras y entidades del sector.'
  },
  {
    name: 'Compromiso regional',
    description: 'Desarrollo de soluciones para hogares, empresas y organismos del NEA.'
  }
];

const historiaStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/historia',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'AboutPage'
    }),
    buildBreadcrumbSchema({ path: '/historia', name: 'Historia' }),
    buildItemListSchema({
      path: '/historia',
      name: 'Aspectos destacados de la historia de SISE',
      items: historiaHighlights
    })
  ]
};

export default function HistoriaPage() {
  return (
    <div className={styles.historia}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(historiaStructuredData) }}
      />
      <HistoriaHero />
      <HistoriaRecognition />
      <HistoriaTimeline />
    </div>
  );
}
