export function computeScore(lifePoints: number, turns: number): number {
  if (turns <= 0) throw new Error("turns must be > 0");
  if (lifePoints < 0) throw new Error("lifePoints must be >= 0");
  return Math.floor((lifePoints * 1000) / turns);
}
