
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ImageIcon } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <div className="relative h-full">
        {images[currentImageIndex] ? (
          <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full bg-[#172B4D] flex flex-col items-center justify-center">
            <ImageIcon size={64} className="text-gray-400" />
            <p className="mt-4 text-gray-300">Image will be placed here</p>
          </div>
        )}
        
        {/* Navigation buttons - only show if there are multiple images */}
        {images.length > 1 && (
          <>
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ArrowLeft size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ArrowRight size={20} />
            </Button>
            
            {/* Dots indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentImageIndex === index ? "bg-white w-4" : "bg-white/50"
                  )}
                  onClick={() => goToImage(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
