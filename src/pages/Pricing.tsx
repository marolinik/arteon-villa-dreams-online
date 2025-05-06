
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
            subtitle="Specific seasonal rates for our luxury villas" 
            className="mb-12"
          />
          
          {/* Seasonal Rates Table Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-amber-400">
              2025 Seasonal Rates
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#172B4D]">
                    <th className="p-4 text-left text-white font-serif border border-gray-700">Room Type / Category</th>
                    <th className="p-4 text-left text-white font-serif border border-gray-700">Guests</th>
                    <th className="p-4 text-center text-white font-serif border border-gray-700">17.4.25 - 22.4.25</th>
                    <th className="p-4 text-center text-white font-serif border border-gray-700">31.5.25 - 30.6.25</th>
                    <th className="p-4 text-center text-white font-serif border border-gray-700">1.7.25 - 31.7.25</th>
                    <th className="p-4 text-center text-white font-serif border border-gray-700">1.8.25 - 31.8.25</th>
                    <th className="p-4 text-center text-white font-serif border border-gray-700">1.9.25 - 15.9.25</th>
                    <th className="p-4 text-center text-white font-serif border border-gray-700">16.9.25 - 4.10.25</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#1D3A64] hover:bg-[#234274] transition-colors">
                    <td className="p-4 border border-gray-700 text-white">Villa</td>
                    <td className="p-4 border border-gray-700 text-white">up to 6</td>
                    <td className="p-4 border border-gray-700 text-center text-amber-400 font-semibold">€ 430</td>
                    <td className="p-4 border border-gray-700 text-center text-amber-400 font-semibold">€ 380</td>
                    <td className="p-4 border border-gray-700 text-center text-amber-400 font-semibold">€ 460</td>
                    <td className="p-4 border border-gray-700 text-center text-amber-400 font-semibold">€ 530</td>
                    <td className="p-4 border border-gray-700 text-center text-amber-400 font-semibold">€ 460</td>
                    <td className="p-4 border border-gray-700 text-center text-amber-400 font-semibold">€ 380</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-gray-300 text-sm">
              <p>* All prices are per night and include all amenities.</p>
              <p>* Minimum stay requirements may apply depending on the season.</p>
              <p>* Special discounts available for longer stays.</p>
            </div>
          </div>
          
          {/* Booking Policies & Requirements */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-amber-400">
              Booking Requirements & Policies
            </h2>
            
            <div className="overflow-x-auto mb-10">
              <table className="w-full border-collapse">
                <tbody>
                  {/* Minimum Stay */}
                  <tr className="bg-[#172B4D]">
                    <td colSpan={2} className="p-4 text-left text-white font-serif border border-gray-700 font-semibold">
                      Arteon Villas have always minimum stay 5 nights.
                    </td>
                    <td colSpan={4} className="p-4 text-left text-white font-serif border border-gray-700 font-semibold">
                      Early Booking Discounts
                    </td>
                  </tr>
                  
                  {/* Check-in & Check-out */}
                  <tr>
                    <td colSpan={2} className="p-4 text-left text-white font-serif border border-gray-700 bg-[#1D3A64] font-semibold">
                      Check-in & Check-out hours of the complex Mon - Sat only
                    </td>
                    <td colSpan={4} rowSpan={1} className="p-4 text-left text-white font-serif border border-gray-700 bg-[#1D3A64]">
                      <p>1. We offer <span className="text-amber-400 font-bold">10% early booking discount</span> for reservations made <span className="text-amber-400 font-bold">until 31.12.2024</span></p>
                      <p className="pl-3 ml-3 mt-1">for <span className="font-bold">7 nights or more</span>, staying <span className="font-bold">from 1/6/25 - 30/9/25</span></p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td colSpan={2} className="p-4 text-left text-gray-300 font-serif border border-gray-700 bg-[#1D3A64]">
                      Check-in at 15:00-18:30 with the host or up to 23:00 by self.
                    </td>
                    <td colSpan={4} className="p-4 text-left text-white font-serif border border-gray-700 bg-[#1D3A64]">
                      <p>2. We offer <span className="text-amber-400 font-bold">5% early booking discount</span> for reservations made from <span className="text-amber-400 font-bold">1.1.2025 - 28.2.2025</span></p>
                      <p className="pl-3 ml-3 mt-1">for <span className="font-bold">5 nights or more</span>, staying <span className="font-bold">from 1/6/25 - 30/9/25</span></p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td colSpan={2} className="p-4 text-left text-gray-300 font-serif border border-gray-700 bg-[#1D3A64]">
                      Check-out up to 11:00 am.
                    </td>
                    <td colSpan={4} rowSpan={2} className="p-4 text-left text-white font-serif border border-gray-700 bg-[#1D3A64]">
                      <p>3. <span className="text-amber-400 font-bold">Repeaters Discount 3%</span> for reservations made <span className="text-amber-400 font-bold">from 1/03/25 - 23/9/25</span></p>
                      <p className="pl-3 ml-3 mt-1">for <span className="font-bold">7 nights or more</span>, staying <span className="font-bold">from 1/6/25 - 30/9/25</span></p>
                    </td>
                  </tr>
                  
                  <tr>
                    <td colSpan={2} className="p-4 text-left text-gray-300 font-serif border border-gray-700 bg-[#1D3A64]">
                      Check-in or check out on Sundays is prohibited on Staff's day-off.
                    </td>
                  </tr>
                  
                  {/* Cancellation Policy */}
                  <tr>
                    <td colSpan={2} className="p-4 text-left text-white font-serif border border-gray-700 bg-[#172B4D] font-semibold">
                      Cancellation Policy:
                    </td>
                    <td colSpan={4} className="p-4 border border-gray-700 bg-[#172B4D]"></td>
                  </tr>
                  
                  <tr>
                    <td colSpan={6} className="p-4 text-left text-gray-300 font-serif border border-gray-700 bg-[#1D3A64]">
                      In the event of cancellation 21 days or more prior arrival, 70% refund.
                    </td>
                  </tr>
                  
                  <tr>
                    <td colSpan={6} className="p-4 text-left text-gray-300 font-serif border border-gray-700 bg-[#1D3A64]">
                      In the event of cancellation in less than 21 days before arrival all payment is lost.
                    </td>
                  </tr>
                  
                  <tr>
                    <td colSpan={6} className="p-4 text-left text-gray-300 font-serif border border-gray-700 bg-[#1D3A64]">
                      Early departures and No-shows are fully charged.
                    </td>
                  </tr>
                  
                  {/* Payment Policy */}
                  <tr>
                    <td colSpan={2} className="p-4 text-left text-white font-serif border border-gray-700 bg-[#172B4D] font-semibold">
                      Payment Policy:
                    </td>
                    <td colSpan={4} className="p-4 border border-gray-700 bg-[#172B4D]"></td>
                  </tr>
                  
                  <tr>
                    <td colSpan={6} className="p-4 text-left text-gray-300 font-serif border border-gray-700 bg-[#1D3A64]">
                      A deposit equal to 30% of the total amount is required to confirm the reservation.
                    </td>
                  </tr>
                  
                  <tr>
                    <td colSpan={6} className="p-4 text-left text-gray-300 font-serif border border-gray-700 bg-[#1D3A64]">
                      A second prepayment equal to another 30% of the total amount is paid 60 days before arrival.
                    </td>
                  </tr>
                  
                  <tr>
                    <td colSpan={6} className="p-4 text-left text-gray-300 font-serif border border-gray-700 bg-[#1D3A64]">
                      The remaining 40% is paid 20 days prior to the arrival at the complex.
                    </td>
                  </tr>
                </tbody>
              </table>
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
