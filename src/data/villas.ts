
import { Villa } from "@/types";

export const villas: Villa[] = [
  {
    id: "v1",
    name: "Kyma",
    meaning: "Wave",
    slug: "kyma",
    description: "Experience the epitome of luxury in our premier villa, Kyma, aptly named after the Greek word for 'wave'. This stunning property offers uninterrupted views of the Aegean Sea from its elevated position. The spacious terrace with its infinity pool creates a seamless connection with the horizon, giving you the sensation of floating above the water.\n\nInside, the villa is finished with premium materials, including marble floors, wooden beams, and stone walls that tie together traditional Greek architecture with contemporary luxury. The open-plan living space opens directly onto the terrace, creating a smooth flow between indoor and outdoor living.\n\nThe master suite occupies the entire upper level, offering panoramic sea views from its private balcony. Two additional bedrooms on the lower level provide comfortable accommodation for families or groups of friends. Each is decorated with a subtle nautical theme, reflecting the villa's name and seaside location.",
    shortDescription: "Our premier villa with stunning sea views and an infinity pool.",
    bedrooms: 3,
    bathrooms: 3,
    size: 180,
    capacity: 6,
    maxGuests: 6,
    price: 450,
    rating: 4.9,
    location: "Akti Salonikiou, Halkidiki",
    isFeatured: true,
    bedConfiguration: "1 King, 2 Queen",
    mainImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1080&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1080&auto=format&fit=crop"
    ],
    amenities: ["Private Pool", "Sea View", "Beach Access", "WiFi", "Air Conditioning", "Fully Equipped Kitchen", "BBQ"],
    features: [
      {
        icon: "pool",
        title: "Infinity Pool",
        description: "Private infinity pool overlooking the Aegean Sea"
      },
      {
        icon: "beach",
        title: "Beach Access",
        description: "Direct path to Salonikiou Beach just 100m away"
      },
      {
        icon: "view",
        title: "Panoramic Views",
        description: "Unobstructed sea views from all major rooms"
      }
    ]
  },
  {
    id: "v2",
    name: "Petra",
    meaning: "Stone",
    slug: "petra",
    description: "Petra, meaning 'stone' in Greek, is a charming villa that draws inspiration from the natural rock formations of Halkidiki. Built partially into the hillside, this unique accommodation offers a distinctive blend of land and architecture. The exterior showcases beautiful local stonework, helping the villa blend harmoniously with its natural surroundings.\n\nInside, the villa is cool and serene, with stone features complemented by neutral tones and natural textiles. The living area centers around a traditional fireplace, perfect for the occasional cooler evenings in spring and autumn.\n\nThe villa's terraced garden includes an outdoor dining area shaded by an ancient olive tree, a private swimming pool, and several stone-paved relaxation areas that offer different perspectives of the surrounding landscape. The garden path leads down to a small, semi-private cove that's perfect for morning swims.",
    shortDescription: "A charming stone villa built into the hillside with a private path to a secluded cove.",
    bedrooms: 2,
    bathrooms: 2,
    size: 120,
    capacity: 4,
    maxGuests: 4,
    price: 320,
    rating: 4.8,
    location: "Akti Salonikiou, Halkidiki",
    isFeatured: true,
    bedConfiguration: "1 Queen, 2 Single",
    mainImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1080&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?q=80&w=1080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1080&auto=format&fit=crop"
    ],
    amenities: ["Private Pool", "Sea View", "Beach Access", "WiFi", "Air Conditioning", "Fireplace", "Outdoor Dining"],
    features: [
      {
        icon: "stone",
        title: "Natural Stone Build",
        description: "Traditional stonework that keeps interiors naturally cool"
      },
      {
        icon: "beach",
        title: "Private Cove",
        description: "Private path leading to a semi-private pebble cove"
      },
      {
        icon: "garden",
        title: "Terraced Garden",
        description: "Multi-level garden with Mediterranean plants and herbs"
      }
    ]
  },
  {
    id: "v3",
    name: "Elia",
    meaning: "Olive",
    slug: "elia",
    description: "Named after the olive trees that surround it, Villa Elia is a celebration of Greek agricultural heritage. This traditional stone-built villa sits among age-old olive groves that still produce fruit, giving guests the authentic experience of Greek country living while enjoying modern amenities.\n\nThe villa's design respects traditional Greek farmhouse architecture, with thick stone walls, wooden beamed ceilings, and terracotta floors. The interiors feature a thoughtful collection of antiques and handcrafted furniture, along with modern comforts that create a perfect balance of old and new.\n\nThe highlight of Villa Elia is its extensive outdoor space. A covered veranda overlooks the private pool and the sea beyond. A traditional stone oven and BBQ area make this the perfect villa for those who love outdoor cooking and dining. Guests are welcome to pick herbs from the garden and, in season, to collect olives and learn about the oil-making process.",
    shortDescription: "A traditional villa nestled among ancient olive groves with sea views.",
    bedrooms: 3,
    bathrooms: 2,
    size: 150,
    capacity: 6,
    maxGuests: 6,
    price: 380,
    rating: 4.7,
    location: "Akti Salonikiou, Halkidiki",
    isFeatured: false,
    bedConfiguration: "2 Queen, 2 Single",
    mainImage: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?q=80&w=1080&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?q=80&w=1080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566662340351-6d3e5e79f53a?q=80&w=1080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=1080&auto=format&fit=crop"
    ],
    amenities: ["Private Pool", "Sea View", "Olive Grove", "WiFi", "Air Conditioning", "Outdoor Oven", "BBQ"],
    features: [
      {
        icon: "olive",
        title: "Olive Grove",
        description: "Set within a productive olive grove with trees over 300 years old"
      },
      {
        icon: "kitchen",
        title: "Traditional Cooking",
        description: "Stone oven and BBQ area for authentic Greek cooking experiences"
      },
      {
        icon: "history",
        title: "Rich Heritage",
        description: "Building dates back to the 19th century and has been carefully restored"
      }
    ]
  },
  {
    id: "v4",
    name: "Ammos",
    meaning: "Sand",
    slug: "ammos",
    description: "Villa Ammos, named after the Greek word for 'sand', is our beachfront property that offers the ultimate seaside vacation experience. With direct access to the golden sands of Salonikiou Beach, this villa eliminates any barriers between you and the Mediterranean Sea.\n\nThe villa embraces a contemporary, minimalist aesthetic, with large windows that maximize the stunning sea views and fill the interiors with natural light. The color palette takes inspiration from the beach, with sandy tones, whites, and occasional blue accents that echo the sea and sky.\n\nThe beachfront terrace is the star of this property, offering an expansive outdoor living area just steps from the water. The infinity pool appears to merge with the sea beyond, while comfortable loungers and a covered dining area allow you to enjoy the outdoors from dawn until late into the night. Fall asleep to the sound of gentle waves and wake up to spectacular sunrises from the comfort of your bedroom.",
    shortDescription: "A beachfront villa with direct access to the golden sands of Salonikiou Beach.",
    bedrooms: 4,
    bathrooms: 3,
    size: 200,
    capacity: 8,
    maxGuests: 8,
    price: 550,
    rating: 4.9,
    location: "Akti Salonikiou, Halkidiki",
    isFeatured: true,
    bedConfiguration: "2 King, 1 Queen, 2 Single",
    mainImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1080&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?q=80&w=1080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1569369926169-9ee7fb046ee1?q=80&w=1080&auto=format&fit=crop"
    ],
    amenities: ["Beachfront", "Infinity Pool", "Direct Beach Access", "WiFi", "Air Conditioning", "Fully Equipped Kitchen", "BBQ", "Beach Equipment"],
    features: [
      {
        icon: "beach",
        title: "Beachfront Location",
        description: "Step directly onto the sand from your private terrace"
      },
      {
        icon: "pool",
        title: "Infinity Pool",
        description: "Swimming pool that visually blends with the sea beyond"
      },
      {
        icon: "sunrise",
        title: "Sunrise Views",
        description: "Perfect easterly aspect for spectacular Mediterranean sunrises"
      }
    ]
  }
];
