import Link from 'next/link';

import LegalLayout from '../components/LegalLayout/LegalLayout';
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from '../lib/seo';

const PAGE_TITLE = 'Política de privacidad';
const PAGE_DESCRIPTION =
  'Política de privacidad y protección de datos personales de SISE Argentina (GRUPO SISE S.A.), en cumplimiento de la Ley N.º 25.326.';
const UPDATED_AT = '21 de junio de 2026';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/privacidad'
});

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/privacidad', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/privacidad', name: 'Política de privacidad' })
  ]
};

export default function PrivacidadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LegalLayout
        title="Política de privacidad"
        intro="En SISE Argentina protegemos tus datos personales conforme a la Ley N.º 25.326 de Protección de los Datos Personales y su normativa complementaria."
        updatedAt={UPDATED_AT}
      >
        <h2>1. Responsable de la base de datos</h2>
        <div className="dataBox">
          <p>
            <strong>GRUPO SISE S.A.</strong>
            <br />
            CUIT: 30-71594907-1
            <br />
            Domicilio: Avenida 9 de Julio 2514, Resistencia, Chaco (CP 3500), Argentina.
            <br />
            Correo electrónico:{' '}
            <a href="mailto:info@siseargentina.com">info@siseargentina.com</a>
            <br />
            Teléfono: <a href="tel:08002225153">0800-222-5153</a>
          </p>
        </div>

        <h2>2. Datos que recopilamos</h2>
        <p>Podemos recopilar los siguientes datos personales:</p>
        <ul>
          <li>
            <strong>Datos de contacto:</strong> nombre y apellido, teléfono y correo electrónico que
            nos proporcionás a través de formularios, el cotizador online, WhatsApp o el teléfono de
            atención.
          </li>
          <li>
            <strong>Datos del requerimiento:</strong> tipo de propiedad, características del lugar a
            proteger y demás información que voluntariamente nos brindás para cotizar o contratar un
            servicio.
          </li>
          <li>
            <strong>Datos de navegación:</strong> información técnica recopilada mediante cookies,
            conforme nuestra <Link href="/cookies">Política de Cookies</Link>.
          </li>
        </ul>

        <h2>3. Finalidad del tratamiento</h2>
        <p>Los datos personales se tratan con las siguientes finalidades:</p>
        <ul>
          <li>Responder consultas y elaborar presupuestos de servicios de seguridad.</li>
          <li>Gestionar la contratación, instalación y prestación del servicio de monitoreo.</li>
          <li>Brindar soporte técnico y atención al cliente.</li>
          <li>
            Enviar comunicaciones relacionadas con el servicio y, cuando corresponda y con tu
            consentimiento, información comercial de SISE.
          </li>
        </ul>

        <h2>4. Carácter de los datos y consentimiento</h2>
        <p>
          La provisión de los datos es voluntaria. Al enviarnos tus datos a través del Sitio,
          prestás tu consentimiento para que sean tratados con las finalidades indicadas. Los datos
          solicitados como obligatorios son necesarios para poder brindarte el servicio o responder
          tu consulta; sin ellos no podremos cumplir con tu solicitud.
        </p>

        <h2>5. Cesión de datos</h2>
        <p>
          SISE no vende ni cede tus datos personales a terceros con fines comerciales. Los datos
          podrán ser compartidos únicamente con proveedores que prestan servicios a la Empresa (por
          ejemplo, monitoreo, soporte tecnológico o envío de comunicaciones), quienes están
          obligados a tratarlos con la debida confidencialidad, o cuando exista una obligación legal
          o requerimiento de autoridad competente.
        </p>

        <h2>6. Seguridad y conservación</h2>
        <p>
          Adoptamos las medidas técnicas y organizativas necesarias para garantizar la seguridad y
          confidencialidad de los datos personales y evitar su adulteración, pérdida, consulta o
          tratamiento no autorizado. Los datos se conservan durante el tiempo necesario para cumplir
          las finalidades para las que fueron recolectados y las obligaciones legales aplicables.
        </p>

        <h2>7. Derechos del titular de los datos</h2>
        <p>
          Como titular de los datos, tenés derecho a acceder, rectificar, actualizar y suprimir tus
          datos personales. Para ejercerlos, escribinos a{' '}
          <a href="mailto:info@siseargentina.com">info@siseargentina.com</a>.
        </p>
        <p>
          El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los
          mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un
          interés legítimo al efecto, conforme lo establecido en el artículo 14, inciso 3 de la Ley
          N.º 25.326.
        </p>
        <p>
          La <strong>AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA</strong>, Órgano de Control de la Ley
          N.º 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con
          relación al incumplimiento de las normas sobre protección de datos personales.
        </p>

        <h2>8. Cookies</h2>
        <p>
          El Sitio utiliza cookies para su correcto funcionamiento y, eventualmente, para fines
          analíticos. Podés conocer el detalle y gestionar tus preferencias en nuestra{' '}
          <Link href="/cookies">Política de Cookies</Link>.
        </p>

        <h2>9. Cambios en esta política</h2>
        <p>
          Esta Política de Privacidad puede ser actualizada en cualquier momento. Las modificaciones
          entrarán en vigencia desde su publicación en el Sitio.
        </p>
      </LegalLayout>
    </>
  );
}
