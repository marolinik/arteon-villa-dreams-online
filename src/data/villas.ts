
import { supabase } from "@/integrations/supabase/client";
import { Villa } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// This file will eventually be replaced by Supabase data
export const villas: Villa[] = [
  {
    id: "1",
    name: "Philia",
    meaning: "Deep Friendship",
    slug: "philia",
    description: "Experience the warmth of deep friendship at Villa Philia. This beautiful beachfront villa offers panoramic views of the Aegean Sea and a relaxing atmosphere for your vacation.",
    shortDescription: "Beachfront villa with panoramic sea views",
    bedrooms: 3,
    bathrooms: 2,
    size: 180,
    capacity: 6,
    bedConfiguration: "2 Double, 2 Single",
    mainImage: "/lovable-uploads/c93e1b2b-885b-40c1-82ee-d9a988cdf5be.png",
    images: [
      "/lovable-uploads/76db6a84-db6d-4d00-ac91-1e4ceb84a041.png",
      "/lovable-uploads/c93e1b2b-885b-40c1-82ee-d9a988cdf5be.png",
      "/lovable-uploads/70760d7a-aeee-4ce5-b176-bdab43c717f9.png",
      "/lovable-uploads/07b03475-a6d8-461c-bb8f-646e88430134.png"
    ],
    price: 380,
    maxGuests: 6,
    rating: 4.9,
    location: "Halkidiki, Greece",
    isFeatured: true,
    amenities: [
      "Private Pool",
      "Sea View",
      "Free Wi-Fi",
      "Air Conditioning",
      "Fully Equipped Kitchen",
      "BBQ Area",
      "Garden",
      "Beach Access"
    ],
    features: [
      {
        title: "Beachfront Location",
        description: "Direct access to the sandy beach of Halkidiki"
      },
      {
        title: "Private Infinity Pool",
        description: "Enjoy the stunning sunset views from your private pool"
      },
      {
        title: "Modern Design",
        description: "Contemporary architecture with traditional Greek elements"
      }
    ]
  },
  {
    id: "2",
    name: "Agape",
    meaning: "Unconditional Love",
    slug: "agape",
    description: "Indulge in the spirit of unconditional love at Villa Agape. This luxurious retreat nestled in the hills of Halkidiki offers privacy and tranquility for a perfect family getaway.",
    shortDescription: "Luxury retreat with private garden and pool",
    bedrooms: 4,
    bathrooms: 3,
    size: 220,
    capacity: 8,
    bedConfiguration: "3 Double, 2 Single",
    mainImage: "/lovable-uploads/69de2006-6183-424d-8d07-c73322a66c2a.png",
    images: [
      "/lovable-uploads/69de2006-6183-424d-8d07-c73322a66c2a.png",
      "/lovable-uploads/2e280967-fdf4-46ad-8680-45cdad55a692.png",
      "/lovable-uploads/726c87bf-d710-484f-8e9e-5b3dc370dc62.png",
      "/lovable-uploads/49172237-4a6d-47da-928c-8c4e9f8e2575.png"
    ],
    price: 450,
    maxGuests: 8,
    rating: 5.0,
    location: "Halkidiki, Greece",
    isFeatured: true,
    amenities: [
      "Private Pool",
      "Mountain View",
      "Free Wi-Fi",
      "Air Conditioning",
      "Fully Equipped Kitchen",
      "BBQ Area",
      "Garden",
      "Fireplace",
      "Parking"
    ],
    features: [
      {
        title: "Secluded Location",
        description: "Perfect privacy in the beautiful hills of Halkidiki"
      },
      {
        title: "Spacious Garden",
        description: "Large garden with Mediterranean plants and herbs"
      },
      {
        title: "Family Friendly",
        description: "Special amenities and play area for children"
      }
    ]
  },
  {
    id: "3",
    name: "Eros",
    meaning: "Romantic Love",
    slug: "eros",
    description: "Fall in love again at Villa Eros. This intimate villa is designed for couples seeking a romantic getaway in the beautiful setting of Halkidiki.",
    shortDescription: "Intimate villa perfect for couples",
    bedrooms: 2,
    bathrooms: 2,
    size: 120,
    capacity: 4,
    bedConfiguration: "2 Double",
    mainImage: "/lovable-uploads/559c6218-4c5d-460a-bb27-6d9564fa14fe.png",
    images: [
      "/lovable-uploads/559c6218-4c5d-460a-bb27-6d9564fa14fe.png",
      "/lovable-uploads/52641965-ce48-4b9b-b06f-1f67f50629c5.png",
      "/lovable-uploads/59d403c7-285a-488b-bf1f-23728f38fcfb.png",
      "/lovable-uploads/2ea9e26b-fc04-410e-a86b-0b02c3be6284.png"
    ],
    price: 320,
    maxGuests: 4,
    rating: 4.8,
    location: "Halkidiki, Greece",
    isFeatured: false,
    amenities: [
      "Private Plunge Pool",
      "Sea View",
      "Free Wi-Fi",
      "Air Conditioning",
      "Fully Equipped Kitchen",
      "Outdoor Dining Area",
      "Jacuzzi",
      "Beach Access"
    ],
    features: [
      {
        title: "Romantic Setting",
        description: "Special atmosphere perfect for couples and honeymooners"
      },
      {
        title: "Private Hot Tub",
        description: "Enjoy the stars from your private jacuzzi"
      },
      {
        title: "Sunset Views",
        description: "Magical sunset views from the terrace"
      }
    ]
  },
  {
    id: "4",
    name: "Storge",
    meaning: "Family Love",
    slug: "storge",
    description: "Celebrate family love at Villa Storge. This spacious family villa brings everyone together with its large common areas and comfortable bedrooms.",
    shortDescription: "Spacious villa ideal for families",
    bedrooms: 5,
    bathrooms: 4,
    size: 280,
    capacity: 10,
    bedConfiguration: "3 Double, 4 Single",
    mainImage: "/lovable-uploads/c232481a-4e45-4abf-8303-8255f283f461.png",
    images: [
      "/lovable-uploads/c232481a-4e45-4abf-8303-8255f283f461.png",
      "/lovable-uploads/efe9bab7-4809-44ad-a4d4-5173259ea96f.png",
      "/lovable-uploads/997364b8-8ad0-4e6d-9e9f-4475575efc8c.png",
      "/lovable-uploads/20678a04-cad2-44d1-890e-424acc444f73.png"
    ],
    price: 520,
    maxGuests: 10,
    rating: 4.7,
    location: "Halkidiki, Greece",
    isFeatured: false,
    amenities: [
      "Large Private Pool",
      "Garden View",
      "Free Wi-Fi",
      "Air Conditioning",
      "Fully Equipped Kitchen",
      "BBQ Area",
      "Playground",
      "Game Room",
      "Parking"
    ],
    features: [
      {
        title: "Family-Centric Design",
        description: "Thoughtfully designed for families with children of all ages"
      },
      {
        title: "Entertainment Options",
        description: "Game room with billiards, table tennis, and board games"
      },
      {
        title: "Large Pool Area",
        description: "Spacious pool with shallow section for children"
      }
    ]
  }
];

// Functions to fetch villas
export const getAllVillas = async (): Promise<Villa[]> => {
  try {
    const { data, error } = await supabase
      .from('villas')
      .select(`
        *,
        villa_images(*),
        villa_features(*),
        villa_amenities(*)
      `)
      .order('name');
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return data.map(transformVillaFromDatabase);
    }
    
    // Return mock data if no data in database
    return villas;
  } catch (error) {
    console.error('Error fetching villas:', error);
    return villas; // Return mock data on error
  }
};

export const getVillaById = async (id: string): Promise<Villa | null> => {
  try {
    const { data, error } = await supabase
      .from('villas')
      .select(`
        *,
        villa_images(*),
        villa_features(*),
        villa_amenities(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (data) {
      return transformVillaFromDatabase(data);
    }
    
    // Fallback to mock data
    return villas.find(villa => villa.id === id) || null;
  } catch (error) {
    console.error(`Error fetching villa ${id}:`, error);
    return villas.find(villa => villa.id === id) || null;
  }
};

export const getVillaBySlug = async (slug: string): Promise<Villa | null> => {
  try {
    const { data, error } = await supabase
      .from('villas')
      .select(`
        *,
        villa_images(*),
        villa_features(*),
        villa_amenities(*)
      `)
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    
    if (data) {
      return transformVillaFromDatabase(data);
    }
    
    // Fallback to mock data
    return villas.find(villa => villa.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching villa with slug ${slug}:`, error);
    return villas.find(villa => villa.slug === slug) || null;
  }
};

export const getFeaturedVillas = async (): Promise<Villa[]> => {
  try {
    const { data, error } = await supabase
      .from('villas')
      .select(`
        *,
        villa_images(*),
        villa_features(*),
        villa_amenities(*)
      `)
      .eq('is_featured', true)
      .order('name');
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return data.map(transformVillaFromDatabase);
    }
    
    // Return mock data if no data in database
    return villas.filter(villa => villa.isFeatured);
  } catch (error) {
    console.error('Error fetching featured villas:', error);
    return villas.filter(villa => villa.isFeatured);
  }
};

// Helper function to transform database villa to frontend Villa type
function transformVillaFromDatabase(dbVilla: any): Villa {
  const mainImage = dbVilla.villa_images?.find((img: any) => img.is_main)?.image_url || null;
  const images = dbVilla.villa_images?.map((img: any) => img.image_url) || [];
  const features = dbVilla.villa_features?.map((feature: any) => ({
    title: feature.title,
    description: feature.description
  })) || [];
  const amenities = dbVilla.villa_amenities?.map((amenity: any) => amenity.amenity) || [];
  
  return {
    id: dbVilla.id,
    name: dbVilla.name,
    meaning: dbVilla.meaning,
    slug: dbVilla.slug,
    description: dbVilla.description,
    shortDescription: dbVilla.short_description,
    bedrooms: dbVilla.bedrooms,
    bathrooms: dbVilla.bathrooms,
    size: dbVilla.size,
    capacity: dbVilla.capacity,
    bedConfiguration: dbVilla.bed_configuration,
    mainImage: mainImage,
    images: images,
    price: dbVilla.price,
    maxGuests: dbVilla.max_guests,
    rating: dbVilla.rating,
    location: dbVilla.location,
    isFeatured: dbVilla.is_featured,
    amenities: amenities,
    features: features
  };
}
