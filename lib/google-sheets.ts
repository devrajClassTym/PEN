import "server-only";

export function hasGoogleSheetsConfiguration() {
  return Boolean(process.env.GOOGLE_APPS_SCRIPT_URL && process.env.GOOGLE_APPS_SCRIPT_SECRET);
}

export async function callGoogleSheets(payload: Record<string, unknown>) {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  if (!url || !secret) throw new Error("Google Sheets is not configured.");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, secret }),
    cache: "no-store",
    redirect: "follow",
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error("Google Sheets request failed.");
  const result = await response.json();
  if (result?.success !== true) throw new Error("Google Sheets did not confirm the request.");
  return result;
}

export async function readSheetCollection<T>(collection: string): Promise<T[]> {
  const result = await callGoogleSheets({ action: "read", collection });
  if (!Array.isArray(result.records)) throw new Error("Invalid Google Sheets collection.");
  return result.records as T[];
}
