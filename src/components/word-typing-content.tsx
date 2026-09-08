import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModeHero from "@/components/mode-hero";
import ModeFaq from "@/components/mode-faq";
import ModeBenefits from "@/components/mode-benefits";
import ModeSessionPanel from "@/components/mode-session-panel";
import WordLessonPicker from "@/components/word-lesson-picker";
import { getWordHref } from "@/lib/typing-modes";

export type WordPageContent = {
  count: number;
  title: string;
  description: string;
  intro: string;
  goodFor: string[];
};

export const wordPageContent: Record<number, WordPageContent> = {
  25: {
    count: 25,
    title: "25 Word Typing Test - Quick Practice Passage | TypingTestSkill",
    description: "Take a 25 word typing test for a quick WPM and accuracy check. Ideal for beginners, kids, and short practice sessions.",
    intro: "A 25 word typing test is a simple way to check your typing without committing to a long session. It is useful when you have only a minute between tasks and want quick feedback on your speed, accuracy, and mistakes. Because the passage is short, beginners can focus on correct finger movement without feeling overwhelmed by a large block of text. Kids and new learners can also repeat the test several times while building confidence. This is a fixed-word typing test, not a timed test. Your goal is to complete all 25 words accurately rather than race against a countdown. Once the final word is typed, the test ends and your result is displayed.",
    goodFor: ["Beginners learning basic typing control", "Kids and young learners", "A quick check between other tasks"],
  },
  50: {
    count: 50,
    title: "50 Word Typing Test - Short Practice Passage | TypingTestSkill",
    description: "Take a 50 word typing test for a reliable short WPM and accuracy reading. Complete the passage and get instant results.",
    intro: "A 50 word typing test offers a short but complete typing session that gives you a fairer WPM reading than a very brief exercise. It is long enough for your hands to settle into the passage while still being easy to finish during a normal break. This makes it a practical length for building a daily typing habit. Unlike a timed typing test, the 50 word typing test does not ask you to type for a fixed number of seconds or minutes. Instead, you complete one fixed passage from beginning to end. The session ends after the last word, allowing you to review your speed, accuracy, and mistakes without the pressure of a countdown.",
    goodFor: ["Daily typing practice", "A balanced short WPM check", "Learners building consistency"],
  },
  75: {
    count: 75,
    title: "75 Word Typing Test - Rhythm Practice Passage | TypingTestSkill",
    description: "Complete a 75 word typing test to measure WPM, accuracy, and rhythm with a fixed passage that ends after the final word.",
    intro: "A 75 word typing test gives you enough text to move beyond the first few keystrokes and settle into a natural rhythm. It is still short enough to repeat several times in one sitting, making it useful for focused practice and gradual improvement. You can use the first attempt as a baseline, then repeat the passage while concentrating on smoother movement or fewer mistakes. This is a word-count challenge rather than a timed typing test. There is no countdown controlling the session. You simply type the fixed passage as accurately as possible, and the test ends when all 75 words are complete. Your final WPM and accuracy show how well you maintained control across the full passage.",
    goodFor: ["Settling into a steady typing rhythm", "Repeating several practice rounds", "Intermediate learners improving accuracy"],
  },
  100: {
    count: 100,
    title: "100 Word Typing Test - Standard Benchmark Passage | TypingTestSkill",
    description: "Take a 100 word typing test using a standard fixed passage to compare your WPM, accuracy, and results with confidence.",
    intro: "A 100 word typing test is one of the clearest fixed-length benchmarks for comparing typing performance. With a full hundred words, there is enough time for your initial pace to settle, making the result more useful than a very short burst. It is a strong choice when you want to compare your score with friends, track progress over time, or prepare for a typing requirement at work. In everyday conversation, a quick typing test often refers to a test around this length. This is not the same as a timed typing test: you are not racing a clock or typing for a set duration. You complete the entire 100-word passage, and the session ends automatically after the final word.",
    goodFor: ["Comparing scores with friends", "Tracking progress over time", "Job preparation and typing benchmarks"],
  },
};

function HowItWorks() {
  return (
    <section className="border-t border-primary/10 pt-8">
      <p className="text-[10px] uppercase tracking-[0.18em] text-primary/40">How it works</p>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {["Choose a word count", "Type the passage exactly as shown", "Finish the last word to end the test", "See your WPM and accuracy"].map((step, index) => (
          <li key={step} className="rounded-xl border border-primary/10 bg-white/[0.025] p-4">
            <span className="text-xs text-primary/35">0{index + 1}</span>
            <p className="mt-5 text-sm leading-6 text-primary/70">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function WordTypingHub() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-primary">
      <Navbar />
      <ModeHero
        mode="words"
        title="Choose your words. Find your flow."
        description="Complete a fixed passage, focus on accuracy, and see how your typing holds up without racing a countdown."
        primaryHref={getWordHref(50)}
        primaryLabel="Try 50 words"
        sessionPanel={<ModeSessionPanel mode="words" />}
      />
      <ModeBenefits mode="words" />
      <ModeFaq mode="words" />
      <Footer />
    </div>
  );
}

export function WordTypingPage({ content }: { content: WordPageContent }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-primary">
      <Navbar />
      <ModeHero
        mode="words"
        eyebrow={`${content.count} word passage`}
        title={`${content.count} words. One clear benchmark.`}
        description={content.description}
        primaryHref={getWordHref(content.count)}
        primaryLabel={`Start ${content.count}-word test`}
        sessionPanel={<WordLessonPicker wordCount={content.count} />}
      />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <section className="grid gap-8 border-t border-primary/10 pt-8 md:grid-cols-[0.8fr_1fr]">
          <div><p className="text-[10px] uppercase tracking-[0.18em] text-primary/40">Good for</p><h2 className="mt-3 text-2xl font-medium">A focused length for your goal.</h2></div>
          <ul className="space-y-3 text-sm leading-7 text-primary/65">{content.goodFor.map((item) => <li key={item} className="border-b border-primary/10 pb-3">{item}</li>)}</ul>
          </section>
          <section className="border-t border-primary/10 pt-8">
            <p className="text-[10px] uppercase tracking-[0.18em] text-primary/40">About this word typing test</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-[-0.04em]">A fixed finish line makes progress easier to compare.</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-primary/55">{content.intro}</p>
          </section>
          <HowItWorks />
        </div>
      </main>
      <ModeBenefits mode="words" />
      <ModeFaq mode="words" wordCount={content.count} />
      <Footer />
    </div>
  );
}

