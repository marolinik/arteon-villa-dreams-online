
import { BookingDate, GuestInfo } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// Mock booking data - empty for now to reset all unavailable dates
export const bookings: BookingDate[] = [];

// Array to store admin-restricted dates - also empty for now
export const restrictedDates: BookingDate[] = [];

export const getBookingsByVillaId = (villaId: string): BookingDate[] => {
  return [...bookings, ...restrictedDates].filter(booking => 
    booking.villaId === villaId && booking.status !== "cancelled"
  );
};

export const getAllBookings = (): BookingDate[] => {
  return [...bookings, ...restrictedDates];
};

// New function to get all restricted dates
export const getRestrictedDatesByVillaId = (villaId: string): BookingDate[] => {
  return restrictedDates.filter(date => date.villaId === villaId);
};

export const checkAvailability = (
  villaId: string, 
  startDate: Date, 
  endDate: Date
): boolean => {
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
  
  // Check if dates are within allowed booking season (May 31 to October 4, 2025)
  const seasonStart = new Date(2025, 4, 31); // May 31, 2025
  const seasonEnd = new Date(2025, 9, 4); // October 4, 2025
  
  if (startDate < seasonStart || endDate > seasonEnd) {
    return false; // Dates are outside booking season
  }
  
  return true; // Villa is available
};

export const addBooking = (booking: BookingDate): string => {
  const newBooking = {
    ...booking,
    id: uuidv4(),
    status: booking.status || "confirmed" as "confirmed" | "pending" | "cancelled",
    createdAt: new Date()
  };
  
  bookings.push(newBooking);
  return newBooking.id;
};

export const addRestrictedDates = (booking: BookingDate): string => {
  const restrictedBooking = {
    ...booking,
    id: uuidv4(),
    status: "cancelled" as "cancelled",
    createdAt: new Date()
  };
  
  restrictedDates.push(restrictedBooking);
  return restrictedBooking.id;
};

export const deleteBooking = (bookingId: string): boolean => {
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
};

export const updateBookingStatus = (bookingId: string, status: "confirmed" | "pending" | "cancelled"): boolean => {
  const booking = bookings.find(b => b.id === bookingId);
  
  if (booking) {
    booking.status = status;
    return true;
  }
  
  return false;
};

// Send booking confirmation email
export const sendBookingEmail = async (booking: BookingDate): Promise<boolean> => {
  if (!booking.guestInfo) return false;
  
  try {
    // In a real application, this would connect to an email service
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
