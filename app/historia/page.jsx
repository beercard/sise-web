import HistoriaHero from './components/HistoriaHero/HistoriaHero';
import HistoriaRecognition from './components/HistoriaRecognition/HistoriaRecognition';
import HistoriaTimeline from './components/HistoriaTimeline/HistoriaTimeline';

import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from '../lib/seo';
import styles from './page.module.scss';

const PAGE_TITLE = 'Historia y trayectoria';
const PAGE_DESCRIPTION =
  'Conocé la historia de SISE Argentina: más de 15 años de trayectoria en seguridad electrónica y monitoreo de alarmas en Resistencia y el NEA.';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/historia',
  image: '/image/og-historia.jpg',
  keywords: [
    'historia de SISE Argentina',
    'empresa de seguridad electrónica en el NEA',
    'trayectoria en monitoreo de alarmas',
    'empresa de alarmas en Resistencia',
    'experiencia en seguridad electrónica',
    'CAME',
    'CASEL',
    'empresa de seguridad en Chaco'
  ]
});

const historiaStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/historia',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'AboutPage'
    }),
    buildBreadcrumbSchema({ path: '/historia', name: 'Historia' })
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
