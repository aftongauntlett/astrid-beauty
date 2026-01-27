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
    viewServices: string;
    backToTop: string;
    scheduleNow: string;
  };
  home: {
    heroLede: string;
    brandSrOnly: string;
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
  services: {
    lede: string;
    cards: Array<{
      title: string;
      description: string;
      items: [string, string, string];
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
