import { readSheetCollection } from "@/lib/google-sheets";

export type SchoolEvent = {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  schedule?: { date: string; endDate?: string; day: string; month: string; time: string };
};

export async function getSchoolEvents(): Promise<SchoolEvent[]> {
  return readSheetCollection<SchoolEvent>("events");
}
