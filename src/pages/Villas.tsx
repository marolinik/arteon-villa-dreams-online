
import { VillaCard } from "@/components/ui/villa-card";
import { villas } from "@/data/villas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";
import { Link } from "react-router-dom";
import HeroSection from "@/components/layout/HeroSection";

// Background image for hero section
const heroBackgroundImage = "/lovable-uploads/d54636e9-c25f-43fb-91c3-4630f549f0b2.png";

const Villas = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#07091A]">
      <Navbar />
      
      <HeroSection
        backgroundImage={heroBackgroundImage}
        title="Your perfect Halkidiki getaway,"
        subtitle="Book your villa today."
        description="Arteon Villas is located 500 metres from Salonikiou Beach and features a swimming pool as well as a terrace for guests' pleasure. Featuring a car park, this property is located 3.4 km from Panoramic view."
      >
        <div className="flex flex-row gap-6 mt-8">
          <Link to="/booking" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white px-8 py-3 rounded-md text-lg font-medium transition-all">
            Book Now
          </Link>
          <Link to="/gallery" className="bg-white/20 hover:bg-white/30 text-white border border-white/40 px-8 py-3 rounded-md text-lg font-medium transition-all backdrop-blur-sm">
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
