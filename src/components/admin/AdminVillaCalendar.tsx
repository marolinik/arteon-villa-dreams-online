
import { useState, useEffect } from "react";
import { format, addDays, isWithinInterval, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Villa, BookingDate } from "@/types";
import { 
  getBookingsByVillaId, 
  getRestrictedDatesByVillaId, 
  addRestrictedDates,
  deleteBooking
} from "@/data/bookings";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Lock, Unlock } from "lucide-react";

interface AdminVillaCalendarProps {
  villas: Villa[];
  onStatusChange?: () => void;
}

export const AdminVillaCalendar = ({ villas, onStatusChange }: AdminVillaCalendarProps) => {
  const { toast } = useToast();
  const [selectedVilla, setSelectedVilla] = useState<string>(villas[0]?.id || "");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [bookedDates, setBookedDates] = useState<BookingDate[]>([]);
  const [restrictedDates, setRestrictedDates] = useState<BookingDate[]>([]);
  const [selectionMode, setSelectionMode] = useState<"restrict" | "unrestrict">("restrict");

  // Load booked and restricted dates whenever the selected villa changes
  useEffect(() => {
    if (selectedVilla) {
      const booked = getBookingsByVillaId(selectedVilla);
      const restricted = getRestrictedDatesByVillaId(selectedVilla);
      setBookedDates(booked);
      setRestrictedDates(restricted);
    }
  }, [selectedVilla]);

  const handleVillaChange = (villaId: string) => {
    setSelectedVilla(villaId);
    setDateRange({ from: undefined, to: undefined });
  };

  const handleApplyRestriction = () => {
    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Date Range Required",
        description: "Please select both start and end dates.",
        variant: "destructive"
      });
      return;
    }

    // Create a new restricted date entry
    const restrictedBooking: BookingDate = {
      startDate: dateRange.from,
      endDate: dateRange.to,
      villaId: selectedVilla,
      status: "cancelled" // Using "cancelled" status to indicate restriction
    };
    
    addRestrictedDates(restrictedBooking);
    
    // Refresh the dates list
    setRestrictedDates(getRestrictedDatesByVillaId(selectedVilla));
    
    // Reset the date range
    setDateRange({ from: undefined, to: undefined });
    
    toast({
      title: "Dates Restricted",
      description: `The selected date range is now marked as unavailable.`
    });
    
    // Notify parent if needed
    if (onStatusChange) {
      onStatusChange();
    }
  };

  const handleUnrestrict = (bookingId: string) => {
    const success = deleteBooking(bookingId);
    
    if (success) {
      // Refresh the dates lists
      setBookedDates(getBookingsByVillaId(selectedVilla));
      setRestrictedDates(getRestrictedDatesByVillaId(selectedVilla));
      
      toast({
        title: "Restriction Removed",
        description: "The dates are now available for booking."
      });
      
      // Notify parent if needed
      if (onStatusChange) {
        onStatusChange();
      }
    } else {
      toast({
        title: "Operation Failed",
        description: "Could not remove the restriction.",
        variant: "destructive"
      });
    }
  };

  // Check if a date is in the booked or restricted list
  const isDateRestricted = (date: Date): boolean => {
    const day = startOfDay(date);
    
    // Check booked dates
    const isBooked = bookedDates.some(booking => {
      return isWithinInterval(day, {
        start: startOfDay(booking.startDate),
        end: startOfDay(new Date(booking.endDate.getTime() - 1)) // Exclude checkout day
      });
    });

    // Check admin-restricted dates
    const isRestricted = restrictedDates.some(booking => {
      return isWithinInterval(day, {
        start: startOfDay(booking.startDate),
        end: startOfDay(new Date(booking.endDate.getTime() - 1)) // Exclude checkout day
      });
    });

    return isBooked || isRestricted;
  };

  // Custom day renderer for the calendar to show restricted dates
  const renderDay = (day: Date, modifiers: any = {}) => {
    const isRestricted = isDateRestricted(day);
    
    return (
      <div className={cn(
        "relative w-full h-full",
        isRestricted && "bg-red-100"
      )}>
        <div className="absolute top-0 right-0 h-2 w-2">
          {isRestricted && <span className="text-red-500 text-xs">•</span>}
        </div>
        <div className="flex items-center justify-center h-full">
          {day.getDate()}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="w-full md:w-1/3">
          <label className="text-sm font-medium block mb-2">Select Villa</label>
          <Select value={selectedVilla} onValueChange={handleVillaChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select villa" />
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
        
        <div className="w-full md:w-1/3">
          <label className="text-sm font-medium block mb-2">Mode</label>
          <Select value={selectionMode} onValueChange={(value: "restrict" | "unrestrict") => setSelectionMode(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="restrict">
                <div className="flex items-center">
                  <Lock className="mr-2 h-4 w-4" />
                  Restrict Dates
                </div>
              </SelectItem>
              <SelectItem value="unrestrict">
                <div className="flex items-center">
                  <Unlock className="mr-2 h-4 w-4" />
                  Unrestrict Dates
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {selectionMode === "restrict" && (
          <Button 
            onClick={handleApplyRestriction}
            disabled={!dateRange.from || !dateRange.to}
            className="bg-amber-600 hover:bg-amber-700 mt-4 md:mt-0"
          >
            <Lock className="mr-2 h-4 w-4" />
            Apply Restriction
          </Button>
        )}
      </div>
      
      <div className="border rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Select Dates</h3>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-100 mr-1"></div>
              <span className="text-xs">Restricted/Booked</span>
            </span>
            <span className="inline-flex items-center">
              <div className="h-3 w-3 rounded-full bg-white border mr-1"></div>
              <span className="text-xs">Available</span>
            </span>
          </div>
        </div>
        
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={(range) => setDateRange({
            from: range?.from,
            to: range?.to
          })}
          numberOfMonths={2}
          className={cn("border-none")}
        />
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Current Restrictions</h3>
        
        {bookedDates.length === 0 && restrictedDates.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No restricted or booked dates for this villa.</p>
        ) : (
          <div className="bg-gray-50 rounded-md p-4 space-y-2 max-h-64 overflow-y-auto">
            {restrictedDates.map((booking) => (
              <div key={booking.id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <span className="font-medium text-amber-700">Restricted:</span>
                  <span className="ml-2">
                    {format(booking.startDate, "MMM d, yyyy")} - {format(booking.endDate, "MMM d, yyyy")}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleUnrestrict(booking.id!)}
                  className="text-amber-600 border-amber-600 hover:bg-amber-50"
                >
                  <Unlock className="mr-1 h-3 w-3" />
                  Unrestrict
                </Button>
              </div>
            ))}
            
            {bookedDates.map((booking) => (
              <div key={booking.id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <span className={cn(
                    "font-medium",
                    booking.status === "confirmed" ? "text-green-700" : 
                    booking.status === "pending" ? "text-amber-700" : "text-red-700"
                  )}>
                    {booking.status === "confirmed" ? "Confirmed Booking:" : 
                     booking.status === "pending" ? "Pending Booking:" : "Cancelled Booking:"}
                  </span>
                  <span className="ml-2">
                    {format(booking.startDate, "MMM d, yyyy")} - {format(booking.endDate, "MMM d, yyyy")}
                  </span>
                  {booking.guestInfo && (
                    <span className="text-xs block text-gray-500">
                      {booking.guestInfo.name} • {booking.guestInfo.email}
                    </span>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleUnrestrict(booking.id!)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Cancel Booking
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
