import Link from "next/link";
import { ArrowLeft, FileCheck2, Scale, ShieldAlert } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Terms of Service | Typing Test Skill",
  description:
    "Review the Terms of Service for Typing Test Skill, including account rules, platform responsibilities, and legal disclaimers.",
};

const sections = [
  {
    title: "1. Using Our Services",
    text:
      "You must use Typing Test Skill in a lawful and responsible manner. You agree not to manipulate typing results, use automated tools or bots, attempt unauthorized access, interfere with site operations, or use the platform for unlawful or fraudulent activities.",
  },
  {
    title: "2. Accounts",
    text:
      "If you create an account, you are responsible for maintaining the confidentiality of your login details and for all activity that occurs under your account. Please notify us immediately if you suspect unauthorized use.",
  },
  {
    title: "3. Typing Tests, Leaderboards, and Certificates",
    text:
      "Our typing tests measure performance based on the text presented during each session. Leaderboard rankings reflect submitted results and may be reset or adjusted at any time. Certificates are intended for personal learning and practice use and reflect performance on our platform only.",
  },
  {
    title: "4. Intellectual Property",
    text:
      "All content on Typing Test Skill, including text, graphics, logos, and software, is owned by us or our licensors and protected by applicable intellectual property laws. You may not copy, modify, distribute, or reproduce content without prior written permission, except for personal non-commercial use.",
  },
  {
    title: "5. User Content",
    text:
      "If you submit content to the platform, such as profile information or feedback, you grant us a non-exclusive, royalty-free license to use, display, and process that content for operating and improving the website and services.",
  },
  {
    title: "6. Disclaimers",
    text:
      "Typing Test Skill is provided 'as is' and 'as available' without warranties of any kind, either express or implied. We do not guarantee uninterrupted performance, error-free operation, or complete security. Typing results and certificates are intended for personal skill tracking and practice, not as formal third-party certifications unless explicitly stated otherwise.",
  },
  {
    title: "7. Limitation of Liability",
    text:
      "To the fullest extent permitted by law, Typing Test Skill and its owners shall not be liable for indirect, incidental, or consequential damages arising from your use of or inability to use the platform.",
  },
  {
    title: "8. Termination",
    text:
      "We reserve the right to suspend or terminate access to our services at any time if we believe you have violated these Terms or engaged in conduct that harms the platform or other users.",
  },
  {
    title: "9. Changes to These Terms",
    text:
      "We may revise these Terms from time to time. Updates will be posted on this page with a revised 'Last Updated' date. Continued use of the platform after changes are posted constitutes acceptance of the updated Terms.",
  },
  {
    title: "10. Governing Law",
    text:
      "These Terms shall be governed by and interpreted in accordance with the laws applicable in the jurisdiction where Typing Test Skill operates, without regard to conflict of law principles.",
  },
];

export default function TermsOfServicePage() {
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
              <FileCheck2 className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.18em]">Terms</span>
            </div>
            <h1 className="text-4xl font-medium tracking-tighter sm:text-6xl md:text-7xl">Terms of Service</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-primary/65">
              Last Updated: September 8, 2026
            </p>
          </div>
        </header>

        <article className="px-4 py-20 sm:px-6 md:px-10">
          <div className="mx-auto max-w-4xl space-y-10 text-base leading-8 text-primary/70">
            <p>
              Welcome to Typing Test Skill. These Terms of Service govern your access to and use of our website, typing tests, leaderboards, and certificates. By using our site, you agree to these Terms. If you do not agree, please do not use our services.
            </p>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-primary/15 bg-white/[0.02] p-5">
                <Scale className="mb-4 h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-primary">Fair use</h2>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-white/[0.02] p-5">
                <ShieldAlert className="mb-4 h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-primary">Account responsibility</h2>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-white/[0.02] p-5">
                <FileCheck2 className="mb-4 h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-primary">Platform rules</h2>
              </div>
            </div>

            {sections.map((section) => (
              <section key={section.title} className="border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-medium tracking-tight text-primary sm:text-3xl">{section.title}</h2>
                <p className="mt-4">{section.text}</p>
              </section>
            ))}

            <section className="border-t border-primary/10 pt-8">
              <h2 className="text-2xl font-medium tracking-tight text-primary sm:text-3xl">11. Contact Us</h2>
              <p className="mt-4">
                If you have any questions about these Terms, please reach out through our <Link href="/contact" className="font-medium text-primary underline underline-offset-4">Contact page</Link>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
