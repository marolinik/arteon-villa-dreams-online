
import { GalleryImage } from "@/types";

// Placeholder gallery images with consistent structure
export const galleryImages: GalleryImage[] = [
  // Exterior placeholders
  {
    id: "ext1",
    url: "", // Placeholder for exterior image 1
    alt: "Arteon Villas at night with garden lighting",
    category: "exterior"
  },
  {
    id: "ext2",
    url: "", // Placeholder for exterior image 2
    alt: "Front view of Arteon Villas at sunset",
    category: "exterior"
  },
  {
    id: "ext3",
    url: "", // Placeholder for exterior image 3
    alt: "Entrance gate view of Arteon Villas",
    category: "exterior"
  },
  {
    id: "ext4",
    url: "", // Placeholder for exterior image 4
    alt: "Arteon Villas poolside view at dusk",
    category: "exterior"
  },
  
  // Interior placeholders
  {
    id: "int1",
    url: "", // Placeholder for interior image 1
    alt: "Spacious living area with sea views",
    category: "interior"
  },
  {
    id: "int2",
    url: "", // Placeholder for interior image 2
    alt: "Master bedroom with king-size bed",
    category: "interior"
  },
  {
    id: "int3",
    url: "", // Placeholder for interior image 3
    alt: "Modern kitchen with full amenities",
    category: "interior"
  },
  {
    id: "int4",
    url: "", // Placeholder for interior image 4
    alt: "Elegant bathroom with rainfall shower",
    category: "interior"
  },
  
  // Amenities placeholders
  {
    id: "amen1",
    url: "", // Placeholder for amenities image 1
    alt: "Swimming pool surrounded by lounge chairs",
    category: "amenities"
  },
  {
    id: "amen2",
    url: "", // Placeholder for amenities image 2
    alt: "Outdoor dining area with BBQ facilities",
    category: "amenities"
  },
  {
    id: "amen3",
    url: "", // Placeholder for amenities image 3
    alt: "Private beach area with umbrellas and sunbeds",
    category: "amenities"
  },
  {
    id: "amen4",
    url: "", // Placeholder for amenities image 4
    alt: "Children's playground in garden setting",
    category: "amenities"
  },
  
  // Surroundings placeholders
  {
    id: "sur1",
    url: "", // Placeholder for surroundings image 1
    alt: "Panoramic view of Sithonia peninsula",
    category: "surroundings"
  },
  {
    id: "sur2",
    url: "", // Placeholder for surroundings image 2
    alt: "Nearby Salonikiou Beach at sunset",
    category: "surroundings"
  },
  {
    id: "sur3",
    url: "", // Placeholder for surroundings image 3
    alt: "Traditional Greek village of Agios Nikolaos",
    category: "surroundings"
  },
  {
    id: "sur4",
    url: "", // Placeholder for surroundings image 4
    alt: "Clear blue waters of Aegean Sea with Mount Athos view",
    category: "surroundings"
  }
];

export const getImagesByCategory = (category?: string): GalleryImage[] => {
  if (!category) return galleryImages;
  return galleryImages.filter(image => image.category === category);
};
