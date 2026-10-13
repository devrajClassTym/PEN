import { getSchoolEvents } from "@/lib/school-events";

export async function GET() {
  try {
    return Response.json(await getSchoolEvents(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Unable to load events. Please try again later." }, { status: 503 });
  }
}
