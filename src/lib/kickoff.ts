import type { NationalFixture } from "@/data/ftf";

const MONTHS: Record<string, number> = {
  janv: 0,
  jan: 0,
  févr: 1,
  fév: 1,
  mars: 2,
  avr: 3,
  mai: 4,
  juin: 5,
  juil: 6,
  août: 7,
  sept: 8,
  oct: 9,
  nov: 10,
  déc: 11,
};

/** Kick-off as a Date (Tunis time, UTC+1), or null while the date or hour is still to be confirmed. */
export function parseKickoff(date: string, time: string): Date | null {
  const t = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  const d = /(\d{1,2})\s+([a-zéû]+)\.?\s+(\d{4})/i.exec(date);
  if (!t || !d) return null;
  const month = MONTHS[d[2]!.toLowerCase()];
  if (month === undefined) return null;
  return new Date(Date.UTC(+d[3]!, month, +d[1]!, +t[1]! - 1, +t[2]!));
}

const stamp = (d: Date) =>
  d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

export function fixtureIcs(f: NationalFixture): string | null {
  const start = parseKickoff(f.date, f.time);
  if (!start) return null;
  const end = new Date(start.getTime() + 2 * 3600 * 1000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FTF//Calendrier//FR",
    "BEGIN:VEVENT",
    `UID:${f.id}@ftf`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${f.team} - ${f.opponent}`,
    `DESCRIPTION:${f.competition}`,
    `LOCATION:${f.venue}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(f: NationalFixture): void {
  const ics = fixtureIcs(f);
  if (!ics) return;
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${f.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
