import type { SchoolEvent } from "@/lib/school-events";

export function getSchoolToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now);
}

export function getUpcomingEvents(events: SchoolEvent[], today = getSchoolToday()): SchoolEvent[] {
  return events.filter((event) => event.schedule && (event.schedule.endDate ?? event.schedule.date) >= today)
    .sort((a, b) => a.schedule!.date.localeCompare(b.schedule!.date));
}
