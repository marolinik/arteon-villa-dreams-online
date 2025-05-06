
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import VillaDetail from "@/pages/VillaDetail";
import Gallery from "@/pages/Gallery";
import Booking from "@/pages/Booking";
import BookingConfirmation from "@/pages/BookingConfirmation";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminHome from "@/pages/admin/AdminHome";
import AdminVillas from "@/pages/admin/AdminVillas";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminAmenities from "@/pages/admin/AdminAmenities";
import AdminAttractions from "@/pages/admin/AdminAttractions";
import Amenities from "@/pages/Amenities";
import Attractions from "@/pages/Attractions";
import Villas from "@/pages/Villas";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/villas" element={<Villas />} />
      <Route path="/villas/:slug" element={<VillaDetail />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/amenities" element={<Amenities />} />
      <Route path="/attractions" element={<Attractions />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />}>
        <Route index element={<AdminHome />} />
        <Route path="villas" element={<AdminVillas />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="amenities" element={<AdminAmenities />} />
        <Route path="attractions" element={<AdminAttractions />} />
      </Route>
      
      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
