import path from "node:path";
import defaultBlogs from "@/data/blogs.json";
import { readJsonCollection, writeJsonCollection } from "@/lib/content-storage";

export type SchoolBlog = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
};

export async function getSchoolBlogs(): Promise<SchoolBlog[]> {
  const filePath = path.join(process.cwd(), "data", "blogs.json");
  return readJsonCollection("content/blogs.json", filePath, defaultBlogs as SchoolBlog[]);
}

export async function saveSchoolBlogs(blogs: SchoolBlog[]) {
  const filePath = path.join(process.cwd(), "data", "blogs.json");
  return writeJsonCollection("content/blogs.json", filePath, blogs);
}
