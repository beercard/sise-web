import IndustriaHero from './components/IndustriaHero/IndustriaHero';
import IndustriaTechnologyModule from './components/IndustriaTechnologyModule/IndustriaTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';
import { buildPageMetadata } from '../lib/seo';

import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Seguridad para industrias y empresas',
  description:
    'Seguridad electronica para industrias y empresas con videovigilancia, control de accesos, alarmas y monitoreo 24/7.',
  path: '/industria'
});

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
