import { Activity, Award, Gauge, Keyboard, Lightbulb, Sparkles, Target } from "lucide-react";

const features = [
  {
    icon: Keyboard,
    title: "Start instantly",
    description: "Open a challenge and begin typing without setup or sign-up friction.",
  },
  {
    icon: Gauge,
    title: "Live performance",
    description: "Watch WPM, accuracy, errors, and rhythm change as you type.",
  },
  {
    icon: Target,
    title: "Focused practice",
    description: "Choose 1, 2, 3, 5, 10, 15, or 30-minute sessions, plus 25 to 100-word sprints.",
  },
  {
    icon: Activity,
    title: "Progress that stays visible",
    description: "Turn daily sessions into a clear view of how your speed is growing.",
  },
  {
    icon: Award,
    title: "Verified milestones",
    description: "Earn a shareable certificate when you reach a speed milestone.",
  },
];

export function Features() {
  return (
    <section className="border-t border-primary/10 bg-black px-4 py-24 text-primary sm:px-6 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl space-y-12 md:space-y-16">
        <div className="grid items-end gap-8 border-b border-primary/15 pb-8 lg:grid-cols-[1fr_0.7fr]">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.18em] text-primary/50">Built for better typing</p>
            <h2 className="text-balance text-4xl font-medium leading-[0.95] tracking-tighter sm:text-5xl md:text-7xl">
              Know how you type. Learn how to improve.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-primary/55 lg:pb-1">
            Every session gives you more than a score. It shows what to work on next,
            so improvement feels personal instead of random.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          <article className="relative overflow-hidden border border-primary/30 bg-primary p-7 text-black sm:p-9 lg:col-span-2">
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border border-black/15" />
            <div className="absolute -right-6 -top-10 h-36 w-36 rounded-full border border-black/15" />
            <div className="relative flex h-full min-h-72 flex-col justify-between gap-16">
              <div className="flex items-start justify-between gap-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-primary">
                  <Sparkles className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <span className="border border-black/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-black/55">
                  Personal guidance
                </span>
              </div>
              <div className="max-w-2xl">
                <h3 className="text-3xl font-medium leading-tight tracking-tighter sm:text-4xl">
                  AI tips that understand your typing.
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/65 sm:text-base">
                  After each test, AI reads your speed, accuracy, error patterns, and rhythm
                  to tell you exactly what to practice next. Better posture, fewer pauses,
                  cleaner reach, or a more focused drill, your guidance is built around you.
                </p>
              </div>
            </div>
          </article>

          <article className="border border-primary/15 bg-white/2 p-7 transition-colors hover:border-primary/40 hover:bg-white/4 sm:p-9">
            <div className="flex h-full min-h-72 flex-col justify-between gap-12">
              <div className="flex h-10 w-10 items-center justify-center border border-primary/25 text-primary">
                  <Lightbulb className="h-4 w-4" strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="text-xl font-medium tracking-[-0.02em]">Your next best move</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary/55">
                  No generic advice. Get a practical tip and a challenge matched to the way you just typed.
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="grid divide-y divide-primary/15 border border-primary/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="border-primary/15 p-6 transition-colors hover:bg-white/4 sm:p-7 lg:nth-[5n+1]:border-r lg:nth-[5n+2]:border-r lg:nth-[5n+3]:border-r lg:nth-[5n+4]:border-r"
              >
                <div className="mb-8 flex h-9 w-9 items-center justify-center border border-primary/20 text-primary">
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </div>
                <h3 className="text-base font-medium tracking-[-0.02em]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary/55">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
