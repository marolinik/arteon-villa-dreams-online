
import { useState, useEffect } from "react";
import { format, addDays, isWithinInterval, isBefore, isAfter, startOfDay, isSaturday, differenceInDays } from "date-fns";
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
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  
  // Define the booking season dates
  const seasonStart = new Date(2025, 4, 31); // May 31, 2025
  const seasonEnd = new Date(2025, 9, 4); // October 4, 2025

  // Only trigger the callback when dates actually change
  useEffect(() => {
    onDateRangeChange(dateRange?.from, dateRange?.to);
  }, [dateRange?.from, dateRange?.to, onDateRangeChange]);
  
  // Check if a date is booked already - we're resetting this for now
  const isDateBooked = (date: Date): boolean => {
    // Reset all booked dates for now
    return false;
  };
  
  // Check if a date is a Saturday
  const isSaturdayDate = (date: Date): boolean => {
    return isSaturday(date);
  };

  // Don't allow past dates, booked dates, dates outside the season, or non-Saturday dates
  const isDateDisabled = (date: Date): boolean => {
    const day = startOfDay(date);
    
    // Allow only Saturdays
    if (!isSaturdayDate(day)) {
      return true;
    }
    
    return isBefore(day, startOfDay(new Date())) || 
           isDateBooked(day) || 
           isBefore(day, seasonStart) || 
           isAfter(day, seasonEnd);
  };

  // Handle date range selection with 7-day minimum stay requirement
  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (!range || !range.from) {
      setDateRange(range);
      return;
    }

    // If no end date is selected yet, just update the start date (must be a Saturday)
    if (!range.to) {
      setDateRange(range);
      return;
    }

    // Calculate the number of days between start and end dates
    const daysBetween = differenceInDays(range.to, range.from);
    
    // Check if the range spans exactly 7, 14, 21, etc. days (Saturday to Saturday)
    if (daysBetween % 7 === 0 && daysBetween >= 7) {
      setDateRange(range);
    } else {
      // If not a 7-day multiple, automatically set to exactly 7 days
      setDateRange({
        from: range.from,
        to: addDays(range.from, 7)
      });
    }
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium mb-1.5">Check-in Date (Saturday)</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  format(dateRange.from, "PPP")
                ) : (
                  <span>Pick a check-in date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                disabled={isDateDisabled}
                initialFocus
                footer={
                  <div className="px-4 pt-0 pb-3 text-xs text-gray-500">
                    * Booking available Saturday to Saturday only
                  </div>
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-medium mb-1.5">Check-out Date (Saturday)</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange?.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.to ? (
                  format(dateRange.to, "PPP")
                ) : (
                  <span>Pick a check-out date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                disabled={isDateDisabled}
                initialFocus
                footer={
                  <div className="px-4 pt-0 pb-3 text-xs text-gray-500">
                    * Minimum stay: 7 days (Saturday to Saturday)
                  </div>
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {dateRange?.from && dateRange?.to && (
        <p className="text-sm text-villa-green">
          {`Your stay: ${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`}
        </p>
      )}
    </div>
  );
};
