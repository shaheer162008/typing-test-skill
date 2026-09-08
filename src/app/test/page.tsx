import { redirect } from "next/navigation";
import TypingTestPage from "@/components/typing-test-page";

type TestPageProps = {
  searchParams: Promise<{ mode?: string; duration?: string; wordCount?: string }>;
};

export default async function TestRoutePage({ searchParams }: TestPageProps) {
  const { mode, duration, wordCount } = await searchParams;
  const minutes = Number(duration);
  const words = Number(wordCount);

  if (mode === "words" && [25, 50, 75, 100].includes(words)) {
    return <TypingTestPage mode="words" wordCount={words} />;
  }

  if ((mode !== "test" && mode !== "practice") || !Number.isInteger(minutes) || minutes < 1) {
    redirect("/typing-test");
  }

  return <TypingTestPage mode={mode} durationMinutes={minutes} />;
}
