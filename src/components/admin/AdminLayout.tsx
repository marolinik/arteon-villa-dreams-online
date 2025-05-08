
import React, { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          <h1 className="text-2xl font-serif font-semibold mb-6">{title}</h1>
          <div className="bg-white rounded-lg shadow p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
