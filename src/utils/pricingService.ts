
import { supabase } from "@/integrations/supabase/client";
import { VillaPricing, BookingDiscount, PriceCalculation } from "@/types/pricing";

/**
 * Gets the pricing for a specific villa and date range
 */
export const getVillaPricing = async (
  villaId: string,
  startDate: Date,
  endDate: Date
): Promise<PriceCalculation | null> => {
  try {
    const { data, error } = await supabase.rpc('get_villa_price_for_dates', {
      p_villa_id: villaId,
      p_start_date: startDate.toISOString().split('T')[0],
      p_end_date: endDate.toISOString().split('T')[0]
    });

    if (error) {
      console.error("Error calculating price:", error);
      return null;
    }

    return data[0] as PriceCalculation;
  } catch (error) {
    console.error("Error in getVillaPricing:", error);
    return null;
  }
};

/**
 * Gets all seasonal prices for a villa
 */
export const getVillaSeasonalPrices = async (villaId: string): Promise<VillaPricing[]> => {
  try {
    const { data, error } = await supabase
      .from('villa_pricing')
      .select('*')
      .eq('villa_id', villaId)
      .order('start_date');

    if (error) {
      console.error("Error fetching seasonal prices:", error);
      return [];
    }

    return data as VillaPricing[];
  } catch (error) {
    console.error("Error in getVillaSeasonalPrices:", error);
    return [];
  }
};

/**
 * Gets all available booking discounts
 */
export const getBookingDiscounts = async (): Promise<BookingDiscount[]> => {
  try {
    const { data, error } = await supabase
      .from('booking_discounts')
      .select('*')
      .order('discount_percentage', { ascending: false });

    if (error) {
      console.error("Error fetching booking discounts:", error);
      return [];
    }

    return data as BookingDiscount[];
  } catch (error) {
    console.error("Error in getBookingDiscounts:", error);
    return [];
  }
};

/**
 * Calculates applicable discount for a booking
 */
export const calculateApplicableDiscount = async (
  bookingDate: Date,
  stayStartDate: Date,
  stayEndDate: Date,
  nights: number
): Promise<{ discountPercentage: number; discountType: string } | null> => {
  try {
    const discounts = await getBookingDiscounts();
    
    // Find applicable discount
    const applicableDiscount = discounts.find(discount => 
      bookingDate >= new Date(discount.booking_start_date) &&
      bookingDate <= new Date(discount.booking_end_date) &&
      stayStartDate >= new Date(discount.stay_start_date) &&
      stayEndDate <= new Date(discount.stay_end_date) &&
      nights >= discount.min_nights
    );
    
    if (applicableDiscount) {
      return {
        discountPercentage: applicableDiscount.discount_percentage,
        discountType: applicableDiscount.discount_type
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error calculating discount:", error);
    return null;
  }
};
