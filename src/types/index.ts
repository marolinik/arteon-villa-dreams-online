
export type Villa = {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  rating: number;
  location: string;
  slug: string;
  isFeatured: boolean;
  
  // Additional properties that were missing
  meaning: string;
  shortDescription: string;
  size: number;
  capacity: number;
  bedConfiguration: string;
  mainImage: string | null;
  features: {
    title: string;
    description: string;
  }[];
};

export type GuestInfo = {
  name: string;
  email: string;
  phone: string;
  guests: number;
  specialRequests?: string;
};

export type BookingDate = {
  id: string;
  villaId: string;
  startDate: Date;
  endDate: Date;
  status?: "confirmed" | "pending" | "cancelled";
  createdAt?: Date;
  guestInfo?: GuestInfo;
  bookingNumber?: string;
};

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  category: string;
  featured?: boolean;
};

// Add missing types used in AdminSidebar and admin pages
export type AdminUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
};

export type Amenity = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  category: string;
  featured: boolean;
};

export type Attraction = {
  id: string;
  title: string;
  description: string;
  distance: string;
  location: string;
  image: string;
  category: string;
  featured: boolean;
};
