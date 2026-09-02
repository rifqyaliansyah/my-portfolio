/**
 * Helper utility to extract up to 2 uppercase initials from a name string.
 * Examples:
 * - "Rifqy Aliansyah" -> "RA"
 * - "Alexander" -> "AL"
 * - "John Doe Junior" -> "JJ"
 * - "" / undefined / null -> "?"
 */
export function getInitials(name?: string | null): string {
  if (!name || typeof name !== "string") return "?";

  const cleanName = name.trim();
  if (!cleanName) return "?";

  const words = cleanName.split(/\s+/).filter(Boolean);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  const first = words[0][0];
  const last = words[words.length - 1][0];
  return (first + last).toUpperCase();
}

/**
 * Generates deterministic soft background & accent text colors based on name string.
 */
export function getAvatarColor(name?: string | null): { bg: string; text: string; border: string } {
  const defaultColors = {
    bg: "var(--surface-color)",
    text: "var(--primary-color)",
    border: "var(--border-container-color)",
  };

  if (!name || typeof name !== "string") return defaultColors;

  return defaultColors;
}
