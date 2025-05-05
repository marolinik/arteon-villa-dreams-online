
import { VillaCard } from "@/components/ui/villa-card";
import { villas } from "@/data/villas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/section-header";

const Villas = () => {
  return <div className="min-h-screen flex flex-col bg-[#0F1524]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1920')"
    }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 to-villa-terracotta" />
        <div className="container relative h-full flex flex-col justify-center text-white px-4">
          <div className="max-w-3xl fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white">
              Luxury <span className="text-amber-400">Seaside</span> Villas
            </h1>
            <p className="text-xl font-light max-w-2xl text-gray-100">
              Experience the perfect harmony of modern luxury and seaside tranquility in our premium Halkidiki villas
            </p>
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
