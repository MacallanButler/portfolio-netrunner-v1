// Simple In-Memory Sliding Window Rate Limiter
// Prevents spamming audit engine and email delivery

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key) || { timestamps: [] };
  
  // Filter out timestamps outside the sliding window
  record.timestamps = record.timestamps.filter(t => now - t < windowMs);
  
  if (record.timestamps.length >= limit) {
    return true;
  }
  
  record.timestamps.push(now);
  rateLimitMap.set(key, record);
  return false;
}
