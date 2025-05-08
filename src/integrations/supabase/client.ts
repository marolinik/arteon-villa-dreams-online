
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bqbitlbwsskztiqpayws.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxYml0bGJ3c3NrenRpcXBheXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NTY4ODUsImV4cCI6MjA2MjIzMjg4NX0.J1A5geE-KuheAUbiOu92dybZ7CI_5H9gglPsOlGkpu8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to fix gallery image category to match the frontend
export const fixGalleryImageCategories = async () => {
  // First, get all gallery images
  const { data: images, error } = await supabase
    .from('gallery_images')
    .select('*');
  
  if (error) {
    console.error('Error fetching gallery images:', error);
    return;
  }

  // Update images with correct categories (exteriors -> exterior, interiors -> interior)
  for (const image of images) {
    if (image.category === 'exteriors') {
      await supabase
        .from('gallery_images')
        .update({ category: 'exterior' })
        .eq('id', image.id);
    } else if (image.category === 'interiors') {
      await supabase
        .from('gallery_images')
        .update({ category: 'interior' })
        .eq('id', image.id);
    }
  }
};
