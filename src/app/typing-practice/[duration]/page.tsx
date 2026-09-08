import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DurationLandingPage from "@/components/duration-landing-page";
import { durations, getDurationFromSlug } from "@/lib/typing-modes";
import { typingPracticeContent } from "@/lib/typing-page-content";

type PageProps = { params: Promise<{ duration: string }> };

export function generateStaticParams() {
  return durations.map((duration) => ({ duration: `${duration}-minute` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const minutes = getDurationFromSlug((await params).duration);
  if (!minutes) return {};
  const content = typingPracticeContent[minutes];
  return { title: content.title, description: content.description };
}

export default async function TimedTypingPracticePage({ params }: PageProps) {
  const minutes = getDurationFromSlug((await params).duration);
  if (!minutes) notFound();
  return <DurationLandingPage mode="practice" duration={minutes} content={typingPracticeContent[minutes]} />;
}
