
import { Link } from 'react-router-dom';
import { MapPin, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-[#07091A] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center mb-4">
              <img src="/lovable-uploads/4b93e28a-3d4f-4e75-958b-2d436ebecdf7.png" alt="Arteon Villas Logo" className="h-8 w-8 mr-2" />
              <h3 className="text-2xl font-serif font-semibold text-white">Arteon Villas</h3>
            </div>
            <p className="mb-6 text-villa-cream">Your Perfect Seaside Escape in Halkidiki</p>
            <div className="flex items-center mb-4 group cursor-pointer hover:text-amber-400 transition-colors">
              <MapPin size={18} className="mr-3 text-villa-terracotta group-hover:text-amber-400 transition-colors" />
              <span>Akti Salonikiou, Sithonia, Halkidiki, Greece</span>
            </div>
            <div className="flex flex-col space-y-2 mb-4">
              <div className="flex items-center group cursor-pointer hover:text-amber-400 transition-colors">
                <span className="w-6 h-6 mr-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-villa-terracotta group-hover:text-amber-400 transition-colors">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <span>+381 62 19 76 467</span>
              </div>
              <div className="flex items-center group cursor-pointer hover:text-amber-400 transition-colors">
                <span className="w-6 h-6 mr-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-villa-terracotta group-hover:text-amber-400 transition-colors">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <span>+381 62 77 99 878</span>
              </div>
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
              <li>
                <Link to="/admin" className="hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="inline-block w-1.5 h-1.5 bg-villa-terracotta rounded-full mr-2 group-hover:bg-amber-400 group-hover:scale-150 transition-all duration-300"></span>
                  <span className="flex items-center">
                    Admin Login 
                    <span className="ml-1 text-xs text-amber-500">(Test: marolinik@gmail.com / 74marOLInik74)</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p className="text-villa-cream">&copy; {new Date().getFullYear()} Arteon Villas. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
