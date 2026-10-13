import { callGoogleSheets } from "@/lib/google-sheets";
import { getSchoolJobs } from "@/lib/school-jobs";

export const runtime = "nodejs";
const maxFileSize = 2 * 1024 * 1024;
const failure = "Unable to confirm your application. Please contact the school before resubmitting.";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (Number(request.headers.get("content-length")) > maxFileSize + 16000) {
    return Response.json({ error: "Choose a CV no larger than 2 MB." }, { status: 413 });
  }
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ error: "Invalid application." }, { status: 400 });
  }
  const fields: [string, number, boolean][] = [["jobId", 100, true], ["name", 100, true], ["email", 254, true], ["phone", 20, true], ["experience", 50, true], ["message", 2000, false]];
  const cleaned: Record<string, string> = {};
  for (const [field, max, required] of fields) {
    const value = data.get(field) ?? "";
    if (typeof value !== "string" || value.length > max || (required && !value.trim())) {
      return Response.json({ error: "Please complete all required fields with valid values." }, { status: 400 });
    }
    cleaned[field] = value.trim();
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email) || !/^\+?[0-9\s()\-]{7,20}$/.test(cleaned.phone) ||
      !["Fresher", "Less than 1 year", "1–3 years", "3–5 years", "5+ years"].includes(cleaned.experience)) {
    return Response.json({ error: "Please check your email, phone number and experience." }, { status: 400 });
  }
  const cv = data.get("cv");
  if (!(cv instanceof File) || !cv.size || cv.size > maxFileSize || cv.name.length > 200 || !/\.(pdf|doc|docx)$/i.test(cv.name)) {
    return Response.json({ error: "Choose a PDF, DOC, or DOCX CV no larger than 2 MB." }, { status: 400 });
  }
  const bytes = Buffer.from(await cv.arrayBuffer());
  const extension = cv.name.split(".").pop()!.toLowerCase();
  const validSignature = extension === "pdf" ? bytes.subarray(0, 5).toString() === "%PDF-"
    : extension === "doc" ? bytes.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]))
    : bytes.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
  if (!validSignature) return Response.json({ error: "The CV file does not match its file type." }, { status: 400 });
  try {
    const job = (await getSchoolJobs()).find((item) => item.id === cleaned.jobId);
    if (!job) return Response.json({ error: "This opening is no longer available. Please refresh the careers page." }, { status: 400 });
    await callGoogleSheets({ ...cleaned, type: "career", jobTitle: job.title, cv: { name: cv.name, base64: bytes.toString("base64") } });
    return Response.json({ success: true });
  } catch {
    console.error("Career storage: Google Sheets did not confirm the save.");
    return Response.json({ error: failure }, { status: 503 });
  }
}
