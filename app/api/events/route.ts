import { isAdminRequest } from "@/lib/admin-session";
import { getSchoolEvents, saveSchoolEvents, type SchoolEvent } from "@/lib/school-events";

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Could not process events.";
  const status = message.includes("Connect a Vercel Blob store") ? 503 : 500;
  return Response.json({ error: message }, { status });
}

function isSchoolEvent(value: unknown): value is SchoolEvent {
  if (!value || typeof value !== "object") return false;
  const event = value as Partial<SchoolEvent>;
  return [event.id, event.title, event.category, event.description, event.details].every((field) => typeof field === "string")
    && (!event.schedule || [event.schedule.date, event.schedule.day, event.schedule.month, event.schedule.time].every((field) => typeof field === "string"));
}

export async function GET() {
  try {
    return Response.json(await getSchoolEvents());
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return Response.json({ error: "Please log in again to manage events." }, { status: 401 });
  try {
    const event: unknown = await request.json();
    if (!isSchoolEvent(event)) return Response.json({ error: "Invalid event record." }, { status: 400 });
    const events = await getSchoolEvents();
    if (events.some((item) => item.id === event.id)) return Response.json({ error: "An event with this ID already exists." }, { status: 409 });
    await saveSchoolEvents([...events, event]);
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return Response.json({ error: "Please log in again to manage events." }, { status: 401 });
  try {
    const event: unknown = await request.json();
    if (!isSchoolEvent(event)) return Response.json({ error: "Invalid event record." }, { status: 400 });
    const events = await getSchoolEvents();
    if (!events.some((item) => item.id === event.id)) return Response.json({ error: "Event not found." }, { status: 404 });
    await saveSchoolEvents(events.map((item) => item.id === event.id ? event : item));
    return Response.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) return Response.json({ error: "Please log in again to manage events." }, { status: 401 });
  try {
    const body = await request.json();
    if (typeof body.id !== "string") return Response.json({ error: "Event ID is required." }, { status: 400 });
    const events = await getSchoolEvents();
    if (!events.some((item) => item.id === body.id)) return Response.json({ error: "Event not found." }, { status: 404 });
    await saveSchoolEvents(events.filter((item) => item.id !== body.id));
    return Response.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}