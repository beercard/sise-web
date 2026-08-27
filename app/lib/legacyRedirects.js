/*
 * Redirecciones 301 del sitio anterior.
 *
 * siseargentina.com pasó por tres generaciones antes de este desarrollo y las
 * tres dejaron URLs indexadas y con enlaces entrantes:
 *
 *   1. Joomla   — /index.php/<seccion>.html y /<seccion>.html
 *   2. Intermedia — /servicios/<solucion>
 *   3. WordPress — /projects/<solucion>, /category/*, /tag/*
 *
 * El inventario salió del wp-sitemap.xml del sitio viejo y del histórico de
 * Archive.org (116 rutas). Acá va sólo lo que tiene contenido equivalente en
 * el sitio nuevo: cada vieja URL apunta a la página que responde la misma
 * intención de búsqueda. Lo que era demo del theme de WordPress (elements-*,
 * home-N, /producto/*, /shop, sample-page…) queda deliberadamente en 404: no
 * tiene contenido equivalente y mandarlo al home sería un soft 404.
 *
 * Todas van con `statusCode: 301` en vez de `permanent: true`: Next traduce
 * `permanent` a un 308, que Google trata igual, pero el 301 lo entienden
 * también los bots viejos y las herramientas de auditoría de la migración.
 */

/* Las soluciones del sitio viejo no tienen página propia acá: cada una va a
   la vertical donde vive esa solución en el sitio nuevo. */
const SOLUCIONES = {
  'monitoreo-de-alarmas': '/',
  'circuito-cerrado-de-television': '/',
  'circuito-cerrado-de-television-cctv': '/',
  'video-vigilancia': '/',
  'camaras-de-seguridad': '/',
  'vigilancia-remota': '/',
  'video-vigilancia-rural': '/agro',
  'cerco-perimetral': '/hogar',
  'cerco-electrico-perimetral': '/hogar',
  'cerco-electrico-perimetral-de-uso-legal': '/hogar',
  'cercos-electricos-legales': '/hogar',
  'gps-rastreo-satelital': '/industria',
  'seguimiento-vehicular-por-gps': '/industria',
  'edificios-inteligentes': '/edificios',
  'video-control-y-accesos-a-edificios': '/edificios',
  'videoporteros-samsung-smarthome': '/edificios',
  'cerraduras-samsung': '/edificios',
  'cerraduras-residenciales-samsung': '/edificios',
  'cerraduras-electronicas': '/edificios',
  'guardia-virtual': '/edificios',
  'poste-inteligente': '/ciudad',
  'maxima-seguridad': '/'
};

const permanente = (source, destination) => ({ source, destination, statusCode: 301 });

/* Una misma solución vivió bajo tres prefijos distintos. */
const rutasDeSoluciones = Object.entries(SOLUCIONES).flatMap(([slug, destino]) => [
  permanente(`/servicios/${slug}`, destino),
  permanente(`/projects/${slug}`, destino),
  permanente(`/index.php/seguridad-electronica/${slug}.html`, destino),
  permanente(`/seguridad-electronica/${slug}.html`, destino)
]);

/* Los cercos eléctricos de Joomla llevaban tilde en la URL. */
const rutasConTilde = [
  permanente('/index.php/seguridad-electronica/cercos-eléctricos-legales.html', '/hogar'),
  permanente('/seguridad-electronica/cercos-eléctricos-legales.html', '/hogar'),
  permanente('/index.php/seguridad-electronica/máxima-seguridad.html', '/'),
  permanente('/index.php/tecnología-y-conectividad.html', '/')
];

const rutasInstitucionales = [
  /* Quiénes somos → la historia de la empresa. */
  permanente('/quienes-somos', '/historia'),
  permanente('/about-us', '/historia'),
  permanente('/about-us-2', '/historia'),
  permanente('/about-us-3', '/historia'),
  permanente('/index.php/s-i-s-e.html', '/historia'),
  permanente('/s-i-s-e.html', '/historia'),
  permanente('/sise.html', '/historia'),

  /* Contacto y sus páginas de gracias. */
  permanente('/contacto.html', '/contacto'),
  permanente('/index.php/contacto.html', '/contacto'),
  permanente('/contact-form', '/contacto'),
  permanente('/contacts-3', '/contacto'),
  permanente('/gracias-por-su-consulta', '/contacto'),
  permanente('/gracias-por-su-consulta-2', '/contacto'),
  permanente('/gracias-por-su-consulta-4', '/contacto'),
  permanente('/newsletter', '/contacto'),

  /* Índices de servicios: sin equivalente uno a uno, al home. */
  permanente('/servicios', '/'),
  permanente('/projects', '/'),
  permanente('/soluciones-y-servicios.html', '/'),
  permanente('/index.php/seguridad-electronica.html', '/'),
  permanente('/seguridad-electronica.html', '/'),
  permanente('/features', '/'),
  permanente('/home.html', '/'),
  permanente('/home', '/'),
  permanente('/index.php', '/'),

  /* Novedades: el blog no se reconstruyó. Las dos notas con tráfico van a la
     sección que hoy cubre ese tema. */
  permanente('/ya-se-transmite-en-vivo-el-estado-de-transitabilidad-del-puente', '/'),
  permanente(
    '/instalacion-de-centro-de-videovigilancia-con-camaras-de-ultima-generacion-en-oficinas-del-911-saenz-pena-chaco',
    '/ciudad'
  ),
  permanente('/novedades', '/'),
  permanente('/novedades.html', '/'),
  permanente('/index.php/novedades_news.html', '/'),
  permanente('/blog', '/'),
  permanente('/videos', '/'),

  /* Área de clientes y cámaras en vivo: hoy se gestiona por contacto. */
  permanente('/clientes', '/contacto'),
  permanente('/clientes.html', '/contacto'),
  permanente('/index.php/clientes.html', '/contacto'),
  permanente('/index.php/acceso-clientes.html', '/contacto'),
  permanente('/login-camaras', '/contacto'),
  permanente('/camaras', '/'),
  permanente('/camaras-en-vivo', '/'),
  permanente('/control-de-precencia.html', '/industria')
];

/* Taxonomías de WordPress: los tags eran de las notas del blog. */
const rutasDeTaxonomias = [
  permanente('/category/:slug', '/'),
  permanente('/tag/911', '/ciudad'),
  permanente('/tag/chaco', '/'),
  permanente('/tag/camaras', '/'),
  permanente('/tag/monitoreo', '/'),
  permanente('/tag/seguridad', '/'),
  permanente('/tag/sise', '/historia'),
  permanente('/tag/videovigilancia', '/'),
  permanente('/tag/:slug', '/'),
  permanente('/projects-category/:slug', '/'),
  permanente('/author/:slug', '/historia'),

  /* Los feeds de Joomla y WordPress. */
  permanente('/feed', '/'),
  permanente('/comments/feed', '/'),
  permanente('/index.php/:path*.feed', '/')
];

export const legacyRedirects = [
  ...rutasDeSoluciones,
  ...rutasConTilde,
  ...rutasInstitucionales,
  ...rutasDeTaxonomias
];
