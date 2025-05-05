
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

export interface ContentBlock {
  id: string;
  title: string;
  content: string;
  pageId: string;
  type: 'text' | 'image' | 'hero' | 'list';
  position: number;
  metadata?: Record<string, any>;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  category: string;
  featured: boolean;
}

export interface Attraction {
  id: string;
  title: string;
  description: string;
  distance: string;
  location: string;
  image: string;
  category: string;
  featured: boolean;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  logoUrl?: string;
  faviconUrl?: string;
}
