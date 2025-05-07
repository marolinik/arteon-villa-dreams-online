
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { BookingDate, GuestInfo } from '@/types';
import { format } from 'date-fns';

// Get all bookings (admin only)
export const getAllBookings = async (): Promise<BookingDate[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('startDate', { ascending: true });
  
  if (error) throw error;
  
  // Convert date strings back to Date objects
  return (data || []).map(booking => ({
    ...booking,
    startDate: new Date(booking.startDate),
    endDate: new Date(booking.endDate),
    createdAt: booking.createdAt ? new Date(booking.createdAt) : undefined
  }));
};

// Get bookings by villa ID
export const getBookingsByVillaId = async (villaId: string): Promise<BookingDate[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('villaId', villaId)
    .neq('status', 'cancelled')
    .order('startDate', { ascending: true });
  
  if (error) throw error;
  
  // Convert date strings back to Date objects
  return (data || []).map(booking => ({
    ...booking,
    startDate: new Date(booking.startDate),
    endDate: new Date(booking.endDate),
    createdAt: booking.createdAt ? new Date(booking.createdAt) : undefined
  }));
};

// Get restricted dates by villa ID
export const getRestrictedDatesByVillaId = async (villaId: string): Promise<BookingDate[]> => {
  const { data, error } = await supabase
    .from('restricted_dates')
    .select('*')
    .eq('villaId', villaId)
    .order('startDate', { ascending: true });
  
  if (error) throw error;
  
  // Convert date strings back to Date objects
  return (data || []).map(date => ({
    ...date,
    startDate: new Date(date.startDate),
    endDate: new Date(date.endDate),
    createdAt: date.createdAt ? new Date(date.createdAt) : undefined,
    status: 'cancelled' as 'cancelled' // Restricted dates are always "cancelled"
  }));
};

// Check villa availability
export const checkAvailability = async (
  villaId: string,
  startDate: Date,
  endDate: Date
): Promise<boolean> => {
  // Format dates to ISO strings for the database query
  const startStr = format(startDate, 'yyyy-MM-dd');
  const endStr = format(endDate, 'yyyy-MM-dd');
  
  // Check if there's any booking that overlaps with the requested dates
  const { data: bookings, error: bookingError } = await supabase
    .from('bookings')
    .select('id')
    .eq('villaId', villaId)
    .neq('status', 'cancelled')
    .or(`startDate.gte.${startStr},endDate.gt.${startStr}`)
    .or(`startDate.lt.${endStr},endDate.lte.${endStr}`)
    .or(`startDate.lte.${startStr},endDate.gte.${endStr}`);
  
  if (bookingError) throw bookingError;
  
  // Check restricted dates too
  const { data: restricted, error: restrictedError } = await supabase
    .from('restricted_dates')
    .select('id')
    .eq('villaId', villaId)
    .or(`startDate.gte.${startStr},endDate.gt.${startStr}`)
    .or(`startDate.lt.${endStr},endDate.lte.${endStr}`)
    .or(`startDate.lte.${startStr},endDate.gte.${endStr}`);
  
  if (restrictedError) throw restrictedError;
  
  // Check if dates are within allowed booking season (May 31 to October 4, 2025)
  const seasonStart = new Date(2025, 4, 31); // May 31, 2025
  const seasonEnd = new Date(2025, 9, 4); // October 4, 2025
  
  if (startDate < seasonStart || endDate > seasonEnd) {
    return false; // Dates are outside booking season
  }
  
  // If we found any overlapping bookings or restricted dates, the villa is not available
  return (bookings?.length === 0 && restricted?.length === 0);
};

// Add a new booking
export const addBooking = async (booking: Omit<BookingDate, 'id' | 'bookingNumber'>): Promise<string> => {
  // Generate a booking number
  const bookingNumber = generateBookingNumber();
  
  const newBooking = {
    ...booking,
    id: uuidv4(),
    bookingNumber,
    createdAt: new Date().toISOString(),
    status: booking.status || 'pending',
  };
  
  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    .select()
    .single();
  
  if (error) throw error;
  return data.id;
};

// Add restricted dates (admin only)
export const addRestrictedDates = async (dates: Omit<BookingDate, 'id'>): Promise<string> => {
  const restrictedDates = {
    id: uuidv4(),
    villaId: dates.villaId,
    startDate: dates.startDate.toISOString().split('T')[0],
    endDate: dates.endDate.toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  };
  
  const { data, error } = await supabase
    .from('restricted_dates')
    .insert([restrictedDates])
    .select()
    .single();
  
  if (error) throw error;
  return data.id;
};

// Update booking status
export const updateBookingStatus = async (
  bookingId: string,
  status: "confirmed" | "pending" | "cancelled"
): Promise<boolean> => {
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId);
  
  return !error;
};

// Delete a booking or restricted dates
export const deleteBooking = async (bookingId: string): Promise<boolean> => {
  // Try to delete from bookings first
  const { error: bookingError } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);
  
  if (!bookingError) return true;
  
  // If not found in bookings, try restricted_dates
  const { error: restrictedError } = await supabase
    .from('restricted_dates')
    .delete()
    .eq('id', bookingId);
  
  return !restrictedError;
};

// Send booking confirmation email
export const sendBookingEmail = async (booking: BookingDate): Promise<boolean> => {
  if (!booking.guestInfo) return false;
  
  try {
    // In a real app, we would call a Supabase Edge Function to send emails
    console.log(`Email sent to booking@arteonvillas.com:
      New booking for ${booking.villaId}
      Dates: ${booking.startDate.toLocaleDateString()} - ${booking.endDate.toLocaleDateString()}
      Guest: ${booking.guestInfo.name}
      Email: ${booking.guestInfo.email}
      Phone: ${booking.guestInfo.phone}
      Guests: ${booking.guestInfo.guests}
      Special Requests: ${booking.guestInfo.specialRequests || 'None'}
    `);
    
    // Also send confirmation to guest
    console.log(`Confirmation email sent to ${booking.guestInfo.email}:
      Thank you for booking with Arteon Villas!
      Your booking for ${booking.villaId} from ${booking.startDate.toLocaleDateString()} to ${booking.endDate.toLocaleDateString()} has been confirmed.
    `);
    
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};

// Generate a unique 6-digit booking number
export const generateBookingNumber = (): string => {
  // Generate a random 6-digit number
  return Math.floor(100000 + Math.random() * 900000).toString();
};
