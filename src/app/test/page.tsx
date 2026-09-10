import TypingTestPage from "@/components/typing-test-page";
import { redirect } from "next/navigation";

type TestPageProps = {
  searchParams: Promise<{ mode?: string; duration?: string; wordCount?: string; lesson?: string }>;
};

export default async function TestPage({ searchParams }: TestPageProps) {
  const { mode, duration, wordCount, lesson } = await searchParams;
  const minutes = Number(duration);
  const words = Number(wordCount);

  if (mode === "words" && [25, 50, 75, 100].includes(words)) {
    return <TypingTestPage mode="words" wordCount={words} lessonId={lesson} />;
  }

  if ((mode !== "test" && mode !== "practice") || !Number.isInteger(minutes) || minutes < 1) {
    redirect("/typing-test");
  }

  return <TypingTestPage mode={mode} durationMinutes={minutes} lessonId={lesson} />;
}