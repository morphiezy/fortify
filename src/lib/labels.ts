// Centralized UI copy for the password strength meter.
export const PASSWORD_LABELS = {
  weak: "Weak",
  fair: "Fair",
  strong: "Strong",
} as const;

export type PasswordLevel = keyof typeof PASSWORD_LABELS;

// Return the display label for a strength level.
export function labelFor(level: PasswordLevel): string {
  return PASSWORD_LABELS[level];
}
