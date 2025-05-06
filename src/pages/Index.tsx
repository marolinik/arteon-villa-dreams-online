import { Link } from "react-router-dom";
import { villas } from "@/data/villas";
import { VillaCard } from "@/components/ui/villa-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/layout/HeroSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const heroBackgroundImage = "/lovable-uploads/33312371-b782-4168-974b-ccfb2f8b74c7.png";

// Updated amenity images from uploaded images
const poolImage = "/lovable-uploads/c3e2f735-08e9-4b1d-a593-adf24209b021.png";
const beachImage = "/lovable-uploads/91f20945-a0b3-4c4e-85e1-d9199efbc6ab.png";
const bbqImage = "/lovable-uploads/689c9332-a346-42ed-9503-f0cb8c984271.png";
const Index = () => {
  return <>
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <HeroSection title="Arteon Villas" subtitle="Your Perfect Halkidiki Getaway" backgroundImage={heroBackgroundImage}>
        <div className="flex flex-wrap gap-6 justify-center">
          <Link to="/booking" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white px-8 py-3 rounded-md text-lg font-medium transition-all">
            Book Now
          </Link>
          <Link to="/gallery" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white px-8 py-3 rounded-md text-lg font-medium transition-all">
            View Gallery
          </Link>
        </div>
      </HeroSection>
      
      {/* Overview Section */}
      <section className="section-container bg-[#07091A]">
        <SectionHeader title="Welcome to Paradise" subtitle="Arteon Villas is a luxurious complex of four maisonette-style villas located in the tranquil area of Akti Salonikiou on the Sithonia peninsula of Halkidiki." centered />
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4 text-villa-cream">
              Each villa enjoys stunning sea views and shares a well-maintained garden with a swimming pool and sun terrace, perfect for relaxation. On-site private parking is available for guests' convenience.
            </p>
            <p className="mb-4 text-villa-cream text-justify">
              The property is just a few minutes' walk (approx. 100 m) from the quiet Salonikiou Beach, offering guests a peaceful seaside retreat.
            </p>
            <p className="mb-6 text-villa-cream text-justify">
              Arteon Villas sits about 5 km from the traditional village of Agios Nikolaos (Sithonia), giving a sense of seclusion while still being a short drive from local tavernas and shops. The closest airport is Thessaloniki International (SKG), approximately 100 km away (around 1.5 hours by car).
            </p>
            
            <div className="flex items-center gap-2 mb-10">
              <MapPin size={24} className="text-orange-500" />
              <span className="font-medium text-orange-500">Akti Salonikiou, Sithonia, Halkidiki, Greece</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
              <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white h-10 text-sm font-medium rounded-md w-full md:w-40 px-4">
                <Link to="/gallery">
                  Explore the Property
                </Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white h-10 text-sm font-medium rounded-md w-full md:w-40 px-4">
                <Link to="/attractions">
                  Nearby Attractions
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg h-[450px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2634.9032757437003!2d23.691418775298548!3d40.29760116288237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a895000c2d8971%3A0x580e197d9810c112!2sARTEON%20VILLAS!5e1!3m2!1ssr!2srs!4v1746447525225!5m2!1ssr!2srs" width="100%" height="100%" style={{
            border: 0
          }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Arteon Villas Location" className="w-full h-full"></iframe>
          </div>
        </div>
      </section>
      
      {/* Our Villas Section */}
      <section className="py-16 bg-[#07091A]">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Luxurious Villas" subtitle="Choose from our four stunning sea-view villas, each designed to provide the ultimate comfort and relaxation during your Halkidiki getaway." centered />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {villas.map(villa => <VillaCard key={villa.id} villa={villa} />)}
          </div>
        </div>
      </section>
      
      {/* Amenities Section - Modified with new layout and images */}
      <section className="section-container bg-[#07091A]">
        <SectionHeader title="Villa Amenities & Facilities" subtitle="Arteon Villas offers amenities that rival a boutique resort while maintaining the privacy and comfort of a holiday home." centered />
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Pool amenity - Updated layout and image - Now with center aligned text like the others */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="rounded-lg overflow-hidden h-52">
              <img src={poolImage} alt="Swimming pool" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              
              <p className="text-gray-600 text-center">
                A crystal-clear outdoor pool surrounded by a wooden deck with sun loungers and parasols for each villa.
              </p>
            </div>
          </div>
          
          {/* Beach amenity - Updated layout and image */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="rounded-lg overflow-hidden h-52">
              <img src={beachImage} alt="Beach area" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              
              <p className="text-gray-600 text-center">
                Each villa is provided with its own set of beach equipment on the uncrowded Salonikiou Beach.
              </p>
            </div>
          </div>
          
          {/* BBQ amenity - Updated layout and image */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="rounded-lg overflow-hidden h-52">
              <img src={bbqImage} alt="BBQ area" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              
              <p className="text-gray-600 text-center">
                Barbecue facility available for guest use with shaded dining tables on your villa's patio.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/amenities">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white">
              Explore All Amenities
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-[#07091A]">
        <div className="container mx-auto px-4">
          <SectionHeader title="What Our Guests Say" subtitle="Arteon Villas boasts an exceptional reputation, with a 9.8/10 'Exceptional' rating based on guest reviews." centered titleClassName="text-white" className="text-white" />
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-amber-400">
                    <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="Maria K." />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-[#0F1524] text-lg font-semibold">Maria K.</h4>
                    <div className="flex text-amber-500">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#5d6970] italic">
                  "The villa was absolutely stunning, with amazing views of the sea. Everything was spotlessly clean and the hosts were incredibly welcoming. We'll definitely be coming back next year!"
                </p>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-amber-400">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="Thomas L." />
                    <AvatarFallback>TL</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-[#0F1524] text-lg font-semibold">Thomas L.</h4>
                    <div className="flex text-amber-500">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#5d6970] italic">
                  "Perfect location, just steps from a beautiful, uncrowded beach. The villa had everything we needed, and the pool area was fantastic. Highly recommend for families looking for a peaceful retreat."
                </p>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-amber-400">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="Alexandra M." />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-[#0F1524] text-lg font-semibold">Alexandra M.</h4>
                    <div className="flex text-amber-500">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#5d6970] italic">
                  "We had an amazing stay at Arteon Villas. The location is perfect - quiet and secluded but still close to restaurants and attractions. The villa was beautifully furnished and the views were breathtaking. Can't wait to return!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-16 bg-[#07091A]">
        <div className="absolute inset-0 bg-villa-navy/70" />
        <div className="container relative mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Ready to Experience Arteon Villas?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-white/90">
            Book your stay today and discover the perfect blend of luxury, comfort, and natural beauty at our seaside retreat in Halkidiki.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white px-8 py-3 h-14 text-base font-medium rounded-md w-64">
            <Link to="/booking">
              Book Your Villa Now
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </>;
};
export default Index;