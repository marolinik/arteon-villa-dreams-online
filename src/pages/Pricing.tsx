
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Wallet, CreditCard } from "lucide-react";

const heroBackgroundImage = "/lovable-uploads/f2845f9b-93ed-4389-82b3-543f930e60c2.png";

const Pricing = () => {
  // Add effect to scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#07091A]">
      <Navbar />
      
      <PageHero
        title="Villa Pricing"
        subtitle="Transparent pricing and booking information"
        backgroundImage={heroBackgroundImage}
      />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Pricing Structure" 
            subtitle="Competitive rates for exceptional luxury and amenities" 
            className="mb-12"
          />
          
          {/* Seasonal Rates Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-amber-400">
              Seasonal Rates
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1D3A64] rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col">
                <div className="p-6 bg-[#172B4D]">
                  <h3 className="text-xl font-serif font-medium text-white mb-2">Low Season</h3>
                  <p className="text-gray-300 text-sm">October - April</p>
                </div>
                <div className="p-6 flex-grow">
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-amber-400">€200</span>
                    <span className="text-gray-300 ml-2">/ night</span>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-6">
                    <li>• Min 3 nights stay</li>
                    <li>• Up to 6 guests</li>
                    <li>• All amenities included</li>
                    <li>• 10% discount for 7+ nights</li>
                  </ul>
                </div>
                <div className="p-6 bg-[#172B4D]">
                  <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-villa-terracotta">
                    <Link to="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-[#1D3A64] rounded-lg overflow-hidden shadow-lg border border-amber-500 flex flex-col relative">
                <div className="absolute top-0 right-0 bg-amber-500 text-[#07091A] px-3 py-1 text-sm font-bold">
                  POPULAR
                </div>
                <div className="p-6 bg-[#172B4D]">
                  <h3 className="text-xl font-serif font-medium text-white mb-2">Mid Season</h3>
                  <p className="text-gray-300 text-sm">May - June, September</p>
                </div>
                <div className="p-6 flex-grow">
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-amber-400">€350</span>
                    <span className="text-gray-300 ml-2">/ night</span>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-6">
                    <li>• Min 5 nights stay</li>
                    <li>• Up to 6 guests</li>
                    <li>• All amenities included</li>
                    <li>• 15% discount for 14+ nights</li>
                  </ul>
                </div>
                <div className="p-6 bg-[#172B4D]">
                  <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-villa-terracotta">
                    <Link to="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-[#1D3A64] rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col">
                <div className="p-6 bg-[#172B4D]">
                  <h3 className="text-xl font-serif font-medium text-white mb-2">High Season</h3>
                  <p className="text-gray-300 text-sm">July - August</p>
                </div>
                <div className="p-6 flex-grow">
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-amber-400">€490</span>
                    <span className="text-gray-300 ml-2">/ night</span>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-6">
                    <li>• Min 7 nights stay</li>
                    <li>• Up to 6 guests</li>
                    <li>• All amenities included</li>
                    <li>• Priority concierge service</li>
                  </ul>
                </div>
                <div className="p-6 bg-[#172B4D]">
                  <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-villa-terracotta">
                    <Link to="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Costs */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-amber-400">
              Additional Costs & Services
            </h2>
            
            <div className="bg-[#1D3A64] rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Included in Your Stay</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Welcome basket with local products</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Daily housekeeping (except Sundays)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Linen change twice a week</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Internet/Wi-Fi</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Pool and garden maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">✓</span>
                      <span>Electricity, water, and air conditioning</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Additional Services</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-villa-terracotta mr-2">+</span>
                      <span>Private chef: €150-€250 per meal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-villa-terracotta mr-2">+</span>
                      <span>Airport transfers: €60-€100 each way</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-villa-terracotta mr-2">+</span>
                      <span>Grocery delivery: €25 + cost of groceries</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-villa-terracotta mr-2">+</span>
                      <span>Yacht rental: From €450 per day</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-villa-terracotta mr-2">+</span>
                      <span>Massage services: €80 per hour</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-villa-terracotta mr-2">+</span>
                      <span>Childcare: €15 per hour</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Information */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-amber-400">
              Booking & Payment Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#172B4D] p-6 rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-villa-blue rounded-full flex items-center justify-center">
                    <Calendar className="text-amber-400 w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 text-center">Booking Process</h3>
                <p className="text-gray-300 text-center">
                  To confirm your reservation, a 30% deposit is required at the time of booking. The remaining balance is due 60 days prior to arrival.
                </p>
              </div>
              
              <div className="bg-[#172B4D] p-6 rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-villa-blue rounded-full flex items-center justify-center">
                    <Wallet className="text-amber-400 w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 text-center">Security Deposit</h3>
                <p className="text-gray-300 text-center">
                  A security deposit of €500 is required upon check-in, refundable within 7 days after departure, subject to property inspection.
                </p>
              </div>
              
              <div className="bg-[#172B4D] p-6 rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-villa-blue rounded-full flex items-center justify-center">
                    <CreditCard className="text-amber-400 w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 text-center">Payment Methods</h3>
                <p className="text-gray-300 text-center">
                  We accept credit cards (Visa, MasterCard), bank transfers, and PayPal. All prices are in Euros (€).
                </p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-[#1C3654] to-[#1C5D99] p-10 rounded-lg text-center">
            <h2 className="text-3xl font-serif font-semibold mb-4 text-white">
              Ready to Book Your Luxury Getaway?
            </h2>
            <p className="mb-8 max-w-2xl mx-auto text-gray-200 text-lg">
              Contact us for special offers, long-term stays, or any questions about our villas and services.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-villa-terracotta hover:opacity-90 text-lg py-7 px-10">
              <Link to="/booking">Check Availability & Book</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
