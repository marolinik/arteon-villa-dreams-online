
import { useState } from "react";
import { Amenity } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash, Plus, Check, X } from "lucide-react";

const mockAmenities: Amenity[] = [
  {
    id: "1",
    title: "Swimming Pool & Sun Terrace",
    description: "At the heart of the property is a crystal-clear outdoor pool surrounded by a wooden deck with sun loungers and parasols for each villa.",
    icon: "https://cdn-icons-png.flaticon.com/512/5762/5762478.png",
    image: "https://images.unsplash.com/photo-1571003123771-bd6a099dd83a?q=80&w=1080",
    category: "outdoor",
    featured: true
  },
  {
    id: "2",
    title: "Private Beach Area",
    description: "Each villa is provided with its own set of beach equipment on the uncrowded Salonikiou Beach.",
    icon: "https://cdn-icons-png.flaticon.com/512/3253/3253016.png",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1080",
    category: "outdoor",
    featured: true
  },
  {
    id: "3",
    title: "BBQ & Outdoor Dining",
    description: "Barbecue facility available for guest use with shaded dining tables on your villa's patio.",
    icon: "https://cdn-icons-png.flaticon.com/512/5990/5990702.png",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1080",
    category: "outdoor",
    featured: true
  },
  {
    id: "4",
    title: "Free Wi-Fi & Tech",
    description: "The Wi-Fi covers all villas and all common areas including the pool. It's free of charge and high-speed, suitable for streaming or even remote working.",
    icon: "https://cdn-icons-png.flaticon.com/512/2875/2875394.png",
    image: "",
    category: "indoor",
    featured: false
  },
];

const AdminAmenities = () => {
  const { toast } = useToast();
  const [amenities, setAmenities] = useState<Amenity[]>(mockAmenities);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState<Amenity | null>(null);
  const [formData, setFormData] = useState<Partial<Amenity>>({});
  
  const categories = ["All", "indoor", "outdoor", "services"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredAmenities = activeCategory === "All" 
    ? amenities 
    : amenities.filter(amenity => amenity.category === activeCategory);
  
  const handleCreate = () => {
    setCurrentAmenity(null);
    setFormData({
      title: "",
      description: "",
      icon: "",
      image: "",
      category: "indoor",
      featured: false
    });
    setIsEditDialogOpen(true);
  };
  
  const handleEdit = (amenity: Amenity) => {
    setCurrentAmenity(amenity);
    setFormData({ ...amenity });
    setIsEditDialogOpen(true);
  };
  
  const handleDelete = (amenity: Amenity) => {
    setCurrentAmenity(amenity);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (!currentAmenity) return;
    
    setAmenities(amenities.filter(a => a.id !== currentAmenity.id));
    toast({
      title: "Amenity Deleted",
      description: `"${currentAmenity.title}" has been removed.`
    });
    setIsDeleteDialogOpen(false);
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentAmenity) {
      // Update existing
      setAmenities(amenities.map(a => 
        a.id === currentAmenity.id ? { ...a, ...formData } as Amenity : a
      ));
      toast({
        title: "Amenity Updated",
        description: `"${formData.title}" has been updated.`
      });
    } else {
      // Create new
      const newAmenity: Amenity = {
        id: `amenity_${Date.now()}`,
        title: formData.title!,
        description: formData.description!,
        icon: formData.icon || "",
        image: formData.image || "",
        category: formData.category!,
        featured: formData.featured || false
      };
      
      setAmenities([...amenities, newAmenity]);
      toast({
        title: "Amenity Created",
        description: `"${newAmenity.title}" has been added.`
      });
    }
    
    setIsEditDialogOpen(false);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold">Manage Amenities</h2>
        <Button onClick={handleCreate} className="bg-villa-blue hover:bg-blue-700">
          <Plus size={16} className="mr-2" />
          Add New Amenity
        </Button>
      </div>
      
      <Tabs defaultValue="All" className="mb-6">
        <TabsList className="bg-white">
          {categories.map(category => (
            <TabsTrigger 
              key={category}
              value={category}
              onClick={() => setActiveCategory(category)}
              className="capitalize"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAmenities.map(amenity => (
          <Card key={amenity.id} className="overflow-hidden">
            {amenity.image && (
              <div className="h-40 overflow-hidden">
                <img 
                  src={amenity.image}
                  alt={amenity.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center">
                {amenity.icon && (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <img src={amenity.icon} alt="" className="w-5 h-5" />
                  </div>
                )}
                <CardTitle className="text-lg">{amenity.title}</CardTitle>
              </div>
              {amenity.featured && (
                <span className="px-2 py-1 bg-villa-teal/20 text-villa-teal text-xs font-medium rounded-full">
                  Featured
                </span>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {amenity.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize">
                  {amenity.category}
                </span>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(amenity)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => handleDelete(amenity)}
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {currentAmenity ? 'Edit Amenity' : 'Add New Amenity'}
            </DialogTitle>
            <DialogDescription>
              {currentAmenity 
                ? 'Update the information for this amenity.' 
                : 'Fill out the details to add a new amenity.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-1">Title*</label>
              <Input
                name="title"
                value={formData.title || ''}
                onChange={handleFormChange}
                placeholder="e.g., Swimming Pool"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description*</label>
              <Textarea
                name="description"
                value={formData.description || ''}
                onChange={handleFormChange}
                placeholder="Provide details about this amenity..."
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Icon URL</label>
                <Input
                  name="icon"
                  value={formData.icon || ''}
                  onChange={handleFormChange}
                  placeholder="URL to icon image"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <Input
                  name="image"
                  value={formData.image || ''}
                  onChange={handleFormChange}
                  placeholder="URL to feature image"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category*</label>
                <select
                  name="category"
                  value={formData.category || ''}
                  onChange={handleFormChange}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="services">Services</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2 mt-8">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Amenity
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-villa-blue hover:bg-blue-700" onClick={handleSave}>
              {currentAmenity ? 'Update Amenity' : 'Add Amenity'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentAmenity?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash size={16} className="mr-2" />
              Delete Amenity
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAmenities;
