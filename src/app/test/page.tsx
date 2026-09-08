import { redirect } from "next/navigation";
import TypingTestPage from "@/components/typing-test-page";

type TestPageProps = {
  searchParams: Promise<{ mode?: string; duration?: string }>;
};

export default async function TestRoutePage({ searchParams }: TestPageProps) {
  const { mode, duration } = await searchParams;
  const minutes = Number(duration);

  if ((mode !== "test" && mode !== "practice") || !Number.isInteger(minutes) || minutes < 1) {
    redirect("/typing-test");
  }

  return <TypingTestPage mode={mode} durationMinutes={minutes} />;
}
