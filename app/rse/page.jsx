import RseHero from './components/RseHero/RseHero';
import RseInitiativesCarousel from './components/RseInitiativesCarousel/RseInitiativesCarousel';

import { buildPageMetadata } from '../lib/seo';
import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Responsabilidad social empresarial',
  description:
    'Conoce las acciones de responsabilidad social empresarial de SISE Argentina en comunidad, inclusion, deporte, educacion y ambiente.',
  path: '/rse'
});

export default function RsePage() {
  return (
    <div className={styles.rse}>
      <RseHero />
      <RseInitiativesCarousel />
    </div>
  );
}
