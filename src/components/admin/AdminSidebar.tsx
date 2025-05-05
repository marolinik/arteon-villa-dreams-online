
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AdminUser } from "@/types";
import {
  Home,
  Hotel,
  Image,
  Calendar,
  Settings,
  LogOut,
  Map,
  Coffee
} from "lucide-react";

interface AdminSidebarProps {
  currentUser: AdminUser | null;
}

const AdminSidebar = ({ currentUser }: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <Home size={20} />
    },
    {
      name: "Villas",
      path: "/admin/villas",
      icon: <Hotel size={20} />
    },
    {
      name: "Gallery",
      path: "/admin/gallery",
      icon: <Image size={20} />
    },
    {
      name: "Amenities",
      path: "/admin/amenities",
      icon: <Coffee size={20} />
    },
    {
      name: "Attractions",
      path: "/admin/attractions",
      icon: <Map size={20} />
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <Calendar size={20} />
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings size={20} />
    }
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const handleLogout = () => {
    // Clear authentication
    sessionStorage.removeItem("admin-authenticated");
    sessionStorage.removeItem("admin-user");
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
    
    // Redirect to admin login
    navigate("/admin");
  };
  
  return (
    <aside className="w-64 bg-villa-navy text-white flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-serif font-bold">Arteon Villas</h2>
        <p className="text-white/70 text-sm">Admin Dashboard</p>
      </div>
      
      {currentUser && (
        <div className="px-6 py-4 border-t border-b border-white/10 flex items-center">
          <div className="w-10 h-10 rounded-full bg-villa-blue flex items-center justify-center mr-3">
            <span className="font-bold">{currentUser.name.charAt(0)}</span>
          </div>
          <div>
            <div className="font-medium">{currentUser.name}</div>
            <div className="text-xs text-white/70">{currentUser.username}</div>
          </div>
        </div>
      )}
      
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-villa-blue text-white"
                    : "text-white/80 hover:bg-villa-blue/20"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <Button
          variant="outline"
          className="w-full bg-transparent border-white text-white hover:bg-white hover:text-villa-navy"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Log Out
        </Button>
        
        <div className="text-center text-white/50 text-xs mt-4">
          Arteon Villas Admin v1.0
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
