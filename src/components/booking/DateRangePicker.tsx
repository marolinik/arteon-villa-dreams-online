
import { useState, useEffect } from "react";
import { format, addDays, isWithinInterval, isBefore, isAfter, startOfDay, isSunday, differenceInDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingDate } from "@/types";
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";

interface DateRangePickerProps {
  villaId: string;
  bookedDates: BookingDate[];
  onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  className?: string;
  onSeasonChange?: (seasonRate: number) => void;
}

export const DateRangePicker = ({ 
  villaId, 
  bookedDates, 
  onDateRangeChange,
  onSeasonChange,
  className 
}: DateRangePickerProps) => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  
  // Define the booking season dates
  const seasonStart = new Date(2025, 4, 31); // May 31, 2025
  const seasonEnd = new Date(2025, 9, 4); // October 4, 2025

  // Define the seasonal rates as per the pricing page
  const seasons = [
    { start: new Date(2025, 3, 17), end: new Date(2025, 3, 22), rate: 430 }, // Easter: 17.4.25 - 22.4.25
    { start: new Date(2025, 4, 31), end: new Date(2025, 5, 30), rate: 380 }, // 31.5.25 - 30.6.25
    { start: new Date(2025, 6, 1), end: new Date(2025, 6, 31), rate: 460 }, // 1.7.25 - 31.7.25
    { start: new Date(2025, 7, 1), end: new Date(2025, 7, 31), rate: 530 }, // 1.8.25 - 31.8.25
    { start: new Date(2025, 8, 1), end: new Date(2025, 8, 15), rate: 460 }, // 1.9.25 - 15.9.25
    { start: new Date(2025, 8, 16), end: new Date(2025, 9, 4), rate: 380 }, // 16.9.25 - 4.10.25
  ];

  // Calculate the rate for the current date range
  useEffect(() => {
    if (dateRange?.from && onSeasonChange) {
      const season = seasons.find(s => 
        isWithinInterval(dateRange.from, { start: s.start, end: s.end })
      );
      
      if (season) {
        onSeasonChange(season.rate);
      }
    }
  }, [dateRange?.from, onSeasonChange]);

  // Only trigger the callback when dates actually change
  useEffect(() => {
    onDateRangeChange(dateRange?.from, dateRange?.to);
  }, [dateRange?.from, dateRange?.to, onDateRangeChange]);
  
  // Check if a date is booked already
  const isDateBooked = (date: Date): boolean => {
    const day = startOfDay(date);
    
    return bookedDates.some(booking => {
      return isWithinInterval(day, {
        start: startOfDay(booking.startDate),
        end: startOfDay(new Date(booking.endDate.getTime() - 1)) // Exclude checkout day
      });
    });
  };

  // Don't allow past dates, booked dates, dates outside the season, or Sunday start dates
  const isDateDisabled = (date: Date): boolean => {
    const day = startOfDay(date);
    
    // Disallow bookings starting on Sundays
    if (isSunday(day)) {
      return true;
    }
    
    return isBefore(day, startOfDay(new Date())) || 
           isDateBooked(day) || 
           isBefore(day, seasonStart) || 
           isAfter(day, seasonEnd);
  };

  // Handle date range selection
  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (!range || !range.from) {
      setDateRange(range);
      return;
    }

    // If selecting a start date that's a Sunday, show notification
    if (range.from && isSunday(range.from) && !range.to) {
      toast({
        title: "Sunday Check-ins Not Available",
        description: "We don't offer check-ins on Sundays. Please select a different day.",
        variant: "destructive",
      });
      return;
    }

    // If no end date is selected yet, just update the start date
    if (!range.to) {
      setDateRange(range);
      return;
    }

    // Calculate the number of days between start and end dates
    const daysBetween = differenceInDays(range.to, range.from);
    
    // Check if the range is at least 5 days
    if (daysBetween < 5) {
      // Show a notification
      toast({
        title: "Minimum Stay Requirement",
        description: "Bookings must be for at least 5 nights. We've adjusted your selection.",
        variant: "destructive",
      });
      
      // Automatically set the end date to be 5 days from the start date
      const newEndDate = addDays(range.from, 5);
      setDateRange({
        from: range.from,
        to: newEndDate
      });
    } else {
      setDateRange(range);
    }
  };

  // Get the season name based on a date
  const getSeasonInfo = (date: Date | undefined) => {
    if (!date) return null;
    
    const currentSeason = seasons.find(season => 
      isWithinInterval(date, { start: season.start, end: season.end })
    );
    
    return currentSeason ? `€${currentSeason.rate}/night` : null;
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3">
        <div className="w-full">
          <p className="text-sm font-medium mb-1.5">Check-in Date</p>
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
                  <>
                    {format(dateRange.from, "PPP")}
                    {getSeasonInfo(dateRange.from) && (
                      <span className="ml-2 text-amber-400 font-semibold">
                        {getSeasonInfo(dateRange.from)}
                      </span>
                    )}
                  </>
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
                numberOfMonths={2}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
                footer={
                  <div className="px-4 pt-0 pb-3 text-xs text-gray-500">
                    * Minimum stay: 5 nights (Sunday check-ins not available)
                  </div>
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="w-full">
          <p className="text-sm font-medium mb-1.5">Check-out Date</p>
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
                numberOfMonths={2}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
                footer={
                  <div className="px-4 pt-0 pb-3 text-xs text-gray-500">
                    * Minimum stay: 5 nights
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

      <div className="text-sm text-amber-500 mt-2">
        <p>Note: Bookings have a minimum stay of 5 nights. Sunday check-ins are not available.</p>
        <p className="mt-1 font-medium">Early booking discounts available for reservations made before Dec 31, 2024.</p>
      </div>
    </div>
  );
};
