import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ArticleSection from "@/components/sections/ArticleSection";
import HeroSection from "@/components/sections/HeroSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
