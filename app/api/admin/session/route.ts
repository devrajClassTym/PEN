import { adminCredentials, clearAdminCookie, createAdminCookie, isAdminRequest } from "@/lib/admin-session";

export async function GET(request: Request) {
  return Response.json({ authenticated: isAdminRequest(request) }, { status: isAdminRequest(request) ? 200 : 401 });
}

export async function POST(request: Request) {
  try {
    const { email, password, secret } = await request.json();
    const expected = adminCredentials();
    if (!expected.email || !expected.password || !expected.secret) {
      return Response.json({ error: "Admin login is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SECRET in Vercel." }, { status: 503 });
    }
    if (String(email).trim() !== expected.email || password !== expected.password || secret !== expected.secret) {
      return Response.json({ error: "The email, password, or secret key is incorrect. Please try again." }, { status: 401 });
    }
    return Response.json({ authenticated: true }, { headers: { "Set-Cookie": createAdminCookie() } });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Could not log in." }, { status: 500 });
  }
}

export async function DELETE() {
  return Response.json({ authenticated: false }, { headers: { "Set-Cookie": clearAdminCookie() } });
}