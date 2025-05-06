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
};

export type GuestInfo = {
  name: string;
  email: string;
  phone: string;
  guests: number;
  specialRequests?: string;
};

export type BookingDate = {
  id: string | undefined;
  villaId: string;
  startDate: Date;
  endDate: Date;
  status?: "confirmed" | "pending" | "cancelled";
  createdAt?: Date;
  guestInfo?: GuestInfo;
  bookingNumber?: string;
};
