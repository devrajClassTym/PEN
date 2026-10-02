import { readFile } from "node:fs/promises";
import path from "node:path";

export type SchoolBlog = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
};

export async function getSchoolBlogs(): Promise<SchoolBlog[]> {
  const filePath = path.join(process.cwd(), "data", "blogs.json");
  return JSON.parse(await readFile(filePath, "utf8")) as SchoolBlog[];
}
