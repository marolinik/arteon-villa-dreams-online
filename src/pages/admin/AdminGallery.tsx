
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getImagesByCategory, galleryImages } from "@/data/gallery";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Upload, Trash2 } from "lucide-react";

const AdminGallery = () => {
  const { toast } = useToast();
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  const categories = [
    { value: undefined, label: "All Images" },
    { value: "exterior", label: "Exteriors" },
    { value: "interior", label: "Interiors" },
    { value: "amenities", label: "Amenities" },
    { value: "surroundings", label: "Surroundings" }
  ];
  
  const filteredImages = getImagesByCategory(category);
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Images Uploaded",
      description: "Your images have been uploaded successfully."
    });
    
    setUploadDialogOpen(false);
  };
  
  const handleDelete = (imageId: string) => {
    toast({
      title: "Image Deleted",
      description: "The image has been deleted successfully."
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold">Gallery Management</h2>
        <Button 
          onClick={() => setUploadDialogOpen(true)}
          className="bg-villa-blue hover:bg-blue-800"
        >
          <Upload size={16} className="mr-2" />
          Upload Images
        </Button>
      </div>
      
      <div className="mb-6">
        <Tabs 
          defaultValue="all" 
          onValueChange={(value) => setCategory(value === "all" ? undefined : value)}
        >
          <TabsList className="bg-white p-1 shadow-sm">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.value || "all"} 
                value={cat.value || "all"}
                className="data-[state=active]:bg-villa-blue data-[state=active]:text-white"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div 
            key={image.id}
            className="group relative rounded-lg overflow-hidden bg-white shadow"
          >
            <div className="aspect-square">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-3">
              <p className="truncate text-sm font-medium">{image.alt}</p>
              <p className="text-xs text-gray-500 capitalize">{image.category}</p>
            </div>
            
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-white hover:bg-white/20"
                onClick={() => handleDelete(image.id)}
              >
                <Trash2 size={14} className="mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Images</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleUpload} className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-1.5">Category</label>
              <Select defaultValue="exterior">
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exterior">Exteriors</SelectItem>
                  <SelectItem value="interior">Interiors</SelectItem>
                  <SelectItem value="amenities">Amenities</SelectItem>
                  <SelectItem value="surroundings">Surroundings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Image Caption</label>
              <Input placeholder="Enter a caption for this image" required />
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              <Image size={40} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop or click to upload</p>
              <Input type="file" accept="image/*" multiple className="hidden" id="image-upload" />
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                Select Files
              </Button>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setUploadDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-villa-blue hover:bg-blue-800"
              >
                Upload
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;
