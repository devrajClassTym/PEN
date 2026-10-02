import { writeFile } from "node:fs/promises";
import path from "node:path";
import { getSchoolBlogs, type SchoolBlog } from "@/lib/school-blogs";

export async function GET() {
  return Response.json(await getSchoolBlogs());
}

export async function PUT(request: Request) {
  const blogs: unknown = await request.json();
  if (!Array.isArray(blogs)) {
    return Response.json({ error: "Blogs must be a JSON array." }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "data", "blogs.json");
  await writeFile(filePath, `${JSON.stringify(blogs as SchoolBlog[], null, 2)}\n`);
  return Response.json({ success: true });
}