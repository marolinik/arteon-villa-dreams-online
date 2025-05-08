import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea";
import {
  ImageIcon,
  Pencil,
  Plus,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Attraction } from "@/types";

interface DataTableProps {
  data: Attraction[]
}

// Update the mock data categories
const mockAttractions: Attraction[] = [
  {
    id: "1",
    name: "Blue Lagoon Beach", // Add name field
    title: "Blue Lagoon Beach",
    description: "Crystal clear waters and soft golden sand make this beach a paradise for swimmers and sunbathers. Perfect for families.",
    image: "/lovable-uploads/7a963ea4-de5e-4fc6-ae02-386e71b04662.png",
    distance: "2.5 km",
    location: "Vourvourou",
    category: "beach", // Changed from "beaches" to "beach"
    featured: true
  },
  {
    id: "2",
    name: "Mount Athos Cruise", // Add name field
    title: "Mount Athos Cruise",
    description: "Enjoy a scenic boat trip around the holy Mount Athos peninsula, viewing the historic monasteries from the sea.",
    image: "/lovable-uploads/5ca9c1c1-4218-49a5-9053-c457c5585d03.png",
    distance: "30 km",
    location: "Ouranoupoli",
    category: "activity", // Changed from "activities" to "activity"
    featured: true
  },
  {
    id: "3",
    name: "Traditional Taverna", // Add name field
    title: "Traditional Taverna",
    description: "Experience authentic Greek cuisine in this family-run taverna offering fresh seafood and local specialties.",
    image: "/lovable-uploads/f4d34909-5743-4e74-9542-c4fb64f711e4.png",
    distance: "1 km",
    location: "Nikiti Village",
    category: "cultural", // Changed from "dining" to "cultural"
    featured: false
  },
  {
    id: "4",
    name: "Parthenonas Village", // Add name field
    title: "Parthenonas Village",
    description: "Explore the traditional architecture and scenic views of this historic mountain village.",
    image: "/lovable-uploads/49999959-399a-499d-899a-999999999999.png",
    distance: "15 km",
    location: "Mount Itamos",
    category: "cultural",
    featured: false
  },
  {
    id: "5",
    name: "Karydi Beach", // Add name field
    title: "Karydi Beach",
    description: "Discover the unique rock formations and shallow turquoise waters of this hidden gem.",
    image: "/lovable-uploads/50000000-400a-400d-800a-000000000000.png",
    distance: "3 km",
    location: "Vourvourou",
    category: "beach",
    featured: false
  },
  {
    id: "6",
    name: "Aristotle's Park", // Add name field
    title: "Aristotle's Park",
    description: "Learn about the life and philosophy of Aristotle in this interactive park with working scientific instruments.",
    image: "/lovable-uploads/51111111-511a-511d-811a-111111111111.png",
    distance: "40 km",
    location: "Stagira",
    category: "cultural",
    featured: false
  },
  {
    id: "7",
    name: "Caves of Petralona", // Add name field
    title: "Caves of Petralona",
    description: "Explore the fascinating stalactite and stalagmite formations in these ancient caves, home to prehistoric human remains.",
    image: "/lovable-uploads/52222222-622a-522d-822a-222222222222.png",
    distance: "60 km",
    location: "Petralona",
    category: "nature",
    featured: false
  },
  {
    id: "8",
    name: "Afitos Village", // Add name field
    title: "Afitos Village",
    description: "Wander through the charming cobblestone streets of this traditional village with stunning sea views and local crafts.",
    image: "/lovable-uploads/53333333-733a-633d-933a-333333333333.png",
    distance: "20 km",
    location: "Kassandra",
    category: "cultural",
    featured: false
  },
  {
    id: "9",
    name: "Hiking on Mount Itamos", // Add name field
    title: "Hiking on Mount Itamos",
    description: "Discover the diverse flora and fauna of Mount Itamos on a scenic hike through pine forests and rocky trails.",
    image: "/lovable-uploads/54444444-844a-744d-a44a-444444444444.png",
    distance: "10 km",
    location: "Mount Itamos",
    category: "nature",
    featured: false
  },
  {
    id: "10",
    name: "Scuba Diving", // Add name field
    title: "Scuba Diving",
    description: "Explore the underwater world of Halkidiki with a scuba diving excursion to vibrant reefs and shipwrecks.",
    image: "/lovable-uploads/55555555-955a-555d-b55a-555555555555.png",
    distance: "5 km",
    location: "Neos Marmaras",
    category: "activity",
    featured: false
  }
];

interface Props {}

const AdminAttractions: React.FC<Props> = () => {
  const [attractions, setAttractions] = useState<Attraction[]>(mockAttractions);
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>(mockAttractions);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newAttraction, setNewAttraction] = useState<Attraction>({
    id: "",
    name: "",
    title: "",
    description: "",
    image: "",
    distance: "",
    location: "",
    category: "beach",
    featured: false
  });
  const { toast } = useToast();

  const attractionCategories = [
    { value: "beach", label: "Beaches" }, // Changed from "beaches" to "beach"
    { value: "cultural", label: "Cultural Sites" },
    { value: "nature", label: "Nature & Parks" },
    { value: "activity", label: "Activities & Tours" } // Changed from "activities" to "activity"
  ];

  useEffect(() => {
    applyFilters();
  }, [attractions, categoryFilter, searchQuery]);

  const applyFilters = () => {
    let filtered = [...attractions];

    if (categoryFilter !== "all") {
      filtered = filtered.filter(attraction => attraction.category === categoryFilter); // Updated to match corrected category values
    }

    if (searchQuery) {
      filtered = filtered.filter(attraction =>
        attraction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAttractions(filtered);
  };

  const getAttractionsByCategory = (category: string) => {
    if (category === "all") return filteredAttractions;
    return filteredAttractions.filter(attraction => attraction.category === category); // Updated to match corrected category values
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddAttraction = () => {
    setNewAttraction({
      id: uuidv4(),
      name: "", // Add name field
      title: "",
      description: "",
      image: "",
      distance: "",
      location: "",
      category: "beach", // Changed from "beaches" to "beach"
      featured: false
    });
    setIsModalOpen(true);
  };

  const handleEditAttraction = (attraction: Attraction) => {
    setNewAttraction(attraction);
    setIsModalOpen(true);
  };

  const handleDeleteAttraction = (id: string) => {
    setAttractions(attractions.filter(attraction => attraction.id !== id));
    toast({
      title: "Attraction Deleted",
      description: "The attraction has been successfully deleted.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAttraction(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewAttraction(prev => ({ ...prev, category: value as "beach" | "cultural" | "nature" | "activity" }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAttraction(prev => ({ ...prev, featured: e.target.checked }));
  };

  const handleSaveAttraction = () => {
    if (newAttraction.title && newAttraction.description && newAttraction.image && newAttraction.location) {
      // Make sure name is always equal to title for now
      const attractionToSave = {
        ...newAttraction,
        name: newAttraction.title
      };
      
      if (attractions.find(attraction => attraction.id === attractionToSave.id)) {
        // Update existing attraction
        setAttractions(attractions.map(attraction =>
          attraction.id === attractionToSave.id ? attractionToSave : attraction
        ));
        toast({
          title: "Attraction Updated",
          description: "The attraction has been successfully updated.",
        });
      } else {
        // Add new attraction
        setAttractions([...attractions, attractionToSave]);
        toast({
          title: "Attraction Added",
          description: "The attraction has been successfully added.",
        });
      }
      setIsModalOpen(false);
      setNewAttraction({
        id: "",
        name: "",
        title: "",
        description: "",
        image: "",
        distance: "",
        location: "",
        category: "beach",
        featured: false
      });
    } else {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Attractions</CardTitle>
        <CardDescription>
          Add, edit, and manage attractions listed on the website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <Input
            type="text"
            placeholder="Search attractions..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {attractionCategories.map(category => (
                <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddAttraction}>
            <Plus className="mr-2 h-4 w-4" />
            Add Attraction
          </Button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getAttractionsByCategory(categoryFilter).map((attraction) => (
                <TableRow key={attraction.id}>
                  <TableCell className="font-medium">{attraction.title}</TableCell>
                  <TableCell>{attraction.description}</TableCell>
                  <TableCell>{attraction.category}</TableCell>
                  <TableCell>{attraction.location}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditAttraction(attraction)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteAttraction(attraction.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{newAttraction.id ? "Edit Attraction" : "Add Attraction"}</DialogTitle>
            <DialogDescription>
              {newAttraction.id ? "Edit the details of the selected attraction." : "Create a new attraction."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input type="text" id="title" name="title" value={newAttraction.title} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" name="description" value={newAttraction.description} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input type="text" id="image" name="image" value={newAttraction.image} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="distance" className="text-right">
                Distance
              </Label>
              <Input type="text" id="distance" name="distance" value={newAttraction.distance} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input type="text" id="location" name="location" value={newAttraction.location} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select onValueChange={handleSelectChange} defaultValue={newAttraction.category}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {attractionCategories.map(category => (
                    <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="featured" className="text-right">
                Featured
              </Label>
              <Input type="checkbox" id="featured" name="featured" checked={newAttraction.featured} onChange={handleCheckboxChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveAttraction}>
              {newAttraction.id ? "Update Attraction" : "Add Attraction"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminAttractions;
