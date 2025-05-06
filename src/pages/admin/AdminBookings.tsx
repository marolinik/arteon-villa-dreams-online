
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { villas, getVillaById } from "@/data/villas";
import { 
  bookings, 
  restrictedDates, 
  getAllBookings, 
  deleteBooking, 
  updateBookingStatus,
  addRestrictedDates
} from "@/data/bookings";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Calendar as CalendarCheck, CheckCircle, XCircle, PlusCircle } from "lucide-react";
import { BookingDate } from "@/types";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

const AdminBookings = () => {
  const { toast } = useToast();
  const [allBookings, setAllBookings] = useState<BookingDate[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isRestrictDatesOpen, setIsRestrictDatesOpen] = useState(false);
  const [selectedVillaId, setSelectedVillaId] = useState<string>(villas[0].id);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  
  useEffect(() => {
    // Load all bookings on mount
    setAllBookings(getAllBookings());
  }, []);
  
  const handleStatusChange = (bookingId: string, status: string) => {
    const success = updateBookingStatus(
      bookingId, 
      status as "confirmed" | "pending" | "cancelled"
    );
    
    if (success) {
      setAllBookings(getAllBookings());
      toast({
        title: "Booking Status Updated",
        description: `The booking status has been changed to ${status}.`
      });
    } else {
      toast({
        title: "Update Failed",
        description: "Failed to update booking status.",
        variant: "destructive"
      });
    }
  };
  
  const handleDelete = (bookingId: string) => {
    const success = deleteBooking(bookingId);
    
    if (success) {
      setAllBookings(getAllBookings());
      toast({
        title: "Booking Deleted",
        description: "The booking has been deleted successfully."
      });
    } else {
      toast({
        title: "Delete Failed",
        description: "Failed to delete booking.",
        variant: "destructive"
      });
    }
  };
  
  const handleRestrictDates = () => {
    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Date Range Required",
        description: "Please select both start and end dates for the restriction.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new restricted date entry
    const restrictedBooking: BookingDate = {
      startDate: dateRange.from,
      endDate: dateRange.to,
      villaId: selectedVillaId,
      status: "cancelled" // Marked as cancelled to indicate it's restricted
    };
    
    const id = addRestrictedDates(restrictedBooking);
    
    if (id) {
      setAllBookings(getAllBookings());
      setIsRestrictDatesOpen(false);
      setDateRange({ from: undefined, to: undefined });
      
      toast({
        title: "Dates Restricted",
        description: `The selected dates for ${getVillaById(selectedVillaId)?.name} have been marked as unavailable.`
      });
    } else {
      toast({
        title: "Operation Failed",
        description: "Failed to restrict the dates. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const getFilteredBookings = () => {
    if (filter === "all") return allBookings;
    if (filter === "restricted") {
      return allBookings.filter(booking => 
        booking.status === "cancelled" && restrictedDates.some(r => r.id === booking.id)
      );
    }
    return allBookings.filter(booking => {
      const villa = villas.find(v => v.id === booking.villaId);
      return villa?.slug === filter;
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-serif font-semibold">Manage Bookings</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full md:w-64">
            <Select defaultValue="all" onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by villa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="restricted">Restricted Dates</SelectItem>
                {villas.map(villa => (
                  <SelectItem key={villa.slug} value={villa.slug}>
                    {villa.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Dialog open={isRestrictDatesOpen} onOpenChange={setIsRestrictDatesOpen}>
            <DialogTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Restrict Dates
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Restrict Availability Dates</DialogTitle>
                <DialogDescription>
                  Mark specific dates as unavailable for booking.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Villa</label>
                  <Select 
                    defaultValue={selectedVillaId} 
                    onValueChange={setSelectedVillaId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select villa" />
                    </SelectTrigger>
                    <SelectContent>
                      {villas.map(villa => (
                        <SelectItem key={villa.id} value={villa.id}>
                          {villa.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !dateRange.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            format(dateRange.from, "PPP")
                          ) : (
                            <span>Start date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={{ 
                            from: dateRange.from, 
                            to: dateRange.to 
                          }}
                          onSelect={(range) => setDateRange({
                            from: range?.from,
                            to: range?.to
                          })}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !dateRange.to && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? (
                            format(dateRange.to, "PPP")
                          ) : (
                            <span>End date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={{ 
                            from: dateRange.from, 
                            to: dateRange.to 
                          }}
                          onSelect={(range) => setDateRange({
                            from: range?.from,
                            to: range?.to
                          })}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRestrictDatesOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleRestrictDates}
                  disabled={!dateRange.from || !dateRange.to}
                >
                  Restrict Dates
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Villa</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getFilteredBookings().map((booking) => {
              const villa = villas.find(v => v.id === booking.villaId);
              const isRestricted = restrictedDates.some(r => r.id === booking.id);
              
              return (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{villa?.name}</TableCell>
                  <TableCell>{format(booking.startDate, "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(booking.endDate, "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    {isRestricted ? 
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Restricted
                      </span> : 
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Booking
                      </span>
                    }
                  </TableCell>
                  <TableCell>
                    {!isRestricted && (
                      <Select 
                        defaultValue={booking.status} 
                        onValueChange={(value) => handleStatusChange(booking.id!, value)}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">
                            <div className="flex items-center">
                              <CheckCircle size={14} className="text-green-500 mr-1" />
                              Confirmed
                            </div>
                          </SelectItem>
                          <SelectItem value="pending">
                            <div className="flex items-center">
                              <CalendarCheck size={14} className="text-amber-500 mr-1" />
                              Pending
                            </div>
                          </SelectItem>
                          <SelectItem value="cancelled">
                            <div className="flex items-center">
                              <XCircle size={14} className="text-red-500 mr-1" />
                              Cancelled
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    {isRestricted && (
                      <span className="flex items-center text-amber-600">
                        <CalendarCheck size={14} className="mr-1" />
                        Unavailable
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 border-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(booking.id!)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            
            {getFilteredBookings().length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBookings;
