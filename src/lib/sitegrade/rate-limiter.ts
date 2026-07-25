import Redis from "ioredis";

// In-memory sliding window rate limiter fallback
interface RateLimitRecord {
  timestamps: number[];
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function inMemoryRateLimiter(key: string, limit: number, windowMs: number): boolean {
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

// Redis Initialization
let redis: Redis | null = null;
const REDIS_URL = process.env.REDIS_URL;

if (REDIS_URL) {
  try {
    redis = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 1, // Fail fast on connection loss
      connectTimeout: 2000,
    });
    
    redis.on("error", (err) => {
      console.warn("⚠️ RateLimiter: Redis error, falling back to in-memory mode:", err.message);
    });
  } catch (e) {
    console.warn("⚠️ RateLimiter: Failed to initialize Redis client:", e);
  }
} else {
  console.log("ℹ️ RateLimiter: REDIS_URL not configured. Running in-memory rate limiter.");
}

/**
 * Sliding window rate limiter.
 * Falls back to in-memory Map if Redis is unavailable or unconfigured.
 */
export async function isRateLimited(key: string, limit: number, windowMs: number): Promise<boolean> {
  if (!redis) {
    return inMemoryRateLimiter(key, limit, windowMs);
  }

  const now = Date.now();
  const clearBefore = now - windowMs;

  try {
    // Exec ZREMRANGEBYSCORE and ZCARD in a transaction
    const results = await redis
      .multi()
      .zremrangebyscore(key, 0, clearBefore)
      .zcard(key)
      .exec();

    if (!results) {
      return inMemoryRateLimiter(key, limit, windowMs);
    }

    // ioredis return structure: [[null, countRemoved], [null, cardCount]]
    const cardResult = results[1];
    const count = cardResult && typeof cardResult[1] === "number" ? cardResult[1] : 0;

    if (count >= limit) {
      return true;
    }

    // Add current timestamp and set TTL on key
    await redis
      .multi()
      .zadd(key, now, now.toString())
      .expire(key, Math.ceil(windowMs / 1000))
      .exec();

    return false;
  } catch (err) {
    console.warn("⚠️ RateLimiter: Redis operation failed. Falling back to in-memory rate limiter.", err);
    return inMemoryRateLimiter(key, limit, windowMs);
  }
}
export type { RateLimitRecord };
