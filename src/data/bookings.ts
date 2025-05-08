
import { BookingDate, GuestInfo } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// Initialize bookings from localStorage or use empty array if none exist
const getStoredBookings = (): BookingDate[] => {
  const storedBookings = localStorage.getItem('bookings');
  if (storedBookings) {
    // Parse and convert string dates back to Date objects
    const parsedBookings = JSON.parse(storedBookings);
    return parsedBookings.map((booking: any) => ({
      ...booking,
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
      createdAt: booking.createdAt ? new Date(booking.createdAt) : undefined
    }));
  }
  return [];
};

// Initialize restricted dates from localStorage or use empty array if none exist
const getStoredRestrictedDates = (): BookingDate[] => {
  const storedDates = localStorage.getItem('restrictedDates');
  if (storedDates) {
    // Parse and convert string dates back to Date objects
    const parsedDates = JSON.parse(storedDates);
    return parsedDates.map((date: any) => ({
      ...date,
      startDate: new Date(date.startDate),
      endDate: new Date(date.endDate),
      createdAt: date.createdAt ? new Date(date.createdAt) : undefined
    }));
  }
  return [];
};

// Load bookings from localStorage
export const bookings: BookingDate[] = getStoredBookings();

// Load restricted dates from localStorage
export const restrictedDates: BookingDate[] = getStoredRestrictedDates();

// Store used booking numbers to ensure uniqueness
const usedBookingNumbers: Set<string> = new Set(
  bookings
    .filter(booking => booking.bookingNumber)
    .map(booking => booking.bookingNumber!)
);

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

// Save bookings to localStorage
const saveBookings = () => {
  localStorage.setItem('bookings', JSON.stringify(bookings));
};

// Save restricted dates to localStorage
const saveRestrictedDates = () => {
  localStorage.setItem('restrictedDates', JSON.stringify(restrictedDates));
};

export const getBookingsByVillaId = (villaId: string): BookingDate[] => {
  return [...bookings, ...restrictedDates].filter(booking => 
    booking.villaId === villaId && booking.status !== "cancelled"
  );
};

export const getAllBookings = (): BookingDate[] => {
  return [...bookings, ...restrictedDates];
};

// Function to get all restricted dates
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
  const bookingNumber = booking.bookingNumber || generateBookingNumber();
  
  const newBooking = {
    ...booking,
    id: booking.id || uuidv4(),
    status: booking.status || "confirmed" as "confirmed" | "pending" | "cancelled",
    createdAt: booking.createdAt || new Date(),
    bookingNumber: bookingNumber
  };
  
  bookings.push(newBooking);
  saveBookings(); // Save to localStorage
  return newBooking.id;
};

export const addRestrictedDates = (booking: BookingDate): string => {
  const restrictedBooking = {
    ...booking,
    id: booking.id || uuidv4(),
    status: "cancelled" as "cancelled",
    createdAt: booking.createdAt || new Date()
  };
  
  restrictedDates.push(restrictedBooking);
  saveRestrictedDates(); // Save to localStorage
  return restrictedBooking.id;
};

export const deleteBooking = (bookingId: string): boolean => {
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  
  if (bookingIndex !== -1) {
    bookings.splice(bookingIndex, 1);
    saveBookings(); // Save to localStorage
    return true;
  }
  
  const restrictedIndex = restrictedDates.findIndex(r => r.id === bookingId);
  
  if (restrictedIndex !== -1) {
    restrictedDates.splice(restrictedIndex, 1);
    saveRestrictedDates(); // Save to localStorage
    return true;
  }
  
  return false;
};

export const updateBookingStatus = (bookingId: string, status: "confirmed" | "pending" | "cancelled"): boolean => {
  const booking = bookings.find(b => b.id === bookingId);
  
  if (booking) {
    booking.status = status;
    saveBookings(); // Save to localStorage
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
    
    // Log emails in localStorage for persistence
    const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    sentEmails.push({
      to: 'booking@arteonvillas.com',
      subject: `New Booking: ${booking.villaId}`,
      body: `
        Dates: ${booking.startDate.toLocaleDateString()} - ${booking.endDate.toLocaleDateString()}
        Guest: ${booking.guestInfo.name}
        Email: ${booking.guestInfo.email}
        Phone: ${booking.guestInfo.phone}
        Guests: ${booking.guestInfo.guests}
        Special Requests: ${booking.guestInfo.specialRequests || 'None'}
      `,
      date: new Date().toISOString()
    });
    
    sentEmails.push({
      to: booking.guestInfo.email,
      subject: 'Your Arteon Villas Booking Confirmation',
      body: `
        Thank you for booking with Arteon Villas!
        Your booking for ${booking.villaId} from ${booking.startDate.toLocaleDateString()} to ${booking.endDate.toLocaleDateString()} has been confirmed.
      `,
      date: new Date().toISOString()
    });
    
    localStorage.setItem('sentEmails', JSON.stringify(sentEmails));
    
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};
