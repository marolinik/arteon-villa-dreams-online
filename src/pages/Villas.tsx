
import { VillaCard } from "@/components/ui/villa-card";
import { villas } from "@/data/villas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";

const Villas = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1920')"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative h-full flex flex-col justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            Our Luxury Villas
          </h1>
          <p className="text-xl font-light max-w-2xl">
            Discover our collection of premium villas in the beautiful Halkidiki region
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-16">
        <SectionHeader
          title="Explore Our Villas"
          subtitle="Each villa offers a unique blend of comfort, elegance, and Greek hospitality"
          className="mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {villas.map((villa) => (
            <VillaCard key={villa.id} villa={villa} />
          ))}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Villas;
