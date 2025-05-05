
import { useState } from "react";
import { villas } from "@/data/villas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminVillas = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editVilla, setEditVilla] = useState<string | null>(null);
  
  const handleEdit = (villaId: string) => {
    setEditVilla(villaId);
    setDialogOpen(true);
  };
  
  const handleNew = () => {
    setEditVilla(null);
    setDialogOpen(true);
  };
  
  const handleDelete = (villaId: string) => {
    // In a real application, this would delete the villa
    toast({
      title: "Villa Deleted",
      description: "The villa has been deleted successfully.",
    });
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: editVilla ? "Villa Updated" : "Villa Created",
      description: editVilla 
        ? "The villa has been updated successfully." 
        : "The new villa has been created successfully.",
    });
    
    setDialogOpen(false);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold">Manage Villas</h2>
        <Button onClick={handleNew} className="bg-villa-blue hover:bg-blue-800">
          <Plus size={16} className="mr-2" />
          New Villa
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Villa Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Bedrooms</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {villas.map((villa) => (
              <TableRow key={villa.id}>
                <TableCell className="font-medium">{villa.name}</TableCell>
                <TableCell>{villa.size} m²</TableCell>
                <TableCell>{villa.bedrooms}</TableCell>
                <TableCell>{villa.capacity} guests</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(villa.id)}
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(villa.id)}
                  >
                    <Trash size={14} className="mr-1" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editVilla ? "Edit Villa" : "Add New Villa"}
            </DialogTitle>
            <DialogDescription>
              {editVilla ? "Update the villa details below." : "Fill in the details to add a new villa."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Villa Name</label>
                <Input defaultValue={editVilla ? villas.find(v => v.id === editVilla)?.name : ""} required />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Greek Meaning</label>
                <Input defaultValue={editVilla ? villas.find(v => v.id === editVilla)?.meaning : ""} required />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Size (m²)</label>
                <Input type="number" defaultValue={editVilla ? villas.find(v => v.id === editVilla)?.size : 80} required />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Max Capacity</label>
                <Input type="number" defaultValue={editVilla ? villas.find(v => v.id === editVilla)?.capacity : 6} required />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Bedrooms</label>
                <Input type="number" defaultValue={editVilla ? villas.find(v => v.id === editVilla)?.bedrooms : 2} required />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Bathrooms</label>
                <Input type="number" defaultValue={editVilla ? villas.find(v => v.id === editVilla)?.bathrooms : 2} required />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Short Description</label>
              <Input defaultValue={editVilla ? villas.find(v => v.id === editVilla)?.shortDescription : ""} required />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Full Description</label>
              <Textarea 
                defaultValue={editVilla ? villas.find(v => v.id === editVilla)?.description : ""} 
                rows={6}
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Main Image URL</label>
              <Input defaultValue={editVilla ? villas.find(v => v.id === editVilla)?.mainImage : ""} required />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-villa-blue hover:bg-blue-800"
              >
                {editVilla ? "Save Changes" : "Create Villa"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVillas;
