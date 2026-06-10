import ComercioHero from './components/ComercioHero/ComercioHero';
import ComercioTechnologyModule from './components/ComercioTechnologyModule/ComercioTechnologyModule';

import Cotizador from '../components/Cotizador/Cotizador';
import { buildPageMetadata } from '../lib/seo';

import styles from './page.module.scss';

export const metadata = buildPageMetadata({
  title: 'Seguridad para comercios',
  description:
    'Alarmas, camaras, control de accesos y monitoreo para locales, oficinas y comercios con respuesta profesional y gestion remota.',
  path: '/comercio'
});

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

