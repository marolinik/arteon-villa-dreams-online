
import { BookingDate } from "@/types";

// Mock booking data
export const bookings: BookingDate[] = [
  {
    startDate: new Date(2025, 5, 1), // June 1, 2025
    endDate: new Date(2025, 5, 7), // June 7, 2025
    villaId: "villa-armonia"
  },
  {
    startDate: new Date(2025, 5, 15), // June 15, 2025
    endDate: new Date(2025, 5, 22), // June 22, 2025
    villaId: "villa-armonia"
  },
  {
    startDate: new Date(2025, 6, 5), // July 5, 2025
    endDate: new Date(2025, 6, 15), // July 15, 2025
    villaId: "villa-eirini"
  },
  {
    startDate: new Date(2025, 7, 10), // August 10, 2025
    endDate: new Date(2025, 7, 20), // August 20, 2025
    villaId: "villa-thea"
  },
  {
    startDate: new Date(2025, 5, 20), // June 20, 2025
    endDate: new Date(2025, 5, 30), // June 30, 2025
    villaId: "villa-onar"
  }
];

export const getBookingsByVillaId = (villaId: string): BookingDate[] => {
  return bookings.filter(booking => booking.villaId === villaId);
};

export const checkAvailability = (
  villaId: string, 
  startDate: Date, 
  endDate: Date
): boolean => {
  const villaBookings = getBookingsByVillaId(villaId);
  
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
  
  return true; // Villa is available
};

export const addBooking = (booking: BookingDate): void => {
  bookings.push(booking);
};
