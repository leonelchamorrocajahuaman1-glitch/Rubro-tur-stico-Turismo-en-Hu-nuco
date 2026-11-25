/* =========================================================
   Contenido turístico de Huánuco
   ---------------------------------------------------------
   Información referencial y general. Horarios, tarifas y
   condiciones de acceso cambian: confírmalos siempre con
   fuentes oficiales (SERNANP, Ministerio de Cultura,
   Gobierno Regional / DIRCETUR Huánuco) antes de viajar.
   ========================================================= */

window.WILD_DATA = {
  /* WhatsApp de contacto: solo dígitos, con el código de país.
     Ejemplo para Perú: "51987654321". Si está vacío, los botones
     de WhatsApp no se muestran. */
  whatsapp: "",
  whatsappGreeting: "Hola, WILD. Quiero información para visitar Huánuco.",

  categories: {
    arqueologia: "Arqueología",
    naturaleza: "Naturaleza",
    ciudad: "Ciudad y cultura"
  },

  destinations: [
    {
      id: "kotosh",
      name: "Kotosh y el Templo de las Manos Cruzadas",
      short: "Kotosh",
      cat: "arqueologia",
      place: "Ciudad de Huánuco",
      img: "kotosh",
      line: "Uno de los templos más antiguos de América.",
      intro:
        "A pocos kilómetros del centro de la ciudad de Huánuco, a orillas del río Higueras, Kotosh guarda recintos ceremoniales con más de 4 000 años de antigüedad. Su símbolo es el relieve de barro de dos antebrazos cruzados que da nombre al Templo de las Manos Cruzadas.",
      see: [
        "El Templo de las Manos Cruzadas y su relieve (en el sitio se exhibe una réplica; el original se conserva en Lima).",
        "Recintos ceremoniales con fogón central, característicos de la tradición religiosa Mito.",
        "El pequeño museo de sitio con cerámica y la cronología del complejo."
      ],
      access:
        "Se llega desde la ciudad de Huánuco en un trayecto corto en taxi o mototaxi. Es una visita ideal de medio día.",
      tips: [
        "Lleva sombrero y bloqueador: gran parte del recorrido es al aire libre.",
        "Combina la visita con un paseo por el centro histórico de Huánuco."
      ]
    },
    {
      id: "bella-durmiente",
      name: "La Bella Durmiente",
      short: "Bella Durmiente",
      cat: "naturaleza",
      place: "Tingo María",
      img: "bella2",
      line: "La silueta de montaña que vigila Tingo María.",
      intro:
        "Frente a Tingo María, la cadena montañosa de la Bella Durmiente dibuja la silueta de una mujer recostada sobre la selva. Es el emblema de la ciudad, forma parte del Parque Nacional Tingo María y es protagonista de leyendas locales.",
      see: [
        "La silueta completa desde la ciudad y desde el Mirador de la Cruz.",
        "El paisaje de selva alta y el valle del río Huallaga.",
        "Los cambios de luz del atardecer sobre la montaña."
      ],
      access:
        "Se contempla desde distintos puntos de Tingo María. El Mirador de la Cruz ofrece una de las vistas más amplias de la ciudad y la montaña.",
      tips: [
        "Las primeras horas de la mañana suelen ofrecer el cielo más despejado.",
        "Lleva repelente y agua si subes a los miradores."
      ]
    },
    {
      id: "parque-nacional",
      name: "Parque Nacional Tingo María",
      short: "Parque Nacional",
      cat: "naturaleza",
      place: "Leoncio Prado · Tingo María",
      img: "monzon",
      line: "Una de las áreas naturales protegidas más antiguas del Perú.",
      intro:
        "Creado en 1965, es una de las primeras áreas naturales protegidas del país. Protege los bosques de selva alta que rodean Tingo María, la montaña de la Bella Durmiente y la Cueva de las Lechuzas. Lo administra el SERNANP.",
      see: [
        "El río Monzón y los puentes de acceso a la zona turística.",
        "Bosques de selva alta con gran diversidad de aves, plantas e insectos.",
        "La Cueva de las Lechuzas, su atractivo más visitado."
      ],
      access:
        "La zona turística se encuentra a pocos kilómetros de la ciudad de Tingo María y se accede por carretera. El ingreso se realiza por los puestos de control del área protegida.",
      tips: [
        "Respeta los senderos señalizados y las indicaciones de los guardaparques.",
        "No dejes residuos ni alimentes a la fauna silvestre."
      ]
    },
    {
      id: "cueva-lechuzas",
      name: "Cueva de las Lechuzas",
      short: "Cueva de las Lechuzas",
      cat: "naturaleza",
      place: "Parque Nacional Tingo María",
      img: "cueva",
      line: "El hogar del guácharo, el ave que dio origen al Parque Nacional.",
      intro:
        "Una gran caverna dentro del Parque Nacional Tingo María, con una entrada de unos 20 metros de alto por 30 de ancho. Pese a su nombre, sus habitantes más famosos son los guácharos (Steatornis caripensis), aves nocturnas cuya conservación dio origen al Parque. El sabio Antonio Raimondi describió la caverna y sus aves en 1874.",
      see: [
        "Colonias de guácharos en las paredes y bóvedas de la cueva.",
        "Estalactitas y estalagmitas formadas durante miles de años.",
        "Murciélagos: el Parque es reconocido como área importante para su conservación."
      ],
      access:
        "Ubicada en la zona turística del Parque Nacional, a pocos kilómetros de Tingo María, cruzando el río Monzón. En la entrada hay paneles informativos del SERNANP con las normas de visita.",
      tips: [
        "No uses linternas de luz blanca directamente sobre las aves ni hagas ruido.",
        "Está prohibido consumir alimentos dentro de la cueva y alimentar a la fauna.",
        "No te apoyes en las barandas y no salgas del camino establecido.",
        "Según las normas del área, los niños menores de 2 años no deben ingresar.",
        "Usa calzado con buen agarre: el suelo puede estar húmedo."
      ]
    },
    {
      id: "santa-carmen",
      name: "Catarata Santa Carmen",
      short: "Catarata Santa Carmen",
      cat: "naturaleza",
      place: "Rupa-Rupa · Tingo María",
      img: "santacarmen",
      line: "Una caída de agua escondida entre el bosque.",
      intro:
        "En los alrededores de Tingo María, la Catarata Santa Carmen aparece al final de un camino rodeado de vegetación de selva alta. Un lugar para escuchar el agua, refrescarse y observar aves en el trayecto.",
      see: [
        "La caída de agua y su poza rodeada de vegetación.",
        "El sendero de acceso, con bosque y avifauna."
      ],
      access:
        "Se llega desde Tingo María por carretera y luego a pie por un sendero. Consulta con operadores locales el estado del camino antes de ir.",
      tips: [
        "Evita bañarte si el caudal está crecido tras lluvias fuertes.",
        "Calzado de trekking, repelente y ropa de cambio."
      ]
    },
    {
      id: "laguna-milagros",
      name: "Laguna de los Milagros",
      short: "Laguna de los Milagros",
      cat: "naturaleza",
      place: "Alrededores de Tingo María",
      img: null,
      line: "Un espejo de agua rodeado de selva.",
      intro:
        "Una laguna rodeada de vegetación tropical en los alrededores de Tingo María, apreciada por los visitantes como un espacio de descanso y contacto con la naturaleza de la selva alta huanuqueña.",
      see: [
        "El espejo de agua y la vegetación que lo rodea.",
        "Aves y paisaje de selva alta."
      ],
      access:
        "Se visita desde Tingo María. Coordina el traslado y las condiciones de visita con operadores turísticos locales.",
      tips: [
        "Lleva repelente, bloqueador y agua.",
        "Consulta las condiciones de acceso, que pueden variar en temporada de lluvias."
      ]
    },
    {
      id: "plaza-armas",
      name: "Plaza de Armas de Huánuco",
      short: "Plaza de Armas",
      cat: "ciudad",
      place: "Centro histórico de Huánuco",
      img: "plaza-noche",
      line: "El corazón de una ciudad fundada en 1539.",
      intro:
        "El punto de partida para conocer la ciudad de Huánuco, fundada por los españoles en 1539. Alrededor de la plaza se encuentran la Catedral, su emblemática pileta y la escultura dedicada a los Negritos de Huánuco, la danza más representativa de la región.",
      see: [
        "La Catedral de Huánuco y las calles del centro histórico.",
        "La pileta y la escultura de los Negritos de Huánuco.",
        "En diciembre y enero, las cuadrillas de los Negritos que recorren la ciudad."
      ],
      access:
        "Se ubica en el centro de la ciudad de Huánuco y se recorre a pie.",
      tips: [
        "Al atardecer y de noche la plaza tiene mucha vida.",
        "Desde aquí puedes organizar tus salidas a Kotosh y a Tingo María."
      ]
    },
    {
      id: "huanuco-pampa",
      name: "Complejo arqueológico de Huánuco Pampa",
      short: "Huánuco Pampa",
      cat: "arqueologia",
      place: "La Unión · Dos de Mayo",
      img: "pampa3",
      line: "Una gran ciudad inca sobre el Qhapaq Ñan.",
      intro:
        "También llamado Huánuco Viejo, fue uno de los principales centros administrativos incas, levantado en una meseta altoandina junto al Qhapaq Ñan, el Camino Inca, declarado Patrimonio Mundial por la UNESCO en 2014.",
      see: [
        "La gran plaza central y el ushnu, plataforma ceremonial de piedra.",
        "Portadas de piedra labrada y los recintos del sector principal.",
        "Tramos del Qhapaq Ñan en el paisaje de puna."
      ],
      access:
        "Se encuentra cerca de la ciudad de La Unión, en la provincia de Dos de Mayo. Desde la ciudad de Huánuco se llega por carretera; es una excursión de día completo o con noche en La Unión.",
      tips: [
        "Está a gran altitud: aclimátate, hidrátate y abrígate.",
        "El sol de altura es intenso: usa bloqueador, gorro y lentes."
      ]
    }
  ],

  experiences: [
    {
      n: "01",
      title: "Civilizaciones milenarias",
      text: "Del templo precerámico de Kotosh a la gran ciudad inca de Huánuco Pampa: miles de años de historia andina en una sola región.",
      img: "kotosh-vista",
      links: ["kotosh", "huanuco-pampa"]
    },
    {
      n: "02",
      title: "Selva alta y aves",
      text: "Senderos, miradores y cuevas en Tingo María. Observa guácharos, loros y la vida del bosque dentro del Parque Nacional.",
      img: "bella",
      links: ["parque-nacional", "cueva-lechuzas", "bella-durmiente"]
    },
    {
      n: "03",
      title: "Agua escondida",
      text: "Cataratas, ríos y lagunas que aparecen entre la vegetación: el lado más fresco de la selva huanuqueña.",
      img: "santacarmen",
      links: ["santa-carmen", "laguna-milagros"]
    },
    {
      n: "04",
      title: "Cultura viva: los Negritos",
      text: "La Danza de los Negritos llena las calles de Huánuco en diciembre y enero con música, trajes bordados y devoción.",
      img: "negritos",
      links: ["plaza-armas"]
    },
    {
      n: "05",
      title: "Sabores de Huánuco",
      text: "Pachamanca y picante de cuy en la sierra; juane y tacacho con cecina en la selva de Tingo María.",
      img: null,
      ph: "Pachamanca · Picante de cuy · Juane",
      links: []
    }
  ],

  /* Momentos del video de la píldora (segundos) */
  heroCaptions: [
    { t: 0, name: "Tingo María", note: "Río Huallaga y selva alta" },
    { t: 3.5, name: "La Bella Durmiente", note: "Tingo María" },
    { t: 7.5, name: "Kotosh", note: "Templo de las Manos Cruzadas" },
    { t: 11.5, name: "Huánuco Pampa", note: "Qhapaq Ñan" },
    { t: 15.5, name: "Río Monzón", note: "Parque Nacional Tingo María" },
    { t: 19.5, name: "Plaza de Armas", note: "Ciudad de Huánuco" },
    { t: 23.5, name: "Tingo María", note: "Río Huallaga y selva alta" }
  ]
};
