export const durations = [1, 2, 3, 5, 10, 15, 20, 30] as const;
export const wordCounts = [25, 50, 75, 100] as const;

export type TypingMode = "test" | "practice" | "words";

export const modeCopy = {
  test: {
    label: "Typing tests",
    title: "Find your real typing speed.",
    description: "Choose a focused time limit, settle into the rhythm, and get a clean read on your WPM, accuracy, and consistency.",
    seo: "Free timed typing tests with instant WPM and accuracy feedback. Choose a one-minute sprint or a longer session to measure your typing speed.",
  },
  practice: {
    label: "Typing practice",
    title: "Build speed that stays with you.",
    description: "Train your rhythm with relaxed, repeatable sessions designed to make accurate typing feel automatic.",
    seo: "Improve typing speed and accuracy with focused practice sessions from one to thirty minutes, with live feedback after every keystroke.",
  },
  words: {
    label: "Word typing tests",
    title: "A quick test of pure word flow.",
    description: "Skip the clock and choose a word target. Perfect for a fast baseline, a warm-up, or a quick accuracy check.",
    seo: "Take a word typing test with 25, 50, 75, or 100 words and see your WPM, accuracy, and mistakes instantly.",
  },
} satisfies Record<TypingMode, { label: string; title: string; description: string; seo: string }>;

export function getDurationHref(mode: Exclude<TypingMode, "words">, duration: number) {
  return `/${mode === "test" ? "typing-test" : "typing-practice"}/${duration}-minute`;
}

export function getWordHref(count: number) {
  return `/word-typing-test/${count}-words`;
}

export function getDurationFromSlug(slug: string) {
  const value = Number(slug.replace("-minute", ""));
  return durations.includes(value as (typeof durations)[number]) ? value : null;
}

export function getWordCountFromSlug(slug: string) {
  const value = Number(slug.replace("-words", ""));
  return wordCounts.includes(value as (typeof wordCounts)[number]) ? value : null;
}
