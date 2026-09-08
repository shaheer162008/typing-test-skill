import Link from "next/link";
import { ArrowLeft, ShieldCheck, LockKeyhole, FileText } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Privacy Policy | Typing Test Skill",
  description:
    "Read Typing Test Skill's privacy policy to understand how we collect, use, and protect your information while using our typing tests.",
};

const sections = [
  {
    title: "1. Information We Collect",
    text:
      "We collect information you provide directly, such as your name and email when you create an account, contact us, or subscribe to updates. We also collect technical information automatically, including your IP address, device type, browser details, pages visited, and the time spent on our site. Typing test data such as WPM, accuracy, and practice history may also be stored when relevant to your account or progress tracking.",
  },
  {
    title: "2. How We Use Your Information",
    text:
      "We use your information to operate and improve Typing Test Skill, including to provide typing tests, show progress over time, respond to support requests, deliver account-related features, monitor performance, and prevent misuse or abuse. We may also use account information to send useful updates if you have opted in.",
  },
  {
    title: "3. Cookies and Tracking Technologies",
    text:
      "We use cookies and similar technologies to make the website work properly, remember your preferences, and understand usage patterns. Some cookies are required for essential features, while others help us improve performance and analyze how visitors interact with the site. For more detail, please review our Cookie Policy.",
  },
  {
    title: "4. Sharing Your Information",
    text:
      "We do not sell your personal information. We may share limited information with trusted service providers that help us operate the platform, with legal authorities when required by law, or as part of a business transfer such as a merger, acquisition, or sale of assets.",
  },
  {
    title: "5. Data Retention",
    text:
      "We retain your information for as long as needed to provide our services and to comply with legal obligations. If you delete your account or request removal of your data, we will process that request in line with our business needs and applicable law.",
  },
  {
    title: "6. Your Rights and Choices",
    text:
      "Depending on your location, you may have the right to access the personal information we hold about you, request corrections, request deletion, or opt out of marketing communications. To exercise these rights, please contact us through our Contact page.",
  },
  {
    title: "7. Security",
    text:
      "We use reasonable technical and organizational measures to protect personal information from unauthorized access, misuse, and loss. However, no method of transmitting data over the internet is completely secure, so we cannot guarantee absolute security.",
  },
  {
    title: "8. Children and Minors",
    text:
      "Typing Test Skill is not intended for children under the age of 13, and we do not knowingly collect personal information from children under that age. If you believe a child has provided us with personal information, please contact us so we can take appropriate action.",
  },
  {
    title: "9. Changes to This Policy",
    text:
      "We may update this Privacy Policy from time to time. If changes are made, we will update the 'Last Updated' date at the top of this page and post the revised policy here. Continued use of the site after the changes are posted means you accept the revised policy.",
  },
];

export default function PrivacyPolicyPage() {
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
              <FileText className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.18em]">Legal</span>
            </div>
            <h1 className="text-4xl font-medium tracking-tighter sm:text-6xl md:text-7xl">Privacy Policy</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-primary/65">
              Last Updated: September 8, 2026
            </p>
          </div>
        </header>

        <article className="px-4 py-20 sm:px-6 md:px-10">
          <div className="mx-auto max-w-4xl space-y-10 text-base leading-8 text-primary/70">
            <p>
              Typing Test Skill respects your privacy and is committed to protecting the information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have.
            </p>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-primary/15 bg-white/[0.02] p-5">
                <ShieldCheck className="mb-4 h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-primary">Privacy focused</h2>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-white/[0.02] p-5">
                <LockKeyhole className="mb-4 h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-primary">Secure handling</h2>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-white/[0.02] p-5">
                <FileText className="mb-4 h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium text-primary">Transparent rules</h2>
              </div>
            </div>

            {sections.map((section) => (
              <section key={section.title} className="border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-medium tracking-tight text-primary sm:text-3xl">{section.title}</h2>
                <p className="mt-4">{section.text}</p>
              </section>
            ))}

            <section className="border-t border-primary/10 pt-8">
              <h2 className="text-2xl font-medium tracking-tight text-primary sm:text-3xl">10. Contact Us</h2>
              <p className="mt-4">
                If you have questions about this Privacy Policy or how your information is handled, please contact us through our <Link href="/contact" className="font-medium text-primary underline underline-offset-4">Contact page</Link>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
