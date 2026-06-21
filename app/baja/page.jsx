import Link from 'next/link';

import LegalLayout from '../components/LegalLayout/LegalLayout';
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from '../lib/seo';

const PAGE_TITLE = 'Solicitar baja de servicio';
const PAGE_DESCRIPTION =
  'Conocé cómo solicitar la baja de tu servicio de monitoreo o seguridad electrónica en SISE Argentina de forma simple, sin trámites innecesarios.';
const UPDATED_AT = '21 de junio de 2026';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/baja'
});

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/baja', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/baja', name: 'Solicitar baja de servicio' })
  ]
};

export default function BajaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LegalLayout
        title="Solicitar baja de servicio"
        intro="Podés dar de baja tu servicio de forma sencilla y por el mismo medio por el que lo contrataste. Acá te explicamos cómo."
        updatedAt={UPDATED_AT}
      >
        <h2>Tu derecho a dar de baja</h2>
        <p>
          De acuerdo con la Ley N.º 24.240 de Defensa del Consumidor, la baja de un servicio debe
          poder solicitarse de manera tan sencilla como su contratación. En SISE respetamos ese
          derecho y te garantizamos un procedimiento claro y sin obstáculos.
        </p>

        <h2>¿Cómo solicitar la baja?</h2>
        <p>
          Comunicate con nosotros por cualquiera de estos medios e indicá tu voluntad de dar de baja
          el servicio:
        </p>
        <div className="dataBox">
          <p>
            <strong>Correo electrónico:</strong>{' '}
            <a href="mailto:info@siseargentina.com?subject=Solicitud%20de%20baja%20de%20servicio">
              info@siseargentina.com
            </a>
            <br />
            <strong>Teléfono (24 hs):</strong>{' '}
            <a href="tel:08002225153">0800-222-5153</a>
            <br />
            <strong>WhatsApp:</strong>{' '}
            <a href="https://wa.me/5493624231144" target="_blank" rel="noreferrer">
              +54 9 362 423-1144
            </a>
            <br />
            <strong>Domicilio:</strong> Avenida 9 de Julio 2514, Resistencia, Chaco.
          </p>
        </div>

        <h2>Datos a informar</h2>
        <ul>
          <li>Nombre y apellido del titular del servicio.</li>
          <li>Número de cliente o de contrato, si lo tenés disponible.</li>
          <li>Domicilio donde se presta el servicio.</li>
          <li>Un teléfono y/o correo electrónico de contacto.</li>
        </ul>

        <h2>¿Qué sucede después?</h2>
        <p>
          Procesaremos tu solicitud a la brevedad y te enviaremos una <strong>constancia de
          baja</strong>. En caso de corresponder, coordinaremos el retiro del equipamiento y la
          liquidación final de la cuenta conforme las condiciones de tu contrato.
        </p>

        <h2>¿Te arrepentiste de una contratación reciente?</h2>
        <p>
          Si contrataste a distancia hace menos de 10 días corridos, podés ejercer tu derecho sin
          costo a través del <Link href="/arrepentimiento">Botón de Arrepentimiento</Link>.
        </p>
      </LegalLayout>
    </>
  );
}
