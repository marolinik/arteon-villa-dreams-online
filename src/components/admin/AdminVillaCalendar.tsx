
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
import { 
  getBookingsByVillaId, 
  getRestrictedDatesByVillaId,
  addRestrictedDates,
  deleteBooking
} from "@/api/bookingsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [restrictedDates, setRestrictedDates] = useState<BookingDate[]>([]);
  const [selectedVillaId, setSelectedVillaId] = useState<string | undefined>(villaId);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Load bookings for the villa if villaId is provided or selected
    if (selectedVillaId) {
      loadBookingsForVilla(selectedVillaId);
    } else if (villas && villas.length > 0) {
      setSelectedVillaId(villas[0].id);
      loadBookingsForVilla(villas[0].id);
    }
  }, [selectedVillaId]);
  
  const loadBookingsForVilla = async (id: string) => {
    setIsLoading(true);
    try {
      // Fetch regular bookings
      const bookings = await getBookingsByVillaId(id);
      setBookedDates(bookings);
      
      // Fetch restricted dates
      const restricted = await getRestrictedDatesByVillaId(id);
      setRestrictedDates(restricted);
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load booking information.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVillaChange = (id: string) => {
    setSelectedVillaId(id);
  };
  
  const handleBooking = async () => {
    if (!date?.from || !date?.to || !selectedVillaId) {
      toast({
        title: "Error",
        description: "Please select both start and end dates and a villa.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add blocked dates to the database
      await addRestrictedDates({
        villaId: selectedVillaId,
        startDate: date.from,
        endDate: date.to,
        status: "cancelled" // Marked as cancelled to indicate it's restricted
      });
      
      // Refresh data
      await loadBookingsForVilla(selectedVillaId);
      
      toast({
        title: "Success",
        description: "Dates blocked successfully!",
      });
      
      // Notify parent component if needed
      if (onStatusChange) {
        onStatusChange();
      }
      
      // Reset the date
      setDate(undefined);
    } catch (error) {
      console.error('Error booking villa:', error);
      toast({
        title: "Error",
        description: "Failed to block dates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isDateBlocked = (date: Date) => {
    // Check against booked dates
    const isBooked = bookedDates.some(booking => {
      return (
        (isEqual(date, booking.startDate) || isAfter(date, booking.startDate)) &&
        (isEqual(date, booking.endDate) || isBefore(date, booking.endDate))
      );
    });
    
    // Check against restricted dates
    const isRestricted = restrictedDates.some(booking => {
      return (
        (isEqual(date, booking.startDate) || isAfter(date, booking.startDate)) &&
        (isEqual(date, booking.endDate) || isBefore(date, booking.endDate))
      );
    });
    
    return isBooked || isRestricted;
  };
  
  const cancelBooking = async (booking: BookingDate) => {
    try {
      // Delete booking from database
      await deleteBooking(booking.id);
      
      // Refresh data
      if (selectedVillaId) {
        await loadBookingsForVilla(selectedVillaId);
      }
      
      toast({
        title: "Booking Cancelled",
        description: `Dates from ${format(booking.startDate, 'PP')} to ${format(booking.endDate, 'PP')} are now available.`,
      });
      
      // Notify parent component if needed
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-serif font-semibold mb-4">Villa Calendar</h3>
      
      {/* Villa selector */}
      {villas && villas.length > 0 && (
        <div className="mb-4">
          <Label htmlFor="villa-select">Select Villa</Label>
          <Select
            value={selectedVillaId}
            onValueChange={handleVillaChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a villa" />
            </SelectTrigger>
            <SelectContent>
              {villas.map((villa) => (
                <SelectItem key={villa.id} value={villa.id}>
                  {villa.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
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
              <span>Pick dates to block</span>
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
            className="border-0 rounded-md overflow-hidden p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      
      <Button 
        className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white"
        onClick={handleBooking}
        disabled={isSubmitting || !date?.from || !date?.to}
      >
        {isSubmitting ? "Processing..." : "Block Selected Dates"}
      </Button>
      
      <div className="mt-8">
        <h4 className="text-lg font-medium mb-2">Unavailable Dates:</h4>
        {isLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {[...bookedDates, ...restrictedDates].length === 0 ? (
              <p className="text-gray-500">No bookings or restrictions yet.</p>
            ) : (
              <ul className="space-y-2">
                {[...bookedDates, ...restrictedDates]
                  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                  .map((booking) => (
                    <li 
                      key={booking.id}
                      className="flex items-center justify-between py-2 px-3 rounded-md bg-gray-100"
                    >
                      <div>
                        {booking.status === "cancelled" || restrictedDates.some(r => r.id === booking.id) ? (
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
                      >
                        {booking.status === "cancelled" || restrictedDates.some(r => r.id === booking.id) 
                          ? "Remove" : "Cancel"}
                      </Button>
                    </li>
                  ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminVillaCalendar;
