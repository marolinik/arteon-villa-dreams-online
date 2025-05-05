
import { Link } from "react-router-dom";
import { Villa } from "@/types";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Users, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

interface VillaCardProps {
  villa: Villa;
  className?: string;
}

export const VillaCard = ({ villa, className }: VillaCardProps) => {
  return (
    <div className={cn("bg-gray-800 rounded-lg overflow-hidden transition-all duration-500 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group border border-gray-700", className)}>
      <div className="relative h-64 overflow-hidden">
        <img 
          src={villa.mainImage} 
          alt={villa.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-villa-terracotta text-white py-1 px-3 rounded-full text-sm font-medium shadow-lg">
          {villa.size} m²
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-between text-sm mb-4">
            <div className="flex items-center">
              <BedDouble size={16} className="mr-1 text-amber-400" />
              <span>{villa.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath size={16} className="mr-1 text-amber-400" />
              <span>{villa.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1 text-amber-400" />
              <span>{villa.capacity}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="secondary" className="flex-1 bg-gray-800 hover:bg-gray-700">
              <Link to={`/villas/${villa.slug}`}>View Details</Link>
            </Button>
            <Button asChild size="sm" className="flex-1">
              <Link to={`/booking?villa=${villa.slug}`}>Book Now</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-5 border-t border-gray-700">
        <div className="mb-4">
          <div className="flex items-start">
            <Anchor className="text-amber-400 mr-2 mt-1" size={18} />
            <div>
              <h3 className="text-xl font-serif font-semibold mb-1 text-white">{villa.name}</h3>
              <p className="text-amber-400 text-sm">{villa.meaning} in Greek</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-300 mb-5 line-clamp-2">{villa.shortDescription}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span className="flex items-center">
            <BedDouble size={16} className="text-villa-terracotta mr-1" />
            {villa.bedrooms} Bedrooms
          </span>
          <span className="flex items-center">
            <Bath size={16} className="text-villa-terracotta mr-1" />
            {villa.bathrooms} Bathrooms
          </span>
          <span className="flex items-center">
            <Users size={16} className="text-villa-terracotta mr-1" />
            Up to {villa.capacity}
          </span>
        </div>
      </div>
    </div>
  );
};
