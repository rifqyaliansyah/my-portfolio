/**
 * Deterministic shuffle using Fisher-Yates algorithm with a seeded random.
 * Same seed always produces the same shuffle result.
 */
export function seededShuffle<T>(array: T[], seed: string): T[] {
  const result = [...array];
  const seedHash = hashString(seed);

  // Fisher-Yates shuffle with seeded random
  for (let i = result.length - 1; i > 0; i--) {
    const j = seededRandom(seedHash + i) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Simple string hash (djb2 algorithm).
 * Returns a positive integer.
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // Ensure positive integer
}

/**
 * Simple seeded pseudo-random number generator.
 * Returns an integer between 0 and 2^31 - 1.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * 2147483647);
}
