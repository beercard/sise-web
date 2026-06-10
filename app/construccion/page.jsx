import ConstruccionHero from './components/ConstruccionHero/ConstruccionHero';
import ConstruccionTechnologyModule from './components/ConstruccionTechnologyModule/ConstruccionTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';
import { buildPageMetadata } from '../lib/seo';

import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Seguridad para obras y construccion',
  description:
    'Seguridad electronica para obras y construccion con monitoreo, videovigilancia y control perimetral para proteger materiales, equipos y accesos.',
  path: '/construccion'
});

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
