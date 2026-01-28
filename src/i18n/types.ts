export type Messages = {
  nav: {
    services: string;
    gallery: string;
    findUs: string;
    booking: string;
    menu: string;
  };
  common: {
    themeToggleLabel: string;
    languageToggleLabel: string;
  };
  sections: {
    homeTitle: string;
    servicesTitle: string;
    galleryTitle: string;
    aboutLede: string;
  };
  misc: {
    bookNow: string;
    scheduleAppointment: string;
    viewServices: string;
    backToTop: string;
    scheduleNow: string;
  };
  home: {
    heroLede: string;
    heroSupporting: string;
    heroCtaHelper: string;
    brandSrOnly: string;
  };
  about: {
    workTitle: string;
    staff: {
      title: string;
      members: {
        astrid: {
          title: string;
          paragraphs: string[];
        };
        cindy: {
          title: string;
          paragraphs: string[];
        };
      };
    };
    policies: {
      title: string;
      items: {
        rescheduling: {
          title: string;
          bullets: {
            notice: string;
            fee: string;
            contactIntro: string;
            contactOutro: string;
          };
          why: string;
        };
        policies: {
          title: string;
          body: string;
        };
        paymentMethods: {
          title: string;
          items: string[];
        };
        parking: {
          title: string;
          items: string[];
        };
        spokenLanguages: {
          title: string;
          items: string[];
        };
      };
    };
  };
  findUs: {
    lede: string;
  };
  booking: {
    title: string;
    lede: string;
    scheduleHelper: string;
    reviewsTitle: string;
  };
  reviews: Array<{
    quote: string;
    author: string;
    date: string;
  }>;
  services: {
    eyebrow: string;
    lede: string;
    startingAtLabel: string;
    disclaimer: {
      line1: string;
      line2: string;
    };
    cards: Array<{
      title: string;
      startingAt: string;
      description: string;
      items: string[];
    }>;
  };
  gallery: {
    lede: string;
    imagesAriaLabel: string;
    showMore: string;
    showLess: string;
    statusTemplate: string;
  };
  skipLink: {
    skipToContent: string;
  };
  settings: {
    label: string;
    theme: string;
    lightMode: string;
    darkMode: string;
    language: string;
  };
  footer: {
    address: string;
    contact: string;
    phone: string;
    hours: string;
    social: string;
    findUsCta: string;
    email: string;
    facebook: string;
    instagram: string;
    placeholderAddress: string;
    placeholderPhone: string;
    placeholderHours: string;
    copyright: string;
    builtByLabel: string;
  };
};
