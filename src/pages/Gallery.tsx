
import { useState } from "react";
import { galleryImages, getImagesByCategory } from "@/data/gallery";
import { SectionHeader } from "@/components/ui/section-header";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Gallery = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  
  const categories = [
    { value: undefined, label: "All" },
    { value: "exterior", label: "Exteriors" },
    { value: "interior", label: "Interiors" },
    { value: "amenities", label: "Amenities" },
    { value: "surroundings", label: "Surroundings" }
  ];
  
  const filteredImages = getImagesByCategory(category);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#0F1524]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[300px] bg-[#172B4D] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0F1524]/60" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white fade-in">Our Gallery</h1>
          <p className="text-xl text-amber-400 max-w-2xl mx-auto fade-in">
            Explore images of our beautiful villas and their surroundings
          </p>
        </div>
      </section>
      
      <main className="py-12 flex-grow bg-[#0F1524]">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-center">
            <Tabs 
              defaultValue="all" 
              onValueChange={(value) => setCategory(value === "all" ? undefined : value)}
              className="w-full max-w-3xl"
            >
              <TabsList className="w-full bg-[#1D3A64] p-1 shadow-sm">
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat.value || "all"} 
                    value={cat.value || "all"}
                    className="flex-1 text-gray-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-villa-terracotta data-[state=active]:text-white"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="mb-10">
            <p className="text-villa-cream text-center max-w-3xl mx-auto">
              Browse through our collection of images showcasing the beautiful Arteon Villas and the surrounding areas of Halkidiki. Filter by category to see specific features of our property.
            </p>
          </div>
          
          <GalleryGrid images={filteredImages} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
