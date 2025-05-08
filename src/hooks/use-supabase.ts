
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useSupabaseQuery<T>(
  tableName: string,
  options: {
    columns?: string;
    filter?: { column: string; value: any; operator?: string };
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    single?: boolean;
  } = {}
): { data: T | null; loading: boolean; error: Error | null; refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const refetch = () => {
    setFetchCount(prev => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Start building the query
        let query = supabase.from(tableName).select(options.columns || '*');

        // Apply filter if provided
        if (options.filter) {
          const { column, value, operator = 'eq' } = options.filter;
          
          if (operator === 'eq') {
            query = query.eq(column, value);
          } else if (operator === 'gt') {
            query = query.gt(column, value);
          } else if (operator === 'lt') {
            query = query.lt(column, value);
          } else if (operator === 'gte') {
            query = query.gte(column, value);
          } else if (operator === 'lte') {
            query = query.lte(column, value);
          } else if (operator === 'like') {
            query = query.like(column, `%${value}%`);
          }
        }

        // Apply ordering if provided
        if (options.orderBy) {
          const { column, ascending = true } = options.orderBy;
          query = query.order(column, { ascending });
        }

        // Apply limit if provided
        if (options.limit) {
          query = query.limit(options.limit);
        }

        // Get single item or array based on options
        const { data: result, error: queryError } = options.single 
          ? await query.single() 
          : await query;

        if (queryError) throw queryError;

        setData(result as T);
      } catch (err) {
        console.error('Error fetching data from Supabase:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName, options.columns, options.filter, options.orderBy, options.limit, options.single, fetchCount]);

  return { data, loading, error, refetch };
}

export function useVillaData(slug?: string) {
  const { data: villa, loading: villaLoading, error: villaError, refetch } = useSupabaseQuery(
    'villas',
    {
      filter: slug ? { column: 'slug', value: slug } : undefined,
      single: !!slug
    }
  );

  const { data: features, loading: featuresLoading, error: featuresError } = useSupabaseQuery(
    'villa_features',
    {
      filter: villa ? { column: 'villa_id', value: villa.id } : undefined,
      orderBy: { column: 'position' }
    }
  );

  const { data: images, loading: imagesLoading, error: imagesError } = useSupabaseQuery(
    'villa_images',
    {
      filter: villa ? { column: 'villa_id', value: villa.id } : undefined,
      orderBy: { column: 'position' }
    }
  );

  const { data: amenities, loading: amenitiesLoading, error: amenitiesError } = useSupabaseQuery(
    'villa_amenities',
    {
      filter: villa ? { column: 'villa_id', value: villa.id } : undefined
    }
  );

  const loading = villaLoading || featuresLoading || imagesLoading || amenitiesLoading;
  const error = villaError || featuresError || imagesError || amenitiesError;

  // Transform the data to match our frontend model
  const villaWithAllData = villa && !loading && !error ? {
    ...villa,
    features: features || [],
    images: images?.map((image: any) => image.url) || [],
    amenities: amenities?.map((amenity: any) => amenity.name) || []
  } : null;

  return { villa: villaWithAllData, loading, error, refetch };
}

export function useAllVillas() {
  return useSupabaseQuery('villas', {
    orderBy: { column: 'name' }
  });
}

export function useFeaturedVillas() {
  return useSupabaseQuery('villas', {
    filter: { column: 'is_featured', value: true },
    orderBy: { column: 'name' }
  });
}

export function useGalleryImages(category?: string) {
  return useSupabaseQuery('gallery_images', {
    filter: category && category !== 'all' ? { column: 'category', value: category } : undefined
  });
}
