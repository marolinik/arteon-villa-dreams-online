
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import { AdminUser } from "@/types";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  
  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = sessionStorage.getItem("admin-authenticated") === "true";
    const userData = sessionStorage.getItem("admin-user");
    
    if (!isAuthenticated) {
      navigate("/admin");
      return;
    }
    
    // Set current user data if available
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        // If user data is corrupted, log out
        sessionStorage.removeItem("admin-authenticated");
        sessionStorage.removeItem("admin-user");
        toast({
          title: "Session Error",
          description: "Your session has expired. Please login again.",
          variant: "destructive"
        });
        navigate("/admin");
      }
    }
  }, [navigate, toast]);
  
  return (
    <div className="h-screen flex overflow-hidden">
      <AdminSidebar currentUser={currentUser} />
      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
