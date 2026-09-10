"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ArrowRight, Mail, MapPin, MessageSquareText } from "lucide-react";
import { FormEvent, useState } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/ui/hero-section-enterprise-ready-landing-page-hero-with-dual-ctas";
import { db } from "@/lib/firebase-client";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      await addDoc(collection(db, "contactMessages"), { ...form, seen: false, createdAt: serverTimestamp() });
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("Message sent. The team will review it from the admin inbox.");
    } catch {
      setStatus("Message could not be sent. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-primary">
      <Navbar />
      <main>
        <HeroSection
          title={
            <>
              Contact <span className="text-primary/55">Typing Test Skill</span>
            </>
          }
          subtitle="We value your feedback, questions, and support. Reach out anytime and we will get back to you as soon as possible."
          primaryCta={{
            label: "Email us",
            onClick: () => window.location.assign("mailto:info@typingtestskill.com"),
          }}
          secondaryCta={{
            label: "Read our blog",
            onClick: () => window.location.assign("/blogs"),
          }}
        />

        <section className="px-4 py-20 sm:px-6 md:px-10 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5 rounded-3xl border border-primary/15 bg-white/[0.02] p-7 sm:p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-primary/50">Get in touch</p>
                <h2 className="mt-4 text-3xl font-medium tracking-tighter sm:text-4xl">We would love to hear from you.</h2>
              </div>

              <div className="space-y-5 pt-3">
                <div className="flex min-w-0 items-start gap-4 rounded-2xl border border-primary/10 bg-black p-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm uppercase tracking-[0.14em] text-primary/45">Email</p>
                    <a href="mailto:info@typingtestskill.com" className="mt-2 inline-block text-base font-medium text-primary hover:text-primary/80">
                      info@typingtestskill.com
                    </a>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-4 rounded-2xl border border-primary/10 bg-black p-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm uppercase tracking-[0.14em] text-primary/45">Community</p>
                    <p className="mt-2 text-base text-primary/70">Built for learners, professionals, and typing enthusiasts around the world.</p>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-4 rounded-2xl border border-primary/10 bg-black p-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                    <MessageSquareText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm uppercase tracking-[0.14em] text-primary/45">Support</p>
                    <p className="mt-2 text-base text-primary/70">We welcome suggestions, partnership ideas, and community feedback from everyone.</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="rounded-3xl border border-primary/15 bg-white/[0.02] p-7 sm:p-8" onSubmit={submitContact}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm text-primary/70 sm:col-span-1">
                  <span className="mb-2 block">Full name</span>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    required
                    className="w-full rounded-xl border border-primary/15 bg-black px-4 py-3 text-primary placeholder:text-primary/35 focus:border-primary/40 focus:outline-none"
                  />
                </label>

                <label className="block text-sm text-primary/70 sm:col-span-1">
                  <span className="mb-2 block">Email</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    required
                    className="w-full rounded-xl border border-primary/15 bg-black px-4 py-3 text-primary placeholder:text-primary/35 focus:border-primary/40 focus:outline-none"
                  />
                </label>

                <label className="block text-sm text-primary/70 sm:col-span-2">
                  <span className="mb-2 block">Subject</span>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(event) => setForm({ ...form, subject: event.target.value })}
                    required
                    className="w-full rounded-xl border border-primary/15 bg-black px-4 py-3 text-primary placeholder:text-primary/35 focus:border-primary/40 focus:outline-none"
                  />
                </label>

                <label className="block text-sm text-primary/70 sm:col-span-2">
                  <span className="mb-2 block">Message</span>
                  <textarea
                    rows={6}
                    placeholder="Tell us more about your query or feedback..."
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    required
                    className="w-full rounded-xl border border-primary/15 bg-black px-4 py-3 text-primary placeholder:text-primary/35 focus:border-primary/40 focus:outline-none"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-transform hover:translate-y-[-1px]"
              >
                {busy ? "Sending…" : "Send message"}
                <ArrowRight className="h-4 w-4" />
              </button>
              {status && <p className="mt-4 text-sm text-primary/65" role="status">{status}</p>}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
