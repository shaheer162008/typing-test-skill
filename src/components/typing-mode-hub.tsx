import Link from "next/link";
import Navbar from "@/components/navbar";
import { durations, getDurationHref, getWordHref, modeCopy, type TypingMode, wordCounts } from "@/lib/typing-modes";

type TypingModeHubProps = { mode: TypingMode };

export default function TypingModeHub({ mode }: TypingModeHubProps) {
  const copy = modeCopy[mode];
  const isWords = mode === "words";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-primary">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <header className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary/45">{copy.label}</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary/55">{copy.description}</p>
        </header>

        <section className="mt-12 border-t border-primary/10 pt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-primary/40">Choose your session</p>
              <h2 className="mt-2 text-2xl font-medium">{isWords ? "How many words?" : "How much time do you have?"}</h2>
            </div>
            <span className="hidden text-xs text-primary/35 sm:block">Live feedback included</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(isWords ? wordCounts : durations).map((value) => {
              const href = isWords ? getWordHref(value) : getDurationHref(mode, value);
              const label = isWords ? `${value} words` : `${value} minute${value === 1 ? "" : "s"}`;
              const detail = isWords ? "Quick accuracy check" : value <= 3 ? "Fast focus" : value <= 10 ? "Balanced session" : "Deep practice";
              return <Link key={value} href={href} className="group rounded-2xl border border-primary/15 bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.05]"><div className="flex items-start justify-between"><span className="text-3xl font-medium tracking-tight">{value}</span><span className="text-primary/30 transition group-hover:text-primary">↗</span></div><p className="mt-6 text-sm font-medium">{label}</p><p className="mt-1 text-xs text-primary/40">{detail}</p></Link>;
            })}
          </div>
        </section>

        <section className="mt-16 grid gap-8 border-t border-primary/10 pt-8 md:grid-cols-[1fr_0.8fr]">
          <div><p className="text-[10px] uppercase tracking-[0.18em] text-primary/40">Why this format works</p><h2 className="mt-3 text-2xl font-medium">Small sessions. Better habits.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-primary/50">{copy.seo} Each session keeps the interface quiet so your attention stays on the next keystroke, not on unnecessary controls.</p></div>
          <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-5"><p className="text-xs uppercase tracking-[0.16em] text-primary/45">Every session includes</p><ul className="mt-4 space-y-3 text-sm text-primary/65"><li>Live WPM and accuracy</li><li>Mistake highlighting</li><li>Animated keyboard feedback</li><li>One-click reset and retry</li></ul></div>
        </section>
      </main>
    </div>
  );
}
