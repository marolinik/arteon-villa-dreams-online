import { useState } from 'react';
import { Amenity } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Temporary mock amenities
const mockAmenities: Amenity[] = [
  {
    id: "1",
    name: "Private Pool",
    title: "Private Pool",
    description: "Enjoy the privacy of your own swimming pool",
    icon: "pool",
    image: "/lovable-uploads/c5bda802-7f4b-4788-b738-c15dd6640c12.png",
    category: "outdoor",
    featured: true
  },
  {
    id: "2",
    name: "Fully Equipped Kitchen",
    title: "Fully Equipped Kitchen",
    description: "Modern kitchen with all necessary appliances",
    icon: "kitchen",
    image: "/lovable-uploads/b388aa44-8e03-4351-ac72-cc6726b61786.png",
    category: "indoor",
    featured: true
  },
  {
    id: "3",
    name: "Sea View",
    title: "Sea View",
    description: "Magnificent views of the Aegean Sea",
    icon: "sea-view",
    image: "/lovable-uploads/c93e1b2b-885b-40c1-82ee-d9a988cdf5be.png",
    category: "outdoor",
    featured: true
  },
  {
    id: "4",
    name: "Beach Access",
    title: "Beach Access",
    description: "Direct access to the sandy beach",
    icon: "beach",
    image: "/lovable-uploads/69de2006-6183-424d-8d07-c73322a66c2a.png",
    category: "outdoor",
    featured: true
  },
  {
    id: "5",
    name: "Air Conditioning",
    title: "Air Conditioning",
    description: "Climate control in all rooms",
    icon: "air-conditioning",
    image: "/lovable-uploads/b8229598-aaf2-489d-a4b4-d77823ca9caf.png",
    category: "indoor",
    featured: false
  }
];

const AdminAmenities = () => {
  const [amenities, setAmenities] = useState<Amenity[]>(mockAmenities);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const [editingAmenity, setEditingAmenity] = useState<Amenity>({
    id: '',
    name: '',
    title: '',
    description: '',
    icon: '',
    image: '',
    category: 'indoor',
    featured: false
  });

  const handleDelete = (amenity: Amenity) => {
    setAmenities(amenities.filter(a => a.id !== amenity.id));
    toast({
      title: "Amenity Deleted",
      description: `"${amenity.title}" has been removed.`
    });
  };

  const handleEditStart = (amenity: Amenity) => {
    setIsEditing(amenity.id);
  };

  const handleEdit = (amenity: Amenity) => {
    setEditingAmenity(amenity);
    setIsEditing(amenity.id);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingAmenity({
      id: '',
      name: '',
      title: '',
      description: '',
      icon: '',
      image: '',
      category: 'indoor',
      featured: false
    });
  };

  const handleAddSubmit = () => {
    if (!editingAmenity.name || !editingAmenity.title || !editingAmenity.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const newAmenity = {
      ...editingAmenity,
      id: Math.random().toString(36).substring(2, 9),
    };
    setAmenities([...amenities, newAmenity]);
    setIsAdding(false);
    toast({
      title: "Amenity Added",
      description: `${newAmenity.title} has been added successfully.`
    });
  };

  return (
    <AdminLayout title="Amenities" subtitle="Manage villa amenities">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">All Amenities</h2>
          {!isAdding && (
            <Button onClick={() => {
              setIsAdding(true);
              setEditingAmenity({
                id: '',
                name: '',
                title: '',
                description: '',
                icon: '',
                image: '',
                category: 'indoor',
                featured: false
              });
            }}>
              <Plus size={16} className="mr-2" /> Add New Amenity
            </Button>
          )}
        </div>

        {isAdding && (
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mb-6">
            <h3 className="font-medium mb-4">Add New Amenity</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Name</label>
                <Input
                  value={editingAmenity.name}
                  onChange={(e) => setEditingAmenity({ ...editingAmenity, name: e.target.value })}
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Title</label>
                <Input
                  value={editingAmenity.title}
                  onChange={(e) => setEditingAmenity({ ...editingAmenity, title: e.target.value })}
                  placeholder="Title"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Description</label>
                <Textarea
                  value={editingAmenity.description}
                  onChange={(e) => setEditingAmenity({ ...editingAmenity, description: e.target.value })}
                  placeholder="Description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Icon</label>
                  <Input
                    value={editingAmenity.icon}
                    onChange={(e) => setEditingAmenity({ ...editingAmenity, icon: e.target.value })}
                    placeholder="Icon name or class"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Image URL</label>
                  <Input
                    value={editingAmenity.image}
                    onChange={(e) => setEditingAmenity({ ...editingAmenity, image: e.target.value })}
                    placeholder="Image URL"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Category</label>
                  <Select
                    value={editingAmenity.category}
                    onValueChange={(value) => setEditingAmenity({ ...editingAmenity, category: value as "indoor" | "outdoor" | "service" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indoor">Indoor</SelectItem>
                      <SelectItem value="outdoor">Outdoor</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingAmenity.featured}
                    onChange={(e) => setEditingAmenity({ ...editingAmenity, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">Featured amenity</label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  <X size={16} className="mr-1" /> Cancel
                </Button>
                <Button onClick={() => handleAddSubmit()}>
                  <Check size={16} className="mr-1" /> Save
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map(amenity => (
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
                      onClick={() => handleEditStart(amenity)}
                    >
                      <Edit size={14} />
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
      </div>
    </AdminLayout>
  );
};

export default AdminAmenities;
