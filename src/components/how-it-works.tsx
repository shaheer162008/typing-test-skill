"use client";

import { motion } from "framer-motion";
import { Award, ArrowRight, Gauge, LineChart, Play } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Take a test",
    description: "Choose a timed or word-based challenge and start typing immediately. No setup, no distractions.",
    icon: Play,
  },
  {
    number: "02",
    title: "See your rhythm",
    description: "Get instant feedback on your WPM, accuracy, errors, and the moments that slow you down.",
    icon: Gauge,
  },
  {
    number: "03",
    title: "Keep improving",
    description: "Use your progress to choose the next challenge, build consistency, and reach your personal best.",
    icon: LineChart,
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-primary/10 bg-black px-4 py-24 text-primary sm:px-6 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-5 text-xs uppercase tracking-[0.18em] text-primary/50">
              How it works
            </p>
            <h2 className="max-w-lg text-4xl font-medium leading-[0.95] tracking-tighter sm:text-5xl md:text-7xl">
              Small sessions. Real progress.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary/55">
              Your speed grows through a simple loop: show up, pay attention, and come
              back a little sharper than before.
            </p>
            <a
              href="/typing-test"
              className="group mt-8 inline-flex items-center gap-3 border-b border-primary/40 pb-2 text-sm font-medium transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Start your first test
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          <div>
            <ol className="grid gap-3 md:grid-cols-3 md:gap-4" aria-label="Typing improvement steps">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.li
                    key={step.number}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex min-h-64 flex-col border border-primary/15 bg-white/2 p-5 transition-colors hover:border-primary/40 hover:bg-white/4 sm:p-7"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-medium tracking-[0.16em] text-primary/40">
                        {step.number}
                      </span>
                      <span className="flex h-12 w-12 items-center justify-center border border-primary/20 bg-black text-primary transition-colors group-hover:border-primary/60 sm:h-14 sm:w-14">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                      </span>
                    </div>
                    <div className="mt-auto pt-12">
                      <h3 className="text-2xl font-medium tracking-[-0.04em]">{step.title}</h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary/55">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col items-start justify-between gap-6 border border-primary/15 bg-primary p-6 text-black sm:flex-row sm:items-center sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-primary">
              <Award className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/55">
                Make it official
              </p>
              <h3 className="mt-1 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                Earn your typing certificate.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-black/65">
                Reach your milestone, prove your progress, and share the result with confidence.
              </p>
            </div>
          </div>
          <a
            href="/certificates"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-black px-5 py-3 text-sm font-medium text-primary transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            Get your certificate
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
