
import { useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { getVillaBySlug } from "@/data/villas";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Users, Check, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const VillaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const villa = slug ? getVillaBySlug(slug) : undefined;
  
  // Check if redirected from successful booking
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const booked = queryParams.get("booked");
    
    if (booked === "true") {
      toast({
        title: "Booking Confirmed!",
        description: `Thank you for booking ${villa?.name}. We look forward to your stay.`,
      });
    }
  }, [location.search, toast, villa?.name]);
  
  useEffect(() => {
    // If villa not found, redirect to not found page
    if (!villa && slug) {
      navigate("/not-found");
    }
  }, [villa, slug, navigate]);
  
  if (!villa) {
    return null;
  }
  
  return (
    <div className="bg-[#07091A] text-white min-h-screen flex flex-col">
      <Navbar />
      
      <main className="pt-8 pb-20 flex-grow">
        <div className="container mx-auto px-4">
          {/* Villa Header */}
          <div className="mb-8">
            <Link to="/villas" className="text-amber-400 hover:text-amber-300 flex items-center gap-1 mb-4 group transition-colors">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Villas</span>
            </Link>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3 text-white">
              {villa.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-villa-terracotta"></div>
              <p className="text-gray-300 italic">
                {villa.meaning} in Greek - {villa.shortDescription}
              </p>
            </div>
          </div>
          
          {/* Villa Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
            <div className="lg:col-span-3 rounded-lg overflow-hidden">
              <ImageCarousel 
                images={villa.images} 
                className="h-[450px] md:h-[550px]"
              />
            </div>
            
            <div className="lg:col-span-2 bg-[#1D3A64] p-8 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-amber-400">
                Villa Overview
              </h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <BedDouble className="text-villa-terracotta mr-3" size={24} />
                  <span className="text-lg">{villa.bedConfiguration}</span>
                </div>
                
                <div className="flex items-center">
                  <Bath className="text-villa-terracotta mr-3" size={24} />
                  <span className="text-lg">{villa.bathrooms} Bathrooms</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="text-villa-terracotta mr-3" size={24} />
                  <span className="text-lg">Up to {villa.capacity} Guests</span>
                </div>
                
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-villa-terracotta text-white mr-3 text-xs font-bold">
                    m²
                  </span>
                  <span className="text-lg">{villa.size} m²</span>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-gray-700">
                <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-villa-terracotta hover:opacity-90 text-lg py-6 mb-4">
                  <Link to={`/booking?villa=${villa.slug}`}>Book This Villa</Link>
                </Button>
                
                <p className="text-sm text-gray-300 text-center">
                  Secure your stay at {villa.name} today
                </p>
              </div>
            </div>
          </div>
          
          {/* Villa Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-semibold mb-6 text-amber-400 relative">
                About {villa.name}
              </h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="mb-6 text-gray-300 text-lg leading-relaxed">{villa.description}</p>
                
                {villa.features.map((feature, index) => (
                  <div key={index} className="mb-8 bg-[#1D3A64] p-6 rounded-lg border-l-4 border-villa-terracotta">
                    <h3 className="text-xl font-medium mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-serif font-semibold mb-6 text-amber-400">
                Amenities
              </h2>
              
              <div className="bg-[#1D3A64] p-6 rounded-lg shadow-lg border border-gray-700">
                <ul className="space-y-4">
                  {villa.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-amber-400 mr-3 mt-1 flex-shrink-0" size={18} />
                      <span className="text-gray-300">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-[#1C3654] to-[#1C5D99] p-10 rounded-lg text-center">
            <h2 className="text-3xl font-serif font-semibold mb-4 text-white">
              Ready to Experience {villa.name}?
            </h2>
            <p className="mb-8 max-w-2xl mx-auto text-gray-200 text-lg">
              Book your stay now and enjoy a perfect getaway at our beautiful seaside villa in Halkidiki.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-villa-terracotta hover:opacity-90 text-lg py-7 px-10">
              <Link to={`/booking?villa=${villa.slug}`}>Check Availability & Book</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VillaDetail;
