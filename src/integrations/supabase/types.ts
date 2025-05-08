export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          id: string
          role?: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
      amenities: {
        Row: {
          category: string
          created_at: string
          description: string
          featured: boolean
          icon: string
          id: string
          image: string | null
          name: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          featured?: boolean
          icon: string
          id?: string
          image?: string | null
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          featured?: boolean
          icon?: string
          id?: string
          image?: string | null
          name?: string
        }
        Relationships: []
      }
      attractions: {
        Row: {
          category: string
          created_at: string
          description: string
          distance: string
          featured: boolean
          id: string
          image: string
          location: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          distance: string
          featured?: boolean
          id?: string
          image: string
          location: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          distance?: string
          featured?: boolean
          id?: string
          image?: string
          location?: string
          name?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_number: string
          created_at: string
          end_date: string
          guest_count: number
          guest_email: string
          guest_name: string
          guest_phone: string
          id: string
          special_requests: string | null
          start_date: string
          status: string
          total_price: number
          villa_id: string
        }
        Insert: {
          booking_number: string
          created_at?: string
          end_date: string
          guest_count: number
          guest_email: string
          guest_name: string
          guest_phone: string
          id?: string
          special_requests?: string | null
          start_date: string
          status?: string
          total_price: number
          villa_id: string
        }
        Update: {
          booking_number?: string
          created_at?: string
          end_date?: string
          guest_count?: number
          guest_email?: string
          guest_name?: string
          guest_phone?: string
          id?: string
          special_requests?: string | null
          start_date?: string
          status?: string
          total_price?: number
          villa_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_villa_id_fkey"
            columns: ["villa_id"]
            isOneToOne: false
            referencedRelation: "villas"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery: {
        Row: {
          alt: string
          category: string
          created_at: string
          featured: boolean
          id: string
          url: string
        }
        Insert: {
          alt: string
          category: string
          created_at?: string
          featured?: boolean
          id?: string
          url: string
        }
        Update: {
          alt?: string
          category?: string
          created_at?: string
          featured?: boolean
          id?: string
          url?: string
        }
        Relationships: []
      }
      restricted_dates: {
        Row: {
          created_at: string
          end_date: string
          id: string
          reason: string | null
          start_date: string
          villa_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          reason?: string | null
          start_date: string
          villa_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          reason?: string | null
          start_date?: string
          villa_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restricted_dates_villa_id_fkey"
            columns: ["villa_id"]
            isOneToOne: false
            referencedRelation: "villas"
            referencedColumns: ["id"]
          },
        ]
      }
      villa_amenities: {
        Row: {
          amenity: string
          created_at: string
          id: string
          villa_id: string
        }
        Insert: {
          amenity: string
          created_at?: string
          id?: string
          villa_id: string
        }
        Update: {
          amenity?: string
          created_at?: string
          id?: string
          villa_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "villa_amenities_villa_id_fkey"
            columns: ["villa_id"]
            isOneToOne: false
            referencedRelation: "villas"
            referencedColumns: ["id"]
          },
        ]
      }
      villa_features: {
        Row: {
          created_at: string
          description: string
          id: string
          title: string
          villa_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          title: string
          villa_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          title?: string
          villa_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "villa_features_villa_id_fkey"
            columns: ["villa_id"]
            isOneToOne: false
            referencedRelation: "villas"
            referencedColumns: ["id"]
          },
        ]
      }
      villa_images: {
        Row: {
          created_at: string
          display_order: number
          id: string
          image_url: string
          is_main: boolean
          villa_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          is_main?: boolean
          villa_id: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          is_main?: boolean
          villa_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "villa_images_villa_id_fkey"
            columns: ["villa_id"]
            isOneToOne: false
            referencedRelation: "villas"
            referencedColumns: ["id"]
          },
        ]
      }
      villas: {
        Row: {
          bathrooms: number
          bed_configuration: string
          bedrooms: number
          capacity: number
          created_at: string
          description: string
          id: string
          is_featured: boolean
          location: string
          max_guests: number
          meaning: string
          name: string
          price: number
          rating: number
          short_description: string
          size: number
          slug: string
          updated_at: string
        }
        Insert: {
          bathrooms: number
          bed_configuration: string
          bedrooms: number
          capacity: number
          created_at?: string
          description: string
          id?: string
          is_featured?: boolean
          location: string
          max_guests: number
          meaning: string
          name: string
          price: number
          rating: number
          short_description: string
          size: number
          slug: string
          updated_at?: string
        }
        Update: {
          bathrooms?: number
          bed_configuration?: string
          bedrooms?: number
          capacity?: number
          created_at?: string
          description?: string
          id?: string
          is_featured?: boolean
          location?: string
          max_guests?: number
          meaning?: string
          name?: string
          price?: number
          rating?: number
          short_description?: string
          size?: number
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_villa_availability: {
        Args: { p_villa_id: string; p_start_date: string; p_end_date: string }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
