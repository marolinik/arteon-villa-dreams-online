import { Link } from "react-router-dom";
import { villas } from "@/data/villas";
import { VillaCard } from "@/components/ui/villa-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[600px] bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{
      backgroundImage: "url('/lovable-uploads/d3e2077a-1823-4b3f-a63e-9b43d9afe6fe.png')"
    }}>
        <div className="absolute inset-0 bg-[#0F1524]/80" />
        <div className="container relative flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8">
            Arteon Villas
          </h1>
          <p className="text-xl md:text-3xl font-serif mb-16 max-w-3xl">
            Your Perfect Halkidiki Getaway
          </p>
          <div className="flex flex-row gap-6">
            <Button asChild size="lg" variant="default" className="w-40 h-12 text-base rounded-md">
              <Link to="/booking">
                Book Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="default" className="w-40 h-12 text-base rounded-md">
              <Link to="/gallery">
                View Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section className="section-container">
        <SectionHeader title="Welcome to Paradise" subtitle="Arteon Villas is a luxurious complex of four maisonette-style villas located in the tranquil area of Akti Salonikiou on the Sithonia peninsula of Halkidiki." centered />
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4 text-villa-cream">
              Each villa enjoys stunning sea views and shares a well-maintained garden with a swimming pool and sun terrace, perfect for relaxation. On-site private parking is available for guests' convenience.
            </p>
            <p className="mb-4 text-villa-cream">
              The property is just a few minutes' walk (approx. 100 m) from the quiet Salonikiou Beach, offering guests a peaceful seaside retreat.
            </p>
            <p className="mb-6 text-villa-cream">
              Arteon Villas sits about 5 km from the traditional village of Agios Nikolaos (Sithonia), giving a sense of seclusion while still being a short drive from local tavernas and shops. The closest airport is Thessaloniki International (SKG), approximately 100 km away (around 1.5 hours by car).
            </p>
            
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={20} className="text-villa-terracotta" />
              <span className="font-medium text-villa-terracotta">Akti Salonikiou, Sithonia, Halkidiki, Greece</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/gallery">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white px-8 py-3 h-14 text-lg font-medium rounded-md w-64">
                  Explore the Property
                </Button>
              </Link>
              <Link to="/attractions">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white px-8 py-3 h-14 text-lg font-medium rounded-md w-64">
                  Nearby Attractions
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg h-[450px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2634.9032757437003!2d23.691418775298548!3d40.29760116288237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a895000c2d8971%3A0x580e197d9810c112!2sARTEON%20VILLAS!5e1!3m2!1ssr!2srs!4v1746447525225!5m2!1ssr!2srs" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Arteon Villas Location"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* Our Villas Section */}
      <section className="py-16" style={{
      backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('https://arteonvillas.com/wp-content/uploads/2022/06/drone01sm.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Luxurious Villas" subtitle="Choose from our four stunning sea-view villas, each designed to provide the ultimate comfort and relaxation during your Halkidiki getaway." centered />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {villas.map(villa => <VillaCard key={villa.id} villa={villa} />)}
          </div>
        </div>
      </section>
      
      {/* Amenities Section */}
      <section className="section-container">
        <SectionHeader title="Villa Amenities & Facilities" subtitle="Arteon Villas offers amenities that rival a boutique resort while maintaining the privacy and comfort of a holiday home." centered />
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-villa-teal/20 rounded-full flex items-center justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/5762/5762478.png" alt="Swimming Pool" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-medium mb-3">Swimming Pool & Sun Terrace</h3>
            <p className="text-gray-600">
              A crystal-clear outdoor pool surrounded by a wooden deck with sun loungers and parasols for each villa.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-villa-sand/30 rounded-full flex items-center justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3253/3253016.png" alt="Private Beach" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-medium mb-3">Private Beach Area</h3>
            <p className="text-gray-600">
              Each villa is provided with its own set of beach equipment on the uncrowded Salonikiou Beach.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
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
          <Link to="/amenities">
            <Button size="lg" className="bg-villa-blue hover:bg-blue-800 w-40 flex items-center justify-center">
              Explore All Amenities
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16" style={{
      backgroundImage: "linear-gradient(to bottom, rgba(28,93,153,0.9), rgba(28,93,153,0.8)), url('https://arteonvillas.com/wp-content/uploads/2022/06/drone02sm.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
        <div className="container mx-auto px-4">
          <SectionHeader title="What Our Guests Say" subtitle="Arteon Villas boasts an exceptional reputation, with a 9.8/10 'Exceptional' rating based on guest reviews." centered titleClassName="text-white" className="text-white" />
          
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
      <section className="relative py-16 bg-center bg-cover" style={{
      backgroundImage: "url('/lovable-uploads/a9ecf5db-c898-4d3d-8065-cde9ceafb923.png')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
        <div className="absolute inset-0 bg-villa-navy/70" />
        <div className="container relative mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Ready to Experience Arteon Villas?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-white/90">
            Book your stay today and discover the perfect blend of luxury, comfort, and natural beauty at our seaside retreat in Halkidiki.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white px-8 py-3 h-14 text-lg font-medium rounded-md w-64">
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
