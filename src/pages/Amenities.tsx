
import { SectionHeader } from "@/components/ui/section-header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ImageIcon, Waves, BedDouble, Wifi, Tv, MapPin, Utensils, Users, CalendarCheck } from "lucide-react";

const Amenities = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F1524]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-[#172B4D] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0F1524]/60" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white fade-in">
            Villa Amenities & Facilities
          </h1>
          <p className="text-xl text-amber-400 max-w-2xl mx-auto fade-in">
            Arteon Villas offers amenities that rival a boutique resort while maintaining privacy and comfort
          </p>
        </div>
      </section>
      
      <main className="py-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader 
              title="Premium Facilities"
              subtitle="Enjoy resort-like amenities with the privacy and comfort of a holiday home."
              centered
            />
            
            <div className="grid gap-12">
              {/* Swimming Pool */}
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3">
                  <div className="rounded-lg shadow-lg h-80 w-full bg-[#172B4D] flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col items-center justify-center">
                      <Waves size={64} className="text-gray-400" />
                      <p className="mt-4 text-gray-300">Swimming pool image</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-villa-teal/20 rounded-full flex items-center justify-center mr-4">
                      <Waves size={20} className="text-villa-teal" />
                    </div>
                    <h3 className="text-2xl font-serif font-medium text-white">Swimming Pool & Sun Terrace</h3>
                  </div>
                  <p className="text-gray-300">
                    At the heart of the property is a crystal-clear outdoor pool surrounded by a wooden deck with sun loungers 
                    and parasols for each villa. The pool is shared by the four villas and is meticulously maintained. It provides 
                    an ideal spot to cool off on hot days or enjoy a relaxing afternoon poolside.
                  </p>
                  <p className="text-gray-300 mt-3">
                    The surrounding garden is landscaped with grass and local plants, creating a soothing environment. In the 
                    evenings, ambient lighting around the pool and garden makes for a charming atmosphere perfect for a night 
                    swim or a barbecue under the stars.
                  </p>
                </div>
              </div>
              
              {/* Private Beach Area */}
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2 md:order-1 lg:order-none">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-villa-sand/30 rounded-full flex items-center justify-center mr-4">
                      <MapPin size={20} className="text-villa-sand" />
                    </div>
                    <h3 className="text-2xl font-serif font-medium text-white">Private Beach Area</h3>
                  </div>
                  <p className="text-gray-300">
                    Just across the small local road from Arteon Villas is Salonikiou Beach. Each villa is provided with its 
                    own set of beach equipment – typically a sun umbrella, two sunbeds, and folding beach chairs designated 
                    for your use on the beach.
                  </p>
                  <p className="text-gray-300 mt-3">
                    The beach itself has coarse golden sand and clear, shallow waters, making it suitable for swimming and for 
                    children. It remains quiet even in peak season so you can truly relax by the sea. Beach towels are provided 
                    in the villas as well, so no need to pack your own.
                  </p>
                </div>
                <div className="md:col-span-3 md:order-2 lg:order-none">
                  <div className="rounded-lg shadow-lg h-80 w-full bg-[#172B4D] flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col items-center justify-center">
                      <ImageIcon size={64} className="text-gray-400" />
                      <p className="mt-4 text-gray-300">Beach area image</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* BBQ & Outdoor Dining */}
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3">
                  <div className="rounded-lg shadow-lg h-80 w-full bg-[#172B4D] flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col items-center justify-center">
                      <Utensils size={64} className="text-gray-400" />
                      <p className="mt-4 text-gray-300">BBQ area image</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-villa-green/20 rounded-full flex items-center justify-center mr-4">
                      <Utensils size={20} className="text-villa-green" />
                    </div>
                    <h3 className="text-2xl font-serif font-medium text-white">BBQ & Outdoor Dining</h3>
                  </div>
                  <p className="text-gray-300">
                    In the garden area, there is a barbecue (BBQ) facility available for guest use. You can grill fresh local 
                    fish or meats and enjoy an outdoor meal at the shaded dining tables on your villa's patio.
                  </p>
                  <p className="text-gray-300 mt-3">
                    The combination of the barbecue, garden, and pool makes Arteon Villas great for those who enjoy outdoor living 
                    – whether it's family cookouts or a romantic dinner under the stars.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-center text-white">Additional Amenities</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#1D3A64] p-6 rounded-lg shadow-lg border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-villa-teal/20 rounded-full flex items-center justify-center mr-3">
                      <Users size={18} className="text-villa-teal" />
                    </div>
                    <h3 className="text-xl font-serif font-medium text-white">Children's Playground</h3>
                  </div>
                  <p className="text-gray-300">
                    Families with kids will appreciate the small playground on the premises. There's a safe area on the lawn 
                    with a couple of pieces of play equipment (such as a swing or slide), allowing younger guests to have fun on-site.
                  </p>
                </div>
                
                <div className="bg-[#1D3A64] p-6 rounded-lg shadow-lg border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-villa-blue/20 rounded-full flex items-center justify-center mr-3">
                      <Wifi size={18} className="text-villa-blue" />
                    </div>
                    <h3 className="text-xl font-serif font-medium text-white">Free Wi-Fi & Tech</h3>
                  </div>
                  <p className="text-gray-300">
                    The Wi-Fi covers all villas and all common areas including the pool. It's free of charge and high-speed, 
                    suitable for streaming or even remote working. Each villa also has a flat-screen TV with satellite channels 
                    for entertainment.
                  </p>
                </div>
                
                <div className="bg-[#1D3A64] p-6 rounded-lg shadow-lg border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-villa-sand/30 rounded-full flex items-center justify-center mr-3">
                      <MapPin size={18} className="text-villa-sand" />
                    </div>
                    <h3 className="text-xl font-serif font-medium text-white">Private Parking</h3>
                  </div>
                  <p className="text-gray-300">
                    Arteon Villas provides a secure private parking area on-site, offered free of charge for guests. The 
                    convenience of having your car right at the property is a plus, especially since exploring Halkidiki is 
                    easiest by car.
                  </p>
                </div>
                
                <div className="bg-[#1D3A64] p-6 rounded-lg shadow-lg border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-villa-green/20 rounded-full flex items-center justify-center mr-3">
                      <CalendarCheck size={18} className="text-villa-green" />
                    </div>
                    <h3 className="text-xl font-serif font-medium text-white">Housekeeping</h3>
                  </div>
                  <p className="text-gray-300">
                    The villas are thoroughly cleaned and disinfected between guest stays. Housekeeping service and linen 
                    changes can be provided on a twice per week scheduled basis. The owners take great pride in cleanliness.
                  </p>
                </div>
                
                <div className="bg-[#1D3A64] p-6 rounded-lg shadow-lg border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-villa-teal/20 rounded-full flex items-center justify-center mr-3">
                      <BedDouble size={18} className="text-villa-teal" />
                    </div>
                    <h3 className="text-xl font-serif font-medium text-white">Air Conditioning</h3>
                  </div>
                  <p className="text-gray-300">
                    All villas are equipped with air conditioning in living areas and bedrooms for comfort during the hot Greek summer.
                    There are safety deposit boxes in each unit to store valuables.
                  </p>
                </div>
                
                <div className="bg-[#1D3A64] p-6 rounded-lg shadow-lg border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-villa-blue/20 rounded-full flex items-center justify-center mr-3">
                      <Tv size={18} className="text-villa-blue" />
                    </div>
                    <h3 className="text-xl font-serif font-medium text-white">Activities</h3>
                  </div>
                  <p className="text-gray-300">
                    While Arteon Villas is about relaxation, there are plenty of activities that can be enjoyed nearby. The sea right 
                    in front is great for swimming, and the calm waters are suitable for snorkeling. The hosts can help organize 
                    water sports such as windsurfing, diving, or canoeing in the area, as Halkidiki's coasts offer these opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Amenities;
