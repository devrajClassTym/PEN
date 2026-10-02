import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "pen-admin-session";
const sessionDuration = 60 * 60 * 24 * 14;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_SECRET ?? (process.env.NODE_ENV === "production" ? undefined : process.env.NEXT_PUBLIC_ADMIN_SECRET);
}

function signature(timestamp: string, secret: string) {
  return createHmac("sha256", secret).update(`pen-admin:${timestamp}`).digest("base64url");
}

export function createAdminCookie() {
  const secret = getSessionSecret();
  if (!secret) throw new Error("Set ADMIN_SESSION_SECRET in the server environment before using admin login.");
  const timestamp = String(Date.now());
  const value = `${timestamp}.${signature(timestamp, secret)}`;
  return `${cookieName}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${sessionDuration}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}

export function clearAdminCookie() {
  return `${cookieName}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}

export function isAdminRequest(request: Request) {
  const secret = getSessionSecret();
  if (!secret) return false;
  const cookie = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${cookieName}=`));
  const value = cookie?.slice(cookieName.length + 1);
  if (!value) return false;
  const [timestamp, suppliedSignature] = value.split(".");
  const issuedAt = Number(timestamp);
  if (!timestamp || !suppliedSignature || !Number.isFinite(issuedAt) || Date.now() - issuedAt > sessionDuration * 1000 || issuedAt > Date.now()) return false;
  const expected = Buffer.from(signature(timestamp, secret));
  const supplied = Buffer.from(suppliedSignature);
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}

export function adminCredentials() {
  const allowLocalFallback = process.env.NODE_ENV !== "production";
  return {
    email: process.env.ADMIN_EMAIL ?? (allowLocalFallback ? process.env.NEXT_PUBLIC_ADMIN_EMAIL : undefined),
    password: process.env.ADMIN_PASSWORD ?? (allowLocalFallback ? process.env.NEXT_PUBLIC_ADMIN_PASSWORD : undefined),
    secret: process.env.ADMIN_SECRET ?? (allowLocalFallback ? process.env.NEXT_PUBLIC_ADMIN_SECRET : undefined),
  };
}