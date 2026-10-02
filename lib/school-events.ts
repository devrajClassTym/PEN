import { readFile } from "node:fs/promises";
import path from "node:path";

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
  return JSON.parse(await readFile(filePath, "utf8")) as SchoolEvent[];
}
