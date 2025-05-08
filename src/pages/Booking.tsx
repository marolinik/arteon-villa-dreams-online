
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
import { ImageIcon, BedDouble, Bath, Users, CalendarDays } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Toaster } from "@/components/ui/toaster";

const heroBackgroundImage = "/lovable-uploads/76eea9bd-1770-4907-b2b1-7b2c55ff47d1.png";

const Booking = () => {
  const location = useLocation();
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Check if a specific villa was requested in URL params
    const queryParams = new URLSearchParams(location.search);
    const villaSlug = queryParams.get("villa");
    
    const fetchVilla = async () => {
      if (villaSlug) {
        const villa = await getVillaBySlug(villaSlug);
        if (villa) {
          setSelectedVilla(villa);
          
          // Also fetch bookings for this villa
          const villaBookings = await getBookingsByVillaId(villa.id);
          setBookings(villaBookings);
        }
      } else if (villas.length > 0 && !selectedVilla) {
        // Set a default villa if none is selected
        const defaultVilla = await getVillaBySlug(villas[0].slug);
        setSelectedVilla(defaultVilla || villas[0]);
        
        if (defaultVilla) {
          const villaBookings = await getBookingsByVillaId(defaultVilla.id);
          setBookings(villaBookings);
        }
      }
    };
    
    fetchVilla();
  }, [location.search]);
  
  // Make sure we have a selected villa
  const activeVilla = selectedVilla || villas[0];
  const activeVillaSlug = activeVilla?.slug || villas[0].slug;
  
  // Handle villa tab change
  const handleVillaChange = async (slug: string) => {
    const villa = await getVillaBySlug(slug);
    if (villa) {
      setSelectedVilla(villa);
      
      // Fetch bookings for this villa
      const villaBookings = await getBookingsByVillaId(villa.id);
      setBookings(villaBookings);
      
      // Scroll to the top of the content
      const tabsContent = document.querySelector('.tabs-content');
      if (tabsContent) {
        tabsContent.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#07091A]">
      <Navbar />
      
      <PageHero
        title="Book Your Stay"
        subtitle="Select a villa and book your perfect getaway in Halkidiki"
        backgroundImage={heroBackgroundImage}
      />
      
      <main className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#1D3A64] rounded-lg shadow-lg overflow-hidden">
            <Tabs 
              defaultValue={activeVillaSlug}
              className="w-full"
            >
              <div className="bg-[#213E69] px-6 py-4 border-b border-gray-700">
                <TabsList className="w-full bg-[#172B4D] p-1 shadow-sm">
                  {villas.map((villa) => (
                    <TabsTrigger 
                      key={villa.slug}
                      value={villa.slug}
                      className="flex-1 data-[state=active]:bg-villa-blue data-[state=active]:text-white"
                      onClick={() => handleVillaChange(villa.slug)}
                    >
                      {villa.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <div className="tabs-content">
                {villas.map((villa) => (
                  <TabsContent 
                    key={villa.slug}
                    value={villa.slug}
                    className="p-6 focus-visible:outline-none focus-visible:ring-0 text-white"
                  >
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                      <div>
                        <div className="rounded-lg mb-4 h-64 bg-[#172B4D] flex items-center justify-center">
                          {villa.mainImage ? (
                            <img 
                              src={villa.mainImage} 
                              alt={villa.name} 
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              <ImageIcon size={48} className="text-villa-sand" />
                              <p className="mt-2 text-sm text-gray-400">Villa image placeholder</p>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-serif font-medium mb-2 text-white">
                          {villa.name} - {villa.meaning}
                        </h3>
                        
                        <p className="text-gray-300 mb-4">
                          {villa.shortDescription}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-villa-blue/20 text-amber-300">
                            <BedDouble className="mr-1" size={14} />
                            {villa.bedConfiguration}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-villa-blue/20 text-amber-300">
                            <Bath className="mr-1" size={14} />
                            {villa.bathrooms} Bathrooms
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-villa-blue/20 text-amber-300">
                            {villa.size} m²
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-villa-blue/20 text-amber-300">
                            <Users className="mr-1" size={14} />
                            Up to {villa.capacity} Guests
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-villa-blue/20 text-amber-300">
                            <CalendarDays className="mr-1" size={14} />
                            Min. 5 nights
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-400">
                          Book with confidence - Your perfect stay awaits at {villa.name}.
                        </p>
                      </div>
                      
                      <BookingForm 
                        villa={villa} 
                        bookedDates={bookings.filter(b => b.villaId === villa.id)}
                      />
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Booking;
