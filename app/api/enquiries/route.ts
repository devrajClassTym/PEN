import { callGoogleSheets, hasGoogleSheetsConfiguration } from "@/lib/google-sheets";

export const runtime = "nodejs";

const classes = ["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, index) => `Class ${index + 1}`), "Help me choose"];
const subjects = ["Admissions", "Campus visit", "General enquiry", "Careers"];
const failure = "Unable to save your enquiry. Please try again later or contact the school directly.";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }
  let data: Record<string, unknown>;
  try {
    const body = await request.text();
    if (body.length > 16000) return Response.json({ error: "Your enquiry is too long." }, { status: 413 });
    data = JSON.parse(body);
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid body");
  } catch {
    return Response.json({ error: "Invalid enquiry." }, { status: 400 });
  }
  const kind = data.type;
  if (kind !== "contact" && kind !== "admission") return Response.json({ error: "Invalid enquiry type." }, { status: 400 });
  const fields: [string, number, boolean][] = kind === "contact"
    ? [["name", 100, true], ["email", 254, true], ["phone", 25, false], ["subject", 100, true], ["message", 3000, true]]
    : [["childName", 100, true], ["parentName", 100, true], ["phone", 20, true], ["email", 254, false], ["classApplyingFor", 100, true], ["location", 120, true], ["message", 2000, false]];
  const cleaned: Record<string, string> = {};
  for (const [name, max, required] of fields) {
    const value = data[name] ?? "";
    if (typeof value !== "string" || value.length > max || (required && !value.trim())) {
      return Response.json({ error: "Please complete all required fields with valid values." }, { status: 400 });
    }
    cleaned[name] = value.trim();
  }
  if ((cleaned.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)) ||
      (kind === "contact" && (!subjects.includes(cleaned.subject) || cleaned.message.length < 10)) ||
      (kind === "admission" && (!classes.includes(cleaned.classApplyingFor) || !/^\+?[0-9\s()\-]{7,20}$/.test(cleaned.phone)))) {
    return Response.json({ error: "Please check your email, phone number and selected options." }, { status: 400 });
  }
  if (!hasGoogleSheetsConfiguration()) {
    console.error("Enquiry storage: Apps Script URL or secret is missing.");
    return Response.json({ error: failure }, { status: 503 });
  }
  try {
    await callGoogleSheets({ ...cleaned, type: kind });
    return Response.json({ success: true });
  } catch {
    // Do not log credentials, upstream response bodies or personal information.
    console.error("Enquiry storage: Apps Script did not confirm the save.");
    return Response.json({ error: failure }, { status: 503 });
  }
}
