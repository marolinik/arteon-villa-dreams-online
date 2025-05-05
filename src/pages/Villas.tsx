
import { VillaCard } from "@/components/ui/villa-card";
import { villas } from "@/data/villas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageHero from "@/components/layout/PageHero";

const Villas = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F1524]">
      <Navbar />
      
      <PageHero
        title="Arteon Villas"
        subtitle="Your Perfect Halkidiki Getaway"
        height="h-[70vh]"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-center md:gap-6 mt-8 fade-in">
          <Button asChild className="bg-gradient-to-r from-amber-500 to-villa-terracotta hover:opacity-90 text-white h-10 text-sm font-medium rounded-md w-full md:w-40 px-4">
            <Link to="/booking">
              Book Now
            </Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-amber-500 to-villa-terracotta hover:opacity-90 text-white h-10 text-sm font-medium rounded-md w-full md:w-40 px-4">
            <Link to="/gallery">
              View Gallery
            </Link>
          </Button>
        </div>
      </PageHero>
      
      <div className="text-white py-20 px-4 bg-[#0F1524]">
        <div className="container mx-auto bg-[#0F1524]">
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
