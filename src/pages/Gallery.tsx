
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
    <div className="min-h-screen flex flex-col bg-[#172B4D]">
      <Navbar />
      
      <main className="py-12 flex-grow bg-[#172B4D]">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Gallery" 
            subtitle="Explore images of our beautiful villas and their surroundings."
            centered
          />
          
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
                    className="flex-1 data-[state=active]:bg-villa-blue data-[state=active]:text-white"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <GalleryGrid images={filteredImages} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
