import Link from 'next/link';

import LegalLayout from '../components/LegalLayout/LegalLayout';
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from '../lib/seo';

const PAGE_TITLE = 'Términos y condiciones';
const PAGE_DESCRIPTION =
  'Términos y condiciones de uso del sitio web de SISE Argentina (GRUPO SISE S.A.) y de sus servicios de seguridad electrónica y monitoreo.';
const UPDATED_AT = '21 de junio de 2026';

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/legales'
});

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageSchema({ path: '/legales', title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
    buildBreadcrumbSchema({ path: '/legales', name: 'Términos y condiciones' })
  ]
};

export default function LegalesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LegalLayout
        title="Términos y condiciones"
        intro="Estos términos regulan el uso del sitio web de SISE Argentina y la contratación de nuestros servicios de seguridad electrónica y monitoreo."
        updatedAt={UPDATED_AT}
      >
        <h2>1. Identificación de la empresa</h2>
        <div className="dataBox">
          <p>
            <strong>Razón social:</strong> GRUPO SISE S.A.
            <br />
            <strong>CUIT:</strong> 30-71594907-1
            <br />
            <strong>Domicilio:</strong> Avenida 9 de Julio 2514, Resistencia, Chaco (CP 3500),
            Argentina.
            <br />
            <strong>Habilitación Provincial:</strong> Disp. N.º E7-2025-868-Ae.
            <br />
            <strong>Directora Técnica:</strong> Sra. Mónica Bettina Schapsis.
            <br />
            <strong>Correo electrónico:</strong>{' '}
            <a href="mailto:info@siseargentina.com">info@siseargentina.com</a>
            <br />
            <strong>Teléfono de atención 24 hs:</strong>{' '}
            <a href="tel:08002225153">0800-222-5153</a>
          </p>
        </div>

        <h2>2. Objeto</h2>
        <p>
          El presente documento establece los términos y condiciones que regulan el acceso y la
          utilización del sitio web <strong>siseargentina.com</strong> (en adelante, “el Sitio”),
          titularidad de GRUPO SISE S.A. (en adelante, “SISE” o “la Empresa”), así como la
          información sobre los servicios de seguridad electrónica, alarmas monitoreadas,
          videovigilancia, control de accesos y monitoreo profesional que la Empresa ofrece.
        </p>
        <p>
          La navegación por el Sitio implica la aceptación plena de estos términos. Si no está de
          acuerdo con ellos, le solicitamos que no utilice el Sitio.
        </p>

        <h2>3. Uso del sitio</h2>
        <p>
          El Usuario se compromete a utilizar el Sitio de conformidad con la ley, la buena fe y el
          orden público, absteniéndose de emplearlo con fines ilícitos o que puedan dañar,
          inutilizar o deteriorar el Sitio o impedir su normal utilización por parte de otros
          usuarios.
        </p>

        <h2>4. Información de los servicios</h2>
        <p>
          La información, descripciones y características de los servicios publicadas en el Sitio
          tienen carácter informativo y orientativo. Las condiciones definitivas de cada servicio
          (alcance, equipamiento, abono y plazos) se establecen en el presupuesto y/o contrato
          particular que se celebre con cada cliente. Las cotizaciones obtenidas a través del
          cotizador online son estimativas y no constituyen una oferta vinculante.
        </p>

        <h2>5. Propiedad intelectual</h2>
        <p>
          Todos los contenidos del Sitio —incluyendo, de manera enunciativa, textos, logotipos,
          marcas, imágenes, ilustraciones, diseños y código— son propiedad de GRUPO SISE S.A. o de
          terceros que han autorizado su uso, y se encuentran protegidos por la normativa de
          propiedad intelectual. Queda prohibida su reproducción, distribución o modificación sin
          autorización previa y por escrito de la Empresa.
        </p>

        <h2>6. Responsabilidad</h2>
        <p>
          SISE procura mantener la información del Sitio actualizada y libre de errores, pero no
          garantiza la inexistencia de interrupciones o errores en el acceso. La Empresa no será
          responsable por daños derivados del uso del Sitio ni de la imposibilidad de acceder al
          mismo. El Sitio puede contener enlaces a páginas de terceros sobre cuyo contenido SISE no
          ejerce control ni asume responsabilidad.
        </p>

        <h2>7. Protección de datos y políticas relacionadas</h2>
        <p>
          El tratamiento de los datos personales de los Usuarios se rige por nuestra{' '}
          <Link href="/privacidad">Política de Privacidad</Link>, en cumplimiento de la Ley N.º
          25.326 de Protección de los Datos Personales. El uso de cookies se detalla en la{' '}
          <Link href="/cookies">Política de Cookies</Link>. Asimismo, ponemos a disposición el{' '}
          <Link href="/arrepentimiento">Botón de Arrepentimiento</Link> y el procedimiento para{' '}
          <Link href="/baja">Solicitar la Baja de Servicio</Link>.
        </p>

        <h2>8. Ley aplicable y jurisdicción</h2>
        <p>
          Estos términos se rigen por las leyes de la República Argentina. Para cualquier
          controversia derivada del uso del Sitio o de la contratación de servicios, las partes se
          someten a la jurisdicción de los tribunales ordinarios de la ciudad de Resistencia,
          Provincia del Chaco, sin perjuicio de los derechos que las normas de defensa del
          consumidor reconozcan al Usuario.
        </p>

        <h2>9. Modificaciones</h2>
        <p>
          SISE podrá modificar estos términos en cualquier momento. Las modificaciones entrarán en
          vigencia desde su publicación en el Sitio. Recomendamos revisar esta página
          periódicamente.
        </p>

        <h2>10. Contacto</h2>
        <p>
          Ante cualquier consulta sobre estos términos, podés escribirnos a{' '}
          <a href="mailto:info@siseargentina.com">info@siseargentina.com</a> o llamarnos al{' '}
          <a href="tel:08002225153">0800-222-5153</a>.
        </p>
      </LegalLayout>
    </>
  );
}
