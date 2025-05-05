
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-6 text-white">Arteon Villas</h3>
            <p className="mb-6 text-gray-400">Your Perfect Seaside Escape in Halkidiki</p>
            <div className="flex items-center mb-4">
              <MapPin size={18} className="mr-3 text-amber-400" />
              <span>Akti Salonikiou, Sithonia, Halkidiki, Greece</span>
            </div>
            <div className="flex items-center mb-4">
              <Phone size={18} className="mr-3 text-amber-400" />
              <span>+30 123 456 7890</span>
            </div>
            <div className="flex items-center mb-6">
              <Mail size={18} className="mr-3 text-amber-400" />
              <span>info@arteonvillas.com</span>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-amber-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-amber-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-amber-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-serif font-medium mb-6 text-white">Our Villas</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/villas/armonia" className="hover:text-amber-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Villa Armonia
                </Link>
              </li>
              <li>
                <Link to="/villas/eirini" className="hover:text-amber-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Villa Eirini
                </Link>
              </li>
              <li>
                <Link to="/villas/thea" className="hover:text-amber-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Villa Thea
                </Link>
              </li>
              <li>
                <Link to="/villas/onar" className="hover:text-amber-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Villa Onar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-serif font-medium mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-amber-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/amenities" className="hover:text-amber-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Amenities
                </Link>
              </li>
              <li>
                <Link to="/attractions" className="hover:text-amber-400 transition-colors flex items-center">
                  <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
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
