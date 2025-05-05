
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = sessionStorage.getItem("admin-authenticated") === "true";
    
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);
  
  return (
    <div className="h-screen flex overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
