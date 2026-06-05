import ConstruccionHero from './components/ConstruccionHero/ConstruccionHero';
import ConstruccionTechnologyModule from './components/ConstruccionTechnologyModule/ConstruccionTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';

import styles from './page.module.scss';

export const metadata = {
  title: 'SISE | Construcción',
  description: 'Soluciones de seguridad electrónica para construcción y obras.'
};

export default function ConstruccionPage() {
  return (
    <div className={styles.construccion}>
      <ConstruccionHero />
      <ConstruccionTechnologyModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>
    </div>
  );
}
