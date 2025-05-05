
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, Calendar, Image, Users } from "lucide-react";
import { villas } from "@/data/villas";
import { bookings } from "@/data/bookings";
import { galleryImages } from "@/data/gallery";

const AdminHome = () => {
  // Mock statistics
  const totalVillas = villas.length;
  const totalBookings = bookings.length;
  const totalImages = galleryImages.length;
  const totalRevenue = 12450; // Mock revenue in EUR
  
  const stats = [
    {
      title: "Total Villas",
      value: totalVillas,
      icon: <Hotel className="h-8 w-8 text-villa-blue" />,
      change: "+0%"
    },
    {
      title: "Active Bookings",
      value: totalBookings,
      icon: <Calendar className="h-8 w-8 text-villa-green" />,
      change: "+12%"
    },
    {
      title: "Gallery Images",
      value: totalImages,
      icon: <Image className="h-8 w-8 text-villa-teal" />,
      change: "+5%"
    },
    {
      title: "Revenue",
      value: `€${totalRevenue.toLocaleString()}`,
      icon: <Users className="h-8 w-8 text-villa-terracotta" />,
      change: "+18%"
    }
  ];
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-serif font-semibold mb-6">Dashboard</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.slice(0, 3).map((booking, index) => {
                const villa = villas.find(v => v.id === booking.villaId);
                return (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{villa?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Confirmed
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="py-4 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-left">
                <Hotel className="h-5 w-5 mb-2 text-villa-blue" />
                <span className="text-sm font-medium">Manage Villas</span>
              </button>
              
              <button className="py-4 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-left">
                <Calendar className="h-5 w-5 mb-2 text-villa-green" />
                <span className="text-sm font-medium">View Bookings</span>
              </button>
              
              <button className="py-4 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-left">
                <Image className="h-5 w-5 mb-2 text-villa-teal" />
                <span className="text-sm font-medium">Upload Images</span>
              </button>
              
              <button className="py-4 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-left">
                <Users className="h-5 w-5 mb-2 text-villa-terracotta" />
                <span className="text-sm font-medium">Website Settings</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
