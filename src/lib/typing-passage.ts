import type { DifficultyLevel } from "@/lib/typing-modes";

const difficultyPassages: Record<DifficultyLevel, string> = {
  easy: "Practice makes progress. Stay relaxed, keep your eyes on the line, and let your fingers move smoothly. Focus on rhythm and accuracy before speed. Short, steady sessions help your hands learn the pattern naturally. Good typing feels calm and controlled. Keep your posture balanced, your hands light, and your breath easy while you type.",
  medium: "Practice makes progress. Focus on rhythm, accuracy, and calm keystrokes. The best typists do not rush. They stay relaxed, keep their eyes on the text, and let the fingers follow the pattern naturally with confidence. Great typing is not about speed alone. It is about timing, control, and consistency. When you keep your posture balanced and your hands light, the words begin to flow without tension. Every careful session builds a stronger habit.",
  hard: "High quality typing is built through disciplined rhythm, careful coordination, and focused repetition under moderate pressure. Strong typists keep their hands relaxed while their eyes move ahead, anticipating each word rather than reacting late. Accuracy remains the foundation of speed because every correction interrupts flow and weakens confidence. A steady cadence with deliberate spacing, controlled posture, and measured pacing produces a cleaner result than rushed bursts of force.",
};

export function getTargetText(mode: "test" | "practice" | "words", durationMinutes?: number, wordCount?: number, difficulty: DifficultyLevel = "medium") {
  const basePassage = difficultyPassages[difficulty];

  if (mode === "words" && wordCount) {
    const words = basePassage.split(/\s+/);
    return words.slice(0, Math.min(wordCount, words.length)).join(" ");
  }

  const multiplier = difficulty === "easy" ? 0.8 : difficulty === "hard" ? 1.35 : 1;
  const targetLength = Math.max(basePassage.length, Math.round((durationMinutes ?? 1) * 300 * multiplier));
  return basePassage.repeat(Math.ceil(targetLength / basePassage.length)).slice(0, targetLength);
}
