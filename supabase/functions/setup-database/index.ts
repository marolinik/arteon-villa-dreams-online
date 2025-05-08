
import { serve } from "https://deno.land/std@0.132.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

// This edge function can be used to set up and seed the database
serve(async (req) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create UUID mapping for villa slugs
    const villaIds = {
      armonia: crypto.randomUUID(),
      eirini: crypto.randomUUID(),
      thea: crypto.randomUUID(),
      onar: crypto.randomUUID()
    };

    // Delete existing records (for clean setup)
    await supabase.from('villa_amenities').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('villa_features').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('villa_images').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('villas').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert villas
    const { error: villaError } = await supabase.from('villas').insert([
      {
        id: villaIds.armonia,
        name: 'Villa Armonia',
        meaning: 'Harmony',
        slug: 'armonia',
        description: 'Villa Armonia (meaning "Harmony" in Greek) offers a balanced blend of modern comfort and Greek seaside charm. This two-level villa (approx. 80 m²) can accommodate up to 5–6 guests comfortably. Upstairs, there are 2 bedrooms (a master bedroom with a king-size bed, and a second bedroom with king size bed) – perfect for a family or group of friends. An additional sofa-bed in the living area can sleep 1–2 extra guests if needed. The villa features 2 bathrooms for convenience: one with a bathtub, second with walk-in shower. On the ground floor, Villa Armonia boasts an open-plan living and dining space with a fully equipped kitchen. Guests will find everything needed for self-catering, including a refrigerator, stovetop/oven, microwave, electric kettle, cookware, and a dining table. A washing machine is also available in the unit for laundry. The décor is bright and contemporary, with comfortable sofas and a flat-screen TV for indoor entertainment. For comfort, the villa has air conditioning and is soundproofed.',
        short_description: 'A balanced blend of modern comfort and Greek seaside charm, perfect for families.',
        bedrooms: 2,
        bathrooms: 2,
        size: 80,
        capacity: 6,
        max_guests: 6,
        bed_configuration: '2 Double Beds + 1 Sofa Bed',
        main_image: '/lovable-uploads/53edea8e-01d3-4d66-b1b7-d934b3652d77.png',
        price: 380,
        rating: 4.9,
        location: 'Halkidiki, Greece',
        is_featured: true
      },
      {
        id: villaIds.eirini,
        name: 'Villa Eirini',
        meaning: 'Peace',
        slug: 'eirini',
        description: 'Villa Eirini (Greek for "Peace") lives up to its name by providing a tranquil and private retreat with lovely sea views. Identical in size (80 m²) and layout to Villa Armonia, this villa comfortably hosts up to 5–6 guests across 2 bedrooms and a sofa-bed. Upstairs, there are 2 bedrooms (a master bedroom with a double bed, and a second bedroom with 2 single beds) – perfect for a family or group of friends. An additional sofa-bed in the living area can sleep 1–2 extra guests if needed. The villa features 2 bathrooms for convenience: one with a bathtub, second with walk-in shower. On the ground floor, Villa Eirini boasts an open-plan living and dining space with a fully equipped kitchen. Guests will find everything needed for self-catering, including a refrigerator, stovetop/oven, microwave, electric kettle, cookware, and a dining table. A washing machine is also available in the unit for laundry. The décor is bright and contemporary, with comfortable sofas and a flat-screen TV for indoor entertainment. For comfort, the villa has air conditioning and is soundproofed.',
        short_description: 'A peaceful retreat with lovely sea views, providing tranquility and comfort.',
        bedrooms: 2,
        bathrooms: 2,
        size: 80,
        capacity: 6,
        max_guests: 6,
        bed_configuration: '1 Double Bed + 2 Single Beds + 1 Sofa Bed',
        main_image: '/lovable-uploads/988d09fc-2fec-4387-bc8f-d124b600832f.png',
        price: 380,
        rating: 4.8,
        location: 'Halkidiki, Greece',
        is_featured: false
      },
      {
        id: villaIds.thea,
        name: 'Villa Thea',
        meaning: 'View',
        slug: 'thea',
        description: 'Villa Thea takes its name from the Greek word for "View," and accordingly offers wonderful views of the Aegean and the surrounding landscape. This villa is a two-story, 2-bedroom maisonette (80 m²) that accommodates up to 6 guests (5 comfortably). Upstairs, there are 2 bedrooms (a master bedroom with a double bed, and a second bedroom with two single beds) – perfect for a family or group of friends. An additional sofa-bed in the living area can sleep 1–2 extra guests if needed. The villa features 2 bathrooms for convenience: one with a bathtub, second with walk-in shower. On the ground floor, Villa Thea boasts an open-plan living and dining space with a fully equipped kitchen. Guests will find everything needed for self-catering, including a refrigerator, stovetop/oven, microwave, electric kettle, cookware, and a dining table. A washing machine is also available in the unit for laundry. The décor is bright and contemporary, with comfortable sofas and a flat-screen TV for indoor entertainment. For comfort, the villa has air conditioning and is soundproofed.',
        short_description: 'Named for its spectacular views of the Aegean, this villa is perfect for nature lovers.',
        bedrooms: 2,
        bathrooms: 2,
        size: 80,
        capacity: 6,
        max_guests: 6,
        bed_configuration: '1 Double Bed + 2 Single Beds + 1 Sofa Bed',
        main_image: '/lovable-uploads/4465fed9-a8e9-451e-b703-9277fe4a3d12.png',
        price: 380,
        rating: 4.7,
        location: 'Halkidiki, Greece',
        is_featured: false
      },
      {
        id: villaIds.onar,
        name: 'Villa Onar',
        meaning: 'Dream',
        slug: 'onar',
        description: 'Villa Onar – aptly named after the Greek word for "Dream" – provides a dreamy holiday home by the sea, ideal for families or groups seeking comfort and privacy. It is a spacious two-bedroom villa (80 m²) on two levels, accommodating up to 6 guests with ease. Upstairs, there are 2 bedrooms (a master bedroom with a king-size bed, and a second bedroom with king size bed) – perfect for a family or group of friends. An additional sofa-bed in the living area can sleep 1–2 extra guests if needed. The villa features 2 bathrooms for convenience: one with a bathtub, second with walk-in shower. On the ground floor, Villa Onar boasts an open-plan living and dining space with a fully equipped kitchen. Guests will find everything needed for self-catering, including a refrigerator, stovetop/oven, microwave, electric kettle, cookware, and a dining table. A washing machine is also available in the unit for laundry. The décor is bright and contemporary, with comfortable sofas and a flat-screen TV for indoor entertainment. For comfort, the villa has air conditioning and is soundproofed.',
        short_description: 'A dreamy holiday home by the sea, providing comfort and privacy for families.',
        bedrooms: 2,
        bathrooms: 2,
        size: 80,
        capacity: 6,
        max_guests: 6,
        bed_configuration: '2 Double Beds + 1 Sofa Bed',
        main_image: '/lovable-uploads/0021a2f4-f0b9-4cc6-a223-f7089ffc6733.png',
        price: 380,
        rating: 4.8,
        location: 'Halkidiki, Greece',
        is_featured: false
      }
    ]);

    if (villaError) {
      throw villaError;
    }

    // Insert villa images
    const villaImages = [
      // Villa Armonia images
      {
        villa_id: villaIds.armonia,
        url: '/lovable-uploads/53edea8e-01d3-4d66-b1b7-d934b3652d77.png',
        alt: 'Villa Armonia exterior view',
        position: 1
      },
      {
        villa_id: villaIds.armonia,
        url: '/lovable-uploads/bf20de36-10ae-40a7-b360-beda4fae42c4.png',
        alt: 'Villa Armonia modern living room',
        position: 2
      },
      {
        villa_id: villaIds.armonia,
        url: '/lovable-uploads/97791fed-d1e5-4d6d-90f5-d1f4e1b681dc.png',
        alt: 'Villa Armonia living room',
        position: 3
      },
      {
        villa_id: villaIds.armonia,
        url: '/lovable-uploads/dce542ec-ce31-45a2-831a-2ab9c8b260ff.png',
        alt: 'Villa Armonia living area with grey sofa',
        position: 4
      },
      
      // Villa Eirini images
      {
        villa_id: villaIds.eirini,
        url: '/lovable-uploads/988d09fc-2fec-4387-bc8f-d124b600832f.png',
        alt: 'Villa Eirini exterior view',
        position: 1
      },
      {
        villa_id: villaIds.eirini,
        url: '/lovable-uploads/139a87fa-81bf-4b6f-9218-c82a60e08dfd.png',
        alt: 'Villa Eirini double bed',
        position: 2
      },
      {
        villa_id: villaIds.eirini,
        url: '/lovable-uploads/265794f2-b9e4-4d1a-83bd-17a34d11eb5b.png',
        alt: 'Villa Eirini twin bedroom with single beds',
        position: 3
      },
      {
        villa_id: villaIds.eirini,
        url: '/lovable-uploads/07b03475-a6d8-461c-bb8f-646e88430134.png',
        alt: 'Villa Eirini compact kitchen with dining area',
        position: 4
      },
      
      // Villa Thea images
      {
        villa_id: villaIds.thea,
        url: '/lovable-uploads/4465fed9-a8e9-451e-b703-9277fe4a3d12.png',
        alt: 'Villa Thea exterior view',
        position: 1
      },
      {
        villa_id: villaIds.thea,
        url: '/lovable-uploads/25f78276-040e-4369-bddf-ba863e268855.png',
        alt: 'Villa Thea twin bedroom with separate beds',
        position: 2
      },
      {
        villa_id: villaIds.thea,
        url: '/lovable-uploads/d2f50d35-d941-4bb7-b122-90110ab080f1.png',
        alt: 'Villa Thea twin bedroom with single beds',
        position: 3
      },
      {
        villa_id: villaIds.thea,
        url: '/lovable-uploads/d08074bf-46b7-45ec-bed9-8ea3c64bc3eb.png',
        alt: 'Villa Thea modern bathroom with walk-in shower',
        position: 4
      },
      
      // Villa Onar images
      {
        villa_id: villaIds.onar,
        url: '/lovable-uploads/0021a2f4-f0b9-4cc6-a223-f7089ffc6733.png',
        alt: 'Villa Onar exterior view',
        position: 1
      },
      {
        villa_id: villaIds.onar,
        url: '/lovable-uploads/44cdbc7f-950c-4310-bc8d-31193270787f.png',
        alt: 'Villa Onar double bed bedroom',
        position: 2
      },
      {
        villa_id: villaIds.onar,
        url: '/lovable-uploads/31172d6b-392e-445c-996a-763f1bed68bb.png',
        alt: 'Villa Onar living room with sofa',
        position: 3
      },
      {
        villa_id: villaIds.onar,
        url: '/lovable-uploads/a6bc1e03-a564-49fd-8ce9-aa76a620b436.png',
        alt: 'Villa Onar bedroom closet area with storage',
        position: 4
      }
    ];

    const { error: imageError } = await supabase.from('villa_images').insert(villaImages);

    if (imageError) {
      throw imageError;
    }

    // Insert villa features
    const villaFeatures = [
      // Villa Armonia features
      {
        villa_id: villaIds.armonia,
        title: 'Terrace Views',
        description: 'Outside, Villa Armonia has two own furnished terraces one overlooking the pool and garden, Second with partial sea views through the lush grounds.',
        position: 1
      },
      {
        villa_id: villaIds.armonia,
        title: 'Private Balcony',
        description: 'Upstairs, the bedrooms open to a private balcony where you can enjoy direct sea views – a perfect spot to greet the morning sunrise over the Aegean.',
        position: 2
      },
      {
        villa_id: villaIds.armonia,
        title: 'Full Connectivity',
        description: 'High-speed Wi-Fi is available throughout the villa (and indeed across the whole property).',
        position: 3
      },
      
      // Villa Eirini features
      {
        villa_id: villaIds.eirini,
        title: 'Terrace Views',
        description: 'Outside, Villa Eirini has two own furnished terraces one overlooking the pool and garden, Second with partial sea views through the lush grounds.',
        position: 1
      },
      {
        villa_id: villaIds.eirini,
        title: 'Private Balcony',
        description: 'Upstairs, the bedrooms open to a private balcony where you can enjoy direct sea views – a perfect spot to greet the morning sunrise over the Aegean.',
        position: 2
      },
      {
        villa_id: villaIds.eirini,
        title: 'Full Connectivity',
        description: 'High-speed Wi-Fi is available throughout the villa (and indeed across the whole property).',
        position: 3
      },
      
      // Villa Thea features
      {
        villa_id: villaIds.thea,
        title: 'Terrace Views',
        description: 'Outside, Villa Thea has two own furnished terraces one overlooking the pool and garden, Second with partial sea views through the lush grounds.',
        position: 1
      },
      {
        villa_id: villaIds.thea,
        title: 'Private Balcony',
        description: 'Upstairs, the bedrooms open to a private balcony where you can enjoy direct sea views – a perfect spot to greet the morning sunrise over the Aegean.',
        position: 2
      },
      {
        villa_id: villaIds.thea,
        title: 'Full Connectivity',
        description: 'High-speed Wi-Fi is available throughout the villa (and indeed across the whole property).',
        position: 3
      },
      
      // Villa Onar features
      {
        villa_id: villaIds.onar,
        title: 'Terrace Views',
        description: 'Outside, Villa Onar has two own furnished terraces one overlooking the pool and garden, Second with partial sea views through the lush grounds.',
        position: 1
      },
      {
        villa_id: villaIds.onar,
        title: 'Private Balcony',
        description: 'Upstairs, the bedrooms open to a private balcony where you can enjoy direct sea views – a perfect spot to greet the morning sunrise over the Aegean.',
        position: 2
      },
      {
        villa_id: villaIds.onar,
        title: 'Full Connectivity',
        description: 'High-speed Wi-Fi is available throughout the villa (and indeed across the whole property).',
        position: 3
      }
    ];

    const { error: featuresError } = await supabase.from('villa_features').insert(villaFeatures);

    if (featuresError) {
      throw featuresError;
    }

    // Insert villa amenities
    const villaAmenities = [];
    const commonAmenities = [
      'Fully equipped kitchen',
      'Air conditioning',
      'Free Wi-Fi',
      'Washing machine',
      'Flat-screen TV',
      'Soundproofing',
      'Private terrace',
      'Sea view',
      'Pool view'
    ];

    for (const villaId of Object.values(villaIds)) {
      commonAmenities.forEach(name => {
        villaAmenities.push({
          villa_id: villaId,
          name
        });
      });
    }

    const { error: amenitiesError } = await supabase.from('villa_amenities').insert(villaAmenities);

    if (amenitiesError) {
      throw amenitiesError;
    }

    // Insert gallery images
    const galleryImages = [
      {
        url: '/lovable-uploads/53edea8e-01d3-4d66-b1b7-d934b3652d77.png',
        alt: 'Villa Armonia exterior view',
        category: 'exterior',
        featured: true
      },
      {
        url: '/lovable-uploads/bf20de36-10ae-40a7-b360-beda4fae42c4.png',
        alt: 'Villa Armonia modern living room',
        category: 'interior',
        featured: false
      },
      {
        url: '/lovable-uploads/97791fed-d1e5-4d6d-90f5-d1f4e1b681dc.png',
        alt: 'Villa Armonia living room',
        category: 'interior',
        featured: true
      },
      {
        url: '/lovable-uploads/dce542ec-ce31-45a2-831a-2ab9c8b260ff.png',
        alt: 'Villa Armonia living area with grey sofa',
        category: 'interior',
        featured: false
      },
      {
        url: '/lovable-uploads/988d09fc-2fec-4387-bc8f-d124b600832f.png',
        alt: 'Villa Eirini exterior view',
        category: 'exterior',
        featured: false
      },
      {
        url: '/lovable-uploads/139a87fa-81bf-4b6f-9218-c82a60e08dfd.png',
        alt: 'Villa Eirini double bed',
        category: 'interior',
        featured: false
      },
      {
        url: '/lovable-uploads/265794f2-b9e4-4d1a-83bd-17a34d11eb5b.png',
        alt: 'Villa Eirini twin bedroom with single beds',
        category: 'interior',
        featured: false
      },
      {
        url: '/lovable-uploads/07b03475-a6d8-461c-bb8f-646e88430134.png',
        alt: 'Villa Eirini compact kitchen with dining area',
        category: 'interior',
        featured: false
      },
      {
        url: '/lovable-uploads/4465fed9-a8e9-451e-b703-9277fe4a3d12.png',
        alt: 'Villa Thea exterior view',
        category: 'exterior',
        featured: false
      },
      {
        url: '/lovable-uploads/25f78276-040e-4369-bddf-ba863e268855.png',
        alt: 'Villa Thea twin bedroom with separate beds',
        category: 'interior',
        featured: false
      },
      {
        url: '/lovable-uploads/d2f50d35-d941-4bb7-b122-90110ab080f1.png',
        alt: 'Villa Thea twin bedroom with single beds',
        category: 'interior',
        featured: false
      },
      {
        url: '/lovable-uploads/d08074bf-46b7-45ec-bed9-8ea3c64bc3eb.png',
        alt: 'Villa Thea modern bathroom with walk-in shower',
        category: 'interior',
        featured: false
      },
      {
        url: '/lovable-uploads/0021a2f4-f0b9-4cc6-a223-f7089ffc6733.png',
        alt: 'Villa Onar exterior view',
        category: 'exterior',
        featured: false
      },
      {
        url: '/lovable-uploads/44cdbc7f-950c-4310-bc8d-31193270787f.png',
        alt: 'Villa Onar double bed bedroom',
        category: 'interior',
        featured: false
      },
      {
        url: '/lovable-uploads/31172d6b-392e-445c-996a-763f1bed68bb.png',
        alt: 'Villa Onar living room with sofa',
        category: 'interior',
        featured: false
      },
      {
        url: '/lovable-uploads/a6bc1e03-a564-49fd-8ce9-aa76a620b436.png',
        alt: 'Villa Onar bedroom closet area with storage',
        category: 'interior',
        featured: false
      },
      {
        url: '/lovable-uploads/40000230-369a-45b7-bf40-4e3182a4c8bb.png',
        alt: 'Beautiful coastal beach view with crystal clear water',
        category: 'surroundings',
        featured: false
      },
      {
        url: '/lovable-uploads/b2748edf-87d4-42ac-b8a0-668e371a2428.png',
        alt: 'Scenic mountain landscape in Halkidiki',
        category: 'surroundings',
        featured: false
      },
      {
        url: '/lovable-uploads/2885597c-3259-441f-b353-d6f5293b7290.png',
        alt: 'Local taverna with traditional Greek cuisine',
        category: 'surroundings',
        featured: false
      },
      {
        url: '/lovable-uploads/f6c9744c-0a2f-45bb-9ec3-58ab45d8f82e.png',
        alt: 'Sunset view over the Aegean Sea',
        category: 'surroundings',
        featured: false
      }
    ];

    const { error: galleryError } = await supabase.from('gallery_images').insert(galleryImages);

    if (galleryError) {
      throw galleryError;
    }

    // Insert price periods
    const pricePeriods = [
      {
        start_date: '2025-04-17',
        end_date: '2025-04-22',
        rate: 430,
        season_name: 'Easter'
      },
      {
        start_date: '2025-05-31',
        end_date: '2025-06-30',
        rate: 380,
        season_name: 'Early Summer'
      },
      {
        start_date: '2025-07-01',
        end_date: '2025-07-31',
        rate: 460,
        season_name: 'High Summer'
      },
      {
        start_date: '2025-08-01',
        end_date: '2025-08-31',
        rate: 530,
        season_name: 'Peak Season'
      },
      {
        start_date: '2025-09-01',
        end_date: '2025-09-15',
        rate: 460,
        season_name: 'Late Summer'
      },
      {
        start_date: '2025-09-16',
        end_date: '2025-10-04',
        rate: 380,
        season_name: 'Fall'
      }
    ];

    const { error: periodError } = await supabase.from('price_periods').insert(pricePeriods);

    if (periodError) {
      throw periodError;
    }

    return new Response(JSON.stringify({
      message: 'Database setup and seeded successfully',
      villaIds
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
});
