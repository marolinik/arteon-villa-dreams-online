
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Villas from "./pages/Villas";
import VillaDetail from "./pages/VillaDetail";
import Location from "./pages/Location";
import About from "./pages/About";
import Booking from "./pages/Booking";
import Gallery from "./pages/Gallery";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BookingConfirmation from "./pages/BookingConfirmation";
import BookingRequest from "./pages/BookingRequest";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVillas from "./pages/admin/AdminVillas";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminAmenities from "./pages/admin/AdminAmenities";
import AdminAttractions from "./pages/admin/AdminAttractions";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminPageLayout from "./components/admin/AdminPageLayout";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";

// Auth & Booking Context
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="arteon-ui-theme">
      <BrowserRouter>
        <AuthProvider>
          <BookingProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/villas" element={<Villas />} />
              <Route path="/villas/:slug" element={<VillaDetail />} />
              <Route path="/location" element={<Location />} />
              <Route path="/about" element={<About />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/booking-request" element={<BookingRequest />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPageLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="villas" element={<AdminVillas />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="amenities" element={<AdminAmenities />} />
                <Route path="attractions" element={<AdminAttractions />} />
                <Route path="requests" element={<AdminRequests />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BookingProvider>
        </AuthProvider>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
