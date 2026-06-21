import LegalLayout from '../components/LegalLayout/LegalLayout';
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from '../lib/seo';

const PAGE_TITLE = 'Botón de arrepentimiento';
const PAGE_DESCRIPTION =
  'Ejercé tu derecho de arrepentimiento ante SISE Argentina dentro de los 10 días corridos, conforme la Resolución 424/2020 y la Ley de Defensa del Consumidor.';
const UPDATED_AT = '21 de junio de 2026';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/arrepentimiento'
});

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({
      path: '/arrepentimiento',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION
    }),
    buildBreadcrumbSchema({ path: '/arrepentimiento', name: 'Botón de arrepentimiento' })
  ]
};

export default function ArrepentimientoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LegalLayout
        title="Botón de arrepentimiento"
        intro="Si contrataste un servicio a distancia, tenés derecho a arrepentirte dentro de los 10 días corridos, sin costo ni necesidad de expresar el motivo."
        updatedAt={UPDATED_AT}
      >
        <h2>¿En qué consiste?</h2>
        <p>
          Conforme la Resolución N.º 424/2020 de la Secretaría de Comercio Interior y la Ley N.º
          24.240 de Defensa del Consumidor, tenés derecho a revocar la aceptación de un servicio
          contratado a distancia (por internet, teléfono u otro medio similar) dentro de los{' '}
          <strong>10 (diez) días corridos</strong> contados a partir de la celebración del contrato
          o del inicio de la prestación, lo que ocurra último.
        </p>
        <p>
          El ejercicio de este derecho es <strong>gratuito</strong>, no requiere expresar el motivo
          y no puede generarte ninguna penalidad.
        </p>

        <h2>¿Cómo ejercer tu derecho de arrepentimiento?</h2>
        <p>
          Para iniciar la solicitud, comunicate con nosotros por cualquiera de estos medios e
          indicá tu nombre completo, los datos del servicio contratado y tu voluntad de revocar la
          contratación:
        </p>
        <div className="dataBox">
          <p>
            <strong>Correo electrónico:</strong>{' '}
            <a href="mailto:info@siseargentina.com?subject=Bot%C3%B3n%20de%20arrepentimiento">
              info@siseargentina.com
            </a>
            <br />
            <strong>Teléfono (24 hs):</strong>{' '}
            <a href="tel:08002225153">0800-222-5153</a>
            <br />
            <strong>WhatsApp:</strong>{' '}
            <a
              href="https://wa.me/5493624231144"
              target="_blank"
              rel="noreferrer"
            >
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
          <li>Servicio sobre el que ejercés el arrepentimiento.</li>
          <li>Un teléfono y/o correo electrónico de contacto.</li>
        </ul>

        <h2>¿Qué sucede después?</h2>
        <p>
          Una vez recibida tu solicitud, te enviaremos una confirmación y procederemos a dar de baja
          el servicio. Si hubieras abonado alguna suma, se te reintegrará conforme la normativa
          vigente. En caso de haberse instalado equipamiento, coordinaremos su retiro o devolución
          según corresponda.
        </p>

        <h2>Importante</h2>
        <p>
          El derecho de arrepentimiento aplica a las contrataciones realizadas a distancia. Para
          dar de baja un servicio que ya se encuentra en ejecución fuera de ese plazo, podés
          utilizar el procedimiento de baja de servicio.
        </p>
      </LegalLayout>
    </>
  );
}
