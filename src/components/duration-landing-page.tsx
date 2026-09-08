import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModeHero from "@/components/mode-hero";
import ModeFaq from "@/components/mode-faq";
import { getDurationHref, type TypingMode } from "@/lib/typing-modes";
import type { DurationContent } from "@/lib/typing-page-content";

type DurationLandingPageProps = { mode: Exclude<TypingMode, "words">; duration: number; content: DurationContent };

export default function DurationLandingPage({ mode, duration, content }: DurationLandingPageProps) {
  const isPractice = mode === "practice";
  const runHref = `/test?mode=${mode}&duration=${duration}`;
  const siblingLinks = [1, 2, 3, 5, 10, 15, 20, 30].map((value) => ({ value, href: getDurationHref(mode, value) }));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-primary">
      <Navbar />
      <ModeHero
        mode={mode}
        eyebrow={isPractice ? `${duration} minute practice` : `${duration} minute test`}
        title={content.heading}
        description={content.intro}
        primaryHref={runHref}
        primaryLabel={isPractice ? "Start practice" : "Start test"}
      />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-2xl border border-primary/15 bg-white/[0.025] p-5 sm:p-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-primary/40">Who this is for</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-primary/70">
              {content.audience.map((item) => <li key={item} className="border-b border-primary/10 pb-3">{item}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/15 bg-primary/[0.06] p-5 sm:p-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-primary/45">Ready to begin?</p>
            <p className="mt-3 text-sm leading-6 text-primary/60">{isPractice ? "Practise at your own pace and restart whenever you want." : "Start the timer when you are ready and get your result instantly."}</p>
            <Link href={runHref} className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-primary/85">Start {isPractice ? "practice" : "test"}</Link>
          </div>
        </section>

        <section className="mt-12 border-t border-primary/10 pt-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary/40">How it works</p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(isPractice ? ["Choose this duration", "Type the passage shown", "Restart anytime without pressure", "Track improvement over sessions"] : ["Start the test", "Type the passage shown", "Let the timer count down", "See WPM and accuracy instantly"]).map((step, index) => <li key={step} className="rounded-xl border border-primary/10 bg-white/[0.025] p-4"><span className="text-xs text-primary/35">0{index + 1}</span><p className="mt-5 text-sm leading-6 text-primary/70">{step}</p></li>)}
          </ol>
        </section>

        <section className="mt-12 border-t border-primary/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] uppercase tracking-[0.18em] text-primary/40">More sessions</p><h2 className="mt-2 text-2xl font-medium">Choose another duration</h2></div><Link href={isPractice ? "/typing-practice" : "/typing-test"} className="text-sm text-primary/55 underline decoration-primary/25 underline-offset-4">View all options</Link></div>
          <div className="mt-5 flex flex-wrap gap-2">{siblingLinks.map(({ value, href }) => <Link key={value} href={href} className={`rounded-lg border px-3 py-2 text-xs transition hover:border-primary/40 ${value === duration ? "border-primary/40 bg-primary/[0.08] text-primary" : "border-primary/15 text-primary/55"}`}>{value} min</Link>)}</div>
        </section>
      </main>
      <ModeFaq mode={mode} duration={duration} />
      <Footer />
    </div>
  );
}
