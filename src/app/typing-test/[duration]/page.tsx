import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DurationLandingPage from "@/components/duration-landing-page";
import { durations, getDurationFromSlug } from "@/lib/typing-modes";
import { typingTestContent } from "@/lib/typing-page-content";

type PageProps = { params: Promise<{ duration: string }> };

export function generateStaticParams() {
  return durations.map((duration) => ({ duration: `${duration}-minute` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { duration } = await params;
  const minutes = getDurationFromSlug(duration);
  if (!minutes) return {};
  const content = typingTestContent[minutes];
  return { title: content.title, description: content.description };
}

export default async function TimedTypingTestPage({ params }: PageProps) {
  const minutes = getDurationFromSlug((await params).duration);
  if (!minutes) notFound();
  return <DurationLandingPage mode="test" duration={minutes} content={typingTestContent[minutes]} />;
}
