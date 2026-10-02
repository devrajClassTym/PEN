import path from "node:path";
import defaultEvents from "@/data/events.json";
import { readJsonCollection, writeJsonCollection } from "@/lib/content-storage";

export type SchoolEvent = {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  schedule?: { date: string; day: string; month: string; time: string };
};

export async function getSchoolEvents(): Promise<SchoolEvent[]> {
  const filePath = path.join(process.cwd(), "data", "events.json");
  return readJsonCollection("content/events.json", filePath, defaultEvents as SchoolEvent[]);
}

export async function saveSchoolEvents(events: SchoolEvent[]) {
  const filePath = path.join(process.cwd(), "data", "events.json");
  return writeJsonCollection("content/events.json", filePath, events);
}
