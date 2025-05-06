
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getVillaBySlug, getVillaById } from "@/data/villas";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft, Home, Calendar, Printer } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";

const heroBackgroundImage = "/lovable-uploads/76eea9bd-1770-4907-b2b1-7b2c55ff47d1.png";
const logoImage = "/lovable-uploads/517011f9-d885-47e3-bd70-d058b9c078f8.jpg";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const villaSlug = queryParams.get("villa");
  const fromRequest = location.state?.fromRequest;
  const villaId = location.state?.villaId;
  const bookingNumber = location.state?.bookingNumber || "000000";
  
  let villa;
  
  if (villaSlug) {
    villa = getVillaBySlug(villaSlug);
  } else if (villaId) {
    villa = getVillaById(villaId);
  }
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#07091A]">
      {/* Non-printable area */}
      <div className="print:hidden">
        <Navbar />
        
        <PageHero
          title={fromRequest ? "Thank You for Your Reservation Request" : "Booking Confirmed!"}
          subtitle="Thank you for choosing our villa in Halkidiki"
          backgroundImage={heroBackgroundImage}
        />
      </div>
      
      <main className="flex-grow py-12 print:py-0 print:bg-white">
        <div className="container mx-auto px-4">
          {/* Official document card */}
          <Card className="max-w-4xl mx-auto bg-white text-[#1D3A64] print:shadow-none print:border-0">
            {/* Document header */}
            <div className="border-b border-gray-200 p-8 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <img src={logoImage} alt="Arteon Villas Logo" className="h-24 object-contain" />
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-serif text-[#1D3A64] font-bold">
                  {fromRequest ? "Booking Request" : "Booking Confirmation"}
                </h2>
                <p className="text-gray-500">Reference: #{bookingNumber}</p>
                <p className="text-gray-500">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <CardContent className="p-8">
              {/* Document body */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center p-2 bg-green-50 rounded-full mb-4">
                  <CheckCircle className="text-green-500 w-12 h-12" />
                </div>
                
                <h1 className="text-2xl md:text-3xl font-serif font-semibold mb-4 text-[#1D3A64]">
                  {fromRequest 
                    ? "Your Reservation Request Has Been Received" 
                    : "Your Booking Has Been Confirmed"}
                </h1>
                
                <p className="text-lg text-gray-600 mb-6">
                  Thank you for choosing Arteon Villas for your stay in beautiful Halkidiki.
                </p>
              </div>
              
              {/* Details section */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                <h3 className="font-serif font-semibold text-xl mb-4 pb-2 border-b border-gray-200 text-[#1D3A64]">
                  Booking Details
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Booking Reference:</span>
                    <span className="font-mono font-bold text-[#1D3A64]">#{bookingNumber}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`font-medium ${fromRequest ? "text-amber-600" : "text-green-600"}`}>
                      {fromRequest ? "Request Pending" : "Confirmed"}
                    </span>
                  </div>
                  
                  {villa && (
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Villa:</span>
                      <span className="font-medium">{villa.name}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Important information */}
              <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100">
                <h3 className="font-serif font-semibold text-xl mb-2 text-[#1D3A64]">Important Information</h3>
                <p className="text-gray-700 mb-2">
                  {fromRequest 
                    ? "Your booking request has been received and is awaiting confirmation. You will receive an email with payment instructions shortly."
                    : "Your booking has been confirmed. You will be contacted soon on your email with payment instructions."}
                </p>
                <p className="text-gray-700 font-medium">
                  Please save your booking reference number: <span className="font-mono font-bold">#{bookingNumber}</span>
                </p>
              </div>
              
              {/* Contact information */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h3 className="font-serif font-semibold text-lg mb-3 text-[#1D3A64]">Need Assistance?</h3>
                <p className="text-gray-600">
                  If you have any questions about your {fromRequest ? "reservation request" : "booking"}, please contact us:
                </p>
                <p className="text-gray-700 font-medium mt-2">
                  Email: <a href="mailto:booking@arteonvillas.com" className="text-blue-600 hover:text-blue-800">booking@arteonvillas.com</a><br />
                  Phone: +381 62 19 76 467<br />
                  Phone: +381 62 77 99 878
                </p>
              </div>
              
              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
                <p>Thank you for choosing Arteon Villas. We look forward to welcoming you to Halkidiki.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Action buttons - non-printable */}
          <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
            <Button
              variant="outline"
              className="bg-transparent border-amber-500 text-amber-500 hover:bg-amber-500/10"
              asChild
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
            
            <Button 
              className="bg-villa-blue hover:bg-blue-800"
              onClick={handlePrint}
            >
              <Printer className="mr-2 h-4 w-4" />
              Print Confirmation
            </Button>
            
            {villa && (
              <Button 
                variant="secondary"
                className="bg-[#1e3a68] text-gray-100 hover:bg-[#25487e]"
                asChild
              >
                <Link to={`/villas/${villa.slug}`}>
                  <Calendar className="mr-2 h-4 w-4" />
                  View Villa Details
                </Link>
              </Button>
            )}
          </div>
        </div>
      </main>
      
      {/* Non-printable footer */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default BookingConfirmation;
