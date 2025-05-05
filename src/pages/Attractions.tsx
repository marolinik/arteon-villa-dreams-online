
import { SectionHeader } from "@/components/ui/section-header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, ImageIcon } from "lucide-react";

const Attractions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-slate-900" >
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="container relative h-full flex flex-col justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            Nearby Attractions
          </h1>
          <p className="text-xl font-light max-w-2xl text-amber-400">
            Explore the beautiful surroundings and activities near Arteon Villas
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-16 bg-slate-950 text-white">
        <div className="mb-16">
          <SectionHeader 
            title="Explore Sithonia"
            subtitle="Arteon Villas is situated in the Akti Salonikiou area of Sithonia, known for its natural beauty and low-key atmosphere."
          />
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-slate-900 rounded-lg overflow-hidden border border-gray-800 shadow-xl">
              <div className="h-64 w-full bg-slate-800 flex items-center justify-center">
                <ImageIcon size={48} className="text-slate-600" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-medium mb-2 text-white">
                  Salonikiou Beach (Kortiri Beach)
                </h3>
                <p className="text-gray-300 mb-4">
                  The nearest beach is Salonikiou Beach, essentially at the foot of the property (about 3–5 minutes on foot). 
                  This beach is prized for its cleanliness and calm, uncrowded waters. From here, you can gaze across the 
                  Gulf of Mount Athos and even see the silhouette of Mount Athos in the distance on a clear day.
                </p>
                <div className="flex items-center mt-3 text-amber-400">
                  <MapPin size={18} className="mr-2" />
                  <span className="font-medium">100m from Arteon Villas</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-lg overflow-hidden border border-gray-800 shadow-xl">
              <div className="h-64 w-full bg-slate-800 flex items-center justify-center">
                <ImageIcon size={48} className="text-slate-600" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-medium mb-2 text-white">Mount Athos Cruise</h3>
                <p className="text-gray-300 mb-4">
                  A unique excursion is to take a day trip to Mount Athos. While women cannot enter the monastic republic, 
                  everyone can enjoy a Mount Athos cruise: boats depart from Ormos Panagias (9 km away) and tour along the 
                  Athos coast, where you can see the magnificent monasteries from the sea.
                </p>
                <div className="flex items-center mt-3 text-amber-400">
                  <MapPin size={18} className="mr-2" />
                  <span className="font-medium">9km from Arteon Villas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <SectionHeader title="Dining Nearby" />
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 rounded-lg shadow-xl overflow-hidden border border-gray-800">
              <div className="h-48 bg-slate-800 flex items-center justify-center">
                <ImageIcon size={36} className="text-slate-600" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-serif font-medium mb-2 text-white">Pyrgadikia</h3>
                <p className="text-gray-300 mb-3">
                  A charming fishing village roughly 7 km north (10–15 minutes' drive). Pyrgadikia has several seafront 
                  tavernas and cafes, especially known for fresh fish.
                </p>
                <div className="flex items-center text-amber-400 text-sm">
                  <MapPin size={16} className="mr-2" />
                  <span>7km (10-15 min drive)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-lg shadow-xl overflow-hidden border border-gray-800">
              <div className="h-48 bg-slate-800 flex items-center justify-center">
                <ImageIcon size={36} className="text-slate-600" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-serif font-medium mb-2 text-white">Agios Nikolaos</h3>
                <p className="text-gray-300 mb-3">
                  The nearest town, about 5 km inland. This traditional village has a beautiful central square lined with 
                  tavernas, kafeneions (cafés), and bakeries.
                </p>
                <div className="flex items-center text-amber-400 text-sm">
                  <MapPin size={16} className="mr-2" />
                  <span>5km (10 min drive)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-lg shadow-xl overflow-hidden border border-gray-800">
              <div className="h-48 bg-slate-800 flex items-center justify-center">
                <ImageIcon size={36} className="text-slate-600" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-serif font-medium mb-2 text-white">Ormos Panagias</h3>
                <p className="text-gray-300 mb-3">
                  A small harbor settlement about 8-9 km to the south. Here you'll find notable tavernas famous for seafood 
                  and beach bars on Trani Ammouda Beach.
                </p>
                <div className="flex items-center text-amber-400 text-sm">
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
            <div className="bg-slate-900 p-6 rounded-lg shadow-xl border border-gray-800">
              <h3 className="text-xl font-serif font-medium mb-3 text-white">Beautiful Beaches</h3>
              <p className="text-gray-300 mb-4">
                If you drive south from Arteon Villas, within 20–30 minutes you can reach other renowned beaches like 
                Vourvourou (with its cluster of islets and calm lagoon-like waters), Karydi Beach (known for its 
                Caribbean-esque turquoise shallows), or Kalogria Beach (fine sand, popular for families).
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-md h-24 w-full bg-slate-800 flex items-center justify-center">
                  <ImageIcon size={24} className="text-slate-600" />
                </div>
                <div className="rounded-md h-24 w-full bg-slate-800 flex items-center justify-center">
                  <ImageIcon size={24} className="text-slate-600" />
                </div>
                <div className="rounded-md h-24 w-full bg-slate-800 flex items-center justify-center">
                  <ImageIcon size={24} className="text-slate-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 p-6 rounded-lg shadow-xl border border-gray-800">
              <h3 className="text-xl font-serif font-medium mb-3 text-white">Hiking & Nature</h3>
              <p className="text-gray-300 mb-4">
                For those interested in hiking, there are several trails in the Sithonia area. One recommended short hike 
                is to the nearby "Panoramic View" hill (about 3–4 km from the villas) – as the name suggests, it offers a 
                sweeping view of the coastline and both Sithonia and Athos peninsulas.
              </p>
            </div>
            
            <div className="bg-slate-900 p-6 rounded-lg shadow-xl border border-gray-800">
              <h3 className="text-xl font-serif font-medium mb-3 text-white">Boat Rentals & Water Sports</h3>
              <p className="text-gray-300">
                Boat rentals are available in Vourvourou (20 km away) if you'd like to rent a small boat and explore 
                Diaporos Island on your own – a popular adventure. The hosts can help organize water sports such as 
                windsurfing, diving, or canoeing in the area, as Halkidiki's coasts offer these opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Attractions;
