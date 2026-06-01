import './globals.scss';

import { League_Spartan } from 'next/font/google';

import SiteFooter from './components/SiteFooter/SiteFooter';
import SiteHeader from './components/SiteHeader/SiteHeader';

import styles from './layout.module.scss';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700'],
  display: 'swap'
});

export const metadata = {
  title: 'SISE | Seguridad electrónica',
  description: 'Soluciones en seguridad electrónica accesible, moderna y humana.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={leagueSpartan.className}>
      <body>
        <div className={styles.page}>
          <SiteHeader />
          <main className={styles.main}>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

