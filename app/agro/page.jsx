import AgroHero from './components/AgroHero/AgroHero';
import AgroTechnologyModule from './components/AgroTechnologyModule/AgroTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';
import { buildPageMetadata } from '../lib/seo';

import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Seguridad para el campo',
  description:
    'Seguridad electrónica para el campo con monitoreo rural, videovigilancia, conectividad y control remoto de establecimientos agropecuarios.',
  path: '/agro'
});

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
