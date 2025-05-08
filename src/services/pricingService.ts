
import { supabase } from "@/integrations/supabase/client";
import { BookingDiscount, PriceCalculation, VillaPricing } from "@/types";

/**
 * Get seasonal pricing for a villa
 */
export async function getVillaPricing(villaId: string): Promise<VillaPricing[]> {
  const { data, error } = await supabase
    .from('villa_pricing')
    .select('*')
    .eq('villa_id', villaId);
    
  if (error) {
    console.error('Error fetching villa pricing:', error);
    return [];
  }
  
  return data.map(item => ({
    ...item,
    start_date: new Date(item.start_date),
    end_date: new Date(item.end_date),
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at)
  }));
}

/**
 * Get all available booking discounts
 */
export async function getBookingDiscounts(): Promise<BookingDiscount[]> {
  const { data, error } = await supabase
    .from('booking_discounts')
    .select('*');
    
  if (error) {
    console.error('Error fetching booking discounts:', error);
    return [];
  }
  
  return data.map(item => ({
    ...item,
    booking_start_date: new Date(item.booking_start_date),
    booking_end_date: new Date(item.booking_end_date),
    stay_start_date: new Date(item.stay_start_date),
    stay_end_date: new Date(item.stay_end_date),
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at)
  }));
}

/**
 * Calculate price for a villa for specific dates
 */
export async function calculatePriceForDates(
  villaId: string, 
  startDate: Date, 
  endDate: Date
): Promise<PriceCalculation | null> {
  const { data, error } = await supabase
    .rpc('get_villa_price_for_dates', {
      p_villa_id: villaId,
      p_start_date: startDate.toISOString().split('T')[0],
      p_end_date: endDate.toISOString().split('T')[0]
    });
    
  if (error) {
    console.error('Error calculating price:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }
  
  // Convert breakdown from JSON to typed array
  const result = data[0];
  
  return {
    total_price: result.total_price,
    average_price_per_night: result.average_price_per_night,
    nights: result.nights,
    breakdown: Array.isArray(result.breakdown) 
      ? result.breakdown.map(item => ({
          date: item.date,
          price: item.price,
          season: item.season
        }))
      : []
  };
}
