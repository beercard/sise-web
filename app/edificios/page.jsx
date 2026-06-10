import EdificiosHero from './components/EdificiosHero/EdificiosHero';
import EdificiosTechnologyModule from './components/EdificiosTechnologyModule/EdificiosTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';
import { buildPageMetadata } from '../lib/seo';

import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'SISE Urbano: seguridad para edificios y consorcios',
  description:
    'Seguridad para edificios, consorcios y entornos urbanos con control de accesos, videovigilancia y monitoreo centralizado.',
  path: '/edificios'
});

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
