
import { useState } from "react";
import { GalleryImage } from "@/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryGridProps {
  images: GalleryImage[];
}

export const GalleryGrid = ({ images }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);
  
  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setImageIndex(index);
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };
  
  const nextImage = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex(imageIndex + 1);
      setSelectedImage(images[imageIndex + 1]);
    } else {
      setImageIndex(0);
      setSelectedImage(images[0]);
    }
  };
  
  const prevImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
      setSelectedImage(images[imageIndex - 1]);
    } else {
      setImageIndex(images.length - 1);
      setSelectedImage(images[images.length - 1]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={image.id}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openLightbox(image, index)}
          >
            <div className="aspect-square bg-gray-200 flex items-center justify-center">
              {image.url ? (
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <ImageIcon size={48} />
                  <p className="mt-2 text-sm">Image placeholder</p>
                </div>
              )}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-sm font-medium truncate">{image.alt}</span>
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl w-full p-1 border-none bg-transparent">
          {selectedImage && (
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 rounded-full bg-black/20 hover:bg-black/40 z-50"
                onClick={closeLightbox}
              >
                <X className="h-5 w-5 text-white" />
              </Button>
              
              <div className="relative">
                {selectedImage.url ? (
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.alt}
                    className="w-full max-h-[80vh] object-contain"
                  />
                ) : (
                  <div className="w-full h-[60vh] bg-gray-200 flex flex-col items-center justify-center">
                    <ImageIcon size={64} className="text-gray-400" />
                    <p className="mt-4 text-gray-500">Image will be placed here</p>
                  </div>
                )}
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 hover:bg-black/40 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 hover:bg-black/40 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="bg-black/70 p-3 rounded-b-lg">
                <p className="text-white text-center">{selectedImage.alt}</p>
                <p className="text-gray-300 text-xs text-center mt-1">
                  Image {imageIndex + 1} of {images.length} • {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
