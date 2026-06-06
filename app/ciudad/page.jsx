import CiudadHero from './components/CiudadHero/CiudadHero';
import CiudadTechnologyModule from './components/CiudadTechnologyModule/CiudadTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';

import styles from './page.module.scss';

export const metadata = {
  title: 'SISE | Ciudad',
  description: 'Soluciones de seguridad electrónica para la prevención del delito y el control del espacio público.'
};

export default function CiudadPage() {
  return (
    <div className={styles.ciudad}>
      <CiudadHero />
      <CiudadTechnologyModule />
      <section className={styles.cotizadorWrap} aria-label="Cotizador online">
        <Cotizador />
      </section>
    </div>
  );
}

