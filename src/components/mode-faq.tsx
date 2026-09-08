import { ChevronDown } from "lucide-react";
import type { TypingMode } from "@/lib/typing-modes";

type ModeFaqProps = {
  mode: TypingMode;
  duration?: number;
  wordCount?: number;
};

export default function ModeFaq({ mode, duration, wordCount }: ModeFaqProps) {
  const questions = mode === "words"
    ? [
        { question: `What is a ${wordCount ?? "word-count"} word typing test?`, answer: `It is a fixed-length typing session with exactly ${wordCount ?? "the selected number of"} words. There is no countdown; the session ends when the final word is complete.` },
        { question: "How is a word typing test different from a timed test?", answer: "A timed test ends when the clock reaches zero. A word typing test ends when you finish the selected passage, so the amount of text stays constant." },
        { question: "What will I see after finishing?", answer: "You will see your WPM, accuracy, and mistakes so you can understand both your pace and how cleanly you typed the passage." },
      ]
    : mode === "practice"
      ? [
          { question: `What does ${duration} minute practice help with?`, answer: `This practice length gives you a focused block to work on rhythm, accuracy, and comfortable movement without treating every attempt like an exam.` },
          { question: "Can I restart practice whenever I want?", answer: "Yes. Practice is designed for repetition. Restart the session, change your focus, and try again whenever a technique needs more work." },
          { question: "Is practice scored like a formal test?", answer: "It still shows useful WPM and accuracy feedback, but the goal is improvement across sessions rather than one official-feeling result." },
        ]
      : [
          { question: `Why choose a ${duration} minute typing test?`, answer: `A ${duration} minute session gives you a defined amount of time to measure your typing speed, accuracy, and consistency under the same conditions.` },
          { question: "How is WPM calculated?", answer: "WPM is based on correctly typed characters using the standard five-character word calculation, measured over the time you spend typing." },
          { question: "Can I take the test without an account?", answer: "Yes. You can start the typing test immediately. No account is required to see your result." },
        ];

  return (
    <section className="border-t border-primary/10 bg-black px-4 py-20 text-primary sm:px-6 md:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-primary/50">Good to know</p>
          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl">Questions before you start.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-primary/55">A few clear answers about this typing mode, so you can choose the session that fits your goal.</p>
        </div>
        <div className="border-y border-primary/15">
          {questions.map((item) => (
            <details key={item.question} className="group border-b border-primary/15 last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium transition-colors hover:text-primary/70 sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-primary/50 transition-transform group-open:rotate-180" />
              </summary>
              <p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-primary/55">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
