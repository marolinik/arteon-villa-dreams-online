// Villa
export interface Image {
  url: string;
  alt: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface BookingDate {
  startDate: Date;
  endDate: Date;
}

// Villa with pricing functionality
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
  maxGuests: number;
  price: number;
  rating: number;
  location: string;
  isFeatured: boolean;
  bedConfiguration: string;
  mainImage: string;
  images: string[];
  amenities: string[];
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
}

// Add pricing types from types/pricing.ts
export type VillaPricing = {
  id: string;
  villa_id: string;
  villa?: Villa;
  season_name: string;
  start_date: Date;
  end_date: Date;
  price_per_night: number;
  created_at: Date;
  updated_at: Date;
};

export type BookingDiscount = {
  id: string;
  discount_type: string;
  discount_percentage: number;
  booking_start_date: Date;
  booking_end_date: Date;
  stay_start_date: Date;
  stay_end_date: Date;
  min_nights: number;
  created_at: Date;
  updated_at: Date;
};

export type PriceCalculation = {
  total_price: number;
  average_price_per_night: number;
  nights: number;
  breakdown: PriceDayBreakdown[];
};

export type PriceDayBreakdown = {
  date: string;
  price: number;
  season: string;
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
  name?: string;
  title: string;
  description: string;
  distance: string;
  location: string;
  image: string;
  category: "beach" | "cultural" | "nature" | "activity";
  featured: boolean;
};

export type BookingDate = {
  id: string;
  villaId: string;
  startDate: Date;
  endDate: Date;
  status?: string;
};
