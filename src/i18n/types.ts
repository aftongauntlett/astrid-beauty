export type Messages = {
  nav: {
    services: string;
    gallery: string;
    findUs: string;
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
  };
  misc: {
    bookNow: string;
    viewServices: string;
    backToTop: string;
    placeholderText: string;
  };
  home: {
    heroLede: string;
    brandSrOnly: string;
  };
  findUs: {
    lede: string;
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
    phone: string;
    hours: string;
    social: string;
    placeholderAddress: string;
    placeholderPhone: string;
    placeholderHours: string;
    placeholderSocial: string;
    copyright: string;
  };
};
