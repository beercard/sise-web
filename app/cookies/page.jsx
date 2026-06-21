import Link from 'next/link';

import LegalLayout from '../components/LegalLayout/LegalLayout';
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from '../lib/seo';

const PAGE_TITLE = 'Política de cookies';
const PAGE_DESCRIPTION =
  'Información sobre el uso de cookies en el sitio web de SISE Argentina y cómo podés gestionarlas desde tu navegador.';
const UPDATED_AT = '21 de junio de 2026';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/cookies'
});

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/cookies', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/cookies', name: 'Política de cookies' })
  ]
};

export default function CookiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LegalLayout
        title="Política de cookies"
        intro="Usamos cookies para que el sitio funcione correctamente y, eventualmente, para entender cómo se utiliza y mejorar tu experiencia."
        updatedAt={UPDATED_AT}
      >
        <h2>¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo
          cuando los visitás. Permiten que el sitio recuerde información sobre tu navegación, como
          tus preferencias, para mejorar tu experiencia de uso.
        </p>

        <h2>¿Qué tipos de cookies utilizamos?</h2>
        <ul>
          <li>
            <strong>Cookies necesarias:</strong> imprescindibles para el funcionamiento del sitio y
            la navegación entre páginas. No pueden desactivarse.
          </li>
          <li>
            <strong>Cookies de rendimiento y analíticas:</strong> nos ayudan a comprender cómo
            interactúan los visitantes con el sitio (páginas más vistas, tiempo de permanencia) de
            forma agregada y, en general, anónima. Se utilizan únicamente con tu consentimiento.
          </li>
          <li>
            <strong>Cookies de terceros:</strong> en caso de incorporar servicios externos (por
            ejemplo, herramientas de medición o mapas), estos pueden instalar sus propias cookies,
            sujetas a sus respectivas políticas.
          </li>
        </ul>

        <h2>¿Cómo gestionar las cookies?</h2>
        <p>
          Podés permitir, bloquear o eliminar las cookies instaladas en tu dispositivo configurando
          las opciones de tu navegador. Te dejamos los enlaces de ayuda de los navegadores más
          utilizados:
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noreferrer"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/es/kb/Borrar%20cookies"
              target="_blank"
              rel="noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/es-es/microsoft-edge"
              target="_blank"
              rel="noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>
        <p>
          Tené en cuenta que bloquear ciertas cookies puede afectar el correcto funcionamiento de
          algunas secciones del sitio.
        </p>

        <h2>Más información</h2>
        <p>
          El tratamiento de los datos personales que pudieran recopilarse mediante cookies se rige
          por nuestra <Link href="/privacidad">Política de Privacidad</Link>.
        </p>
      </LegalLayout>
    </>
  );
}
