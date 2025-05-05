
import { useState } from "react";
import { GalleryImage } from "@/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface GalleryGridProps {
  images: GalleryImage[];
}

export const GalleryGrid = ({ images }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div 
            key={image.id}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openLightbox(image)}
          >
            <div className="aspect-square">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-sm font-medium">{image.alt}</span>
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl w-full p-1 border-none bg-transparent">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <p className="text-white text-center mt-2">{selectedImage.alt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
