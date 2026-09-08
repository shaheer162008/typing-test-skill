import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WordTypingPage, wordPageContent } from "@/components/word-typing-content";
import { getWordCountFromSlug, wordCounts } from "@/lib/typing-modes";

type PageProps = { params: Promise<{ count: string }> };

export function generateStaticParams() {
  return wordCounts.map((count) => ({ count: `${count}-words` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const count = getWordCountFromSlug((await params).count);
  if (!count) return {};
  const content = wordPageContent[count];
  return { title: content.title, description: content.description };
}

export default async function WordTypingTestPage({ params }: PageProps) {
  const count = getWordCountFromSlug((await params).count);
  if (!count) notFound();
  return <WordTypingPage content={wordPageContent[count]} />;
}
