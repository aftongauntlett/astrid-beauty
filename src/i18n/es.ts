import type { Messages } from "./types";

export const es: Messages = {
  nav: {
    services: "Servicios",
    gallery: "Sobre",
    findUs: "Visítanos",
    booking: "Reservar",
    menu: "Menú",
  },
  common: {
    themeToggleLabel: "Cambiar tema",
    languageToggleLabel: "Idioma",
  },
  sections: {
    homeTitle: "Tu cabello hermoso comienza aquí",
    servicesTitle: "Nuestros Servicios",
    galleryTitle: "Sobre",
    aboutLede:
      "Conoce al equipo, mira trabajos recientes y revisa la información de reserva antes de agendar.",
  },
  misc: {
    bookNow: "Reservar",
    scheduleAppointment: "Programar una cita",
    viewServices: "Explorar servicios",
    backToTop: "Volver arriba",
    scheduleNow: "Reservar ahora",
  },
  home: {
    heroLede:
      "Color vibrante, cortes frescos y tratamientos de brillo luminoso - aquí en Herndon. Reserva tu cita cuando quieras.",
    heroSupporting: "Color dimensional y cortes modernos en Herndon, VA.",
    heroCtaHelper: "Reserva segura a través de Vagaro.",
    brandSrOnly: "By Astrid Beauty Salon",
  },
  about: {
    workTitle: "Ver mi trabajo",
    staff: {
      title: "Conoce al equipo",
      members: {
        astrid: {
          title: "Astrid (Propietaria/Estilista)",
          name: "Astrid", // ← LOCKED: Never translate proper names
          role: "Propietaria/Estilista", // ← Translated role
          paragraphs: [
            "Estoy inmersa en la industria de la belleza desde los 18 años. Mi camino comenzó después de graduarme de Chantilly High School Academy con una licencia de cosmetología.",
            "En 2016 comencé mi carrera en un salón, donde ascendí rápidamente a Salon Leader y más adelante me especialicé como Color Specialist.",
            "En agosto de 2021 tuve el honor de dar el siguiente paso convirtiéndome en dueña del salón. Me enorgullece profundamente ser la propietaria de By Astrid Beauty Salon y agradezco el apoyo constante de mis amistades, familia y clientas, quienes han sido fundamentales en mi camino.",
          ],
        },
        cindy: {
          title: "Cindy (Cosmetóloga)",
          name: "Cindy", // ← LOCKED: Never translate proper names
          role: "Cosmetóloga", // ← Translated role
          paragraphs: [
            "Hola, soy Cindy, cosmetóloga licenciada desde 2019. Comencé mi carrera en un salón, donde desarrollé una base sólida en cortes y color. Me apasiona mantenerme al día con las últimas tendencias y técnicas para asegurarme de que cada clienta se vaya sintiéndose segura y renovada.",
            "Mi objetivo es crear un espacio acogedor donde puedas relajarte, desconectarte y sentirte como en casa. Ya sea que busques un cambio de look o solo un retoque de mantenimiento, estoy aquí para ayudarte a verte y sentirte mejor.",
            "Siempre estoy aprendiendo y creciendo en mi oficio, y me encanta traer esa energía a mi trabajo. ¡Estoy emocionada de conocerte y ayudarte a hacer realidad tus metas para tu cabello!",
          ],
        },
      },
    },
    policies: {
      title: "Información de reserva",
      items: {
        rescheduling: {
          title: "Reprogramaciones y cancelaciones",
          bullets: {
            notice:
              "Se requiere aviso con 3 días de anticipación para reprogramar o cancelar",
            fee: "Las citas cambiadas con menos de 3 días de aviso se cobran al 100%",
            contactIntro: "Cancela en línea o manda un texto al ",
            contactOutro: "",
          },
          why: "Ese tiempo se reserva exclusivamente para cada clienta.",
        },
        policies: {
          title: "Políticas",
          body: "Para mantener una experiencia tranquila y enfocada, no se permiten niños en el estudio.",
        },
        paymentMethods: {
          title: "Métodos de pago",
          items: [
            "Visa y MasterCard",
            "Discover",
            "American Express",
            "Tarjeta de débito",
            "Efectivo",
            "Cheque",
            "Vagaro Pay Later",
          ],
        },
        parking: {
          title: "Estacionamiento",
          items: [
            "Estacionamiento gratis",
            "Ubicado dentro de my salon suites en la habitación 210.",
          ],
        },
        spokenLanguages: {
          title: "Idiomas",
          items: ["Inglés", "Español"],
        },
      },
    },
  },
  findUs: {
    lede: "Nos encantaría verte en nuestro estudio en Herndon. El horario puede variar, así que llámanos para confirmar.",
  },
  booking: {
    title: "Reserva tu cita",
    lede: "Para ver servicios, precios y disponibilidad actuales, reserva a través de Vagaro. Así encontrarás el servicio perfecto para tu cabello y tu visión.",
    scheduleHelper: "Reserva fácil en línea a través de Vagaro.",
    reviewsTitle: "Lo que dicen nuestras clientas",
  },
  reviews: [
    {
      quote:
        "Siempre me cuida muy bien, tanto que tuve que traer a mi hermana. Nos dejó a las dos perfectas jaja, si aún no vienes aquí, deberías.",
      author: "Elizabeth C",
      date: "14 ago, 2025",
    },
    {
      quote:
        "si estás pensando en ir a este salón, ¡hazlo! ella es increíble, hace un muy buen trabajo y es muy amable y dulce, gracias Astrid eres increíble. 🤍",
      author: "Anyi F",
      date: "21 jul, 2023",
    },
    {
      quote:
        "¡Astrid hizo un trabajo hermoso con mi corte de cabello! Obtuve exactamente los resultados que buscaba. Definitivamente volveré.",
      author: "Jules D",
      date: "02 dic, 2022",
    },
    {
      quote:
        "Hizo un trabajo increíble. Estoy más que feliz con los resultados. Es muy amable y te hace sentir cómoda. No se apresuró, se tomó su tiempo y explicó lo que hacía y por qué lo hacía. ¡Volveré!",
      author: "Ramsha S",
      date: "06 may, 2021",
    },
  ],
  services: {
    eyebrow: "Servicios",
    lede: "Un menú seleccionado de color, cortes y tratamientos - guiado por tu consulta.",
    startingAtLabel: "Desde",
    disclaimer: {
      line1:
        "Se muestran precios desde. El precio final puede variar según el largo, la densidad y el plan definido durante tu consulta.",
      line2:
        "Para ver precios y disponibilidad más actualizados, reserva a través de Vagaro.",
    },
    cards: [
      {
        title: "Consultas",
        startingAt: "$25",
        description:
          "Un buen punto de partida para clientas nuevas o cambios grandes.",
        items: [
          "Consulta en persona",
          "Mecha de prueba (si hace falta)",
          "Plan de servicio + tiempos",
          "Guía de precio desde",
        ],
      },
      {
        title: "Corte y estilo",
        startingAt: "$55",
        description: "Una forma moderna con un acabado pulido - sin exagerar.",
        items: [
          "Corte según densidad y estilo de vida",
          "Blowdry final",
          "Peinado con calor (opcional)",
          "Tips para peinar en casa",
        ],
      },
      {
        title: "Color Signature",
        startingAt: "$80",
        description:
          "Color de un solo proceso y tonificación para un resultado rico y dimensional.",
        items: [
          "Retoque de raíz y color completo",
          "Difuminado de canas y refresh",
          "Tóner o gloss",
          "Brillo saludable",
        ],
      },
      {
        title: "Aclarado y dimensión",
        startingAt: "$170",
        description:
          "Mechas y balayage personalizados para iluminar y crecer bonito.",
        items: [
          "Mechas, balayage y color lived-in",
          "Luz en el contorno del rostro",
          "Colocación pensada para el crecimiento",
          "Tóner + acabado",
        ],
      },
      {
        title: "Gloss y brillo",
        startingAt: "$50",
        description:
          "Un refresh rápido para ajustar el tono, suavizar y dar brillo espejo.",
        items: [
          "Ajustes de tonos cálidos o fríos",
          "Brillo entre citas de color",
          "Fórmulas suaves",
          "Ideal con blowdry",
        ],
      },
      {
        title: "Salud capilar",
        startingAt: "$250",
        description:
          "Cuidado enfocado: del cuero cabelludo al alisado con keratina, según tu consulta.",
        items: [
          "Limpieza del cuero cabelludo + masaje",
          "Apoyo de hidratación y balance",
          "Alisado con keratina (según consulta)",
          "Guía de cuidados",
        ],
      },
    ],
  },
  gallery: {
    lede: "Un vistazo a transformaciones recientes. Toca abajo para ver más.",
    imagesAriaLabel: "Imágenes de la galería",
    showMore: "Ver más",
    showLess: "Ver menos",
    statusTemplate: "Mostrando {count} imágenes.",
  },
  skipLink: {
    skipToContent: "Saltar al contenido",
  },
  settings: {
    label: "Configuración",
    theme: "Tema",
    lightMode: "Modo claro",
    darkMode: "Modo oscuro",
    language: "Idioma",
  },
  footer: {
    address: "Dirección",
    contact: "Contáctanos",
    phone: "Teléfono",
    hours: "Horario",
    social: "Síguenos",
    findUsCta: "Cómo llegar",
    email: "Correo",
    facebook: "Facebook",
    instagram: "Instagram",
    placeholderAddress: "384 Elden Street, Suite 210\nHerndon, VA 20170",
    placeholderPhone: "(703) 786-3707",
    placeholderHours:
      "El horario puede variar—por favor llámanos para confirmar.\nDomingo: Cerrado\nLunes: 9:00 AM – 5:00 PM\nMartes: Cerrado\nMiércoles: 9:00 AM – 6:30 PM\nJueves: Cerrado\nViernes: 9:00 AM – 6:30 PM\nSábado: 9:30 AM – 4:30 PM",
    copyright: "By Astrid Beauty Salon",
    builtByLabel: "Creado por",
  },
};
