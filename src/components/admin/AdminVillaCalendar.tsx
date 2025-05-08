
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { addDays, isBefore, isAfter, isEqual, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle, XCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BookingDate, Villa } from "@/types";
import { bookings } from "@/data/bookings";

interface AdminVillaCalendarProps {
  villaId?: string;
  villas?: Villa[];
  onStatusChange?: () => void;
}

const AdminVillaCalendar = ({ villaId, villas, onStatusChange }: AdminVillaCalendarProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedDates, setBookedDates] = useState<BookingDate[]>([]);
  
  useEffect(() => {
    // Load bookings for the villa
    if (villaId) {
      const villaBookings = bookings.filter(booking => booking.villaId === villaId);
      setBookedDates(villaBookings);
    }
  }, [villaId]);
  
  const handleBooking = async () => {
    if (!date?.from || !date?.to) {
      toast({
        title: "Error",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create a new booking
      const newBooking: BookingDate = {
        id: `booking-${Date.now()}`, // Generate a temporary ID
        villaId: villaId || "",
        startDate: date.from,
        endDate: date.to,
        status: "confirmed"
      };
      
      // Add the new booking to the list
      setBookedDates([...bookedDates, newBooking]);
      
      toast({
        title: "Success",
        description: "Villa booked successfully!",
      });
      
      // Notify parent component if needed
      if (onStatusChange) {
        onStatusChange();
      }
      
      // Reset the date
      setDate(undefined);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book villa. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isDateBlocked = (date: Date) => {
    return bookedDates.some(booking => {
      return (
        (isEqual(date, booking.startDate) || isAfter(date, booking.startDate)) &&
        (isEqual(date, booking.endDate) || isBefore(date, booking.endDate))
      );
    });
  };
  
  const cancelBooking = (booking: BookingDate) => {
    // Delete existing booking
    const filteredBookings = bookings.filter(b => b.id !== booking.id);
    
    // Add a cancelled booking placeholder to show in the calendar
    const cancelledBooking: BookingDate = {
      id: `cancelled-${Date.now()}`, // Generate a temporary ID
      startDate: booking.startDate,
      endDate: booking.endDate,
      villaId: booking.villaId,
      status: "cancelled"
    };
    
    setBookedDates([...bookedDates.filter(b => b.id !== booking.id), cancelledBooking]);
    
    toast({
      title: "Booking Cancelled",
      description: `Booking from ${format(booking.startDate, 'PP')} to ${format(booking.endDate, 'PP')} has been cancelled.`,
    });
    
    // Notify parent component if needed
    if (onStatusChange) {
      onStatusChange();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-serif font-semibold mb-4">Villa Calendar</h3>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "w-full justify-start text-left font-normal" +
              (date?.from ? " text-sm" : " text-muted-foreground")
            }
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                `${format(date.from, "MMM dd, yyyy")} - ${format(
                  date.to,
                  "MMM dd, yyyy"
                )}`
              ) : (
                format(date.from, "MMM dd, yyyy")
              )
            ) : (
              <span>Pick dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center" side="bottom">
          <Calendar
            mode="range"
            defaultMonth={date?.from ? date.from : new Date()}
            selected={date}
            onSelect={setDate}
            disabled={(date) =>
              isBefore(date, new Date()) || isDateBlocked(date)
            }
            numberOfMonths={2}
            pagedNavigation
            className="border-0 rounded-md overflow-hidden"
          />
        </PopoverContent>
      </Popover>
      
      <Button 
        className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white"
        onClick={handleBooking}
        disabled={isSubmitting || !date?.from || !date?.to}
      >
        {isSubmitting ? "Booking..." : "Book Villa"}
      </Button>
      
      <div className="mt-8">
        <h4 className="text-lg font-medium mb-2">Booked Dates:</h4>
        {bookedDates.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <ul className="space-y-2">
            {bookedDates.map((booking) => (
              <li 
                key={booking.startDate.toISOString() + booking.endDate.toISOString()}
                className="flex items-center justify-between py-2 px-3 rounded-md bg-gray-100"
              >
                <div>
                  {booking.status === "cancelled" ? (
                    <XCircle className="inline-block w-4 h-4 mr-1 text-red-500 align-middle" />
                  ) : (
                    <CheckCircle className="inline-block w-4 h-4 mr-1 text-green-500 align-middle" />
                  )}
                  {format(booking.startDate, "MMM dd, yyyy")} - {format(booking.endDate, "MMM dd, yyyy")}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() => cancelBooking(booking)}
                  disabled={booking.status === "cancelled"}
                >
                  Cancel
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminVillaCalendar;
