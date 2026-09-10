"use client";

import Link from "next/link";
import { ArrowRight, HeartHandshake, Mail, ShieldCheck, Sparkles } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/ui/hero-section-enterprise-ready-landing-page-hero-with-dual-ctas";

const founderCards = [
  {
    name: "Waseem Jaffar",
    role: "Founder · Strategy & Platform Development",
    description:
      "TypingTestSkill began with a simple vision — to make typing practice more useful, accessible, and rewarding. Today, that vision is being brought to life with a dedicated team, focused on creating better tools and a better experience for every user.",
    quote: "Building a platform where practice turns into progress.",
    link: "https://www.linkedin.com/in/waseemjafar91",
  },
  {
    name: "Muhammad Shaheer",
    role: "Developer & Builder",
    description:
      "Muhammad designed and developed the platform, turning the idea into a practical experience that helps people improve typing speed, accuracy, and confidence through a clean and motivating interface.",
    link: "https://www.linkedin.com/in/muhammad-shaheer-yousuf/",
  },
];

const values = [
  {
    icon: Sparkles,
    title: "Built for progress",
    text: "We created Typing Test Skill to make practice feel simple, encouraging, and consistent for people who want to improve at their own pace.",
  },
  {
    icon: HeartHandshake,
    title: "Community first",
    text: "This platform is designed as a supportive space for learners, job seekers, students, and professionals who want to become more efficient and confident.",
  },
  {
    icon: ShieldCheck,
    title: "Accessibility and trust",
    text: "We believe great tools should feel clear, honest, and useful. That is why we focus on making the experience approachable and helpful for everyone.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-primary">
      <Navbar />
      <main>
        <HeroSection
          title={
            <>
              About <span className="text-primary/55">Typing Test Skill</span>
            </>
          }
          subtitle="Typing Test Skill was built to help people type better, learn faster, and feel more confident in the way they work and study every day."
          primaryCta={{
            label: "Explore articles",
            onClick: () => window.location.assign("/blogs"),
          }}
          secondaryCta={{
            label: "Contact us",
            onClick: () => window.location.assign("/contact"),
          }}
        />

        <section className="px-4 py-20 sm:px-6 md:px-10 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-primary/50">Our story</p>
                <h2 className="text-3xl font-medium tracking-tighter sm:text-5xl">
                  A simple tool with a bigger purpose.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary/65 sm:text-lg">
                  We built Typing Test Skill for people who want to improve their typing without pressure, fluff, or confusion. Whether you are preparing for a job interview, learning touch typing, trying to be faster at work, or simply building a useful daily habit, this platform is meant to support that journey.
                </p>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary/65 sm:text-lg">
                  This project was created with a community-first mindset. We want users to feel supported, encouraged, and motivated to keep improving. Small steps matter, and every practice session adds up.
                </p>
              </div>

              <div className="rounded-3xl border border-primary/15 bg-white/[0.02] p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-primary/45">Mission</p>
                <p className="mt-5 text-xl leading-relaxed text-primary">
                  To make typing improvement more accessible, practical, and empowering for everyone.
                </p>
                <div className="mt-8 space-y-4 text-sm leading-relaxed text-primary/60">
                  <p>• Better typing habits</p>
                  <p>• More confidence at work and study</p>
                  <p>• Real progress through daily practice</p>
                  <p>• A supportive online learning community</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-b border-primary/10 bg-primary/[0.02] px-4 py-20 sm:px-6 md:px-10 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-primary/50">Founders</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tighter sm:text-5xl">The people behind the platform</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {founderCards.map((person) => (
                <div key={person.name} className="rounded-3xl border border-primary/15 bg-black p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-primary/5 text-lg font-semibold text-primary">
                    {person.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight text-primary">{person.name}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.14em] text-primary/45">{person.role}</p>
                  <p className="mt-5 text-base leading-relaxed text-primary/65">{person.description}</p>

                  {"quote" in person && person.quote ? (
                    <blockquote className="mt-5 border-l border-primary/25 pl-4 text-sm italic leading-relaxed text-primary/70">
                      “{person.quote}”
                    </blockquote>
                  ) : null}

                  {person.link ? (
                    <a
                      href={person.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      LinkedIn profile
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 md:px-10 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-primary/50">Why we exist</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tighter sm:text-5xl">A community for real improvement</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {values.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-3xl border border-primary/15 bg-white/[0.02] p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-primary/5 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-medium text-primary">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-primary/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-primary/10 px-4 py-20 sm:px-6 md:px-10 lg:py-28">
          <div className="mx-auto max-w-4xl rounded-3xl border border-primary/15 bg-primary/[0.02] p-8 text-center sm:p-12">
            <p className="text-xs uppercase tracking-[0.18em] text-primary/50">Support the journey</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tighter sm:text-5xl">We are building this for the community.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary/65 sm:text-lg">
              We sincerely appreciate every user, learner, and supporter who spends time using Typing Test Skill. Your feedback, encouragement, and participation help us improve the platform and keep this project meaningful.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-transform hover:translate-y-[-1px]"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:info@typingtestskill.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
              >
                <Mail className="h-4 w-4" />
                info@typingtestskill.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
