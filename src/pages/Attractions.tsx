
import { SectionHeader } from "@/components/ui/section-header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { MapPin, ImageIcon } from "lucide-react";

const heroBackgroundImage = "/lovable-uploads/31172d6b-392e-445c-996a-763f1bed68bb.png";
const beachImage = "/lovable-uploads/2c1e4f80-8aef-4f2b-b1f9-b33cc8918107.png";
const mountAthosImage = "/lovable-uploads/16e396f9-26ed-498e-8812-e9ec4baee2f3.png";
const pyrgadikiaImage = "/lovable-uploads/933815bb-5a56-43a4-ada7-4c974046bce7.png";
const agiosNikolaosImage = "/lovable-uploads/912c27ba-131e-4e1c-9fc3-1608dbf2df69.png";
const ormosPanagiasImage = "/lovable-uploads/be3e1f96-33fd-46eb-9e18-f84f96336e90.png";
const metagkitsiImage = "/lovable-uploads/44f74968-2505-411c-8ba8-56057e31ffd4.png";

// Beach images for the Beautiful Beaches section
const vourvourouBeachImage = "/lovable-uploads/db686af8-1d18-4972-a594-61131db2aef8.png";
const kalogriaBayImage = "/lovable-uploads/7a963ea4-de5e-4fc6-ae02-386e71b04662.png";
const karydiBeachImage = "/lovable-uploads/726c87bf-d710-484f-8e9e-5b3dc370dc62.png";

const Attractions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F1524]">
      <Navbar />
      
      <PageHero
        title="Nearby Attractions"
        subtitle="Explore the beautiful surroundings and activities near Arteon Villas"
        backgroundImage={heroBackgroundImage}
      />
      
      <main className="py-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <SectionHeader 
              title="Explore Sithonia"
              subtitle="Arteon Villas is situated in the Akti Salonikiou area of Sithonia, known for its natural beauty and low-key atmosphere."
              titleClassName="text-white"
            />
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-[#1D3A64] rounded-lg overflow-hidden border border-gray-700 shadow-xl">
                <div className="h-64 w-full bg-[#172B4D] overflow-hidden">
                  <img 
                    src={beachImage}
                    alt="Salonikiou Beach with crystal clear turquoise waters"
                    className="w-full h-full object-cover"
                  />
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
              
              <div className="bg-[#1D3A64] rounded-lg overflow-hidden border border-gray-700 shadow-xl">
                <div className="h-64 w-full bg-[#172B4D] overflow-hidden">
                  <img 
                    src={mountAthosImage}
                    alt="Mount Athos cruise boat with mountain in background"
                    className="w-full h-full object-cover"
                  />
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
            <SectionHeader title="Dining Nearby" titleClassName="text-white" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#1D3A64] rounded-lg shadow-xl overflow-hidden border border-gray-700">
                <div className="h-48 bg-[#172B4D] overflow-hidden">
                  <img 
                    src={pyrgadikiaImage}
                    alt="Pyrgadikia village evening restaurant scene with diners"
                    className="w-full h-full object-cover"
                  />
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
              
              <div className="bg-[#1D3A64] rounded-lg shadow-xl overflow-hidden border border-gray-700">
                <div className="h-48 bg-[#172B4D] overflow-hidden">
                  <img 
                    src={agiosNikolaosImage}
                    alt="Agios Nikolaos restaurant with beautiful lake view"
                    className="w-full h-full object-cover"
                  />
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
              
              <div className="bg-[#1D3A64] rounded-lg shadow-xl overflow-hidden border border-gray-700">
                <div className="h-48 bg-[#172B4D] overflow-hidden">
                  <img 
                    src={ormosPanagiasImage}
                    alt="Ormos Panagias seaside taverna with turquoise waters"
                    className="w-full h-full object-cover"
                  />
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
              
              <div className="bg-[#1D3A64] rounded-lg shadow-xl overflow-hidden border border-gray-700">
                <div className="h-48 bg-[#172B4D] overflow-hidden">
                  <img 
                    src={metagkitsiImage}
                    alt="Metagkitsi village with stone houses and outdoor dining"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-serif font-medium mb-2 text-white">Metagkitsi</h3>
                  <p className="text-gray-300 mb-3">
                    A nearby traditional village, just 5.2 km away. Known for its tranquil charm, it features stone-built houses, 
                    a small central square, and a few cozy tavernas offering local delicacies.
                  </p>
                  <div className="flex items-center text-amber-400 text-sm">
                    <MapPin size={16} className="mr-2" />
                    <span>5.2km (7 min drive)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <SectionHeader title="Activities & Sightseeing" titleClassName="text-white" />
            
            <div className="space-y-6">
              <div className="bg-[#1D3A64] p-6 rounded-lg shadow-xl border border-gray-700">
                <h3 className="text-xl font-serif font-medium mb-3 text-white">Beautiful Beaches</h3>
                <p className="text-gray-300 mb-4">
                  If you drive south from Arteon Villas, within 20–30 minutes you can reach other renowned beaches like 
                  Vourvourou (with its cluster of islets and calm lagoon-like waters), Karydi Beach (known for its 
                  Caribbean-esque turquoise shallows), or Kalogria Beach (fine sand, popular for families).
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-md h-24 w-full bg-[#172B4D] overflow-hidden">
                    <img 
                      src={vourvourouBeachImage} 
                      alt="Aerial view of Vourvourou Bay with its stunning turquoise waters" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-md h-24 w-full bg-[#172B4D] overflow-hidden">
                    <img 
                      src={karydiBeachImage} 
                      alt="Beautiful Karydi Beach with its clear turquoise waters and sandy shores" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-md h-24 w-full bg-[#172B4D] overflow-hidden">
                    <img 
                      src={kalogriaBayImage} 
                      alt="Kalogria Bay with beach umbrellas and crystal clear waters" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1D3A64] p-6 rounded-lg shadow-xl border border-gray-700">
                <h3 className="text-xl font-serif font-medium mb-3 text-white">Hiking & Nature</h3>
                <p className="text-gray-300 mb-4">
                  For those interested in hiking, there are several trails in the Sithonia area. One recommended short hike 
                  is to the nearby "Panoramic View" hill (about 3–4 km from the villas) – as the name suggests, it offers a 
                  sweeping view of the coastline and both Sithonia and Athos peninsulas.
                </p>
              </div>
              
              <div className="bg-[#1D3A64] p-6 rounded-lg shadow-xl border border-gray-700">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Attractions;
