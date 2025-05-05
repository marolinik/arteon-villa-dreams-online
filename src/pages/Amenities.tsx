
import { SectionHeader } from "@/components/ui/section-header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Amenities = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1920')"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative h-full flex flex-col justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            Villa Amenities & Facilities
          </h1>
          <p className="text-xl font-light max-w-2xl">
            Arteon Villas offers amenities that rival a boutique resort while maintaining privacy and comfort
          </p>
        </div>
      </section>
      
      <div className="section-container">
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
                <img 
                  src="https://images.unsplash.com/photo-1571003123771-bd6a099dd83a?q=80&w=1080"
                  alt="Swimming Pool"
                  className="rounded-lg shadow-lg h-80 w-full object-cover"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-villa-teal/20 rounded-full flex items-center justify-center mr-4">
                    <img src="https://cdn-icons-png.flaticon.com/512/5762/5762478.png" alt="Pool" className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium">Swimming Pool & Sun Terrace</h3>
                </div>
                <p className="text-gray-700">
                  At the heart of the property is a crystal-clear outdoor pool surrounded by a wooden deck with sun loungers 
                  and parasols for each villa. The pool is shared by the four villas and is meticulously maintained. It provides 
                  an ideal spot to cool off on hot days or enjoy a relaxing afternoon poolside.
                </p>
                <p className="text-gray-700 mt-3">
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
                    <img src="https://cdn-icons-png.flaticon.com/512/3253/3253016.png" alt="Beach" className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium">Private Beach Area</h3>
                </div>
                <p className="text-gray-700">
                  Just across the small local road from Arteon Villas is Salonikiou Beach. Each villa is provided with its 
                  own set of beach equipment – typically a sun umbrella, two sunbeds, and folding beach chairs designated 
                  for your use on the beach.
                </p>
                <p className="text-gray-700 mt-3">
                  The beach itself has coarse golden sand and clear, shallow waters, making it suitable for swimming and for 
                  children. It remains quiet even in peak season so you can truly relax by the sea. Beach towels are provided 
                  in the villas as well, so no need to pack your own.
                </p>
              </div>
              <div className="md:col-span-3 md:order-2 lg:order-none">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1080"
                  alt="Private Beach"
                  className="rounded-lg shadow-lg h-80 w-full object-cover"
                />
              </div>
            </div>
            
            {/* BBQ & Outdoor Dining */}
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1080"
                  alt="BBQ Area"
                  className="rounded-lg shadow-lg h-80 w-full object-cover"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-villa-green/20 rounded-full flex items-center justify-center mr-4">
                    <img src="https://cdn-icons-png.flaticon.com/512/5990/5990702.png" alt="BBQ" className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium">BBQ & Outdoor Dining</h3>
                </div>
                <p className="text-gray-700">
                  In the garden area, there is a barbecue (BBQ) facility available for guest use. You can grill fresh local 
                  fish or meats and enjoy an outdoor meal at the shaded dining tables on your villa's patio.
                </p>
                <p className="text-gray-700 mt-3">
                  The combination of the barbecue, garden, and pool makes Arteon Villas great for those who enjoy outdoor living 
                  – whether it's family cookouts or a romantic dinner under the stars.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-center">Additional Amenities</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-villa-teal/20 rounded-full flex items-center justify-center mr-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/1257/1257219.png" alt="Playground" className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-medium">Children's Playground</h3>
                </div>
                <p className="text-gray-700">
                  Families with kids will appreciate the small playground on the premises. There's a safe area on the lawn 
                  with a couple of pieces of play equipment (such as a swing or slide), allowing younger guests to have fun on-site.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-villa-blue/20 rounded-full flex items-center justify-center mr-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/2875/2875394.png" alt="WiFi" className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-medium">Free Wi-Fi & Tech</h3>
                </div>
                <p className="text-gray-700">
                  The Wi-Fi covers all villas and all common areas including the pool. It's free of charge and high-speed, 
                  suitable for streaming or even remote working. Each villa also has a flat-screen TV with satellite channels 
                  for entertainment.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-villa-sand/30 rounded-full flex items-center justify-center mr-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/819/819814.png" alt="Parking" className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-medium">Private Parking</h3>
                </div>
                <p className="text-gray-700">
                  Arteon Villas provides a secure private parking area on-site, offered free of charge for guests. The 
                  convenience of having your car right at the property is a plus, especially since exploring Halkidiki is 
                  easiest by car.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-villa-green/20 rounded-full flex items-center justify-center mr-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/995/995053.png" alt="Cleaning" className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-medium">Housekeeping</h3>
                </div>
                <p className="text-gray-700">
                  The villas are thoroughly cleaned and disinfected between guest stays. Housekeeping service and linen 
                  changes can be provided on a twice per week scheduled basis. The owners take great pride in cleanliness.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-villa-teal/20 rounded-full flex items-center justify-center mr-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/3082/3082351.png" alt="AC" className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-medium">Air Conditioning</h3>
                </div>
                <p className="text-gray-700">
                  All villas are equipped with air conditioning in living areas and bedrooms for comfort during the hot Greek summer.
                  There are safety deposit boxes in each unit to store valuables.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-villa-blue/20 rounded-full flex items-center justify-center mr-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/1998/1998125.png" alt="Activities" className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-medium">Activities</h3>
                </div>
                <p className="text-gray-700">
                  While Arteon Villas is about relaxation, there are plenty of activities that can be enjoyed nearby. The sea right 
                  in front is great for swimming, and the calm waters are suitable for snorkeling. The hosts can help organize 
                  water sports such as windsurfing, diving, or canoeing in the area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Amenities;
