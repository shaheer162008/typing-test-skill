import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { footerLinks } from "@/lib/constants";

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { name: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { name: "Email", href: "mailto:info@typingtestskill.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 pb-10 pt-20 text-primary lg:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          {/* Brand Section */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="Typing Test Skill Home">
              <Image src="/icon.png" alt="" width={50} height={50} className="h-auto w-[50px]" aria-hidden="true" />
              <span className="text-xl font-bold tracking-tight text-primary">Typing Test Skill</span>
            </Link>

            <p className="mb-6 text-[15px] leading-relaxed text-primary/60">
              Free online typing test. Improve your speed, earn certificates, and track progress.
            </p>

            <div className="flex flex-col items-start gap-4">
              {/* Social Media Icons */}
              <div className="flex items-center gap-3 mt-1">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all hover:bg-white/10 group"
                  >
                    <social.icon className="h-4.5 w-4.5 opacity-60 transition-all group-hover:opacity-100" strokeWidth={1.7} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16 w-full lg:w-auto" aria-label="Footer navigation">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="mb-5 text-[16px] font-semibold text-primary">{section.title}</h3>
                <ul className="flex flex-col gap-3.5" role="list">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-[14px] font-medium text-primary/55 transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-4 md:flex-row">
          {/* Left side */}
          <p className="text-[14px] text-primary/45">
            &copy; 2026 Typing Test Skill. All rights reserved.
          </p>

          {/* Right side */}
          <p className="text-[14px] text-primary/45">
            Developed by{" "}
            <a
              href="https://muhammad-shaheer.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary transition-all hover:underline"
            >
              Muhammad Shaheer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
