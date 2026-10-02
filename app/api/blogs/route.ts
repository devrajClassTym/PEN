import { isAdminRequest } from "@/lib/admin-session";
import { getSchoolBlogs, saveSchoolBlogs, type SchoolBlog } from "@/lib/school-blogs";

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Could not process blogs.";
  const status = message.includes("Connect a Vercel Blob store") ? 503 : 500;
  return Response.json({ error: message }, { status });
}

function isSchoolBlog(value: unknown): value is SchoolBlog {
  if (!value || typeof value !== "object") return false;
  const blog = value as Partial<SchoolBlog>;
  return [blog.slug, blog.category, blog.title, blog.excerpt].every((field) => typeof field === "string")
    && Array.isArray(blog.paragraphs) && blog.paragraphs.every((paragraph) => typeof paragraph === "string");
}

export async function GET() {
  try {
    return Response.json(await getSchoolBlogs());
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return Response.json({ error: "Please log in again to manage blogs." }, { status: 401 });
  try {
    const blog: unknown = await request.json();
    if (!isSchoolBlog(blog)) return Response.json({ error: "Invalid blog record." }, { status: 400 });
    const blogs = await getSchoolBlogs();
    if (blogs.some((item) => item.slug === blog.slug)) return Response.json({ error: "A blog with this slug already exists." }, { status: 409 });
    await saveSchoolBlogs([...blogs, blog]);
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return Response.json({ error: "Please log in again to manage blogs." }, { status: 401 });
  try {
    const blog: unknown = await request.json();
    if (!isSchoolBlog(blog)) return Response.json({ error: "Invalid blog record." }, { status: 400 });
    const blogs = await getSchoolBlogs();
    if (!blogs.some((item) => item.slug === blog.slug)) return Response.json({ error: "Blog not found." }, { status: 404 });
    await saveSchoolBlogs(blogs.map((item) => item.slug === blog.slug ? blog : item));
    return Response.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) return Response.json({ error: "Please log in again to manage blogs." }, { status: 401 });
  try {
    const body = await request.json();
    if (typeof body.slug !== "string") return Response.json({ error: "Blog slug is required." }, { status: 400 });
    const blogs = await getSchoolBlogs();
    if (!blogs.some((item) => item.slug === body.slug)) return Response.json({ error: "Blog not found." }, { status: 404 });
    await saveSchoolBlogs(blogs.filter((item) => item.slug !== body.slug));
    return Response.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}