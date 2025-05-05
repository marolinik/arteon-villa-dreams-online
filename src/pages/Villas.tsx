
import { VillaCard } from "@/components/ui/villa-card";
import { villas } from "@/data/villas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Villas = () => {
  return <div className="min-h-screen flex flex-col bg-[#0F1524]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: "url('/lovable-uploads/d3e2077a-1823-4b3f-a63e-9b43d9afe6fe.png')"
    }}>
        <div className="absolute inset-0 bg-[#0F1524]/80" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
        <div className="container relative h-full flex flex-col justify-center items-center text-center text-white px-4 bg-transparent">
          <div className="max-w-3xl fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white">
              Arteon <span className="text-amber-400">Villas</span>
            </h1>
            <p className="text-xl md:text-2xl font-serif font-light max-w-2xl text-gray-100 mb-12">
              Your Perfect Halkidiki Getaway
            </p>
            
            <div className="flex justify-center gap-8">
              <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white w-56 h-14 text-lg font-medium rounded-md">
                <Link to="/booking">
                  Book Now
                </Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white w-56 h-14 text-lg font-medium rounded-md">
                <Link to="/gallery">
                  View Gallery
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <div className="text-white py-20 px-4 bg-[#0F1524]">
        <div className="container mx-auto bg-[#0F1524]">
          <SectionHeader title="Discover Your Perfect Villa" subtitle="Each villa offers a unique blend of contemporary design, comfort, and breathtaking sea views" className="mb-16" titleClassName="text-white" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {villas.map(villa => <VillaCard key={villa.id} villa={villa} />)}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default Villas;
