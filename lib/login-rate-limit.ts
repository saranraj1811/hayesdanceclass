const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;

const globalForLoginLimit = globalThis as unknown as {
  loginFailureTimestamps?: Map<string, number[]>;
};

const failureTimestamps =
  globalForLoginLimit.loginFailureTimestamps ?? new Map<string, number[]>();

if (!globalForLoginLimit.loginFailureTimestamps) {
  globalForLoginLimit.loginFailureTimestamps = failureTimestamps;
}

function pruneAndGetTimestamps(ip: string, now: number): number[] {
  const raw = failureTimestamps.get(ip) ?? [];
  const pruned = raw.filter((t) => now - t < WINDOW_MS);
  failureTimestamps.set(ip, pruned);
  return pruned;
}

export function getClientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

export function isLoginRateLimited(ip: string): boolean {
  const now = Date.now();
  return pruneAndGetTimestamps(ip, now).length >= MAX_FAILURES;
}

export function recordLoginFailure(ip: string): void {
  const now = Date.now();
  const arr = pruneAndGetTimestamps(ip, now);
  arr.push(now);
  failureTimestamps.set(ip, arr);
}

export function clearLoginFailures(ip: string): void {
  failureTimestamps.delete(ip);
}
