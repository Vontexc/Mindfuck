export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function jitter(baseMs: number, variancePct = 0.2): number {
  const variance = baseMs * variancePct;
  return baseMs + (Math.random() * 2 - 1) * variance;
}
