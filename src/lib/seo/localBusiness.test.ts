import { describe, expect, it } from "vitest";

import { parseAddress, parseOpeningHours } from "./localBusiness";

describe("parseOpeningHours", () => {
  const raw =
    "Hours may vary—please call to confirm.\nSunday: Closed\nMonday: 9:00 AM – 6:30 PM\nTuesday: Closed\nWednesday: 9:00 AM – 6:30 PM\nThursday: Closed\nFriday: 9:00 AM – 6:30 PM\nSaturday: 9:30 AM – 4:30 PM";

  it("skips the disclaimer line and closed days", () => {
    const specs = parseOpeningHours(raw);
    expect(specs).toHaveLength(4);
    expect(specs.map((s) => s.dayOfWeek)).toEqual([
      "https://schema.org/Monday",
      "https://schema.org/Wednesday",
      "https://schema.org/Friday",
      "https://schema.org/Saturday",
    ]);
  });

  it("converts AM/PM ranges to 24-hour opens/closes", () => {
    const specs = parseOpeningHours(raw);
    expect(specs[0]).toMatchObject({ opens: "09:00", closes: "18:30" });
    expect(specs[3]).toMatchObject({ opens: "09:30", closes: "16:30" });
  });

  it("handles noon/midnight edge cases", () => {
    const specs = parseOpeningHours("x\nMonday: 12:00 AM – 12:00 PM");
    expect(specs[0]).toMatchObject({ opens: "00:00", closes: "12:00" });
  });
});

describe("parseAddress", () => {
  it("splits street and city/state/zip into structured fields", () => {
    expect(parseAddress("384 Elden Street, Suite 210\nHerndon, VA 20170")).toEqual({
      "@type": "PostalAddress",
      streetAddress: "384 Elden Street, Suite 210",
      addressLocality: "Herndon",
      addressRegion: "VA",
      postalCode: "20170",
      addressCountry: "US",
    });
  });
});
