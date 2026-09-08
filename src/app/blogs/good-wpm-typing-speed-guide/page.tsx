import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FinalCta from "@/components/final-cta";

export const metadata: Metadata = {
  title: "What Is a Good WPM Typing Speed? Full Guide",
  description:
    "Curious what counts as a good WPM? See average, fast, and pro-level typing speeds, plus how to boost yours in weeks. Free WPM test included.",
};

const speedLevels = [
  ["Under 20", "Just starting out"],
  ["20-40", "Average; most people land here"],
  ["40-60", "Solid and faster than average"],
  ["60-80", "Fast and often job-ready"],
  ["80+", "Elite territory"],
];

const faqs = [
  ["What is WPM in typing?", "WPM stands for Words Per Minute. It measures how many words someone can accurately type within sixty seconds."],
  ["What counts as a good WPM typing speed?", "Anywhere from 40 to 60 WPM is considered solid. 60 to 80 is fast, and anything above 80 is close to professional-level typing."],
  ["What is the average WPM for a beginner?", "New typists usually average 20 to 30 WPM. Regular short practice sessions can move that number to 40 or higher within a few weeks."],
  ["How do you calculate WPM?", "Divide total characters typed by 5, then divide that result by the number of minutes taken."],
  ["What is the difference between WPM and CPM?", "WPM measures whole words per minute, while CPM measures individual characters. CPM is usually about five times higher than WPM."],
  ["What WPM do government or call center jobs require?", "Government and data entry roles often ask for 30 to 35 WPM minimum. Call centers and BPO roles commonly expect around 35 to 45 WPM."],
  ["How can I improve my WPM?", "Use short daily practice, learn touch typing, keep correct home-row placement, and focus on accuracy before speed."],
  ["Does accuracy matter more than raw speed?", "Yes. High speed with frequent mistakes often becomes slower after corrections. Aim for 95% accuracy or higher."],
];

export default function GoodWpmTypingSpeedGuide() {
  return (
    <div className="min-h-screen bg-black text-primary">
      <Navbar />
      <main>
        <header className="border-b border-primary/10 px-4 py-16 sm:px-6 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <Link href="/blogs" className="mb-10 inline-flex items-center gap-2 text-sm text-primary/55 transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to blogs
            </Link>
            <p className="mb-5 text-xs uppercase tracking-[0.18em] text-primary/50">WPM guide</p>
            <div className="max-w-5xl">
              <h1 className="text-balance text-4xl font-medium leading-[0.95] tracking-tighter sm:text-6xl md:text-8xl">
              What Is a Good WPM Typing Speed?
              </h1>
            </div>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-primary/60">
              Understand your score, compare it with realistic benchmarks, and learn how to improve without sacrificing accuracy.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs text-primary/45"><Clock3 className="h-4 w-4" /> 7 min read <span>/</span> Typing speed guide</div>
          </div>
        </header>

        <article className="px-4 py-20 sm:px-6 md:px-10 md:py-28">
          <div className="mx-auto max-w-4xl text-[17px] leading-[1.8] text-primary/70">
            <div
              role="img"
              aria-label="Typing speed guide workspace"
              className="mb-16 aspect-video w-full border border-primary/15 bg-cover bg-center bg-no-repeat sm:mb-20"
              style={{
                backgroundImage: "url('/blogs/good-wpm-typing-speed-guide.png')",
              }}
            />
            <p className="text-xl leading-relaxed text-primary/85">You just finished a typing test. The screen shows a number: 42, maybe 55, maybe 71. Now you are wondering if that is actually decent, or if you are behind everyone else who has ever touched a keyboard.</p>
            <p className="mt-8">The short answer: 40 WPM is average, 60 is good, and 80+ puts you ahead of most people who type for a living. But the full picture depends on who you are comparing yourself to.</p>

            <section className="mt-16 border-t border-primary/15 pt-10"><h2 className="text-3xl font-medium tracking-tighter text-primary sm:text-4xl">What WPM Actually Means</h2><p className="mt-6">WPM stands for Words Per Minute. It is how fast you type, measured over one minute, counting both speed and the words you actually got right.</p><div className="my-8 border border-primary/20 bg-primary/5 p-6 text-center text-xl text-primary sm:p-8 sm:text-2xl">WPM = (Characters typed ÷ 5) ÷ Minutes taken</div><p>Why divide by 5? That is roughly the average length of an English word, spaces included. Type 300 characters in a minute and your score comes out to 60 WPM. Most typing tests do this math automatically.</p></section>

            <section className="mt-16 border-t border-primary/15 pt-10"><h2 className="text-3xl font-medium tracking-tighter text-primary sm:text-4xl">So What Is a Good Score?</h2><p className="mt-6">Here is how typing speed breaks down in practice:</p><div className="mt-7 overflow-hidden border border-primary/15"><div className="grid grid-cols-2 border-b border-primary/15 bg-primary/5 px-4 py-3 text-xs uppercase tracking-[0.14em] text-primary/50 sm:px-6"><span>WPM</span><span>What it means</span></div>{speedLevels.map(([speed, meaning]) => <div key={speed} className="grid grid-cols-2 border-b border-primary/10 px-4 py-4 last:border-0 sm:px-6"><span className="font-medium text-primary">{speed}</span><span>{meaning}</span></div>)}</div><p className="mt-7">If your score sits above 40, you are already typing faster than the average adult. Cross 60 and you are in the range most companies describe as fast on a resume. Use these numbers as reference points, not reasons to compare yourself to strangers.</p></section>

            <section className="mt-16 border-t border-primary/15 pt-10"><h2 className="text-3xl font-medium tracking-tighter text-primary sm:text-4xl">If You Are Just Starting Out</h2><p className="mt-6">New typists usually land between 20 and 30 WPM. That is completely normal. With two or three weeks of short daily sessions, many people reach 40+ as their fingers learn where the keys are.</p></section>
            <section className="mt-16 border-t border-primary/15 pt-10"><h2 className="text-3xl font-medium tracking-tighter text-primary sm:text-4xl">How Speed Varies by What You Do</h2><p className="mt-6">Students generally average 30-40 WPM. Office workers often land around 40-65 WPM because they type throughout the day. Programmers commonly reach 50-70 WPM, while professional transcribers and freelance typists often clear 70-90 WPM.</p></section>
            <section className="mt-16 border-t border-primary/15 pt-10"><h2 className="text-3xl font-medium tracking-tighter text-primary sm:text-4xl">WPM Versus CPM</h2><p className="mt-6">WPM counts whole words. CPM, or Characters Per Minute, counts individual keystrokes. As a rough rule, CPM is about five times your WPM. Type 50 WPM and your CPM will be near 250.</p></section>
            <section className="mt-16 border-t border-primary/15 pt-10"><h2 className="text-3xl font-medium tracking-tighter text-primary sm:text-4xl">What Employers Actually Expect</h2><p className="mt-6">Data entry and government roles usually ask for 30-35 WPM. Call center and BPO jobs often expect 35-45 WPM. Transcription work can require 50-65 WPM, while admin and executive assistant roles generally expect 50 or above. Accuracy requirements commonly sit at 90% or higher.</p></section>
            <section className="mt-16 border-t border-primary/15 pt-10"><h2 className="text-3xl font-medium tracking-tighter text-primary sm:text-4xl">Speed Without Accuracy Is Pointless</h2><p className="mt-6">Typing fast while making constant mistakes is not truly fast typing. Every correction costs time. A person hitting 70 WPM with 80% accuracy may lose to someone at 55 WPM with 98% accuracy. Aim for 95% accuracy or better.</p></section>

            <section className="mt-16 border-t border-primary/15 pt-10"><h2 className="text-3xl font-medium tracking-tighter text-primary sm:text-4xl">Getting Faster Without Wasting Time</h2><ul className="mt-6 space-y-4">{["Learn touch typing and stop looking at your keys.", "Practice for fifteen minutes daily instead of one hour once a week.", "Slow down on purpose until accuracy becomes automatic.", "Keep your fingers on the home row: ASDF and JKL;.", "Test yourself regularly so your progress stays visible."].map((tip) => <li key={tip} className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" /><span>{tip}</span></li>)}</ul></section>
            <section className="mt-16 border-t border-primary/15 pt-10"><h2 className="text-3xl font-medium tracking-tighter text-primary sm:text-4xl">Where This Leaves You</h2><p className="mt-6">If you are at 25 WPM, that is fine. If you are at 65 and wondering whether to push further, it depends on what you need the speed for. Take a test, see where you land, and come back in three weeks. Your own progress is the benchmark that matters most.</p><Link href="/typing-test" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-medium text-black">Take a typing test <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></section>

            <section className="mt-20 border-t border-primary/15 pt-10"><h2 className="text-3xl font-medium tracking-tighter text-primary sm:text-4xl">Frequently Asked Questions</h2><div className="mt-8 space-y-8">{faqs.map(([question, answer]) => <div key={question}><h3 className="text-lg font-medium text-primary">{question}</h3><p className="mt-2">{answer}</p></div>)}</div></section>
          </div>
        </article>
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
