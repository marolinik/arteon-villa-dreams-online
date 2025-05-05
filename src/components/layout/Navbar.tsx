
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Villas', path: '/villas', submenu: [
      { name: 'Villa Armonia', path: '/villas/armonia' },
      { name: 'Villa Eirini', path: '/villas/eirini' },
      { name: 'Villa Thea', path: '/villas/thea' },
      { name: 'Villa Onar', path: '/villas/onar' },
    ]},
    { name: 'Amenities', path: '/amenities' },
    { name: 'Attractions', path: '/attractions' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 md:py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-serif font-bold text-villa-navy">
            Arteon Villas
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            link.submenu ? (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path}
                  className={`font-medium hover:text-villa-blue transition-colors ${
                    location.pathname.includes(link.path) 
                      ? 'text-villa-blue border-b-2 border-villa-blue' 
                      : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
                <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {link.submenu.map((subItem) => (
                    <Link 
                      key={subItem.name} 
                      to={subItem.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-villa-blue/10 hover:text-villa-blue"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link 
                key={link.name}
                to={link.path}
                className={`font-medium hover:text-villa-blue transition-colors ${
                  isActive(link.path) 
                    ? 'text-villa-blue border-b-2 border-villa-blue' 
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            )
          ))}
          <Button className="bg-villa-blue hover:bg-blue-800 text-white">
            <Link to="/booking">Book Now</Link>
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-gray-700"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in z-50">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {navLinks.map((link) => (
              link.submenu ? (
                <div key={link.name} className="py-2">
                  <div className="px-3 font-medium text-gray-700 mb-1">
                    {link.name}
                  </div>
                  <div className="pl-6">
                    {link.submenu.map((subItem) => (
                      <Link 
                        key={subItem.name}
                        to={subItem.path}
                        className={`py-2 px-3 block ${
                          isActive(subItem.path)
                            ? 'text-villa-blue font-medium' 
                            : 'text-gray-600'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  key={link.name}
                  to={link.path}
                  className={`py-2 px-3 block ${
                    isActive(link.path) 
                      ? 'text-villa-blue font-medium' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Button className="bg-villa-blue hover:bg-blue-800 text-white w-full">
              <Link to="/booking" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                Book Now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
