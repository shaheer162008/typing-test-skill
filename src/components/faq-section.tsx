"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    question: "Can I take a typing test without signing in?",
    answer: "Yes. Typing tests, practice sessions, and word tests are free to use without an account. Start typing immediately and see your result at the end.",
  },
  {
    question: "What do I get by creating an account?",
    answer: "Your account lets you save test records, follow your progress in the dashboard, build a practice history, and keep your best scores in one place.",
  },
  {
    question: "Are the tests and practice sessions free after I sign in?",
    answer: "Yes. Signing in does not lock the tests behind a paywall. Timed tests, practice sessions, and word tests remain free after you create an account.",
  },
  {
    question: "How can I get a typing certificate?",
    answer: "Complete a qualifying typing test, then sign in to save the result and access certificate milestones. Certificates require an account so your achievement can be verified and preserved.",
  },
  {
    question: "Which sign-in options will be available?",
    answer: "You will be able to create an account with Google or with email and password. Choose whichever sign-in method is more convenient for you.",
  },
  {
    question: "Which test modes are available?",
    answer: "Typing Test and Typing Practice offer 1, 2, 3, 5, 10, 15, and 30-minute sessions. Word Typing offers 25, 50, 75, and 100-word tests.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-primary/10 bg-black px-4 py-24 text-primary sm:px-6 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-5 text-xs uppercase tracking-[0.18em] text-primary/50">Good to know</p>
          <h2 className="text-4xl font-medium leading-[0.95] tracking-tighter sm:text-5xl md:text-7xl">
            Start free. Save what matters.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-primary/55 sm:text-base">
            Take a test without signing in, then create an account when you are ready to keep your records and earn verified certificates.
          </p>
        </div>

        <div className="border-y border-primary/15">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div key={item.question} className="border-b border-primary/15 last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:py-6"
                >
                  <span className="text-base font-medium sm:text-lg">{item.question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-primary/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div id={answerId} hidden={!isOpen} className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-primary/55">
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
