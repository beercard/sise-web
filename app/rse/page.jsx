import RseHero from './components/RseHero/RseHero';
import RseInitiativesCarousel from './components/RseInitiativesCarousel/RseInitiativesCarousel';

import styles from './page.module.scss';

export const metadata = {
  title: 'SISE | RSE',
  description: 'Acciones de responsabilidad social empresarial impulsadas por SISE Argentina.'
};

export default function RsePage() {
  return (
    <div className={styles.rse}>
      <RseHero />
      <RseInitiativesCarousel />
    </div>
  );
}
