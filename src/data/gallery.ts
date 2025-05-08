
import { GalleryImage } from "@/types";

export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-1",
    url: "/lovable-uploads/53edea8e-01d3-4d66-b1b7-d934b3652d77.png",
    alt: "Villa Armonia exterior view",
    category: "exterior",
    featured: true
  },
  {
    id: "gallery-2",
    url: "/lovable-uploads/bf20de36-10ae-40a7-b360-beda4fae42c4.png",
    alt: "Villa Armonia modern living room",
    category: "interior",
    featured: false
  },
  {
    id: "gallery-3",
    url: "/lovable-uploads/97791fed-d1e5-4d6d-90f5-d1f4e1b681dc.png",
    alt: "Villa Armonia living room",
    category: "interior",
    featured: true
  },
  {
    id: "gallery-4",
    url: "/lovable-uploads/dce542ec-ce31-45a2-831a-2ab9c8b260ff.png",
    alt: "Villa Armonia living area with grey sofa",
    category: "interior",
    featured: false
  },
  {
    id: "gallery-5",
    url: "/lovable-uploads/988d09fc-2fec-4387-bc8f-d124b600832f.png",
    alt: "Villa Eirini exterior view",
    category: "exterior",
    featured: false
  },
  {
    id: "gallery-6",
    url: "/lovable-uploads/139a87fa-81bf-4b6f-9218-c82a60e08dfd.png",
    alt: "Villa Eirini double bed",
    category: "interior",
    featured: false
  },
  {
    id: "gallery-7",
    url: "/lovable-uploads/265794f2-b9e4-4d1a-83bd-17a34d11eb5b.png",
    alt: "Villa Eirini twin bedroom with single beds",
    category: "interior",
    featured: false
  },
  {
    id: "gallery-8",
    url: "/lovable-uploads/07b03475-a6d8-461c-bb8f-646e88430134.png",
    alt: "Villa Eirini compact kitchen with dining area",
    category: "interior",
    featured: false
  },
  {
    id: "gallery-9",
    url: "/lovable-uploads/4465fed9-a8e9-451e-b703-9277fe4a3d12.png",
    alt: "Villa Thea exterior view",
    category: "exterior",
    featured: false
  },
  {
    id: "gallery-10",
    url: "/lovable-uploads/25f78276-040e-4369-bddf-ba863e268855.png",
    alt: "Villa Thea twin bedroom with separate beds",
    category: "interior",
    featured: false
  },
  {
    id: "gallery-11",
    url: "/lovable-uploads/d2f50d35-d941-4bb7-b122-90110ab080f1.png",
    alt: "Villa Thea twin bedroom with single beds",
    category: "interior",
    featured: false
  },
  {
    id: "gallery-12",
    url: "/lovable-uploads/d08074bf-46b7-45ec-bed9-8ea3c64bc3eb.png",
    alt: "Villa Thea modern bathroom with walk-in shower",
    category: "interior",
    featured: false
  },
  {
    id: "gallery-13",
    url: "/lovable-uploads/0021a2f4-f0b9-4cc6-a223-f7089ffc6733.png",
    alt: "Villa Onar exterior view",
    category: "exterior",
    featured: false
  },
  {
    id: "gallery-14",
    url: "/lovable-uploads/44cdbc7f-950c-4310-bc8d-31193270787f.png",
    alt: "Villa Onar double bed bedroom",
    category: "interior",
    featured: false
  },
  {
    id: "gallery-15",
    url: "/lovable-uploads/31172d6b-392e-445c-996a-763f1bed68bb.png",
    alt: "Villa Onar living room with sofa",
    category: "interior",
    featured: false
  },
  {
    id: "gallery-16",
    url: "/lovable-uploads/a6bc1e03-a564-49fd-8ce9-aa76a620b436.png",
    alt: "Villa Onar bedroom closet area with storage",
    category: "interior",
    featured: false
  }
];

export const getGalleryImages = (): GalleryImage[] => {
  return galleryImages;
};

export const getFeaturedImages = (): GalleryImage[] => {
  return galleryImages.filter(img => img.featured);
};

export const getImagesByCategory = (category: string): GalleryImage[] => {
  if (!category) {
    return galleryImages;
  }
  return galleryImages.filter(img => img.category === category);
};
