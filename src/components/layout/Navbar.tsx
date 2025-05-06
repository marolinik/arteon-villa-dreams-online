import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Add effect to scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Villas',
    path: '/villas',
    submenu: [{
      name: 'Villa Armonia',
      path: '/villas/armonia'
    }, {
      name: 'Villa Eirini',
      path: '/villas/eirini'
    }, {
      name: 'Villa Thea',
      path: '/villas/thea'
    }, {
      name: 'Villa Onar',
      path: '/villas/onar'
    }]
  }, {
    name: 'Amenities',
    path: '/amenities'
  }, {
    name: 'Attractions',
    path: '/attractions'
  }, {
    name: 'Gallery',
    path: '/gallery'
  }];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle navigation click
  const handleNavClick = () => {
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    // Scroll to top
    window.scrollTo(0, 0);
  };

  return <header className="sticky top-0 z-50 bg-[#0F1524] border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 md:py-5 flex justify-between items-center bg-slate-950">
        <Link to="/" className="flex items-center" onClick={handleNavClick}>
          <img src="/lovable-uploads/ad932535-35b0-41e0-8877-b070af49a757.png" alt="Arteon Villas Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-xl md:text-2xl font-serif font-bold text-white">
            Arteon Villas
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => link.submenu ? <div key={link.name} className="relative group">
                <Link to={link.path} className={`font-medium hover:text-amber-400 transition-all duration-300 flex items-center ${location.pathname.includes(link.path) ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-300'}`} onClick={handleNavClick}>
                  {link.name}
                  <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-300" />
                </Link>
                <div className="absolute left-0 mt-1 w-48 bg-[#0F1524] shadow-lg rounded-md overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-700">
                  {link.submenu.map(subItem => <Link key={subItem.name} to={subItem.path} className="block px-4 py-3 text-gray-300 hover:bg-gradient-to-r hover:from-amber-500 hover:to-villa-terracotta hover:text-white transition-all duration-300" onClick={handleNavClick}>
                      {subItem.name}
                    </Link>)}
                </div>
              </div> : <Link key={link.name} to={link.path} className={`font-medium hover:text-amber-400 transition-colors ${isActive(link.path) ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-300'}`} onClick={handleNavClick}>
                {link.name}
              </Link>)}
          <Button className="bg-gradient-to-r from-amber-500 to-villa-terracotta hover:opacity-90 text-white transition-all duration-300 transform hover:translate-y-[-3px] shadow-lg hover:shadow-amber-500/25">
            <Link to="/booking" onClick={handleNavClick}>Book Now</Link>
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-300 hover:text-amber-400 transition-colors" aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-[#0F1524] shadow-lg border-t border-gray-800 animate-fade-in z-50">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {navLinks.map(link => link.submenu ? <div key={link.name} className="py-2">
                  <div className="px-3 font-medium text-amber-400 mb-1">
                    {link.name}
                  </div>
                  <div className="pl-6">
                    {link.submenu.map(subItem => <Link key={subItem.name} to={subItem.path} className={`py-2 px-3 block ${isActive(subItem.path) ? 'text-amber-400 font-medium' : 'text-gray-300 hover:text-amber-400'} transition-colors`} onClick={handleNavClick}>
                        {subItem.name}
                      </Link>)}
                  </div>
                </div> : <Link key={link.name} to={link.path} className={`py-2 px-3 block ${isActive(link.path) ? 'text-amber-400 font-medium' : 'text-gray-300 hover:text-amber-400'} transition-colors`} onClick={handleNavClick}>
                  {link.name}
                </Link>)}
            <Button className="bg-gradient-to-r from-amber-500 to-villa-terracotta hover:opacity-90 text-white w-full transition-all duration-300">
              <Link to="/booking" className="w-full" onClick={handleNavClick}>
                Book Now
              </Link>
            </Button>
          </div>
        </div>}
    </header>;
};

export default Navbar;
