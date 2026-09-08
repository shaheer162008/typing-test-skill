import TypingModeHub from "@/components/typing-mode-hub";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Typing Test | Choose Your Time | Typing Test Skill", description: "Choose a one, two, three, five, ten, fifteen, or thirty-minute typing test and measure your WPM and accuracy." };

export default function TypingTestHubPage() {
  return <TypingModeHub mode="test" />;
}
