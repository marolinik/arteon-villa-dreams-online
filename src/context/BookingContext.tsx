
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BookingDate } from '@/types';
import { getBookingsByVillaId, getRestrictedDatesByVillaId } from '@/api/bookingsApi';

// Define the context type
interface BookingContextType {
  bookings: BookingDate[];
  restrictedDates: BookingDate[];
  isLoading: boolean;
  error: string | null;
  refreshBookings: (villaId?: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
  initialVillaId?: string;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ 
  children,
  initialVillaId
}) => {
  const [bookings, setBookings] = useState<BookingDate[]>([]);
  const [restrictedDates, setRestrictedDates] = useState<BookingDate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentVillaId, setCurrentVillaId] = useState<string | undefined>(initialVillaId);

  const fetchBookings = async (villaId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch regular bookings
      const bookingsData = await getBookingsByVillaId(villaId);
      setBookings(bookingsData);
      
      // Fetch restricted dates
      const restrictedData = await getRestrictedDatesByVillaId(villaId);
      setRestrictedDates(restrictedData);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load booking data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBookings = async (villaId?: string) => {
    const idToUse = villaId || currentVillaId;
    if (idToUse) {
      await fetchBookings(idToUse);
      if (villaId) {
        setCurrentVillaId(villaId);
      }
    }
  };

  useEffect(() => {
    if (initialVillaId) {
      fetchBookings(initialVillaId);
    }
  }, [initialVillaId]);

  const contextValue: BookingContextType = {
    bookings,
    restrictedDates,
    isLoading,
    error,
    refreshBookings,
  };

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};
