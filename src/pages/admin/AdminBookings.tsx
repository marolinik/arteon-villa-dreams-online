
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getAllBookings, updateBookingStatus, deleteBooking, BookingDate, getVillaById } from '@/data';
import { BookingDate as BookingDateType, Villa } from '@/types';
import { Mail, Calendar, Check, X, Trash, Eye } from 'lucide-react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState<BookingDateType[]>([]);
  const [activeBooking, setActiveBooking] = useState<BookingDateType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [villaNames, setVillaNames] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      try {
        const fetchedBookings = await getAllBookings();
        setBookings(fetchedBookings);

        // Fetch villa names for each booking
        const villas: {[key: string]: string} = {};
        for (const booking of fetchedBookings) {
          if (!villas[booking.villaId]) {
            const villa = await getVillaById(booking.villaId);
            if (villa) {
              villas[booking.villaId] = villa.name;
            }
          }
        }
        setVillaNames(villas);
      } catch (error) {
        console.error("Failed to load bookings:", error);
        toast({
          title: "Error",
          description: "Failed to load bookings",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, [toast]);

  const handleStatusChange = async (bookingId: string, status: "confirmed" | "pending" | "cancelled") => {
    try {
      await updateBookingStatus(bookingId, status);
      
      // Update bookings list
      const updatedBookings = await getAllBookings();
      setBookings(updatedBookings);
      
      toast({
        title: "Status Updated",
        description: `Booking status changed to ${status}`,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId);
      
      // Update bookings list
      const updatedBookings = await getAllBookings();
      setBookings(updatedBookings);
      
      toast({
        title: "Booking Deleted",
        description: "The booking has been removed",
      });
    } catch (error) {
      console.error("Failed to delete booking:", error);
      toast({
        title: "Error",
        description: "Failed to delete booking",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const openBookingDetails = async (booking: BookingDateType) => {
    setActiveBooking(booking);
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout title="Bookings" subtitle="Manage guest bookings">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">All Bookings</h2>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No bookings found</p>
          </div>
        ) : (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Villa</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.filter(b => b.status !== 'cancelled').map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{villaNames[booking.villaId] || 'Unknown Villa'}</TableCell>
                    <TableCell>{booking.guestInfo?.name || 'N/A'}</TableCell>
                    <TableCell>{format(booking.startDate, 'dd MMM yyyy')}</TableCell>
                    <TableCell>{format(booking.endDate, 'dd MMM yyyy')}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openBookingDetails(booking)}>
                        <Eye size={14} className="mr-1" /> View
                      </Button>
                      {booking.status === 'pending' && (
                        <Button size="sm" variant="default" onClick={() => handleStatusChange(booking.id, "confirmed")}>
                          <Check size={14} className="mr-1" /> Confirm
                        </Button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <Button size="sm" variant="destructive" onClick={() => handleStatusChange(booking.id, "cancelled")}>
                          <X size={14} className="mr-1" /> Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Booking Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
            </DialogHeader>
            
            {activeBooking && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Booking Reference:</span>
                  <span>{activeBooking.bookingNumber || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Villa:</span>
                  <span>{villaNames[activeBooking.villaId] || 'Unknown Villa'}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium block">Check-in:</span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {format(activeBooking.startDate, 'dd MMM yyyy')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium block">Check-out:</span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {format(activeBooking.endDate, 'dd MMM yyyy')}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Guest Information:</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-500 block">Name:</span>
                      <span>{activeBooking.guestInfo?.name || 'N/A'}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 block">Email:</span>
                      <span className="flex items-center">
                        <Mail size={14} className="mr-1" />
                        {activeBooking.guestInfo?.email || 'N/A'}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 block">Phone:</span>
                      <span>{activeBooking.guestInfo?.phone || 'N/A'}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 block">Guests:</span>
                      <span>{activeBooking.guestInfo?.guests || 'N/A'}</span>
                    </div>
                    
                    {activeBooking.guestInfo?.specialRequests && (
                      <div>
                        <span className="text-gray-500 block">Special Requests:</span>
                        <span className="text-sm">{activeBooking.guestInfo.specialRequests}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Status:</span>
                    <span>{getStatusBadge(activeBooking.status)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Total Price:</span>
                    <span className="font-bold">€{activeBooking.totalPrice || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter className="space-x-2">
              {activeBooking && activeBooking.status === 'pending' && (
                <Button onClick={() => {
                  if (activeBooking) {
                    handleStatusChange(activeBooking.id, "confirmed");
                    setIsDialogOpen(false);
                  }
                }}>
                  <Check size={14} className="mr-1" /> Confirm Booking
                </Button>
              )}
              
              {activeBooking && activeBooking.status !== 'cancelled' && (
                <Button variant="outline" onClick={() => {
                  if (activeBooking) {
                    handleStatusChange(activeBooking.id, "cancelled");
                    setIsDialogOpen(false);
                  }
                }}>
                  <X size={14} className="mr-1" /> Cancel Booking
                </Button>
              )}
              
              {activeBooking && (
                <Button variant="destructive" onClick={() => {
                  if (activeBooking) {
                    handleDelete(activeBooking.id);
                    setIsDialogOpen(false);
                  }
                }}>
                  <Trash size={14} className="mr-1" /> Delete
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
