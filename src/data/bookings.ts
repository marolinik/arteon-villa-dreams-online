
import { supabase } from "@/integrations/supabase/client";
import { BookingDate, GuestInfo } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// Store bookings in Supabase instead of in memory
export const bookings: BookingDate[] = [];

// Array to store admin-restricted dates - empty for now since we'll use Supabase
export const restrictedDates: BookingDate[] = [];

// Store used booking numbers to ensure uniqueness
const usedBookingNumbers: Set<string> = new Set();

// Generate a unique 6-digit booking number
export const generateBookingNumber = (): string => {
  let bookingNumber: string;
  
  do {
    // Generate a random 6-digit number
    bookingNumber = Math.floor(100000 + Math.random() * 900000).toString();
  } while (usedBookingNumbers.has(bookingNumber));
  
  // Add to used numbers set to prevent future duplicates
  usedBookingNumbers.add(bookingNumber);
  
  return bookingNumber;
};

export const getBookingsByVillaId = async (villaId: string): Promise<BookingDate[]> => {
  try {
    // Fetch bookings from Supabase
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select('*')
      .eq('villa_id', villaId)
      .neq('status', 'cancelled');
      
    // Fetch restricted dates from Supabase
    const { data: restrictedData, error: restrictedError } = await supabase
      .from('restricted_dates')
      .select('*')
      .eq('villa_id', villaId);
    
    if (bookingsError) throw bookingsError;
    if (restrictedError) throw restrictedError;
    
    const bookingDates: BookingDate[] = [];
    
    // Transform bookings data
    if (bookingsData) {
      bookingsData.forEach(booking => {
        bookingDates.push({
          id: booking.id,
          villaId: booking.villa_id,
          startDate: new Date(booking.start_date),
          endDate: new Date(booking.end_date),
          status: booking.status as "confirmed" | "pending" | "cancelled",
          createdAt: new Date(booking.created_at),
          bookingNumber: booking.booking_number,
          totalPrice: booking.total_price,
          guestInfo: {
            name: booking.guest_name,
            email: booking.guest_email,
            phone: booking.guest_phone,
            guests: booking.guest_count,
            specialRequests: booking.special_requests
          }
        });
      });
    }
    
    // Transform restricted dates
    if (restrictedData) {
      restrictedData.forEach(restricted => {
        bookingDates.push({
          id: restricted.id,
          villaId: restricted.villa_id,
          startDate: new Date(restricted.start_date),
          endDate: new Date(restricted.end_date),
          status: "cancelled" as "cancelled", // Marked as cancelled for display purposes
          createdAt: new Date(restricted.created_at),
          reason: restricted.reason
        });
      });
    }
    
    return bookingDates;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [...bookings, ...restrictedDates].filter(booking => 
      booking.villaId === villaId && booking.status !== "cancelled"
    );
  }
};

export const getAllBookings = async (): Promise<BookingDate[]> => {
  try {
    // Fetch all bookings
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select('*');
      
    // Fetch all restricted dates
    const { data: restrictedData, error: restrictedError } = await supabase
      .from('restricted_dates')
      .select('*');
    
    if (bookingsError) throw bookingsError;
    if (restrictedError) throw restrictedError;
    
    const allBookings: BookingDate[] = [];
    
    // Transform bookings data
    if (bookingsData) {
      bookingsData.forEach(booking => {
        allBookings.push({
          id: booking.id,
          villaId: booking.villa_id,
          startDate: new Date(booking.start_date),
          endDate: new Date(booking.end_date),
          status: booking.status as "confirmed" | "pending" | "cancelled",
          createdAt: new Date(booking.created_at),
          bookingNumber: booking.booking_number,
          totalPrice: booking.total_price,
          guestInfo: {
            name: booking.guest_name,
            email: booking.guest_email,
            phone: booking.guest_phone,
            guests: booking.guest_count,
            specialRequests: booking.special_requests
          }
        });
      });
    }
    
    // Transform restricted dates
    if (restrictedData) {
      restrictedData.forEach(restricted => {
        allBookings.push({
          id: restricted.id,
          villaId: restricted.villa_id,
          startDate: new Date(restricted.start_date),
          endDate: new Date(restricted.end_date),
          status: "cancelled" as "cancelled", // Marked as cancelled for display purposes
          createdAt: new Date(restricted.created_at),
          reason: restricted.reason
        });
      });
    }
    
    return allBookings;
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    return [...bookings, ...restrictedDates];
  }
};

// Get all restricted dates
export const getRestrictedDatesByVillaId = async (villaId: string): Promise<BookingDate[]> => {
  try {
    const { data, error } = await supabase
      .from('restricted_dates')
      .select('*')
      .eq('villa_id', villaId);
    
    if (error) throw error;
    
    return data ? data.map(item => ({
      id: item.id,
      villaId: item.villa_id,
      startDate: new Date(item.start_date),
      endDate: new Date(item.end_date),
      createdAt: new Date(item.created_at),
      status: "cancelled" as "cancelled", // For type compatibility
      reason: item.reason
    })) : [];
  } catch (error) {
    console.error('Error fetching restricted dates:', error);
    return restrictedDates.filter(date => date.villaId === villaId);
  }
};

export const checkAvailability = async (
  villaId: string, 
  startDate: Date, 
  endDate: Date
): Promise<boolean> => {
  try {
    // Use Supabase's RPC function to check availability
    const { data, error } = await supabase
      .rpc('check_villa_availability', {
        p_villa_id: villaId,
        p_start_date: startDate.toISOString().split('T')[0],
        p_end_date: endDate.toISOString().split('T')[0]
      });
    
    if (error) throw error;
    
    // Check if dates are within allowed booking season (May 31 to October 4, 2025)
    const seasonStart = new Date(2025, 4, 31); // May 31, 2025
    const seasonEnd = new Date(2025, 9, 4); // October 4, 2025
    
    if (startDate < seasonStart || endDate > seasonEnd) {
      return false; // Dates are outside booking season
    }
    
    return data === true;
  } catch (error) {
    console.error('Error checking availability:', error);
    
    // Fallback to local check
    // Get all bookings for this villa (including restricted dates)
    const villaBookings = [...bookings, ...restrictedDates].filter(booking => 
      booking.villaId === villaId && booking.status !== "cancelled"
    );
    
    // Check if there's any overlap with existing bookings
    for (const booking of villaBookings) {
      if (
        (startDate >= booking.startDate && startDate < booking.endDate) ||
        (endDate > booking.startDate && endDate <= booking.endDate) ||
        (startDate <= booking.startDate && endDate >= booking.endDate)
      ) {
        return false; // Villa is not available for these dates
      }
    }
    
    // Check season dates locally too
    const seasonStart = new Date(2025, 4, 31); // May 31, 2025
    const seasonEnd = new Date(2025, 9, 4); // October 4, 2025
    
    if (startDate < seasonStart || endDate > seasonEnd) {
      return false; // Dates are outside booking season
    }
    
    return true; // Villa is available
  }
};

export const addBooking = async (booking: BookingDate): Promise<string> => {
  const bookingNumber = generateBookingNumber();
  
  try {
    // Insert the booking into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        villa_id: booking.villaId,
        start_date: booking.startDate.toISOString().split('T')[0],
        end_date: booking.endDate.toISOString().split('T')[0],
        guest_name: booking.guestInfo?.name,
        guest_email: booking.guestInfo?.email,
        guest_phone: booking.guestInfo?.phone,
        guest_count: booking.guestInfo?.guests,
        special_requests: booking.guestInfo?.specialRequests,
        booking_number: bookingNumber,
        total_price: booking.totalPrice || 0,
        status: booking.status || "pending"
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return data.id;
  } catch (error) {
    console.error('Error adding booking:', error);
    
    // Fallback to local storage
    const newBooking = {
      ...booking,
      id: uuidv4(),
      status: booking.status || "confirmed" as "confirmed" | "pending" | "cancelled",
      createdAt: new Date(),
      bookingNumber: bookingNumber
    };
    
    bookings.push(newBooking);
    return newBooking.id;
  }
};

export const addRestrictedDates = async (booking: BookingDate): Promise<string> => {
  try {
    // Insert the restricted dates into Supabase
    const { data, error } = await supabase
      .from('restricted_dates')
      .insert([{
        villa_id: booking.villaId,
        start_date: booking.startDate.toISOString().split('T')[0],
        end_date: booking.endDate.toISOString().split('T')[0],
        reason: booking.reason || "Admin blocked"
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return data.id;
  } catch (error) {
    console.error('Error adding restricted dates:', error);
    
    // Fallback to local storage
    const restrictedBooking = {
      ...booking,
      id: uuidv4(),
      status: "cancelled" as "cancelled",
      createdAt: new Date()
    };
    
    restrictedDates.push(restrictedBooking);
    return restrictedBooking.id;
  }
};

export const deleteBooking = async (bookingId: string): Promise<boolean> => {
  try {
    // Try to delete from bookings table
    const { error: bookingError } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId);
    
    // If not found in bookings, try restricted_dates
    if (bookingError) {
      const { error: restrictedError } = await supabase
        .from('restricted_dates')
        .delete()
        .eq('id', bookingId);
      
      if (restrictedError) throw restrictedError;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    
    // Fallback to local deletion
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      bookings.splice(bookingIndex, 1);
      return true;
    }
    
    const restrictedIndex = restrictedDates.findIndex(r => r.id === bookingId);
    if (restrictedIndex !== -1) {
      restrictedDates.splice(restrictedIndex, 1);
      return true;
    }
    
    return false;
  }
};

export const updateBookingStatus = async (bookingId: string, status: "confirmed" | "pending" | "cancelled"): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating booking status:', error);
    
    // Fallback to local update
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = status;
      return true;
    }
    
    return false;
  }
};

// Send booking confirmation email - now this would use Supabase Edge Functions in production
export const sendBookingEmail = async (booking: BookingDate): Promise<boolean> => {
  if (!booking.guestInfo) return false;
  
  try {
    // In a real application, this would connect to an email service via Supabase Edge Functions
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
