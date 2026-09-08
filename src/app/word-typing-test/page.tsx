import TypingModeHub from "@/components/typing-mode-hub";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Word Typing Test | Choose a Word Count | Typing Test Skill", description: "Take a 25, 50, 75, or 100-word typing test with live WPM and accuracy feedback." };

export default function WordTypingHubPage() {
  return <TypingModeHub mode="words" />;
}
