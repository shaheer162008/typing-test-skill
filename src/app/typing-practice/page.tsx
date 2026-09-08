import TypingModeHub from "@/components/typing-mode-hub";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Typing Practice | Build Speed and Accuracy | Typing Test Skill", description: "Choose a focused typing practice session from one to thirty minutes and build better speed and accuracy." };

export default function TypingPracticeHubPage() {
  return <TypingModeHub mode="practice" />;
}
