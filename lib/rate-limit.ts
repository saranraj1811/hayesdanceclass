type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

const globalForRateLimit = globalThis as unknown as {
  enquiryRateMap?: Map<string, RateLimitRecord>;
};

const rateMap = globalForRateLimit.enquiryRateMap ?? new Map<string, RateLimitRecord>();

if (!globalForRateLimit.enquiryRateMap) {
  globalForRateLimit.enquiryRateMap = rateMap;
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateMap.get(key);

  if (!record || now > record.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  rateMap.set(key, record);
  return false;
}
