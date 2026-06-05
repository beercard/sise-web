import IndustriaHero from './components/IndustriaHero/IndustriaHero';
import IndustriaTechnologyModule from './components/IndustriaTechnologyModule/IndustriaTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';

import styles from './page.module.scss';

export const metadata = {
  title: 'SISE | Industria',
  description: 'Soluciones de seguridad electrónica para empresas e industrias.'
};

export default function IndustriaPage() {
  return (
    <div className={styles.industria}>
      <IndustriaHero />
      <IndustriaTechnologyModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>
    </div>
  );
}
