
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getVillaBySlug } from "@/data/villas";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft, Home, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

const heroBackgroundImage = "/lovable-uploads/76eea9bd-1770-4907-b2b1-7b2c55ff47d1.png";

const BookingConfirmation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const villaSlug = queryParams.get("villa");
  const villa = villaSlug ? getVillaBySlug(villaSlug) : undefined;
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#07091A]">
      <Navbar />
      
      <PageHero
        title="Booking Confirmed!"
        subtitle="Thank you for choosing our villa in Halkidiki"
        backgroundImage={heroBackgroundImage}
      />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-[#1D3A64] rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <CheckCircle className="text-green-400 w-20 h-20" />
              </div>
              
              <h1 className="text-3xl font-serif font-semibold mb-4 text-white">
                Thank You for Your Booking
              </h1>
              
              <div className="bg-[#172B4D] p-6 rounded-lg mb-6">
                <p className="text-lg text-gray-200 mb-4">
                  Your booking has been recorded successfully.
                </p>
                
                <p className="text-amber-300 mb-6">
                  {villa ? `You have booked ${villa.name} villa` : "Your villa booking"} has been confirmed.
                </p>
                
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-white">
                    You will be contacted soon on your email with payment instructions.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-8">
                If you have any questions about your booking, please don't hesitate to contact us.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" className="bg-transparent border-amber-500 text-amber-500 hover:bg-amber-500/10">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Return to Home
                  </Link>
                </Button>
                
                {villa && (
                  <Button asChild className="bg-villa-blue hover:bg-blue-800">
                    <Link to={`/villas/${villa.slug}`}>
                      <Calendar className="mr-2 h-4 w-4" />
                      View Villa Details
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
