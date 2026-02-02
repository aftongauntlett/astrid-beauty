import type { Messages } from "./types";

export const en: Messages = {
  nav: {
    services: "Services",
    gallery: "About",
    findUs: "Visit Us",
    booking: "Booking Info",
    menu: "Menu",
  },
  common: {
    themeToggleLabel: "Toggle theme",
    languageToggleLabel: "Language",
  },
  sections: {
    homeTitle: "Your beautiful hair starts here",
    servicesTitle: "Our Services",
    galleryTitle: "About",
    aboutLede:
      "Meet the team, see recent work, and review booking information before you schedule.",
  },
  misc: {
    bookNow: "Book Now",
    scheduleAppointment: "Schedule Appointment",
    viewPrices: "View Prices",
    viewServices: "Explore Services",
    backToTop: "Back to top",
    scheduleNow: "Book Now",
  },
  home: {
    heroLede:
      "Beautiful color, fresh cuts, and luminous gloss treatments - right here in Herndon. Book your appointment anytime.",
    heroSupporting: "Dimensional color and modern cuts in Herndon, VA.",
    heroCtaHelper: "Secure booking via Vagaro",
    brandSrOnly: "By Astrid Beauty Salon",
  },
  about: {
    workTitle: "See My Work",
    staff: {
      title: "Meet the staff",
      members: {
        astrid: {
          title: "Astrid (Owner/Hair Stylist)",
          name: "Astrid",
          role: "Owner/Hair Stylist",
          paragraphs: [
            "I’m immersed in the beauty industry since I was 18 years old. My journey began after graduating from Chantilly High School Academy with a Cosmetology license.",
            "In 2016, I started my career in a salon, where I quickly advanced to become a Salon Leader and later specialized as a Color Specialist.",
            "In August 2021, I had the honor of taking the next step by becoming the salon owner. I take immense pride in being the owner of By Astrid Beauty Salon and deeply appreciate the continued support from my friends, family, and clients, who have been instrumental in my journey.",
          ],
        },
        cindy: {
          title: "Cindy (Cosmetologist)",
          name: "Cindy",
          role: "Cosmetologist",
          paragraphs: [
            "Hi, I’m Cindy, a licensed cosmetologist since 2019. I started my career at a salon, where I built a strong foundation in haircuts and color. I’m passionate about keeping up with the latest trends and techniques to make sure every client leaves feeling confident and refreshed.",
            "My goal is to create a welcoming space where you can relax, unwind, and feel at home. Whether you’re looking for a fresh new look or just a little maintenance, I’m here to help you feel your best.",
            "I’m always learning and growing in my craft, and I love bringing that energy into my work. I can’t wait to meet you and help bring your hair goals to life!",
          ],
        },
      },
    },
    policies: {
      title: "Booking Information",
      items: {
        rescheduling: {
          title: "Rescheduling & cancellations",
          bullets: {
            notice:
              "A 3-day notice is required for reschedules and cancellations",
            fee: "Appointments changed with less than 3 days notice are charged the full amount",
            contactIntro: "Cancel online, or text ",
            contactOutro: "",
          },
          why: "This time is reserved exclusively for each guest.",
        },
        policies: {
          title: "Policies",
          body: "For a calm, focused experience, children are not permitted in the studio.",
        },
        paymentMethods: {
          title: "Payment methods accepted",
          items: [
            "Visa & MasterCard",
            "Discover",
            "American Express",
            "Debit card",
            "Cash",
            "Check",
            "Vagaro Pay Later",
          ],
        },
        parking: {
          title: "Parking",
          items: [
            "Free parking",
            "Located inside my salon suites in room 210.",
          ],
        },
        spokenLanguages: {
          title: "Spoken languages",
          items: ["English", "Spanish"],
        },
      },
    },
  },
  findUs: {
    lede: "We'd love to see you at our Herndon studio. Hours may vary, so give us a call to confirm.",
  },
  booking: {
    title: "Reserve Your Appointment",
    lede: "For current services, pricing, and availability, please book through Vagaro. This helps you find the perfect service for your hair and your vision.",
    scheduleHelper:
      "Booking FAQs, policies, and resources — then book through Vagaro when you're ready.",
    reviewsTitle: "What Our Clients Say",
  },
  reviews: [
    {
      quote:
        "Always takes great care of me to where I had to bring my sister in. She got my sister and I right lol if you aren't already going here you should.",
      author: "Elizabeth C",
      date: "Aug 14, 2025",
    },
    {
      quote:
        "if you are thinking of going to this salon, do it! she's amazing, she does a very good job & she's really nice & sweet, thank you Astrid you are incredible. 🤍",
      author: "Anyi F",
      date: "Jul 21, 2023",
    },
    {
      quote:
        "Astrid did such a beautiful job with my haircut! Got the exact results I was looking for. I definitely will be back.",
      author: "Jules D",
      date: "Dec 02, 2022",
    },
    {
      quote:
        "She did an amazing job. I am more than happy with the results. She is very friendly and makes you comfortable. She didn't rush through the process instead took her time , and explained what she did and why she did throughout. Will come again!",
      author: "Ramsha S",
      date: "May 06, 2021",
    },
  ],
  services: {
    eyebrow: "Services",
    lede: "A curated menu of color, cuts, and treatments - built around your consultation.",
    startingAtLabel: "Starting at",
    disclaimer: {
      line1:
        "Starting prices shown. Final pricing can vary by hair length, density, and the service plan created during your consultation.",
      line2:
        "For the most up-to-date pricing and availability, please book through Vagaro.",
    },
    cards: [
      {
        title: "Consultations",
        startingAt: "$25",
        description: "A focused starting point for new guests or big changes.",
        items: [
          "In-person consultation",
          "Test strand (when needed)",
          "Service plan + timing",
          "Starting price guidance",
        ],
      },
      {
        title: "Cut & Style",
        startingAt: "$55",
        description:
          "A modern shape with a finish that feels polished - never overdone.",
        items: [
          "Haircut tailored to density and lifestyle",
          "Blowdry finish",
          "Optional heat styling",
          "At-home styling guidance",
        ],
      },
      {
        title: "Signature Color",
        startingAt: "$80",
        description:
          "Single-process color and toning for rich, dimensional results.",
        items: [
          "Root touch-ups and all-over color",
          "Gray blending and refresh",
          "Toner or gloss options",
          "Healthy-looking shine",
        ],
      },
      {
        title: "Lightening & Dimension",
        startingAt: "$170",
        description:
          "Custom highlights and balayage for brightness that grows out well.",
        items: [
          "Highlights, balayage, and lived-in color",
          "Face-framing brightness",
          "Placement designed for grow-out",
          "Toner + finish",
        ],
      },
      {
        title: "Gloss & Shine",
        startingAt: "$50",
        description:
          "A quick refresh for tone, softness, and mirror-like shine.",
        items: [
          "Warm or cool tone adjustments",
          "Brilliance boost between color visits",
          "Gentle, hair-friendly formulas",
          "Pairs well with a blowdry",
        ],
      },
      {
        title: "Scalp Wellness",
        startingAt: "$250",
        description:
          "Targeted care - from scalp reset to smoothing services, based on your consultation.",
        items: [
          "Scalp cleanse + massage",
          "Hydration and balance support",
          "Keratin smoothing (by consultation)",
          "Aftercare guidance",
        ],
      },
    ],
  },
  gallery: {
    lede: "A glimpse of recent transformations. Tap below to see more.",
    imagesAriaLabel: "Gallery images",
    showMore: "See more",
    showLess: "See less",
    statusTemplate: "Showing {count} images.",
  },
  skipLink: {
    skipToContent: "Skip to content",
  },
  settings: {
    label: "Settings",
    theme: "Theme",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    language: "Language",
  },
  footer: {
    address: "Address",
    contact: "Get in Touch",
    phone: "Phone",
    hours: "Hours",
    social: "Follow Along",
    findUsCta: "Get Directions",
    email: "Email",
    facebook: "Facebook",
    instagram: "Instagram",
    placeholderAddress: "384 Elden Street, Suite 210\nHerndon, VA 20170",
    placeholderPhone: "(703) 786-3707",
    placeholderHours:
      "Hours may vary—please call to confirm.\nSunday: Closed\nMonday: 9:00 AM – 5:00 PM\nTuesday: Closed\nWednesday: 9:00 AM – 6:30 PM\nThursday: Closed\nFriday: 9:00 AM – 6:30 PM\nSaturday: 9:30 AM – 4:30 PM",
    copyright: "By Astrid Beauty Salon",
    builtByLabel: "Built by",
  },
};
