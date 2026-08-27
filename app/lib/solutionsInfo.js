/*
 * Contenido de los popups "+ info" de las tarjetas de soluciones. Cada entrada
 * se comparte entre todas las páginas que ofrecen la misma solución: los
 * módulos referencian la clave con `info: '<clave>'` en su tarjeta y
 * SolutionInfoPopup la renderiza.
 *
 * Campos: `description` y `benefits` aceptan string o lista de párrafos;
 * `distinctive` es lista de párrafos; `components` es una lista donde cada
 * entrada es un ítem con viñeta (string) o una nota sin viñeta
 * (`{ note: '...' }`), que además abre un nuevo bloque de ítems.
 */
export const SOLUTIONS_INFO = {
  'alarma-monitoreada': {
    title: 'ALARMA MONITOREADA',
    tagline: 'Detección inteligente con respuesta operativa inmediata y 100% local.',
    photo: '/image/solucion-alarma-foto.webp',
    photoAlt: 'Técnico de SISE instalando cartelería de alarma monitoreada',
    description:
      'Servicio de seguridad electrónica inteligente que detecta intrusiones o eventos críticos y transmite alertas inmediatas a nuestra Central de Monitoreo para su gestión bajo protocolos estrictos.',
    components: [
      'Sensor de movimiento.',
      'Sensores magnéticos.',
      'Sensores de incendio (según requerimiento).',
      'Teclado.',
      'Sirena.',
      'Central con comunicador.',
      'Batería de respaldo.',
      'Cartelería disuasiva.',
      'Configuración personalizada según cada cliente.',
      { note: 'Opcional: Cableada o Inalámbrica.' }
    ],
    benefits:
      'Protección ininterrumpida 24/7 de tus bienes y activos. Prevención activa de intrusiones, minimización de pérdidas y respuesta inmediata ante emergencias de seguridad o siniestros.',
    distinctive: [
      'Presencia local y respuesta real.',
      'Nuestro monitoreo es operado 24/7 por personas físicas en la región que conocen tu contexto y aplican acciones inmediatas, no por un software automatizado.'
    ]
  },
  'cerco-electrico': {
    title: 'CERCO ELÉCTRICO PERIMETRAL',
    tagline: 'La primera línea de defensa para proteger tu propiedad.',
    photo: '/image/solucion-cerco-foto.webp',
    photoAlt: 'Cerco eléctrico perimetral instalado por SISE',
    description:
      'Cierre perimetral activo que funciona como tu primera barrera física, diseñado para frenar el avance y dificultar cualquier ingreso mediante pulsos de alta tensión controlada.',
    components: [
      'Central Electrificadora.',
      'Batería de Respaldo (12v).',
      'Postelería y Aisladores.',
      '5 Hilos Conductores.',
      'Jabalina de Puesta a Tierra.',
      'Cartelería Reglamentaria de Advertencia.',
      'Sirena Exterior.'
    ],
    benefits: [
      'Alto poder disuasivo las 24 horas.',
      'Funciona como un obstáculo que retrasa y complica el ingreso, operando de forma segura y no letal.'
    ],
    distinctive: [
      'Único cerco en la región 100% certificado y homologado (ISO-IRAM).',
      'Al conectarlo a tu alarma SISE, lo transformás en un Cerco Monitoreado con alerta inmediata a nuestra Central.'
    ]
  },
  'cctv-videovigilancia': {
    title: 'CCTV / VIDEOVIGILANCIA ACTIVA',
    tagline: 'Auditoría visual 24/7 y disuasión activa en tiempo real.',
    photo: '/image/solucion-cctv-foto.webp',
    photoAlt: 'Cámara de videovigilancia instalada por SISE',
    description:
      'Instalamos un circuito de cámaras para que controles tus espacios desde el celular (CCTV), con la capacidad de sumarle intervención en tiempo real mediante operadores en vivo (Videovigilancia).',
    components: [
      'Cámaras de seguridad.',
      'Grabador (DVR).',
      'Disco de almacenamiento.',
      'Instalación.',
      'Cartelería disuasiva.',
      { note: 'Al escalar a monitoreo activo, se integra:' },
      'Conectividad de red.',
      'Sistema de audio bidireccional.',
      'Dispositivos disuasivos.'
    ],
    benefits: [
      'Con el CCTV obtenés registro continuo y evidencia visual ininterrumpida.',
      'Si escalás a Videovigilancia, sumás disuasión por altoparlante y ejecución del protocolo policial ante amenazas.'
    ],
    distinctive: [
      'Instalamos los equipos según el relevamiento técnico de tu propiedad, nuestro verdadero diferencial es el capital humano.',
      'Si optás por la Videovigilancia, tu propiedad queda custodiada desde nuestro Centro de Monitoreo por operadores físicos que garantizan una respuesta real e inmediata.'
    ]
  },
  'gps-dashcams': {
    title: 'GPS Y DASH CAMS / CONTROL VEHICULAR INTEGRAL',
    tagline: 'Control logístico total, auditoría de flotas y prevención de accidentes.',
    photo: '/image/solucion-gps-foto.webp',
    photoAlt: 'Rastreo GPS y dash cam en un vehículo',
    description: [
      'Control logístico y visual en tiempo real.',
      'Un ecosistema tecnológico para localizar, auditar y documentar en video el recorrido de tu vehículo particular, flota comercial o maquinaria agrícola.'
    ],
    components: [
      'Equipo de rastreo GPS.',
      'Cámara de videoregistro (frontal/interior).',
      'Sistema de almacenamiento.',
      'Instalación profesional.',
      'Acceso a plataforma de gestión.'
    ],
    benefits: [
      'Trazabilidad exacta y evidencia imparcial.',
      'Protegé tu patrimonio auditando velocidades, detectando desvíos y registrando incidentes de tránsito en video para tener pruebas concretas ante cualquier siniestro.'
    ],
    distinctive: [
      'Auditoría continua sin fronteras.',
      'Al unificar el rastreo con la Dash Cam, sincronizás la ubicación de la unidad con el video del momento, logrando un control absoluto con cobertura nacional y extensión operativa en países limítrofes.'
    ]
  },
  'control-acceso': {
    title: 'CONTROL DE ACCESO',
    tagline: 'Gestión inteligente, exacta y auditable de ingresos y egresos.',
    photo: '/image/solucion-acceso-foto.webp',
    photoAlt: 'Terminal de control de acceso con reconocimiento facial',
    description:
      'Sistema diseñado para administrar, registrar y auditar el ingreso de personas a tus instalaciones, reemplazando la vulnerabilidad de las llaves físicas por mecanismos inteligentes de identificación.',
    components: [
      'Dispositivos de control de acceso.',
      'Lectores de proximidad (tarjetas o tags).',
      'Sistema de identificación por huella dactilar.',
      'Reconocimiento facial.',
      'Plataforma de gestión.',
      'Sistema de administración de usuarios.',
      'Registro de ingresos y egresos.'
    ],
    benefits: [
      'Trazabilidad absoluta de tu personal y visitas.',
      'Te permite segmentar áreas por niveles de autorización, auditar horarios de ingreso, restringir accesos temporalmente y gestionar altas o bajas de forma inmediata.'
    ],
    distinctive: [
      'Integración escalable y soporte técnico local.',
      'Tu sistema no queda aislado; puede vincularse estratégicamente con Guardia Virtual o CCTV.',
      'Además, al ser una empresa de la región, si tenés un problema físico con una cerradura o un lector, nuestro equipo técnico lo resuelve rápido y sin intermediarios.'
    ]
  },
  'cortina-humo': {
    title: 'CORTINA DE HUMO',
    tagline: 'Neutralización visual instantánea para abortar intrusiones en segundos.',
    photo: '/image/solucion-cortina-foto.webp',
    photoAlt: 'Cortina de humo de seguridad activada en un ambiente',
    description: [
      'Sistema de seguridad de reacción inmediata.',
      'Ante una intrusión, genera una barrera visual de niebla de alta densidad que dificulta la visibilidad y la permanencia del delincuente en el espacio protegido.'
    ],
    components: [
      'Equipo generador de humo.',
      'Unidad de control.',
      'Sistema de activación inmediata.',
      'Sensores de detección.',
      'Batería de respaldo.',
      'Integración con el panel de alarma.'
    ],
    benefits: [
      'Reacción en segundos que reduce drásticamente la visibilidad del ambiente.',
      'Dificulta la manipulación de bienes de alto valor, aumenta el tiempo de respuesta operativo y frustra la logística del intruso.'
    ],
    distinctive: [
      'Sincronización operativa. El equipo se integra estratégicamente a tu sistema de alarma.',
      'Al detectarse la intrusión, la cortina se dispara bloqueando el ataque físico, mientras nuestra Central de Monitoreo ya está enviando asistencia policial al lugar.'
    ]
  },
  'guardia-virtual': {
    title: 'GUARDIA VIRTUAL',
    tagline: 'Seguridad con tótems y operadores en vivo para proteger accesos.',
    photo: '/image/solucion-guardia-foto.webp',
    photoAlt: 'Tótem de guardia virtual en el acceso de un edificio',
    description:
      'Sistema de supervisión remota inteligente que resguarda los accesos de edificios o predios mediante tótems interactivos táctiles y cámaras estratégicas vinculadas a operadores en vivo.',
    components: [
      'Tótem con pantalla táctil.',
      'Cámaras de alta definición.',
      'Sistema de audio bidireccional (altoparlante). Sirenas disuasivas.',
      'Conexión permanente con nuestra Central.'
    ],
    benefits: [
      'Prevención activa ininterrumpida.',
      'Permite custodiar espacios comunes a menor costo, detectando situaciones sospechosas en tiempo real para disuadir por voz antes de que se conviertan en un problema.'
    ],
    distinctive: [
      'Respaldo humano de la región.',
      'No te entregamos tecnología aislada: tu propiedad es custodiada desde nuestro Centro de Monitoreo por operadores locales que entienden el contexto y ejecutan protocolos inmediatos ante cualquier emergencia.'
    ]
  },
  'acceso-vehicular': {
    title: 'ACCESO VEHICULAR AUTÓNOMO (LPR)',
    tagline: 'Control absoluto de ingresos por patentes y barreras automáticas.',
    photo: '/image/solucion-vehicular-foto.webp',
    photoAlt: 'Barrera vehicular automática con lectura de patentes',
    description: [
      'Automatización y gestión inteligente de ingresos para vehículos.',
      'Un sistema diseñado para controlar, auditar y agilizar el paso de autos, camionetas o transportes en portones de edificios, empresas o barrios cerrados.'
    ],
    components: [
      'Cámaras de lectura automática de patentes (LPR).',
      'Lectores de tags RFID.',
      'Barreras vehiculares automáticas.',
      'Lazos inductivos de seguridad.',
      'Software central de gestión.'
    ],
    benefits: [
      'Agilidad operativa y trazabilidad total.',
      'Permite el paso fluido de vehículos autorizados sin bajar la ventanilla, bloquea ingresos no registrados y genera un registro exacto por horario y patente de cada movimiento.'
    ],
    distinctive: [
      'El sistema se sincroniza con tus cámaras o alarmas, y al estar en la zona, nuestro equipo técnico te garantiza una respuesta rápida ante cualquier fallo de la barrera o del lector.'
    ]
  },
  videoportero: {
    title: 'VIDEOPORTERO',
    tagline: 'Control y comunicación segura en los accesos.',
    photo: '/image/solucion-videoportero-foto.webp',
    photoAlt: 'Frente de videoportería en el acceso de un edificio',
    description:
      'Sistema de comunicación y apertura inteligente que permite identificar visual y auditivamente a quienes llaman a la puerta de tu edificio o propiedad, gestionando el ingreso de forma segura.',
    components: [
      'Frente de videoportería.',
      'Cámara.',
      'Micrófono y parlante.',
      'Monitor o dispositivo de recepción.',
      'Sistema de apertura.',
      'Cerradura eléctrica o electromagnética.',
      'Fuente de alimentación.',
      'Cableado y elementos de instalación.'
    ],
    benefits: [
      'Identificación clara antes de abrir la puerta.',
      'Permite ver, hablar y dar acceso a visitas de forma remota o desde el interior, sumando comodidad y control cotidiano.'
    ],
    distinctive: [
      'Instalación profesional y soporte técnico local en la región para asegurar el funcionamiento continuo del sistema en tu propiedad.'
    ]
  },
  'terminal-unidad': {
    title: 'TERMINAL DE UNIDAD',
    tagline: 'Control total de accesos, domótica y amenities desde el interior de tu unidad.',
    photo: '/image/solucion-terminal-foto.webp',
    photoAlt: 'Terminal táctil de control dentro de un departamento',
    description:
      'Dispositivo táctil instalado en el interior de cada departamento para centralizar la gestión de los servicios tecnológicos, la seguridad y el confort del hogar.',
    components: [
      'Pantalla o terminal de control',
      'Interfaz de usuario',
      'Software de integración con los sistemas del edificio.'
    ],
    benefits: [
      'Comodidad y control absoluto centralizado.',
      'Permite visualizar notificaciones, comunicarse con sistemas de acceso, gestionar reservas de amenities y comandar funciones domóticas o de seguridad propias de la unidad.'
    ],
    distinctive: [
      'Ecosistema integrado.',
      'No funciona aislado: vincula la domótica de tu departamento con la videoportería y la seguridad general del edificio, respaldado por soporte técnico local en la región.'
    ]
  },
  'cerraduras-electronicas': {
    title: 'CERRADURAS ELECTRÓNICAS',
    tagline: 'Acceso inteligente por código, tarjeta o huella para tu hogar o empresa.',
    photo: '/image/solucion-cerraduras-foto.webp',
    photoAlt: 'Cerradura electrónica instalada en una puerta',
    description:
      'Sistema de control de acceso diseñado para ingresar a unidades funcionales mediante mecanismos electrónicos, eliminando la dependencia de las llaves físicas tradicionales.',
    components: [
      'Cerradura electrónica.',
      'Sistema de identificación (código, tarjeta, tag, app o biometría según la tecnología elegida)',
      'Instalación.',
      'Configuración inicial.'
    ],
    benefits: [
      'Seguridad y comodidad en la gestión diaria.',
      'Permite administrar altas, bajas y permisos de usuarios, obteniendo un registro de accesos en los modelos compatibles.'
    ],
    distinctive: [
      'Integración inteligente y respaldo local.',
      'La cerradura no queda aislada: puede vincularse con los sistemas generales del edificio y cuenta con el soporte técnico directo de nuestra región.'
    ]
  },
  'gestion-amenities': {
    title: 'GESTIÓN DE AMENITIES',
    tagline: 'Reserva de amenities digital: gestión de espacios comunes para residentes.',
    photo: '/image/solucion-amenities-foto.webp',
    photoAlt: 'Plataforma digital de reserva de amenities',
    description:
      'Plataforma digital para la autogestión de reservas y administración de espacios comunes del edificio por parte de los residentes.',
    components: [
      'Plataforma de gestión digital (App/Web).',
      'Visualización de disponibilidad.',
      'Módulo de reservas y cancelaciones.',
      'Administración de usuarios y configuración de reglas de uso.'
    ],
    benefits: [
      'Transparencia y agilidad en el uso del SUM, parrillas u otros espacios comunes.',
      'Evita conflictos, organiza horarios automáticamente y ofrece un registro claro de utilización para la administración.'
    ],
    distinctive: [
      'Integración exclusiva.',
      'La plataforma no es un software aislado; se vincula con los sistemas de acceso y domótica de SISE en el edificio, permitiendo habilitar accesos solo cuando existe una reserva confirmada, todo con soporte regional.'
    ]
  },
  'ascensor-sincronizado': {
    title: 'ASCENSOR SINCRONIZADO',
    tagline: 'Te espera y te lleva a tu piso automáticamente al validar tu acceso en la entrada.',
    photo: '/image/solucion-ascensor-foto.webp',
    photoAlt: 'Ascensor sincronizado con el control de acceso del edificio',
    description:
      'Sistema de integración tecnológica que activa la llamada automática del ascensor en cuanto un usuario autorizado ingresa al edificio o sector permitido.',
    components: [
      'Integración entre control de acceso y sistema de ascensores.',
      'Identificación de usuarios.',
      'Módulo de envío de señales.',
      'Configuración de permisos.',
      'Enlace con otros sistemas de seguridad del edificio.'
    ],
    benefits: [
      'Comodidad y fluidez en la circulación vertical.',
      'Reduce tiempos de espera y optimiza el movimiento interno habilitando el piso correspondiente de forma automatizada.'
    ],
    distinctive: [
      'Conectividad total y soporte local en la región.',
      'Vincula de forma inteligente el control de ingreso con la elevación del edificio para una experiencia de uso integrada.'
    ]
  },
  'camara-campo': {
    title: 'CÁMARA CAMPO',
    tagline: 'El control de tu campo estés donde estés.',
    taglineWidth: 232,
    photo: '/image/solucion-camara-campo-foto.webp',
    photoAlt: 'Cámara autónoma con panel solar en el campo',
    description:
      'Sistema autónomo de videovigilancia diseñado específicamente para el monitoreo de establecimientos rurales, zonas alejadas o lugares que carecen de infraestructura convencional de energía o conectividad.',
    components: [
      'Cámara autónoma.',
      'Alimentación solar.',
      'Sistema de almacenamiento.',
      'Dispositivos de transmisión de imágenes.',
      'Conectividad disponible y opción de integración satelital.'
    ],
    benefits: [
      'Vigilancia ininterrumpida en terrenos complejos.',
      'Permite la visualización remota de zonas descampadas y la detección de eventos en tiempo real donde otros sistemas no llegan.'
    ],
    distinctive: [
      'Autonomía total y soporte regional.',
      'Combina tecnología autosustentable con la opción de monitoreo remoto por operadores para proteger tu campo o perímetro alejado sin depender de la red eléctrica tradicional.'
    ]
  },
  'punto-seguro': {
    title: 'PUNTO SEGURO',
    tagline: 'Tótem de asistencia, comunicación y videovigilancia.',
    photo: '/image/solucion-punto-seguro-foto.webp',
    photoAlt: 'Tótem de punto seguro en la vía pública',
    description:
      'Solución tecnológica autónoma diseñada para brindar un punto de comunicación, monitoreo y asistencia remota en espacios públicos, rutas, accesos o zonas determinadas mediante dispositivos de seguridad.',
    components: [
      'Estructura o terminal de seguridad.',
      'Cámara de videovigilancia.',
      'Sistema de comunicación.',
      'Botón de emergencia.',
      'Audio bidireccional.',
      'Iluminación.',
      'Alimentación solar.',
      'Conectividad (con opción satelital).',
      'Almacenamiento.',
      'Sensores (opcionales).'
    ],
    benefits: [
      'Respuesta inmediata ante emergencias en zonas críticas.',
      'Permite la interacción directa mediante audio y video, facilitando la asistencia en tiempo real y la disuasión en áreas desprotegidas o de alto tránsito.'
    ],
    distinctive: [
      'Autonomía y gestión centralizada.',
      'Integra conectividad flexible y sistemas de respaldo para operar en cualquier punto geográfico, gestionando eventos bajo protocolos estrictos y con el respaldo técnico de la región.'
    ]
  },
  'timelapse-obra': {
    title: 'TIMELAPSE DE OBRA',
    tagline: 'Documentá y auditá la evolución de tu proyecto constructivo.',
    taglineWidth: 304,
    photo: '/image/solucion-timelapse-obra-foto.webp',
    photoAlt: 'Cámara de timelapse registrando el avance de una obra',
    description:
      'Sistema de registro fotográfico automatizado y prolongado que captura la evolución completa de un proyecto constructivo, condensando meses de trabajo en un video dinámico de alto impacto.',
    components: [
      'Cámaras de alta resolución en gabinetes estancos (resistentes a la intemperie).',
      'Sistema de alimentación eléctrica o solar.',
      'Módulo de conectividad.',
      'Almacenamiento.'
    ],
    benefits: [
      'Transparencia absoluta.',
      'Permite certificar el avance físico de la obra a distancia, mantener informados a los inversores con pruebas visuales concretas y generar material comercial de altísimo valor para la venta del desarrollo.'
    ],
    distinctive: [
      'Servicio integral "llave en mano".',
      'Nos encargamos de la instalación segura en altura, el mantenimiento preventivo del equipo durante los meses que dure la obra y la edición profesional del material final, garantizando que no pierdas ni un solo día de registro.'
    ]
  },
  'parada-segura': {
    title: 'PARADA SEGURA',
    tagline: 'Tótems de videovigilancia, comunicación y asistencia para proteger las esperas.',
    photo: '/image/solucion-parada-segura-foto.webp',
    photoAlt: 'Parada de transporte público con videovigilancia',
    description:
      'Solución tecnológica diseñada para mejorar las condiciones de seguridad en puntos de espera o circulación de personas mediante sistemas de videovigilancia, comunicación y monitoreo remoto.',
    components: [
      'Cámaras de videovigilancia.',
      'Botón de emergencia.',
      'Sistema de comunicación bidireccional con audio.',
      'Iluminación de seguridad.',
      'Almacenamiento de imágenes.',
      'Conectividad.',
      'Cartelería informativa.'
    ],
    benefits: [
      'Mayor tranquilidad y prevención para los usuarios en la vía pública.',
      'Permite la interacción directa ante situaciones de riesgo y asegura la visibilidad en zonas de espera.'
    ],
    distinctive: [
      'Integración operativa directa.',
      'Se conecta de forma permanente con nuestra Central de Monitoreo para gestionar cualquier evento bajo protocolos estrictos de respuesta y con el respaldo técnico local.'
    ]
  },
  'barrio-seguro': {
    title: 'SISTEMA DE BARRIO SEGURO',
    tagline: 'Videovigilancia comunitaria para proteger tu cuadra en tiempo real.',
    taglineWidth: 377,
    photo: '/image/solucion-barrio-seguro-foto.webp',
    photoAlt: 'Cámaras de videovigilancia comunitaria en una calle de barrio',
    description:
      'Ecosistema de seguridad perimetral urbana diseñado para comisiones vecinales, que permite monitorear las calles y actuar de forma preventiva ante movimientos sospechosos.',
    components: [
      'Cámaras de videovigilancia HD para exteriores.',
      'Bocinas o altoparlantes IP de alta potencia.',
      'Conectividad estable.',
      'Plataforma de gestión.'
    ],
    benefits: [
      'Disuasión activa y colectiva.',
      'Transforma a los vecinos en un bloque preventivo, permitiendo alertar por voz a través del altoparlante antes de que el ilícito ocurra y acelerando los tiempos de respuesta.'
    ],
    distinctive: [
      'Enlace oficial e inmediato.',
      'No es un circuito cerrado aislado; el sistema está integrado con nuestra Central de Monitoreo y cuenta con conexión directa a la red del 911 para derivar emergencias policiales al instante.'
    ]
  },
  'propiedades-desocupadas': {
    title: 'MONITOREO DE PROPIEDADES DESOCUPADAS',
    tagline: 'Vigilancia activa 24/7 para prevenir usurpaciones y vandalismo.',
    taglineWidth: 376,
    photo: '/image/solucion-desocupadas-foto.webp',
    photoAlt: 'Propiedad desocupada protegida con cámaras y sirenas',
    description:
      'Sistema de seguridad preventiva diseñado para terrenos, lotes o edificios vacíos, enfocado en detectar y disuadir intentos de intrusión antes de que se consolide una ocupación ilegal.',
    components: [
      'Cámaras con analíticas de video (detección de movimiento humano).',
      'Alarmas de intrusión.',
      'Sirenas de alta potencia.',
      'Reflectores.',
      'Enlace remoto constante.'
    ],
    benefits: [
      'Mitigación de riesgos patrimoniales.',
      'Evita usurpaciones, robo de materiales (cables, aberturas) y vandalismo en la fase más vulnerable del inmueble, sin requerir personal físico en el lugar.'
    ],
    distinctive: [
      'Acción inmediata y protocolo legal.',
      'Ante una detección, nuestra Central de Monitoreo activa las sirenas para disuadir en el acto y da aviso inmediato a las fuerzas de seguridad, evitando que el propietario deba exponerse físicamente en el lugar.'
    ]
  },
  semaforizacion: {
    title: 'SEMAFORIZACIÓN INTELIGENTE',
    tagline: 'Gestión inteligente del tráfico urbano para agilizar la circulación.',
    taglineWidth: 335,
    photo: '/image/solucion-semaforizacion-foto.webp',
    photoAlt: 'Semáforo inteligente en una avenida urbana',
    description:
      'Sistema de control de tránsito que adapta los tiempos de cruce en tiempo real según la demanda vehicular, optimizando la fluidez y la seguridad en avenidas o intersecciones críticas.',
    components: [
      'Controladores de semáforo inteligentes.',
      'Ópticas LED.',
      'Sensores de tráfico (cámaras o espiras).',
      'Software de gestión centralizada.',
      'Módulos de prioridad de paso.'
    ],
    benefits: [
      'Descongestión vial inmediata.',
      'Reduce tiempos de espera, disminuye la emisión de gases por embotellamientos y asegura el paso rápido de ambulancias, policías o bomberos, salvando vidas.'
    ],
    distinctive: [
      'Integración operativa directa.',
      'Se conecta de forma permanente con nuestra Central de Monitoreo para gestionar cualquier evento bajo protocolos estrictos de respuesta y con el respaldo técnico local.'
    ]
  },
  'smart-parking': {
    title: 'SMART PARKING (LPR)',
    tagline: 'Automatización del estacionamiento medido inteligente.',
    taglineWidth: 318,
    photo: '/image/solucion-smart-parking-foto.webp',
    photoAlt: 'Cámara de lectura de patentes controlando el estacionamiento medido',
    description:
      'Sistema avanzado de lectura de patentes diseñado para la fiscalización, control automatizado y gestión del estacionamiento urbano en tiempo real.',
    components: [
      'Cámaras LPR (fijas o móviles en vehículos de patrullaje).',
      'Software de procesamiento óptico de caracteres (OCR).',
      'Servidores de procesamiento local y plataforma de integración con el sistema de infracciones del municipio.'
    ],
    benefits: [
      'Recaudación eficiente, objetiva y auditable.',
      'Elimina la dependencia del control humano manual y la evasión, detectando vehículos en infracción en segundos para emitir multas automatizadas y liberar el espacio público.'
    ],
    distinctive: [
      'Calibración y despliegue regional.',
      'Un sistema de alta precisión adaptado a la infraestructura de nuestras calles, integrado de manera directa y segura con el centro de control gubernamental para garantizar operatividad continua.'
    ]
  },
  'totems-comunicacion': {
    title: 'TÓTEMS DE COMUNICACIÓN',
    tagline: 'El canal para emitir alertas, brindar información turística y publicidad digital.',
    taglineWidth: 402,
    photo: '/image/solucion-totems-foto.webp',
    photoAlt: 'Tótem digital de comunicación en el espacio público',
    description:
      'Estructuras digitales de alto impacto visual diseñadas para el espacio público, que funcionan como un canal de comunicación bidireccional entre el municipio, los ciudadanos y las marcas.',
    components: [
      'Gabinete antivandálico apto para intemperie.',
      'Pantallas (táctiles o informativas) de ultra alto brillo legibles bajo luz solar.',
      'Sistema de refrigeración interno.',
      'Conectividad remota.',
      'Software de gestión de contenidos (CMS).'
    ],
    benefits: [
      'Transformación digital rentable.',
      'Permite al gobierno emitir alertas de emergencia en tiempo real, guiar a turistas de forma interactiva y, fundamentalmente, recuperar la inversión monetizando los espacios con pauta publicitaria dinámica.'
    ],
    distinctive: [
      'Hardware extremo y gestión centralizada.',
      'Equipos preparados para soportar las máximas exigencias climáticas de la región, vinculados a una plataforma que permite actualizar campañas o lanzar alertas en toda la red de tótems al mismo tiempo, con un solo clic.'
    ]
  },
  'mobiliario-sustentable': {
    title: 'MOBILIARIO URBANO SUSTENTABLE',
    tagline: 'El espacio público con estaciones de descanso eco-amigables',
    taglineWidth: 318,
    photo: '/image/solucion-mobiliario-foto.webp',
    photoAlt: 'Mobiliario urbano sustentable con panel solar en una plaza',
    description:
      'Solución arquitectónica y tecnológica que transforma plazas, parques o paseos tradicionales en entornos inteligentes, autónomos y al servicio del ciudadano.',
    components: [
      'Estructuras modulares de descanso.',
      'Paneles solares integrados.',
      'Puertos de carga USB/inalámbricos.',
      'Puntos de acceso a conectividad (WiFi).',
      'Iluminación LED automatizada.'
    ],
    benefits: [
      'Modernización urbana con impacto ambiental cero.',
      'Fomenta el uso del espacio público brindando comodidad, conectividad y mayor seguridad nocturna de forma completamente autosustentable.'
    ],
    distinctive: [
      'Integración robusta y mantenimiento local.',
      'Equipamiento diseñado con materiales de alta durabilidad para resistir la intemperie y el uso intensivo, respaldado por un equipo técnico de la región.'
    ]
  }

};

/*
 * Descripción larga para el SEO de cada página: junta la descripción y los
 * beneficios de la ficha del popup en un solo párrafo, para enriquecer los
 * ItemList de datos estructurados (JSON-LD) sin duplicar contenido a mano.
 */
const toParas = (value) => (Array.isArray(value) ? value : [value]);

export function buildSolutionSeoDescription(infoKey, fallback) {
  const info = SOLUTIONS_INFO[infoKey];
  if (!info) return fallback;
  return [...toParas(info.description), ...toParas(info.benefits)].join(' ');
}
