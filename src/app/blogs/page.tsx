import BlogHero from "@/components/blog-hero";
import BlogListing from "@/components/blog-listing";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq-section";
import FinalCta from "@/components/final-cta";

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-black text-primary">
      <Navbar />
      <main>
        <BlogHero />
        <BlogListing />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
