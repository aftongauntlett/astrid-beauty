const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const to24Hour = (time: string): string | null => {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  const [, hourRaw, minute, meridiem] = match;
  let hour = Number(hourRaw);
  const meridiemUpper = (meridiem ?? "").toUpperCase();
  if (meridiemUpper === "PM" && hour !== 12) hour += 12;
  if (meridiemUpper === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
};

export type OpeningHoursSpec = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string;
  opens: string;
  closes: string;
};

// Parses the same "Day: 9:00 AM – 6:30 PM" lines used for the footer display
// (first line is a disclaimer, e.g. "Hours may vary...") into schema.org specs.
export const parseOpeningHours = (rawHours: string): OpeningHoursSpec[] => {
  const dayLines = rawHours
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(1);

  const specs: OpeningHoursSpec[] = [];
  for (const line of dayLines) {
    const separatorIdx = line.indexOf(":");
    if (separatorIdx === -1) continue;
    const day = line.slice(0, separatorIdx).trim();
    const range = line.slice(separatorIdx + 1).trim();
    if (!DAYS.includes(day) || /closed/i.test(range)) continue;

    const [openRaw, closeRaw] = range.split(/[–-]/).map((part) => part.trim());
    const opens = openRaw ? to24Hour(openRaw) : null;
    const closes = closeRaw ? to24Hour(closeRaw) : null;
    if (!opens || !closes) continue;

    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day}`,
      opens,
      closes,
    });
  }
  return specs;
};

export type PostalAddress = {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
};

// Parses "384 Elden Street, Suite 210\nHerndon, VA 20170" into structured fields.
export const parseAddress = (rawAddress: string): PostalAddress => {
  const lines = rawAddress
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const streetAddress = lines[0] ?? "";
  const cityStateZip = lines[1] ?? "";
  const match = cityStateZip.match(/^(.*),\s*([A-Za-z]{2})\s*(\d{5})$/);

  return {
    "@type": "PostalAddress",
    streetAddress,
    addressLocality: match?.[1] ?? "",
    addressRegion: match?.[2]?.toUpperCase() ?? "",
    postalCode: match?.[3] ?? "",
    addressCountry: "US",
  };
};

export type LocalBusinessParams = {
  name: string;
  url: string;
  image: string;
  telephoneHref: string;
  rawAddress: string;
  rawHours: string;
  sameAs: string[];
};

export const buildLocalBusinessJsonLd = ({
  name,
  url,
  image,
  telephoneHref,
  rawAddress,
  rawHours,
  sameAs,
}: LocalBusinessParams) => ({
  "@context": "https://schema.org",
  "@type": ["HairSalon", "BeautySalon"],
  name,
  url,
  image,
  telephone: telephoneHref.replace(/^tel:/, ""),
  address: parseAddress(rawAddress),
  openingHoursSpecification: parseOpeningHours(rawHours),
  sameAs,
});
