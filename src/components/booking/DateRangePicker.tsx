
import { useState, useEffect } from "react";
import { format, addDays, isWithinInterval, isBefore, isAfter, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingDate } from "@/types";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  villaId: string;
  bookedDates: BookingDate[];
  onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  className?: string;
}

export const DateRangePicker = ({ 
  villaId, 
  bookedDates, 
  onDateRangeChange,
  className 
}: DateRangePickerProps) => {
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: undefined,
    to: undefined
  });
  
  useEffect(() => {
    onDateRangeChange(selectedRange.from, selectedRange.to);
  }, [selectedRange, onDateRangeChange]);
  
  // Check if a date is booked already
  const isDateBooked = (date: Date): boolean => {
    const day = startOfDay(date);
    
    return bookedDates.some(booking => 
      isWithinInterval(day, { 
        start: startOfDay(booking.startDate), 
        end: startOfDay(booking.endDate) 
      })
    );
  };
  
  // Define the booking season dates
  const seasonStart = new Date(2025, 4, 31); // May 31, 2025
  const seasonEnd = new Date(2025, 9, 4); // October 4, 2025

  // Don't allow past dates, booked dates, or dates outside the season
  const isDateDisabled = (date: Date): boolean => {
    const day = startOfDay(date);
    return isBefore(day, startOfDay(new Date())) || 
           isDateBooked(day) || 
           isBefore(day, seasonStart) || 
           isAfter(day, seasonEnd);
  };
  
  // Custom CSS for certain dates
  const getDateClassName = (date: Date): string => {
    const day = startOfDay(date);
    
    if (isDateBooked(day)) {
      return "bg-red-100 text-red-800";
    }
    
    if (isBefore(day, seasonStart) || isAfter(day, seasonEnd)) {
      return "bg-gray-100 text-gray-400";
    }
    
    return "";
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium mb-1.5">Check-in Date</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedRange.from ? (
                  format(selectedRange.from, "PPP")
                ) : (
                  <span>Pick a check-in date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={selectedRange}
                onSelect={setSelectedRange}
                disabled={isDateDisabled}
                modifiers={{
                  booked: (date) => isDateBooked(date),
                  outsideSeason: (date) => {
                    const day = startOfDay(date);
                    return isBefore(day, seasonStart) || isAfter(day, seasonEnd);
                  }
                }}
                modifiersClassNames={{
                  booked: "bg-red-100 text-red-800",
                  outsideSeason: "bg-gray-100 text-gray-400"
                }}
                className={cn("p-3 pointer-events-auto")}
                footer={
                  <div className="px-4 pt-0 pb-3 text-xs text-gray-500">
                    * Booking available only between May 31 - Oct 4, 2025
                  </div>
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-medium mb-1.5">Check-out Date</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedRange.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedRange.to ? (
                  format(selectedRange.to, "PPP")
                ) : (
                  <span>Pick a check-out date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={selectedRange}
                onSelect={setSelectedRange}
                disabled={isDateDisabled}
                modifiers={{
                  booked: (date) => isDateBooked(date),
                  outsideSeason: (date) => {
                    const day = startOfDay(date);
                    return isBefore(day, seasonStart) || isAfter(day, seasonEnd);
                  }
                }}
                modifiersClassNames={{
                  booked: "bg-red-100 text-red-800",
                  outsideSeason: "bg-gray-100 text-gray-400"
                }}
                className={cn("p-3 pointer-events-auto")}
                footer={
                  <div className="px-4 pt-0 pb-3 text-xs text-gray-500">
                    * Booking available only between May 31 - Oct 4, 2025
                  </div>
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {selectedRange.from && selectedRange.to && (
        <p className="text-sm text-villa-green">
          {`Your stay: ${format(selectedRange.from, "PPP")} - ${format(selectedRange.to, "PPP")}`}
        </p>
      )}
    </div>
  );
};
