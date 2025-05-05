
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    email: "info@arteonvillas.com",
    phone: "+30 123 456 7890",
    address: "Akti Salonikiou, Sithonia, Halkidiki, Greece"
  });
  
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Settings Saved",
      description: "Your site settings have been updated successfully."
    });
  };
  
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Contact Settings Saved",
      description: "Your contact information has been updated successfully."
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-serif font-semibold mb-6">Website Settings</h2>
      
      <Tabs defaultValue="general" className="bg-white rounded-lg shadow overflow-hidden">
        <TabsList className="bg-gray-100 p-0 h-12">
          <TabsTrigger value="general" className="flex-1 h-full rounded-none data-[state=active]:bg-white">
            General Settings
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex-1 h-full rounded-none data-[state=active]:bg-white">
            Contact Information
          </TabsTrigger>
          <TabsTrigger value="metadata" className="flex-1 h-full rounded-none data-[state=active]:bg-white">
            SEO & Metadata
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="p-6">
          <form onSubmit={handleSaveGeneral} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">Site Title</label>
              <Input defaultValue="Arteon Villas - Your Perfect Halkidiki Getaway" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Site Description</label>
              <Textarea 
                defaultValue="Arteon Villas is a luxurious complex of four maisonette-style villas located in the tranquil area of Akti Salonikiou on the Sithonia peninsula of Halkidiki."
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Logo URL</label>
              <Input defaultValue="" placeholder="Enter URL to your logo image" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Favicon URL</label>
              <Input defaultValue="" placeholder="Enter URL to your favicon" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Booking Functionality</h4>
                <p className="text-sm text-gray-500">Enable or disable booking functionality on the site</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Maintenance Mode</h4>
                <p className="text-sm text-gray-500">Put the website into maintenance mode</p>
              </div>
              <Switch />
            </div>
            
            <Button 
              type="submit"
              className="bg-villa-blue hover:bg-blue-800"
            >
              Save Settings
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="contact" className="p-6">
          <form onSubmit={handleSaveContact} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">Contact Email</label>
              <Input 
                type="email" 
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Phone Number</label>
              <Input 
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Address</label>
              <Textarea 
                value={contactForm.address}
                onChange={(e) => setContactForm({...contactForm, address: e.target.value})}
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Google Maps Embed URL</label>
              <Input defaultValue="" placeholder="Enter Google Maps embed URL" />
              <p className="text-xs text-gray-500 mt-1">
                Get the embed URL from Google Maps by clicking "Share" and selecting "Embed a map"
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Show Contact Form</h4>
                <p className="text-sm text-gray-500">Display a contact form on the website</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Button 
              type="submit"
              className="bg-villa-blue hover:bg-blue-800"
            >
              Save Contact Info
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="metadata" className="p-6">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">Meta Title</label>
              <Input defaultValue="Arteon Villas - Luxurious Villas in Halkidiki, Greece" />
              <p className="text-xs text-gray-500 mt-1">
                Recommended length: 50-60 characters
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Meta Description</label>
              <Textarea 
                defaultValue="Book your stay at Arteon Villas, a luxurious complex of four maisonette-style villas in the beautiful Sithonia peninsula of Halkidiki, Greece. Enjoy stunning sea views, a private pool, and easy access to Salonikiou Beach."
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended length: 150-160 characters
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Social Image URL</label>
              <Input defaultValue="" placeholder="Enter URL to your social sharing image" />
              <p className="text-xs text-gray-500 mt-1">
                This image will be used when sharing on social media (recommended size: 1200x630 pixels)
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Keywords</label>
              <Input 
                defaultValue="villa rental, Halkidiki, Greece, Sithonia, beach, vacation, sea view, pool"
                placeholder="Enter comma-separated keywords"
              />
            </div>
            
            <Button 
              type="submit"
              className="bg-villa-blue hover:bg-blue-800"
            >
              Save SEO Settings
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
