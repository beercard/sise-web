import ComercioHero from './components/ComercioHero/ComercioHero';
import ComercioTechnologyModule from './components/ComercioTechnologyModule/ComercioTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';

import styles from './page.module.scss';

export const metadata = {
  title: 'SISE | Comercio',
  description: 'Soluciones de seguridad electrónica para comercios.'
};

export default function ComercioPage() {
  return (
    <div className={styles.comercio}>
      <ComercioHero />
      <ComercioTechnologyModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>
    </div>
  );
}

