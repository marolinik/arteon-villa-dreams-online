
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/booking/DateRangePicker";
import { BookingDate, GuestInfo, Villa } from "@/types";
import { addBooking, checkAvailability, sendBookingEmail } from "@/data/bookings";
import { format, differenceInDays, isSaturday } from "date-fns";
import { AlertCircle } from "lucide-react";

interface BookingFormProps {
  villa: Villa;
  bookedDates: BookingDate[];
}

export const BookingForm = ({ villa, bookedDates }: BookingFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<GuestInfo>({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seasonRate, setSeasonRate] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  // Form validation
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    guests?: string;
    dates?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = "Number of guests is required";
    } else if (formData.guests > 6) {
      newErrors.guests = "Maximum 6 guests allowed";
    }
    
    if (!dateRange.from || !dateRange.to) {
      newErrors.dates = "Please select both check-in and check-out dates";
    } else {
      // Check if both dates are Saturdays
      if (!isSaturday(dateRange.from) || !isSaturday(dateRange.to)) {
        newErrors.dates = "Both check-in and check-out dates must be Saturdays";
      }
      
      // Check if the stay is exactly 7, 14, 21 days, etc.
      const days = differenceInDays(dateRange.to, dateRange.from);
      if (days % 7 !== 0 || days < 7) {
        newErrors.dates = "Minimum stay is 7 days, and bookings must be in 7-day increments (Saturday to Saturday)";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Special handling for numeric inputs
    if (name === "guests") {
      const numValue = parseInt(value) || 0;
      // Enforce max of 6 guests
      const limitedValue = Math.min(numValue, 6);
      setFormData((prev) => ({ 
        ...prev, 
        [name]: limitedValue 
      }));
    } else {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value 
      }));
    }
    
    // Clear validation error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDateRangeChange = (from: Date | undefined, to: Date | undefined) => {
    setDateRange({ from, to });
    
    // Calculate total price if rate is known
    if (from && to && seasonRate) {
      const nights = differenceInDays(to, from);
      setTotalPrice(nights * seasonRate);
    } else {
      setTotalPrice(null);
    }
    
    // Clear date validation error when user selects dates
    if (errors.dates) {
      setErrors(prev => ({ ...prev, dates: undefined }));
    }
  };

  const handleSeasonChange = (rate: number) => {
    setSeasonRate(rate);
    
    if (dateRange.from && dateRange.to) {
      const nights = differenceInDays(dateRange.to, dateRange.from);
      setTotalPrice(nights * rate);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form",
        variant: "destructive",
      });
      return;
    }

    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Date range required",
        description: "Please select both check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
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
        setIsSubmitting(false);
        return;
      }

      // Create new booking
      const newBooking: BookingDate = {
        startDate: dateRange.from,
        endDate: dateRange.to,
        villaId: villa.id,
        guestInfo: {
          ...formData,
          guests: Number(formData.guests)
        },
        status: "confirmed"
      };
      
      // Add booking to our system
      const bookingId = addBooking(newBooking);
      
      // Send confirmation emails
      await sendBookingEmail(newBooking);
      
      // Navigate to the thank you page instead of back to the villa
      navigate(`/booking-confirmation?villa=${villa.slug}`);
    } catch (error) {
      console.error("Booking failed:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          onSeasonChange={handleSeasonChange}
        />
        {errors.dates && <p className="text-sm text-red-500 mt-1">{errors.dates}</p>}
        
        <div className="mt-4 p-3 bg-[#172B4D] rounded-md">
          <h4 className="font-medium text-amber-400 mb-2">Booking Policies:</h4>
          <ul className="text-sm text-gray-200 space-y-1.5">
            <li>• Minimum stay is 5 nights</li>
            <li>• Check-in & check-out only on Saturdays</li>
            <li>• Check-in: 15:00-18:30, Check-out: by 11:00</li>
            <li>• Security deposit: €500 (refundable at check-out)</li>
          </ul>
        </div>
      </div>
      
      {totalPrice && (
        <div className="bg-[#1C3D66] p-4 rounded-md">
          <h4 className="font-medium text-white">Price Summary:</h4>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-300">Rate per night:</span>
              <span className="text-amber-400 font-semibold">€{seasonRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">
                Stay duration:
              </span>
              <span className="text-amber-400 font-semibold">
                {dateRange.from && dateRange.to ? `${differenceInDays(dateRange.to, dateRange.from)} nights` : '-'}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-600 mt-2 pt-2">
              <span className="text-white font-medium">Total:</span>
              <span className="text-amber-400 font-bold">€{totalPrice}</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              * A 30% deposit is required to confirm your reservation.
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1.5">Full Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your full name"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
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
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1.5">Phone Number</label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="+30 123 456 7890"
            className={`bg-[#1C3D66] text-amber-300 ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1.5">Number of Guests</label>
          <Input
            type="number"
            name="guests"
            min={1}
            max={6}
            value={formData.guests}
            onChange={handleInputChange}
            required
            className={`bg-[#1C3D66] text-amber-300 ${errors.guests ? "border-red-500" : ""}`}
          />
          <p className={`text-sm mt-1 ${errors.guests ? "text-red-500" : "text-gray-500"}`}>
            {errors.guests || `Maximum capacity: 6 guests`}
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
      
      <div className="p-3 bg-[#172B4D] rounded-md flex items-start space-x-2">
        <AlertCircle className="text-amber-400 w-5 h-5 mt-0.5" />
        <div className="text-sm text-gray-300">
          <p className="font-medium text-white">Payment Policy:</p>
          <p>• 30% deposit required to confirm reservation</p>
          <p>• Another 30% due 60 days before arrival</p>
          <p>• Remaining 40% due 20 days before arrival</p>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-villa-blue hover:bg-blue-800"
        disabled={isSubmitting || !dateRange.from || !dateRange.to}
      >
        {isSubmitting ? "Processing..." : "Confirm Booking"}
      </Button>
      
      <p className="text-sm text-center text-gray-500">
        By clicking "Confirm Booking", you agree to our terms and conditions.
      </p>
    </form>
  );
};
