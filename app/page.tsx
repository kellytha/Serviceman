import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import ArtisanCTA from "./components/ArtisanCTA";
import Testimonials from "./components/Testimonials";
import ServicesGrid from "./components/ServicesGrid";
import SkilledArtisanCTA from "./components/SkilledArtisanCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <ServicesGrid />
      <ArtisanCTA />
      <Testimonials />
      <SkilledArtisanCTA />
      <Footer />
    </div>
  );
}
