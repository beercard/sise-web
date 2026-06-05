import EdificiosHero from './components/EdificiosHero/EdificiosHero';
import EdificiosTechnologyModule from './components/EdificiosTechnologyModule/EdificiosTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';

import styles from './page.module.scss';

export const metadata = {
  title: 'SISE | Edificios',
  description: 'Soluciones de seguridad electrónica para edificios y consorcios.'
};

export default function EdificiosPage() {
  return (
    <div className={styles.edificios}>
      <EdificiosHero />
      <EdificiosTechnologyModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>
    </div>
  );
}

