
import { useState, useEffect } from "react";
import { galleryImages, getImagesByCategory } from "@/data/gallery";
import { SectionHeader } from "@/components/ui/section-header";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { ImageCarousel } from "@/components/ui/image-carousel";

const heroBackgroundImage = "/lovable-uploads/688e1adc-830e-4787-8a22-5c6afd28769c.png";

const Gallery = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  
  // Add effect to scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const categories = [
    { value: undefined, label: "All" },
    { value: "exteriors", label: "Exteriors" },
    { value: "interiors", label: "Interiors" },
    { value: "amenities", label: "Amenities" },
    { value: "surroundings", label: "Surroundings" }
  ];
  
  const filteredImages = category ? getImagesByCategory(category) : galleryImages;

  // Handle tab change
  const handleTabChange = (value: string) => {
    // Scroll to top of the gallery section
    const gallerySection = document.querySelector('.gallery-grid');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
    
    setCategory(value === "all" ? undefined : value);
  };

  // Select a few stunning surroundings images for the showcase
  const showcaseImages = [
    "/lovable-uploads/40000230-369a-45b7-bf40-4e3182a4c8bb.png",
    "/lovable-uploads/b2748edf-87d4-42ac-b8a0-668e371a2428.png",
    "/lovable-uploads/2885597c-3259-441f-b353-d6f5293b7290.png",
    "/lovable-uploads/f6c9744c-0a2f-45bb-9ec3-58ab45d8f82e.png"
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-[#0F1524]">
      <Navbar />
      
      <PageHero
        title="Our Gallery"
        subtitle="Explore images of our beautiful villas and their surroundings"
        backgroundImage={heroBackgroundImage}
      />
      
      <main className="py-12 flex-grow bg-[#0F1524]">
        <div className="container mx-auto px-4">
          <div className="mb-8 hidden md:block">
            <ImageCarousel 
              images={showcaseImages} 
              className="w-full h-[50vh] rounded-lg mb-10" 
            />
          </div>
          
          <div className="mb-8 flex justify-center">
            <Tabs 
              defaultValue="all" 
              onValueChange={handleTabChange}
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
          
          <div className="gallery-grid">
            <GalleryGrid images={filteredImages} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
