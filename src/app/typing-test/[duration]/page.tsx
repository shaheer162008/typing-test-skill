import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TypingModeLanding from "@/components/typing-mode-landing";
import { durations, getDurationFromSlug } from "@/lib/typing-modes";

type PageProps = { params: Promise<{ duration: string }> };

export function generateStaticParams() {
  return durations.map((duration) => ({ duration: `${duration}-minute` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { duration } = await params;
  const minutes = getDurationFromSlug(duration);
  if (!minutes) return {};
  return { title: `${minutes}-Minute Typing Test | WPM and Accuracy`, description: `Take a focused ${minutes}-minute typing test and see your WPM, accuracy, and mistakes instantly.` };
}

export default async function TimedTypingTestPage({ params }: PageProps) {
  const minutes = getDurationFromSlug((await params).duration);
  if (!minutes) notFound();
  return <TypingModeLanding mode="test" durationMinutes={minutes} />;
}
