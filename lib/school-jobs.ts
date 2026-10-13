import { readSheetCollection } from "@/lib/google-sheets";

export type SchoolJob = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
};

export async function getSchoolJobs(): Promise<SchoolJob[]> {
  return readSheetCollection<SchoolJob>("jobs");
}
