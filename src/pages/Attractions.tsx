
import { SectionHeader } from "@/components/ui/section-header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin } from "lucide-react";

const Attractions = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('/lovable-uploads/33403808-db10-4b5b-af0c-622fcec85c57.png')"
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Nearby Attractions
          </h1>
          <p className="text-xl md:text-2xl font-serif max-w-3xl">
            Explore the beautiful surroundings and activities near Arteon Villas
          </p>
        </div>
      </section>
      
      <div className="section-container">
        <div className="mb-16">
          <SectionHeader 
            title="Explore Sithonia"
            subtitle="Arteon Villas is situated in the Akti Salonikiou area of Sithonia, known for its natural beauty and low-key atmosphere."
          />
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1080" 
                alt="Salonikiou Beach" 
                className="rounded-lg shadow-md h-64 w-full object-cover"
              />
              <h3 className="text-xl font-serif font-medium mt-4 mb-2">Salonikiou Beach (Kortiri Beach)</h3>
              <p className="text-gray-700">
                The nearest beach is Salonikiou Beach, essentially at the foot of the property (about 3–5 minutes on foot). 
                This beach is prized for its cleanliness and calm, uncrowded waters. From here, you can gaze across the 
                Gulf of Mount Athos and even see the silhouette of Mount Athos in the distance on a clear day.
              </p>
              <div className="flex items-center mt-3 text-villa-blue">
                <MapPin size={18} className="mr-2" />
                <span className="font-medium">100m from Arteon Villas</span>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1617369120004-4fc70312c5e6?q=80&w=1080" 
                alt="Mount Athos" 
                className="rounded-lg shadow-md h-64 w-full object-cover"
              />
              <h3 className="text-xl font-serif font-medium mt-4 mb-2">Mount Athos Cruise</h3>
              <p className="text-gray-700">
                A unique excursion is to take a day trip to Mount Athos. While women cannot enter the monastic republic, 
                everyone can enjoy a Mount Athos cruise: boats depart from Ormos Panagias (9 km away) and tour along the 
                Athos coast, where you can see the magnificent monasteries from the sea.
              </p>
              <div className="flex items-center mt-3 text-villa-blue">
                <MapPin size={18} className="mr-2" />
                <span className="font-medium">9km from Arteon Villas</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <SectionHeader title="Dining Nearby" />
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800" 
                  alt="Pyrgadikia Village" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-serif font-medium mb-2">Pyrgadikia</h3>
                <p className="text-gray-600 mb-3">
                  A charming fishing village roughly 7 km north (10–15 minutes' drive). Pyrgadikia has several seafront 
                  tavernas and cafes, especially known for fresh fish.
                </p>
                <div className="flex items-center text-villa-blue text-sm">
                  <MapPin size={16} className="mr-2" />
                  <span>7km (10-15 min drive)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=800" 
                  alt="Agios Nikolaos" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-serif font-medium mb-2">Agios Nikolaos</h3>
                <p className="text-gray-600 mb-3">
                  The nearest town, about 5 km inland. This traditional village has a beautiful central square lined with 
                  tavernas, kafeneions (cafés), and bakeries.
                </p>
                <div className="flex items-center text-villa-blue text-sm">
                  <MapPin size={16} className="mr-2" />
                  <span>5km (10 min drive)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1527142879-95b61a0b8226?q=80&w=800" 
                  alt="Ormos Panagias" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-serif font-medium mb-2">Ormos Panagias</h3>
                <p className="text-gray-600 mb-3">
                  A small harbor settlement about 8-9 km to the south. Here you'll find notable tavernas famous for seafood 
                  and beach bars on Trani Ammouda Beach.
                </p>
                <div className="flex items-center text-villa-blue text-sm">
                  <MapPin size={16} className="mr-2" />
                  <span>8-9km (10 min drive)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <SectionHeader title="Activities & Sightseeing" />
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif font-medium mb-3">Beautiful Beaches</h3>
              <p className="text-gray-700 mb-4">
                If you drive south from Arteon Villas, within 20–30 minutes you can reach other renowned beaches like 
                Vourvourou (with its cluster of islets and calm lagoon-like waters), Karydi Beach (known for its 
                Caribbean-esque turquoise shallows), or Kalogria Beach (fine sand, popular for families).
              </p>
              <div className="grid grid-cols-3 gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400" 
                  alt="Beach" 
                  className="rounded-md h-24 w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=400" 
                  alt="Beach" 
                  className="rounded-md h-24 w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=400" 
                  alt="Beach" 
                  className="rounded-md h-24 w-full object-cover"
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif font-medium mb-3">Hiking & Nature</h3>
              <p className="text-gray-700 mb-4">
                For those interested in hiking, there are several trails in the Sithonia area. One recommended short hike 
                is to the nearby "Panoramic View" hill (about 3–4 km from the villas) – as the name suggests, it offers a 
                sweeping view of the coastline and both Sithonia and Athos peninsulas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif font-medium mb-3">Boat Rentals & Water Sports</h3>
              <p className="text-gray-700">
                Boat rentals are available in Vourvourou (20 km away) if you'd like to rent a small boat and explore 
                Diaporos Island on your own – a popular adventure. The hosts can help organize water sports such as 
                windsurfing, diving, or canoeing in the area, as Halkidiki's coasts offer these opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Attractions;
