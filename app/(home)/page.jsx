import HeroCarousel from './components/HeroCarousel/HeroCarousel';
import Cotizador from '../components/Cotizador/Cotizador';
import WhyChooseSise from './components/WhyChooseSise/WhyChooseSise';

import styles from './page.module.scss';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <section className={styles.quote} aria-label="Cotizador">
        <h2 className={styles.quoteTitle}>Cotizá tu alarma</h2>
        <p className={styles.quoteSubtitle}>COTIZADOR ONLINE – SOLO ALARMAS</p>

        <Cotizador />
      </section>

      <WhyChooseSise />
    </>
  );
}
