import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModeHero from "@/components/mode-hero";
import ModeFaq from "@/components/mode-faq";
import ModeBenefits from "@/components/mode-benefits";
import ModeSessionPanel from "@/components/mode-session-panel";
import { getDurationHref, modeCopy } from "@/lib/typing-modes";

type TypingModeHubProps = { mode: "practice" };

export default function TypingModeHub({ mode }: TypingModeHubProps) {
  const copy = modeCopy[mode];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-primary">
      <Navbar />
      <ModeHero
        mode={mode}
        title="Practice with purpose. Type with ease."
        description={copy.description}
        primaryHref={getDurationHref(mode, 5)}
        primaryLabel="Start 5 minute practice"
        sessionPanel={<ModeSessionPanel mode="practice" />}
      />
      <ModeBenefits mode={mode} />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">

        <section className="mt-16 grid gap-8 border-t border-primary/10 pt-8 md:grid-cols-[1fr_0.8fr]">
          <div><p className="text-[10px] uppercase tracking-[0.18em] text-primary/40">Why this format works</p><h2 className="mt-3 text-2xl font-medium">Small sessions. Better habits.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-primary/50">{copy.seo} Each session keeps the interface quiet so your attention stays on the next keystroke, not on unnecessary controls.</p></div>
          <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-5"><p className="text-xs uppercase tracking-[0.16em] text-primary/45">Every session includes</p><ul className="mt-4 space-y-3 text-sm text-primary/65"><li>Live WPM and accuracy</li><li>Mistake highlighting</li><li>Animated keyboard feedback</li><li>One-click reset and retry</li></ul></div>
        </section>
      </main>
      <ModeFaq mode={mode} />
      <Footer />
    </div>
  );
}
