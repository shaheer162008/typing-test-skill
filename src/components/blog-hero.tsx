"use client";

import HeroSection from "@/components/ui/hero-section-enterprise-ready-landing-page-hero-with-dual-ctas";

export default function BlogHero() {
  return (
    <HeroSection
      title={
        <>
          Ideas to help you type <span className="text-primary/55">with intent.</span>
        </>
      }
      subtitle="Explore practical guides on typing speed, accuracy, practice habits, WPM goals, and the small adjustments that make every session better."
      primaryCta={{
        label: "Explore articles",
        onClick: () => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" }),
      }}
      secondaryCta={{
        label: "Take a typing test",
        onClick: () => window.location.assign("/typing-test"),
      }}
    />
  );
}
