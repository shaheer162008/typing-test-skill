import Link from "next/link";
import { ArrowUpRight, Award, CheckCircle2, Clock3, Flame, Gauge, Trophy, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TypingMode } from "@/lib/typing-modes";

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
};

const benefitsByMode: Record<TypingMode, { eyebrow: string; title: string; description: string; items: Benefit[] }> = {
  test: {
    eyebrow: "More than a number",
    title: "Turn one test into visible progress.",
    description: "A good result should give you somewhere to go next. Typing Test Skill connects each session to a bigger reason to keep practicing.",
    items: [
      { icon: Gauge, title: "Know your real speed", description: "See WPM, accuracy, and mistakes together so your result tells the full story." },
      { icon: Award, title: "Earn a certificate", description: "Reach a milestone and turn your typing progress into a result worth sharing.", href: "/typing-test/1-minute" },
      { icon: Trophy, title: "Compete on the leaderboard", description: "Use other typists' scores as a target and make your next personal best more tangible.", href: "/typing-test/1-minute" },
      { icon: Users, title: "Be part of the community", description: "A steady practice habit feels easier when you can measure your progress alongside other typists." },
    ],
  },
  practice: {
    eyebrow: "Practice that compounds",
    title: "Make better typing feel automatic.",
    description: "Practice is where speed becomes a habit. Keep sessions focused, repeat what needs work, and let small improvements add up.",
    items: [
      { icon: Flame, title: "Build a daily rhythm", description: "Short, repeatable sessions make it easier to return tomorrow and keep momentum." },
      { icon: CheckCircle2, title: "Accuracy before speed", description: "Clean keystrokes create the foundation for faster typing that does not fall apart under pressure." },
      { icon: Zap, title: "Work on your weak spots", description: "Use live feedback to notice pauses, errors, and patterns that deserve another round." },
      { icon: Gauge, title: "See the difference", description: "Compare each session honestly and recognise progress beyond a single high score." },
    ],
  },
  words: {
    eyebrow: "A focused benchmark",
    title: "A short passage can teach you a lot.",
    description: "Word tests remove the clock and give you a clear finish line, making them useful for warm-ups, comparisons, and accuracy work.",
    items: [
      { icon: Clock3, title: "Warm up quickly", description: "A fixed passage gets your hands moving before a longer test or work session." },
      { icon: CheckCircle2, title: "Keep accuracy visible", description: "Every word counts, so careless mistakes are easy to notice and correct." },
      { icon: Gauge, title: "Compare fair results", description: "Repeat the same word length and see whether your rhythm is actually improving." },
      { icon: Zap, title: "Finish with momentum", description: "Choose a passage that fits your time and leave with a useful result, not unfinished practice." },
    ],
  },
};

export default function ModeBenefits({ mode }: { mode: TypingMode }) {
  const content = benefitsByMode[mode];

  return (
    <section className="border-t border-primary/10 bg-black px-4 py-20 text-primary sm:px-6 md:px-10 md:py-28" aria-labelledby={`${mode}-benefits-title`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-primary/15 pb-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-primary/50">{content.eyebrow}</p>
            <h2 id={`${mode}-benefits-title`} className="max-w-xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-5xl md:text-6xl">{content.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-primary/55 lg:pt-2">{content.description}</p>
        </div>

        <div className="grid divide-y divide-primary/15 border-x border-b border-primary/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {content.items.map((item) => {
            const Icon = item.icon;
            const body = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center border border-primary/20 bg-primary/[0.04]">
                    <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  {item.href ? <ArrowUpRight className="h-4 w-4 text-primary/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" /> : null}
                </div>
                <h3 className="mt-12 text-xl font-medium tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-primary/50">{item.description}</p>
              </>
            );

            return item.href ? (
              <Link key={item.title} href={item.href} className="group p-6 transition-colors hover:bg-white/[0.035] sm:p-7">
                {body}
              </Link>
            ) : (
              <article key={item.title} className="p-6 sm:p-7">
                {body}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
