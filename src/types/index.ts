
export interface Villa {
  id: string;
  name: string;
  meaning: string;
  slug: string;
  description: string;
  shortDescription: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  capacity: number;
  mainImage: string;
  images: string[];
  amenities: string[];
  features: VillaFeature[];
}

export interface VillaFeature {
  title: string;
  description: string;
}

export interface BookingDate {
  startDate: Date;
  endDate: Date;
  villaId: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
}
