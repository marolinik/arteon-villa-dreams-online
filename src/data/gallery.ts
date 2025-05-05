
import { GalleryImage } from "@/types";

export const galleryImages: GalleryImage[] = [
  {
    id: "img1",
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200",
    alt: "Villa exterior with pool",
    category: "exterior"
  },
  {
    id: "img2",
    url: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1200",
    alt: "Villa with sea view",
    category: "exterior"
  },
  {
    id: "img3",
    url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200",
    alt: "Luxury villa by the sea",
    category: "exterior"
  },
  {
    id: "img4",
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
    alt: "Mediterranean villa",
    category: "exterior"
  },
  {
    id: "img5",
    url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200",
    alt: "Living room with sea view",
    category: "interior"
  },
  {
    id: "img6",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200",
    alt: "Bedroom with balcony",
    category: "interior"
  },
  {
    id: "img7",
    url: "https://images.unsplash.com/photo-1501876725168-00c445821c9e?q=80&w=1200",
    alt: "Modern bathroom",
    category: "interior"
  },
  {
    id: "img8",
    url: "https://images.unsplash.com/photo-1574739782594-db4ead022697?q=80&w=1200",
    alt: "Kitchen with dining area",
    category: "interior"
  },
  {
    id: "img9",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
    alt: "Pool with lounge chairs",
    category: "amenities"
  },
  {
    id: "img10",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
    alt: "Garden area",
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
