
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Anchor } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F1524] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center mb-4">
              <Anchor className="text-amber-400 mr-2" size={24} />
              <h3 className="text-2xl font-serif font-semibold text-white">Arteon Villas</h3>
            </div>
            <p className="mb-6 text-gray-400">Your Perfect Seaside Escape in Halkidiki</p>
            <div className="flex items-center mb-4 group cursor-pointer hover:text-amber-400 transition-colors">
              <MapPin size={18} className="mr-3 text-villa-terracotta group-hover:text-amber-400 transition-colors" />
              <span>Akti Salonikiou, Sithonia, Halkidiki, Greece</span>
            </div>
            <div className="flex items-center mb-4 group cursor-pointer hover:text-amber-400 transition-colors">
              <Phone size={18} className="mr-3 text-villa-terracotta group-hover:text-amber-400 transition-colors" />
              <span>+30 123 456 7890</span>
            </div>
            <div className="flex items-center mb-6 group cursor-pointer hover:text-amber-400 transition-colors">
              <Mail size={18} className="mr-3 text-villa-terracotta group-hover:text-amber-400 transition-colors" />
              <span>info@arteonvillas.com</span>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="bg-[#172237] hover:bg-gradient-to-r hover:from-amber-500 hover:to-villa-terracotta w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:translate-y-[-3px] shadow-lg hover:shadow-amber-500/25">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-[#172237] hover:bg-gradient-to-r hover:from-amber-500 hover:to-villa-terracotta w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:translate-y-[-3px] shadow-lg hover:shadow-amber-500/25">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-[#172237] hover:bg-gradient-to-r hover:from-amber-500 hover:to-villa-terracotta w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:translate-y-[-3px] shadow-lg hover:shadow-amber-500/25">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-serif font-medium mb-6 text-white relative inline-block">
              Our Villas
              <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-amber-500 to-villa-terracotta rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/villas/armonia" className="hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="inline-block w-1.5 h-1.5 bg-villa-terracotta rounded-full mr-2 group-hover:bg-amber-400 group-hover:scale-150 transition-all duration-300"></span>
                  Villa Armonia
                </Link>
              </li>
              <li>
                <Link to="/villas/eirini" className="hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="inline-block w-1.5 h-1.5 bg-villa-terracotta rounded-full mr-2 group-hover:bg-amber-400 group-hover:scale-150 transition-all duration-300"></span>
                  Villa Eirini
                </Link>
              </li>
              <li>
                <Link to="/villas/thea" className="hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="inline-block w-1.5 h-1.5 bg-villa-terracotta rounded-full mr-2 group-hover:bg-amber-400 group-hover:scale-150 transition-all duration-300"></span>
                  Villa Thea
                </Link>
              </li>
              <li>
                <Link to="/villas/onar" className="hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="inline-block w-1.5 h-1.5 bg-villa-terracotta rounded-full mr-2 group-hover:bg-amber-400 group-hover:scale-150 transition-all duration-300"></span>
                  Villa Onar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-serif font-medium mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-amber-500 to-villa-terracotta rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="inline-block w-1.5 h-1.5 bg-villa-terracotta rounded-full mr-2 group-hover:bg-amber-400 group-hover:scale-150 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="inline-block w-1.5 h-1.5 bg-villa-terracotta rounded-full mr-2 group-hover:bg-amber-400 group-hover:scale-150 transition-all duration-300"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="inline-block w-1.5 h-1.5 bg-villa-terracotta rounded-full mr-2 group-hover:bg-amber-400 group-hover:scale-150 transition-all duration-300"></span>
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/amenities" className="hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="inline-block w-1.5 h-1.5 bg-villa-terracotta rounded-full mr-2 group-hover:bg-amber-400 group-hover:scale-150 transition-all duration-300"></span>
                  Amenities
                </Link>
              </li>
              <li>
                <Link to="/attractions" className="hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="inline-block w-1.5 h-1.5 bg-villa-terracotta rounded-full mr-2 group-hover:bg-amber-400 group-hover:scale-150 transition-all duration-300"></span>
                  Attractions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Arteon Villas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
