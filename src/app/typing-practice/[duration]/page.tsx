import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TypingModeLanding from "@/components/typing-mode-landing";
import { durations, getDurationFromSlug } from "@/lib/typing-modes";

type PageProps = { params: Promise<{ duration: string }> };

export function generateStaticParams() {
  return durations.map((duration) => ({ duration: `${duration}-minute` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const minutes = getDurationFromSlug((await params).duration);
  if (!minutes) return {};
  return { title: `${minutes}-Minute Typing Practice | Improve Your WPM`, description: `Build typing speed and accuracy with a focused ${minutes}-minute practice session and live feedback.` };
}

export default async function TimedTypingPracticePage({ params }: PageProps) {
  const minutes = getDurationFromSlug((await params).duration);
  if (!minutes) notFound();
  return <TypingModeLanding mode="practice" durationMinutes={minutes} />;
}
