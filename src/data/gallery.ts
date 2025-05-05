import { GalleryImage } from "@/types";

export const galleryImages: GalleryImage[] = [
  // Exterior images
  {
    id: "ext1",
    url: "/lovable-uploads/70760d7a-aeee-4ce5-b176-bdab43c717f9.png",
    alt: "Arteon Villas at night with garden lighting",
    category: "exterior"
  },
  {
    id: "ext2",
    url: "/lovable-uploads/3f7eff5f-5983-4602-801c-0faea5e67b17.png",
    alt: "Front view of Arteon Villas at night",
    category: "exterior"
  },
  {
    id: "ext3",
    url: "/lovable-uploads/c411917f-1b84-4377-b8ac-b2fbaecf4ad4.png",
    alt: "Entrance gate view of Arteon Villas",
    category: "exterior"
  },
  {
    id: "ext4",
    url: "/lovable-uploads/f4de3009-636a-49d6-b1f6-cd8606374d38.png",
    alt: "Arteon Villas bird's eye view at night",
    category: "exterior"
  },
  {
    id: "ext5",
    url: "/lovable-uploads/80484ad0-9b4e-430f-9b9a-700e402330d3.png",
    alt: "Arteon Villas aerial perspective at night",
    category: "exterior"
  },
  {
    id: "ext6",
    url: "/lovable-uploads/a5e76415-70a2-49dd-bdb5-b09570083a2b.png",
    alt: "Arteon Villas entry gate with lighting",
    category: "exterior"
  },
  
  // Interior images
  {
    id: "int1",
    url: "/lovable-uploads/1dfd64c7-ffbc-4388-8987-3061fc6f4783.png",
    alt: "Second bedroom with twin beds",
    category: "interior"
  },
  {
    id: "int2",
    url: "/lovable-uploads/76db6a84-db6d-4d00-ac91-1e4ceb84a041.png",
    alt: "Master bedroom with king-size bed",
    category: "interior"
  },
  {
    id: "int3",
    url: "/lovable-uploads/2567efd3-9273-4456-b87b-147b01a41a8c.png",
    alt: "Vanity area with mirror and stool",
    category: "interior"
  },
  {
    id: "int4",
    url: "/lovable-uploads/c0431382-36a4-402f-9bf7-65e281e8da2d.png",
    alt: "Master bedroom with sitting area",
    category: "interior"
  },
  {
    id: "int5",
    url: "/lovable-uploads/5d4b65f2-0a24-45f0-95c9-2b51920ffe10.png",
    alt: "Second master bedroom",
    category: "interior"
  },
  {
    id: "int6",
    url: "/lovable-uploads/dd26ff21-2620-40ff-8962-cb6e0e9d3fd8.png",
    alt: "Living room with sofa and TV",
    category: "interior"
  },
  {
    id: "int7",
    url: "/lovable-uploads/fc05634d-fdbd-49d4-9ea0-a7dd24671aea.png",
    alt: "Living room with seating area",
    category: "interior"
  },
  
  // Original placeholder images - keeping a few for continuity
  {
    id: "img5",
    url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200",
    alt: "Living room with sea view",
    category: "interior"
  },
  {
    id: "img9",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
    alt: "Pool with lounge chairs",
    category: "amenities"
  },
  {
    id: "img11",
    url: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1200",
    alt: "Beach near villas",
    category: "surroundings"
  },
  {
    id: "img12",
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200",
    alt: "Aegean sea view",
    category: "surroundings"
  }
];

export const getImagesByCategory = (category?: string): GalleryImage[] => {
  if (!category) return galleryImages;
  return galleryImages.filter(image => image.category === category);
};
