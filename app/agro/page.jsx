import AgroHero from './components/AgroHero/AgroHero';
import AgroTechnologyModule from './components/AgroTechnologyModule/AgroTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';

import styles from './page.module.scss';

export const metadata = {
  title: 'SISE | Agro',
  description: 'Soluciones de seguridad electrónica para el campo.'
};

export default function AgroPage() {
  return (
    <div className={styles.agro}>
      <AgroHero />
      <AgroTechnologyModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>
    </div>
  );
}

