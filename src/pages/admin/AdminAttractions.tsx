
import { useState } from "react";
import { Attraction } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash, Plus, X, MapPin } from "lucide-react";

const mockAttractions: Attraction[] = [
  {
    id: "1",
    title: "Salonikiou Beach",
    description: "The nearest beach is Salonikiou Beach, essentially at the foot of the property. This beach is prized for its cleanliness and calm, uncrowded waters.",
    distance: "100m",
    location: "Akti Salonikiou",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1080",
    category: "beaches",
    featured: true
  },
  {
    id: "2",
    title: "Mount Athos Cruise",
    description: "A unique excursion is to take a day trip to Mount Athos. Everyone can enjoy a Mount Athos cruise: boats depart from Ormos Panagias (9 km away).",
    distance: "9km",
    location: "Ormos Panagias",
    image: "https://images.unsplash.com/photo-1617369120004-4fc70312c5e6?q=80&w=1080",
    category: "activities",
    featured: true
  },
  {
    id: "3",
    title: "Pyrgadikia Village",
    description: "A charming fishing village roughly 7 km north (10–15 minutes' drive). Pyrgadikia has several seafront tavernas and cafes, especially known for fresh fish.",
    distance: "7km",
    location: "Pyrgadikia",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800",
    category: "dining",
    featured: false
  }
];

const AdminAttractions = () => {
  const { toast } = useToast();
  const [attractions, setAttractions] = useState<Attraction[]>(mockAttractions);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAttraction, setCurrentAttraction] = useState<Attraction | null>(null);
  const [formData, setFormData] = useState<Partial<Attraction>>({});
  
  const categories = ["All", "beaches", "dining", "activities", "sightseeing"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredAttractions = activeCategory === "All" 
    ? attractions 
    : attractions.filter(attraction => attraction.category === activeCategory);
  
  const handleCreate = () => {
    setCurrentAttraction(null);
    setFormData({
      title: "",
      description: "",
      distance: "",
      location: "",
      image: "",
      category: "beaches",
      featured: false
    });
    setIsEditDialogOpen(true);
  };
  
  const handleEdit = (attraction: Attraction) => {
    setCurrentAttraction(attraction);
    setFormData({ ...attraction });
    setIsEditDialogOpen(true);
  };
  
  const handleDelete = (attraction: Attraction) => {
    setCurrentAttraction(attraction);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (!currentAttraction) return;
    
    setAttractions(attractions.filter(a => a.id !== currentAttraction.id));
    toast({
      title: "Attraction Deleted",
      description: `"${currentAttraction.title}" has been removed.`
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
    if (!formData.title || !formData.description || !formData.category || !formData.distance || !formData.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentAttraction) {
      // Update existing
      setAttractions(attractions.map(a => 
        a.id === currentAttraction.id ? { ...a, ...formData } as Attraction : a
      ));
      toast({
        title: "Attraction Updated",
        description: `"${formData.title}" has been updated.`
      });
    } else {
      // Create new
      const newAttraction: Attraction = {
        id: `attraction_${Date.now()}`,
        title: formData.title!,
        description: formData.description!,
        distance: formData.distance!,
        location: formData.location!,
        image: formData.image || "",
        category: formData.category!,
        featured: formData.featured || false
      };
      
      setAttractions([...attractions, newAttraction]);
      toast({
        title: "Attraction Created",
        description: `"${newAttraction.title}" has been added.`
      });
    }
    
    setIsEditDialogOpen(false);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold">Manage Attractions & POIs</h2>
        <Button onClick={handleCreate} className="bg-villa-blue hover:bg-blue-700">
          <Plus size={16} className="mr-2" />
          Add New Attraction
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
        {filteredAttractions.map(attraction => (
          <Card key={attraction.id} className="overflow-hidden">
            {attraction.image && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={attraction.image}
                  alt={attraction.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{attraction.title}</CardTitle>
              <div className="flex items-center text-villa-blue text-sm font-medium">
                <MapPin size={14} className="mr-1" />
                <span>{attraction.distance} - {attraction.location}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {attraction.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize">
                    {attraction.category}
                  </span>
                  {attraction.featured && (
                    <span className="text-xs bg-villa-teal/20 text-villa-teal px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(attraction)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => handleDelete(attraction)}
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
              {currentAttraction ? 'Edit Attraction' : 'Add New Attraction'}
            </DialogTitle>
            <DialogDescription>
              {currentAttraction 
                ? 'Update the information for this attraction.' 
                : 'Fill out the details to add a new attraction.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-1">Title*</label>
              <Input
                name="title"
                value={formData.title || ''}
                onChange={handleFormChange}
                placeholder="e.g., Salonikiou Beach"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description*</label>
              <Textarea
                name="description"
                value={formData.description || ''}
                onChange={handleFormChange}
                placeholder="Provide details about this attraction..."
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Distance*</label>
                <Input
                  name="distance"
                  value={formData.distance || ''}
                  onChange={handleFormChange}
                  placeholder="e.g., 5km"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location*</label>
                <Input
                  name="location"
                  value={formData.location || ''}
                  onChange={handleFormChange}
                  placeholder="e.g., Ormos Panagias"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                name="image"
                value={formData.image || ''}
                onChange={handleFormChange}
                placeholder="URL to attraction image"
              />
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
                  <option value="beaches">Beaches</option>
                  <option value="dining">Dining</option>
                  <option value="activities">Activities</option>
                  <option value="sightseeing">Sightseeing</option>
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
                  Featured Attraction
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-villa-blue hover:bg-blue-700" onClick={handleSave}>
              {currentAttraction ? 'Update Attraction' : 'Add Attraction'}
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
              Are you sure you want to delete "{currentAttraction?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash size={16} className="mr-2" />
              Delete Attraction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAttractions;
