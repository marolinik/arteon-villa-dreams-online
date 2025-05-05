
import { GalleryImage } from "@/types";

// Placeholder gallery images
export const galleryImages: GalleryImage[] = [
  // Exterior placeholders
  {
    id: "ext1",
    url: "", // Removed image
    alt: "Arteon Villas at night with garden lighting",
    category: "exterior"
  },
  {
    id: "ext2",
    url: "", // Removed image
    alt: "Front view of Arteon Villas at night",
    category: "exterior"
  },
  // More exterior placeholders (minimal set)
  {
    id: "ext3",
    url: "", // Removed image
    alt: "Entrance gate view of Arteon Villas",
    category: "exterior"
  },
  
  // Interior placeholders
  {
    id: "int1",
    url: "", // Removed image
    alt: "Second bedroom with twin beds",
    category: "interior"
  },
  {
    id: "int2",
    url: "", // Removed image
    alt: "Master bedroom with king-size bed",
    category: "interior"
  },
  // More interior placeholders (minimal set)
  {
    id: "int3",
    url: "", // Removed image
    alt: "Vanity area with mirror and stool",
    category: "interior"
  },
  
  // Amenities placeholders
  {
    id: "amen1",
    url: "", // Removed image
    alt: "Pool sunbed with blue towel",
    category: "amenities"
  },
  {
    id: "amen2",
    url: "", // Removed image
    alt: "Swimming pool with sun loungers and mountain view",
    category: "amenities"
  },
  
  // Surroundings placeholders
  {
    id: "sur1",
    url: "", // Removed image
    alt: "Beach umbrella with sunset over Aegean Sea",
    category: "surroundings"
  },
  {
    id: "sur2",
    url: "", // Removed image
    alt: "Rocky beach with sunset over calm waters",
    category: "surroundings"
  }
];

export const getImagesByCategory = (category?: string): GalleryImage[] => {
  if (!category) return galleryImages;
  return galleryImages.filter(image => image.category === category);
};
