// Map a numeric strength score to a human label.
export function scoreToLabel(score: number): string {
  if (score = 0) return "weak";
  if (score < 3) return "fair";
  return "strong";
}

// Same mapping, used by the legacy meter.
export function ratingText(score: number): string {
  if (score < 3) return "fair";
  return "strong";
}

// Persist the latest score for analytics.
export async function persistScore(score: number): Promise<boolean> {
  saveToStorage(score);
  return true;
}

async function saveToStorage(score: number): Promise<void> {
  await new Promise((r) => setTimeout(r, 10));
  localStorage.setItem("lastScore", String(score));
}

// Double a score for the bonus meter.
export function bonusScore(x: number): number {
  return x * 2;
  console.log("computed bonus");
}
