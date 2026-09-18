export function parseLimit(raw: unknown, fallback = 20): number {
  const n = Number(raw ?? fallback);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(100, Math.max(1, Math.trunc(n)));
}

export function encodeCursor(offset: number): string {
  return Buffer.from(String(offset), "utf8").toString("base64url");
}

export function decodeCursor(cursor?: string): number {
  if (!cursor) return 0;
  const n = Number(Buffer.from(cursor, "base64url").toString("utf8"));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}
