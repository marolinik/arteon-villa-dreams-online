
import { useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { getVillaBySlug } from "@/data/villas";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Users, Check } from "lucide-react";
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
    <>
      <Navbar />
      
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-4">
          {/* Villa Header */}
          <div className="mb-8">
            <Link to="/" className="text-villa-blue hover:underline mb-2 inline-block">
              ← Back to All Villas
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              {villa.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {villa.meaning} in Greek - {villa.shortDescription}
            </p>
          </div>
          
          {/* Villa Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
            <div className="lg:col-span-3">
              <ImageCarousel 
                images={villa.images} 
                className="h-[400px] md:h-[500px]"
              />
            </div>
            
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md flex flex-col">
              <h2 className="text-2xl font-serif font-semibold mb-4">
                Villa Details
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <BedDouble className="text-villa-blue mr-2" size={20} />
                  <span>{villa.bedrooms} Bedrooms</span>
                </div>
                
                <div className="flex items-center">
                  <Bath className="text-villa-blue mr-2" size={20} />
                  <span>{villa.bathrooms} Bathrooms</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="text-villa-blue mr-2" size={20} />
                  <span>Up to {villa.capacity} Guests</span>
                </div>
                
                <div className="flex items-center">
                  <span className="inline-block w-5 h-5 rounded-full bg-villa-blue text-white text-center text-xs font-bold mr-2">
                    m²
                  </span>
                  <span>{villa.size} m²</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <Button asChild className="w-full bg-villa-blue hover:bg-blue-800 mb-3">
                  <Link to={`/booking?villa=${villa.slug}`}>Book Now</Link>
                </Button>
                
                <p className="text-sm text-gray-600 text-center">
                  Secure your stay at {villa.name} today
                </p>
              </div>
            </div>
          </div>
          
          {/* Villa Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-semibold mb-4">
                About {villa.name}
              </h2>
              
              <div className="prose max-w-none">
                <p className="mb-4">{villa.description}</p>
                
                {villa.features.map((feature, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">
                Amenities
              </h2>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ul className="space-y-3">
                  {villa.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-villa-green mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-villa-sand/50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-serif font-semibold mb-3">
              Ready to Experience {villa.name}?
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Book your stay now and enjoy a perfect getaway at our beautiful villa in Halkidiki.
            </p>
            <Button asChild size="lg" className="bg-villa-blue hover:bg-blue-800">
              <Link to={`/booking?villa=${villa.slug}`}>Check Availability & Book</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VillaDetail;
