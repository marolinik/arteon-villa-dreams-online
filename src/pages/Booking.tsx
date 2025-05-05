
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SectionHeader } from "@/components/ui/section-header";
import { BookingForm } from "@/components/booking/BookingForm";
import { Villa } from "@/types";
import { villas, getVillaBySlug } from "@/data/villas";
import { getBookingsByVillaId } from "@/data/bookings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Booking = () => {
  const location = useLocation();
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  
  useEffect(() => {
    // Check if a specific villa was requested in URL params
    const queryParams = new URLSearchParams(location.search);
    const villaSlug = queryParams.get("villa");
    
    if (villaSlug) {
      const villa = getVillaBySlug(villaSlug);
      if (villa) {
        setSelectedVilla(villa);
      }
    }
  }, [location.search]);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#172B4D]">
      <Navbar />
      
      <main className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Book Your Stay" 
            subtitle="Select a villa and book your perfect getaway in Halkidiki."
            centered
          />
          
          <div className="max-w-4xl mx-auto bg-[#1D3A64] rounded-lg shadow-lg overflow-hidden">
            <Tabs 
              defaultValue={selectedVilla?.slug || villas[0].slug}
              className="w-full"
            >
              <div className="bg-[#213E69] px-6 py-4 border-b border-gray-700">
                <TabsList className="w-full bg-[#172B4D] p-1 shadow-sm">
                  {villas.map((villa) => (
                    <TabsTrigger 
                      key={villa.slug}
                      value={villa.slug}
                      className="flex-1 data-[state=active]:bg-villa-blue data-[state=active]:text-white"
                      onClick={() => setSelectedVilla(villa)}
                    >
                      {villa.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {villas.map((villa) => (
                <TabsContent 
                  key={villa.slug}
                  value={villa.slug}
                  className="p-6 focus-visible:outline-none focus-visible:ring-0 text-white"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <img 
                        src={villa.mainImage} 
                        alt={villa.name} 
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      
                      <h3 className="text-xl font-serif font-medium mb-2 text-white">
                        {villa.name} - {villa.meaning}
                      </h3>
                      
                      <p className="text-gray-300 mb-4">
                        {villa.shortDescription}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-villa-blue/20 text-amber-300">
                          {villa.bedrooms} Bedrooms
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-villa-blue/20 text-amber-300">
                          {villa.bathrooms} Bathrooms
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-villa-blue/20 text-amber-300">
                          {villa.size} m²
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-villa-blue/20 text-amber-300">
                          Up to {villa.capacity} Guests
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-400">
                        Book with confidence - Your perfect stay awaits at {villa.name}.
                      </p>
                    </div>
                    
                    <BookingForm 
                      villa={villa} 
                      bookedDates={getBookingsByVillaId(villa.id)}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
