const stripMeridiem = (value: string) =>
  value
    .replace(/\s*(a\.?m\.?|p\.?m\.?|am|pm)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

const isClosedTime = (value: string) =>
  /^(closed|cerrado)$/i.test(value.trim());

const abbreviateDay = (value: string) => {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .trim()
    .toLowerCase();

  // English
  if (normalized === "monday") return "Mon";
  if (normalized === "tuesday") return "Tues";
  if (normalized === "wednesday") return "Weds";
  if (normalized === "thursday") return "Thurs";
  if (normalized === "friday") return "Fri";
  if (normalized === "saturday") return "Sat";
  if (normalized === "sunday") return "Sun";

  // Spanish
  if (normalized === "lunes") return "Lun";
  if (normalized === "martes") return "Mar";
  if (normalized === "miercoles") return "Mie";
  if (normalized === "jueves") return "Jue";
  if (normalized === "viernes") return "Vie";
  if (normalized === "sabado") return "Sab";
  if (normalized === "domingo") return "Dom";

  // Already abbreviated or unknown format.
  return value;
};

export const getAddressData = (placeholderAddress: string) => {
  const addressLines = placeholderAddress
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const firstAddressLine = addressLines[0] ?? "";
  const [streetRaw, suiteRaw] = firstAddressLine
    .split(",")
    .map((part) => part.trim());

  const addressDisplayLines = [streetRaw, suiteRaw, ...addressLines.slice(1)]
    .map((line) => line?.trim())
    .filter((line): line is string => Boolean(line));

  const fullAddress = addressDisplayLines.join(", ");

  return {
    addressDisplayLines,
    fullAddress,
  };
};

export const getMapsLinks = (fullAddress: string) => {
  const mapsQuery = encodeURIComponent(fullAddress);
  return {
    googleMapsHref: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    appleMapsHref: `https://maps.apple.com/?q=${mapsQuery}`,
  };
};

export type DisplayHour = { day: string; time: string };

export const getDisplayHours = (placeholderHours: string): DisplayHour[] => {
  const hoursLines = placeholderHours
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const dayLines = hoursLines.slice(1);

  const hours = dayLines
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return null;
      const day = line.slice(0, idx).trim();
      const time = stripMeridiem(line.slice(idx + 1).trim());
      return { day, time };
    })
    .filter(Boolean) as Array<{ day: string; time: string }>;

  const closedDays = hours
    .filter((item) => isClosedTime(item.time))
    .map((item) => abbreviateDay(item.day));
  const closedLabel = hours.find((item) => isClosedTime(item.time))?.time;

  const openGroups = new Map<string, { days: string[]; firstIndex: number }>();
  const openTimesInOrder: string[] = [];

  for (const [index, item] of hours.entries()) {
    if (isClosedTime(item.time)) continue;
    const time = item.time;
    const day = abbreviateDay(item.day);
    const existing = openGroups.get(time);
    if (!existing) {
      openGroups.set(time, { days: [day], firstIndex: index });
      openTimesInOrder.push(time);
      continue;
    }

    existing.days.push(day);
  }

  const displayHours = openTimesInOrder.map((time) => {
    const group = openGroups.get(time);
    if (!group) return { day: "", time };
    return { day: group.days.join(", "), time };
  });

  if (closedDays.length > 0) {
    displayHours.push({
      day: closedDays.join(", "),
      time: closedLabel ?? "Closed",
    });
  }

  return displayHours;
};

export const getPhoneHref = (placeholderPhone: string) => {
  const phoneDigits = placeholderPhone.replace(/\D/g, "");
  return phoneDigits.length === 10
    ? `tel:+1${phoneDigits}`
    : `tel:+${phoneDigits}`;
};
