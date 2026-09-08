import Link from "next/link";
import { ArrowLeft, Cookie, Settings2, ShieldCheck } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Cookie Policy | Typing Test Skill",
  description:
    "Learn how Typing Test Skill uses cookies and similar technologies, and how you can manage your cookie preferences.",
};

const sections = [
  {
    title: "1. What Are Cookies?",
    text:
      "Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit and are widely used to improve website functionality and user experience.",
  },
  {
    title: "2. How We Use Cookies",
    text:
      "We use cookies for essential website functionality, analytics, and user preferences. Essential cookies help keep the site working properly, while analytics cookies help us understand how users interact with the site so we can improve performance and content. Functionality cookies remember settings such as selected test preferences to make your experience more convenient.",
  },
  {
    title: "3. Third-Party Cookies",
    text:
      "Some cookies may be placed by third-party services we use, including analytics and other operational tools. These third parties may collect information about your online activity across different websites over time, subject to their own privacy policies.",
  },
  {
    title: "4. Managing Your Cookie Preferences",
    text:
      "You can control or delete cookies through your browser settings at any time. Most browsers let you view stored cookies, block or delete them, or delete cookies when the browser closes. Please note that blocking or deleting cookies may affect the functionality of the website, including saved preferences or account login status.",
  },
  {
    title: "5. Changes to This Cookie Policy",
    text:
      "We may update this Cookie Policy periodically to reflect operational, legal, or regulatory changes. Any updates will be posted on this page with a revised 'Last Updated' date.",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-black text-primary">
      <Navbar />
      <main>
        <header className="border-b border-primary/10 px-4 py-16 sm:px-6 md:px-10 md:py-24">
          <div className="mx-auto max-w-5xl">
            <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-primary/55 transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="mb-6 flex items-center gap-3 text-primary/60">
              <Cookie className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.18em]">Cookies</span>
            </div>
            <h1 className="text-4xl font-medium tracking-tighter sm:text-6xl md:text-7xl">Cookie Policy</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-primary/65">
              Last Updated: September 8, 2026
            </p>
          </div>
        </header>

        <article className="px-4 py-20 sm:px-6 md:px-10">
          <div className="mx-auto max-w-4xl space-y-10 text-base leading-8 text-primary/70">
            <p>
              This Cookie Policy explains how Typing Test Skill uses cookies and similar tracking technologies when you visit our website, and how you can manage them.
            </p>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-primary/15 bg-white/[0.02] p-5">
                <Cookie className="mb-4 h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-primary">Essential cookies</h2>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-white/[0.02] p-5">
                <Settings2 className="mb-4 h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-primary">Preferences & analytics</h2>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-white/[0.02] p-5">
                <ShieldCheck className="mb-4 h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-primary">User control</h2>
              </div>
            </div>

            {sections.map((section) => (
              <section key={section.title} className="border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-medium tracking-tight text-primary sm:text-3xl">{section.title}</h2>
                <p className="mt-4">{section.text}</p>
              </section>
            ))}

            <section className="border-t border-primary/10 pt-8">
              <h2 className="text-2xl font-medium tracking-tight text-primary sm:text-3xl">6. Contact Us</h2>
              <p className="mt-4">
                If you have questions about our use of cookies, please reach out through our <Link href="/contact" className="font-medium text-primary underline underline-offset-4">Contact page</Link>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
