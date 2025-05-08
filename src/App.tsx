
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import VillaDetail from "@/pages/VillaDetail";
import Gallery from "@/pages/Gallery";
import Booking from "@/pages/Booking";
import BookingRequest from "@/pages/BookingRequest";
import BookingConfirmation from "@/pages/BookingConfirmation";
import NotFound from "@/pages/NotFound";
import Amenities from "@/pages/Amenities";
import Attractions from "@/pages/Attractions";
import Villas from "@/pages/Villas";
import Pricing from "@/pages/Pricing";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/villas" element={<Villas />} />
      <Route path="/villas/:slug" element={<VillaDetail />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/booking-request" element={<BookingRequest />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/amenities" element={<Amenities />} />
      <Route path="/attractions" element={<Attractions />} />
      <Route path="/pricing" element={<Pricing />} />
      
      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
