
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-villa-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Arteon Villas</h3>
            <p className="mb-4">Your Perfect Halkidiki Getaway</p>
            <div className="flex items-center mb-2">
              <MapPin size={18} className="mr-2 text-villa-teal" />
              <span>Akti Salonikiou, Sithonia, Halkidiki, Greece</span>
            </div>
            <div className="flex items-center mb-2">
              <Phone size={18} className="mr-2 text-villa-teal" />
              <span>+30 123 456 7890</span>
            </div>
            <div className="flex items-center">
              <Mail size={18} className="mr-2 text-villa-teal" />
              <span>info@arteonvillas.com</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-medium mb-4">Our Villas</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/villas/armonia" className="hover:text-villa-teal transition-colors">
                  Villa Armonia
                </Link>
              </li>
              <li>
                <Link to="/villas/eirini" className="hover:text-villa-teal transition-colors">
                  Villa Eirini
                </Link>
              </li>
              <li>
                <Link to="/villas/thea" className="hover:text-villa-teal transition-colors">
                  Villa Thea
                </Link>
              </li>
              <li>
                <Link to="/villas/onar" className="hover:text-villa-teal transition-colors">
                  Villa Onar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-villa-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-villa-teal transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-villa-teal transition-colors">
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-villa-teal transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Arteon Villas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
