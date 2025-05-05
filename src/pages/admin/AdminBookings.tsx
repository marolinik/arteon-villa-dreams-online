
import { useState } from "react";
import { villas } from "@/data/villas";
import { bookings } from "@/data/bookings";
import { format } from "date-fns";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, CheckCircle, XCircle } from "lucide-react";

const AdminBookings = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<string>("all");
  
  const handleStatusChange = (bookingId: number, status: string) => {
    toast({
      title: "Booking Status Updated",
      description: `The booking status has been changed to ${status}.`
    });
  };
  
  const handleDelete = (bookingId: number) => {
    toast({
      title: "Booking Deleted",
      description: "The booking has been deleted successfully."
    });
  };
  
  const getFilteredBookings = () => {
    if (filter === "all") return bookings;
    return bookings.filter(booking => {
      const villa = villas.find(v => v.id === booking.villaId);
      return villa?.slug === filter;
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-serif font-semibold">Manage Bookings</h2>
        
        <div className="w-full md:w-64">
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by villa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Villas</SelectItem>
              {villas.map(villa => (
                <SelectItem key={villa.slug} value={villa.slug}>
                  {villa.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Villa</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getFilteredBookings().map((booking, index) => {
              const villa = villas.find(v => v.id === booking.villaId);
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{villa?.name}</TableCell>
                  <TableCell>{format(booking.startDate, "PPP")}</TableCell>
                  <TableCell>{format(booking.endDate, "PPP")}</TableCell>
                  <TableCell>
                    <Select 
                      defaultValue="confirmed" 
                      onValueChange={(value) => handleStatusChange(index, value)}
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
                            <CalendarIcon size={14} className="text-amber-500 mr-1" />
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
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 border-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            
            {getFilteredBookings().length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
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
