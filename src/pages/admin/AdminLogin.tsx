
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  
  // Check if we should prefill test credentials
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('test') === 'true') {
      setCredentials({
        username: "marolinik@gmail.com",
        password: "74marOLInik74"
      });
    }
  }, [location]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in a real application, this would be authenticated against a backend
    if (credentials.username === "admin" && credentials.password === "password" || 
        credentials.username === "marolinik@gmail.com" && credentials.password === "74marOLInik74") {
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard."
      });
      
      // Store admin auth in session storage
      sessionStorage.setItem("admin-authenticated", "true");
      
      // Store mock admin user data
      const userData = {
        name: credentials.username === "admin" ? "Admin User" : "Marolinik",
        email: credentials.username,
        role: "administrator"
      };
      
      sessionStorage.setItem("admin-user", JSON.stringify(userData));
      
      // Navigate to admin dashboard
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <Input
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-villa-blue hover:bg-blue-800">
              Sign In
            </Button>
            
            <div className="text-sm text-center text-gray-500 mt-6">
              <p>Accepted credentials:</p>
              <p>Username: admin / Password: password</p>
              <p>Username: marolinik@gmail.com / Password: 74marOLInik74</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
