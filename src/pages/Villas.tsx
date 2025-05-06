
import { useEffect } from "react";
import { VillaCard } from "@/components/ui/villa-card";
import { villas } from "@/data/villas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";
import { Link } from "react-router-dom";
import HeroSection from "@/components/layout/HeroSection";

const heroBackgroundImage = "/lovable-uploads/76eea9bd-1770-4907-b2b1-7b2c55ff47d1.png";

const Villas = () => {
  // Add effect to scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle link click to scroll to top
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#07091A]">
      <Navbar />
      
      <HeroSection
        title="Arteon Villas"
        subtitle="Your Perfect Halkidiki Getaway"
        height="h-[70vh]"
        backgroundImage={heroBackgroundImage}
      >
        <div className="flex flex-wrap gap-6 justify-center">
          <Link to="/booking" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white px-8 py-3 rounded-md text-lg font-medium transition-all" onClick={handleLinkClick}>
            Book Now
          </Link>
          <Link to="/gallery" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white px-8 py-3 rounded-md text-lg font-medium transition-all" onClick={handleLinkClick}>
            View Gallery
          </Link>
        </div>
      </HeroSection>
      
      <div className="text-white py-20 px-4 bg-[#07091A]">
        <div className="container mx-auto bg-[#07091A]">
          <SectionHeader 
            title="Discover Your Perfect Villa" 
            subtitle="Each villa offers a unique blend of contemporary design, comfort, and breathtaking sea views" 
            className="mb-16" 
            titleClassName="text-white" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {villas.map(villa => <VillaCard key={villa.id} villa={villa} />)}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Villas;
