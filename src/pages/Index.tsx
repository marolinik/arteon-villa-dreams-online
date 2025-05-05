
import { Link } from "react-router-dom";
import { villas } from "@/data/villas";
import { VillaCard } from "@/components/ui/villa-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1920')"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Arteon Villas
          </h1>
          <p className="text-xl md:text-2xl font-serif mb-8 max-w-2xl">
            Your Perfect Halkidiki Getaway
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-villa-blue hover:bg-blue-800">
              <Link to="/booking">Book Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link to="/gallery">View Gallery</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section className="section-container">
        <SectionHeader 
          title="Welcome to Paradise" 
          subtitle="Arteon Villas is a luxurious complex of four maisonette-style villas located in the tranquil area of Akti Salonikiou on the Sithonia peninsula of Halkidiki."
          centered
        />
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4">
              Each villa enjoys stunning sea views and shares a well-maintained garden with a swimming pool and sun terrace, perfect for relaxation. On-site private parking is available for guests' convenience.
            </p>
            <p className="mb-4">
              The property is just a few minutes' walk (approx. 100 m) from the quiet Salonikiou Beach, offering guests a peaceful seaside retreat.
            </p>
            <p className="mb-6">
              Arteon Villas sits about 5 km from the traditional village of Agios Nikolaos (Sithonia), giving a sense of seclusion while still being a short drive from local tavernas and shops. The closest airport is Thessaloniki International (SKG), approximately 100 km away (around 1.5 hours by car).
            </p>
            
            <div className="flex items-center gap-2 text-villa-blue mb-6">
              <MapPin size={20} />
              <span className="font-medium">Akti Salonikiou, Sithonia, Halkidiki, Greece</span>
            </div>
            
            <Link to="/gallery">
              <Button className="bg-villa-blue hover:bg-blue-800">
                Explore the Property
              </Button>
            </Link>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200" 
              alt="Arteon Villas" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Our Villas Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Luxurious Villas" 
            subtitle="Choose from our four stunning sea-view villas, each designed to provide the ultimate comfort and relaxation during your Halkidiki getaway."
            centered
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {villas.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Amenities Section */}
      <section className="section-container">
        <SectionHeader 
          title="Villa Amenities & Facilities" 
          subtitle="Arteon Villas offers amenities that rival a boutique resort while maintaining the privacy and comfort of a holiday home."
          centered
        />
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-14 h-14 bg-villa-teal/20 rounded-full flex items-center justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/5762/5762478.png" alt="Swimming Pool" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-medium mb-3">Swimming Pool & Sun Terrace</h3>
            <p className="text-gray-600">
              A crystal-clear outdoor pool surrounded by a wooden deck with sun loungers and parasols for each villa.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-14 h-14 bg-villa-sand/30 rounded-full flex items-center justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3253/3253016.png" alt="Private Beach" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-medium mb-3">Private Beach Area</h3>
            <p className="text-gray-600">
              Each villa is provided with its own set of beach equipment on the uncrowded Salonikiou Beach.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-14 h-14 bg-villa-green/20 rounded-full flex items-center justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/5990/5990702.png" alt="BBQ" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-medium mb-3">BBQ & Outdoor Dining</h3>
            <p className="text-gray-600">
              Barbecue facility available for guest use with shaded dining tables on your villa's patio.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/booking">
            <Button size="lg" className="bg-villa-blue hover:bg-blue-800">
              Book Your Stay Now
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-villa-blue/10 py-16">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="What Our Guests Say" 
            subtitle="Arteon Villas boasts an exceptional reputation, with a 9.8/10 'Exceptional' rating based on guest reviews."
            centered
          />
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-villa-sand rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">Maria K.</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The villa was absolutely stunning, with amazing views of the sea. Everything was spotlessly clean and the hosts were incredibly welcoming. We'll definitely be coming back next year!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-villa-teal rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">Thomas L.</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Perfect location, just steps from a beautiful, uncrowded beach. The villa had everything we needed, and the pool area was fantastic. Highly recommend for families looking for a peaceful retreat."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-16 bg-center bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1920')"
        }}
      >
        <div className="absolute inset-0 bg-villa-navy/70" />
        <div className="container relative mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Ready to Experience Arteon Villas?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-white/90">
            Book your stay today and discover the perfect blend of luxury, comfort, and natural beauty at our seaside retreat in Halkidiki.
          </p>
          <Button asChild size="lg" className="bg-white text-villa-navy hover:bg-gray-100">
            <Link to="/booking">Book Your Villa Now</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
