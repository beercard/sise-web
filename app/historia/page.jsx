import HistoriaHero from './components/HistoriaHero/HistoriaHero';
import HistoriaRecognition from './components/HistoriaRecognition/HistoriaRecognition';
import HistoriaTimeline from './components/HistoriaTimeline/HistoriaTimeline';

import { buildPageMetadata } from '../lib/seo';
import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Historia y trayectoria',
  description:
    'Conoce la historia, trayectoria y reconocimientos de SISE Argentina y su evolucion en soluciones de seguridad electronica.',
  path: '/historia'
});

export default function HistoriaPage() {
  return (
    <div className={styles.historia}>
      <HistoriaHero />
      <HistoriaRecognition />
      <HistoriaTimeline />
    </div>
  );
}
