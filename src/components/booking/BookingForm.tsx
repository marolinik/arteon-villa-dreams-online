
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/booking/DateRangePicker";
import { BookingDate, Villa } from "@/types";
import { addBooking, checkAvailability } from "@/data/bookings";
import { format } from "date-fns";

interface BookingFormProps {
  villa: Villa;
  bookedDates: BookingDate[];
}

export const BookingForm = ({ villa, bookedDates }: BookingFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    specialRequests: "",
  });
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Date range required",
        description: "Please select both check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    // Check availability
    const isAvailable = checkAvailability(
      villa.id,
      dateRange.from,
      dateRange.to
    );

    if (!isAvailable) {
      toast({
        title: "Villa not available",
        description: "The selected dates are no longer available. Please choose different dates.",
        variant: "destructive",
      });
      return;
    }

    // Add new booking
    const newBooking: BookingDate = {
      startDate: dateRange.from,
      endDate: dateRange.to,
      villaId: villa.id,
    };
    
    addBooking(newBooking);
    
    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${villa.name} from ${format(dateRange.from, "PP")} to ${format(dateRange.to, "PP")} has been confirmed.`,
    });

    // Navigate to a confirmation page or back to the villa
    navigate(`/villas/${villa.slug}?booked=true`);
  };

  const handleDateRangeChange = (from: Date | undefined, to: Date | undefined) => {
    setDateRange({ from, to });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-serif font-medium mb-4">
          Book Your Stay at {villa.name}
        </h3>
        
        <DateRangePicker
          villaId={villa.id}
          bookedDates={bookedDates}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1.5">Full Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1.5">Phone Number</label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="+30 123 456 7890"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1.5">Number of Guests</label>
          <Input
            type="number"
            name="guests"
            min={1}
            max={villa.capacity}
            value={formData.guests}
            onChange={handleInputChange}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Maximum capacity: {villa.capacity} guests
          </p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1.5">Special Requests</label>
        <Textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          placeholder="Any special requests or requirements?"
          className="resize-none"
          rows={4}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-villa-blue hover:bg-blue-800"
        disabled={!dateRange.from || !dateRange.to}
      >
        Confirm Booking
      </Button>
      
      <p className="text-sm text-center text-gray-500">
        By clicking "Confirm Booking", you agree to our terms and conditions.
      </p>
    </form>
  );
};
