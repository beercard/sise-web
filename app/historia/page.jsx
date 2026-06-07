import HistoriaHero from './components/HistoriaHero/HistoriaHero';
import HistoriaRecognition from './components/HistoriaRecognition/HistoriaRecognition';
import HistoriaTimeline from './components/HistoriaTimeline/HistoriaTimeline';

import styles from './page.module.scss';

export const metadata = {
  title: 'SISE | Historia',
  description: 'Historia, trayectoria y reconocimientos de SISE Argentina.'
};

export default function HistoriaPage() {
  return (
    <div className={styles.historia}>
      <HistoriaHero />
      <HistoriaRecognition />
      <HistoriaTimeline />
    </div>
  );
}

