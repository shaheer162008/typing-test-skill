import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TypingModeLanding from "@/components/typing-mode-landing";
import { getWordCountFromSlug, wordCounts } from "@/lib/typing-modes";

type PageProps = { params: Promise<{ count: string }> };

export function generateStaticParams() {
  return wordCounts.map((count) => ({ count: `${count}-words` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const count = getWordCountFromSlug((await params).count);
  if (!count) return {};
  return { title: `${count}-Word Typing Test | WPM and Accuracy`, description: `Take a ${count}-word typing test and get instant WPM, accuracy, and mistake feedback.` };
}

export default async function WordTypingTestPage({ params }: PageProps) {
  const count = getWordCountFromSlug((await params).count);
  if (!count) notFound();
  return <TypingModeLanding mode="words" wordCount={count} />;
}
