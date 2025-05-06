
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format, differenceInDays } from "date-fns";
import { getVillaById } from "@/data/villas";
import { sendEmail } from "@/utils/emailService";
import { GuestInfo } from "@/types";
import { Mail, ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

const heroBackgroundImage = "/lovable-uploads/76eea9bd-1770-4907-b2b1-7b2c55ff47d1.png";

const BookingRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    villaId: string;
    startDate: Date;
    endDate: Date;
    guestInfo: GuestInfo;
    totalPrice: number;
    nightRate: number;
  } | null>(null);

  useEffect(() => {
    // Get booking details from state or redirect back to booking page
    const state = location.state;
    if (!state || !state.bookingDetails) {
      toast({
        title: "Error",
        description: "Booking details not found. Please try again.",
        variant: "destructive",
      });
      navigate("/booking");
      return;
    }
    
    setBookingDetails(state.bookingDetails);
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [location, navigate, toast]);
  
  const handleConfirmBooking = async () => {
    if (!bookingDetails) return;
    
    setIsSubmitting(true);
    
    try {
      const villa = getVillaById(bookingDetails.villaId);
      const villaName = villa ? villa.name : "Unknown Villa";
      const nights = differenceInDays(bookingDetails.endDate, bookingDetails.startDate);
      
      // Create email body for guest
      const guestEmailBody = `
Dear ${bookingDetails.guestInfo.name},

Thank you for your booking request at Arteon Villas.

Booking Details:
- Villa: ${villaName}
- Check-in: ${format(bookingDetails.startDate, "PPP")}
- Check-out: ${format(bookingDetails.endDate, "PPP")}
- Nights: ${nights}
- Guests: ${bookingDetails.guestInfo.guests}
- Total Price: €${bookingDetails.totalPrice}

You will receive payment instructions shortly. Please note that a 30% deposit is required to confirm your reservation.

If you have any questions, please feel free to contact us.

Best regards,
Arteon Villas Team
      `;
      
      // Create email body for villa owners
      const ownerEmailBody = `
New Booking Request:

Villa: ${villaName}
Check-in: ${format(bookingDetails.startDate, "PPP")}
Check-out: ${format(bookingDetails.endDate, "PPP")}
Nights: ${nights}
Rate per night: €${bookingDetails.nightRate}
Total Price: €${bookingDetails.totalPrice}

Guest Information:
- Name: ${bookingDetails.guestInfo.name}
- Email: ${bookingDetails.guestInfo.email}
- Phone: ${bookingDetails.guestInfo.phone}
- Number of guests: ${bookingDetails.guestInfo.guests}
${bookingDetails.guestInfo.specialRequests ? `- Special Requests: ${bookingDetails.guestInfo.specialRequests}` : ''}
      `;
      
      // Send email to guest
      await sendEmail({
        to: bookingDetails.guestInfo.email,
        subject: "Arteon Villas - Booking Request Confirmation",
        body: guestEmailBody,
      });
      
      // Send email to villa owners
      await sendEmail({
        to: "booking@arteonvillas.com, marolinik@gmail.com",
        subject: `New Booking Request: ${villaName} - ${format(bookingDetails.startDate, "PP")} to ${format(bookingDetails.endDate, "PP")}`,
        body: ownerEmailBody,
      });
      
      // Navigate to thank you page
      navigate("/booking-confirmation", { 
        state: { 
          fromRequest: true,
          villaId: bookingDetails.villaId 
        } 
      });
      
      toast({
        title: "Booking Request Submitted",
        description: "You will receive an email with payment instructions shortly.",
      });
    } catch (error) {
      console.error("Failed to send booking emails:", error);
      toast({
        title: "Error",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If no booking details, show loading or empty state
  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex flex-col bg-[#07091A]">
        <Navbar />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4 text-center text-white">
            <p>Loading booking details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const villa = getVillaById(bookingDetails.villaId);
  const nights = differenceInDays(bookingDetails.endDate, bookingDetails.startDate);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#07091A]">
      <Navbar />
      
      <PageHero
        title="Booking Request"
        subtitle="Please review your booking details before confirming"
        backgroundImage={heroBackgroundImage}
      />
      
      <main className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-[#1D3A64] rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <Button variant="outline" asChild className="mb-6">
                <Link to="/booking">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Booking Form
                </Link>
              </Button>
              
              <div className="bg-[#172B4D] p-6 rounded-lg mb-6">
                <h2 className="text-xl font-serif mb-4 text-amber-300">Booking Details</h2>
                
                <div className="space-y-4 text-white">
                  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Villa:</span>
                    <span className="font-medium">{villa?.name || "Unknown Villa"}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Check-in:</span>
                    <span className="font-medium">{format(bookingDetails.startDate, "EEEE, MMM d, yyyy")}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Check-out:</span>
                    <span className="font-medium">{format(bookingDetails.endDate, "EEEE, MMM d, yyyy")}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Duration:</span>
                    <span className="font-medium">{nights} nights</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Rate per night:</span>
                    <span className="font-medium">€{bookingDetails.nightRate}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Total Price:</span>
                    <span className="font-medium text-amber-300">€{bookingDetails.totalPrice}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#172B4D] p-6 rounded-lg mb-6">
                <h2 className="text-xl font-serif mb-4 text-amber-300">Guest Information</h2>
                
                <div className="space-y-4 text-white">
                  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Name:</span>
                    <span className="font-medium">{bookingDetails.guestInfo.name}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Email:</span>
                    <span className="font-medium">{bookingDetails.guestInfo.email}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Phone:</span>
                    <span className="font-medium">{bookingDetails.guestInfo.phone}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Number of Guests:</span>
                    <span className="font-medium">{bookingDetails.guestInfo.guests}</span>
                  </div>
                  
                  {bookingDetails.guestInfo.specialRequests && (
                    <div className="border-b border-gray-700 pb-2">
                      <p className="text-gray-300 mb-1">Special Requests:</p>
                      <p className="text-sm">{bookingDetails.guestInfo.specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-[#172B4D] p-4 rounded-md mb-6">
                <div className="flex items-start space-x-3">
                  <Mail className="text-amber-400 w-5 h-5 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-white">Booking Confirmation Process:</p>
                    <p className="text-gray-300">Upon confirming your booking request, you will receive an email with payment instructions and booking confirmation.</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleConfirmBooking}
                className="w-full bg-villa-blue hover:bg-blue-800 mt-4 h-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    <Check className="mr-2" size={18} />
                    Confirm Booking Request
                  </>
                )}
              </Button>
              
              <p className="text-sm text-center text-gray-400 mt-4">
                By confirming your booking request, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingRequest;
