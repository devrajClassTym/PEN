import { writeFile } from "node:fs/promises";
import path from "node:path";
import { getSchoolEvents, type SchoolEvent } from "@/lib/school-events";

export async function GET() {
  return Response.json(await getSchoolEvents());
}

export async function PUT(request: Request) {
  const events: unknown = await request.json();
  if (!Array.isArray(events)) {
    return Response.json({ error: "Events must be a JSON array." }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "data", "events.json");
  await writeFile(filePath, `${JSON.stringify(events as SchoolEvent[], null, 2)}\n`);
  return Response.json({ success: true });
}