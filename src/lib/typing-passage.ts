export const defaultTypingPassage =
  "Practice makes progress. Focus on rhythm, accuracy, and calm keystrokes. The best typists do not rush. They stay relaxed, keep their eyes on the text, and let the fingers follow the pattern naturally with confidence. Great typing is not about speed alone. It is about timing, control, and consistency. When you keep your posture balanced and your hands light, the words begin to flow without tension. Every careful session builds a stronger habit. Consistency over long stretches matters more than any single fast burst, because the fingers only get faster once the pattern stops requiring conscious thought.";

export function getTargetText(mode: "test" | "practice" | "words", durationMinutes?: number, wordCount?: number) {
  if (mode === "words" && wordCount) return defaultTypingPassage.split(" ").slice(0, wordCount).join(" ");
  const targetLength = Math.max(defaultTypingPassage.length, (durationMinutes ?? 1) * 300);
  return defaultTypingPassage.repeat(Math.ceil(targetLength / defaultTypingPassage.length)).slice(0, targetLength);
}
