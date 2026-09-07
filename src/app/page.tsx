import { PrismaHero } from "@/components/hero";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SkillPaths from "@/components/skill-paths";
import HowItWorks from "@/components/how-it-works";
import LeaderboardPreview from "@/components/leaderboard-preview";
import CertificateShowcase from "@/components/certificate-showcase";
import { Features } from "@/components/ui/features-4";
import FaqSection from "@/components/faq-section";
import FinalCta from "@/components/final-cta";

export default function Home() {
  return (
    <div>
      <Navbar />
      <PrismaHero />
      <Features />
      <SkillPaths />
      <HowItWorks />
      <LeaderboardPreview />
      <CertificateShowcase />
      <FaqSection />
      <FinalCta />
      <Footer />
    </div>
  );
}
