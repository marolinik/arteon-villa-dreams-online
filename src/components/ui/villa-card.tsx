
import { Link } from "react-router-dom";
import { Villa } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VillaCardProps {
  villa: Villa;
  className?: string;
}

export const VillaCard = ({ villa, className }: VillaCardProps) => {
  return (
    <div className={cn("bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg", className)}>
      <div className="relative h-64">
        <img 
          src={villa.mainImage} 
          alt={villa.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-villa-blue text-white py-1 px-3 rounded-full text-sm">
          {villa.size} m²
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-serif font-semibold mb-1">{villa.name}</h3>
        <p className="text-gray-500 text-sm mb-3">{villa.meaning} in Greek</p>
        
        <p className="text-gray-700 mb-4 line-clamp-3">{villa.shortDescription}</p>
        
        <div className="flex items-center justify-between mb-5 text-sm text-gray-700">
          <span>{villa.bedrooms} Bedrooms</span>
          <span>{villa.bathrooms} Bathrooms</span>
          <span>Up to {villa.capacity} Guests</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="flex-1 bg-villa-blue hover:bg-blue-800">
            <Link to={`/villas/${villa.slug}`}>View Details</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 border-villa-blue text-villa-blue hover:bg-villa-blue/10">
            <Link to={`/booking?villa=${villa.slug}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
