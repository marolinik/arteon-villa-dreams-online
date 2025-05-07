
import { supabase } from '@/lib/supabase';
import { Villa } from '@/types';

// Fetch all villas
export const getVillas = async (): Promise<Villa[]> => {
  const { data, error } = await supabase
    .from('villas')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

// Fetch a single villa by slug
export const getVillaBySlug = async (slug: string): Promise<Villa | null> => {
  const { data, error } = await supabase
    .from('villas')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') return null; // No rows found
    throw error;
  }
  
  return data;
};

// Get a villa by ID
export const getVillaById = async (id: string): Promise<Villa | null> => {
  const { data, error } = await supabase
    .from('villas')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') return null; // No rows found
    throw error;
  }
  
  return data;
};

// Create or update a villa (admin only)
export const upsertVilla = async (villa: Villa): Promise<Villa> => {
  const { data, error } = await supabase
    .from('villas')
    .upsert(villa)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Delete a villa (admin only)
export const deleteVilla = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('villas')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};
