/*
 * Contenido de los popups "+ info" de las tarjetas de soluciones (Figma
 * 3585:458/459/460/461/462/495/529). Cada entrada se comparte entre todas las
 * páginas que ofrecen la misma solución: los módulos referencian la clave con
 * `info: '<clave>'` en su tarjeta y SolutionInfoPopup la renderiza.
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
  }
};
