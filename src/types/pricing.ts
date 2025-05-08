
import { Villa } from "./index";

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
