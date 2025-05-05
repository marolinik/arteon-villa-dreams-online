
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Anchor } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1524] text-white">
      <div className="text-center max-w-md p-6">
        <div className="flex justify-center mb-6">
          <Anchor size={60} className="text-amber-400" />
        </div>
        <h1 className="text-6xl font-serif font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-amber-400 mb-6">Oops! Page not found</p>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-gradient-to-r from-amber-500 to-villa-terracotta hover:opacity-90">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
