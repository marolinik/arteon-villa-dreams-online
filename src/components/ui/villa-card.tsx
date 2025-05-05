
import { Link } from "react-router-dom";
import { Villa } from "@/types";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface VillaCardProps {
  villa: Villa;
  className?: string;
}

export const VillaCard = ({ villa, className }: VillaCardProps) => {
  return (
    <div className={cn("bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl", className)}>
      <div className="relative h-64 overflow-hidden">
        <img 
          src={villa.mainImage} 
          alt={villa.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-villa-blue text-white py-1 px-3 rounded-full text-sm">
          {villa.size} m²
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-between text-sm mb-2">
            <div className="flex items-center">
              <BedDouble size={16} className="mr-1" />
              <span>{villa.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath size={16} className="mr-1" />
              <span>{villa.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>{villa.capacity}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" className="flex-1 bg-villa-blue hover:bg-blue-800">
              <Link to={`/villas/${villa.slug}`}>View Details</Link>
            </Button>
            <Button asChild size="sm" className="flex-1 bg-villa-blue hover:bg-blue-800">
              <Link to={`/booking?villa=${villa.slug}`}>Book Now</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-xl font-serif font-semibold mb-1">{villa.name}</h3>
          <p className="text-gray-500 text-sm">{villa.meaning} in Greek</p>
        </div>
        
        <p className="text-gray-700 mb-5 line-clamp-2">{villa.shortDescription}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span className="flex items-center">
            <BedDouble size={16} className="text-villa-blue mr-1" />
            {villa.bedrooms} Bedrooms
          </span>
          <span className="flex items-center">
            <Bath size={16} className="text-villa-blue mr-1" />
            {villa.bathrooms} Bathrooms
          </span>
          <span className="flex items-center">
            <Users size={16} className="text-villa-blue mr-1" />
            Up to {villa.capacity}
          </span>
        </div>
      </div>
    </div>
  );
};
