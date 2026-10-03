import { get, put } from "@vercel/blob";
import { readFile, writeFile } from "node:fs/promises";

export function hasPersistentContentStorage() {
  return Boolean(
    process.env.BLOB_STORE_ID ||
    process.env.BLOB_READ_WRITE_TOKEN
  );
}

export async function readJsonCollection<T>(pathname: string, filePath: string, fallback: T): Promise<T> {
  if (hasPersistentContentStorage()) {
    const blob = await get(pathname, { access: "public", useCache: false });
    if (blob) {
      if (blob.statusCode !== 200 || !blob.stream) throw new Error(`Could not read ${pathname} from Vercel Blob.`);
      const value: unknown = await new Response(blob.stream).json();
      if (!Array.isArray(value)) throw new Error(`${pathname} must contain a JSON array.`);
      return value as T;
    }
  }

  if (process.env.VERCEL) return fallback;

  try {
    const value: unknown = JSON.parse(await readFile(filePath, "utf8"));
    if (!Array.isArray(value)) throw new Error(`${filePath} must contain a JSON array.`);
    return value as T;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return fallback;
    throw error;
  }
}

export async function writeJsonCollection<T>(pathname: string, filePath: string, records: T[]) {
  const content = `${JSON.stringify(records, null, 2)}\n`;
  if (hasPersistentContentStorage()) {
    await put(pathname, content, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    return;
  }

  if (process.env.VERCEL) throw new Error("Connect a Vercel Blob store to this project before saving production content.");
  await writeFile(filePath, content);
}