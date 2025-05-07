
-- Create villas table
CREATE TABLE villas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  meaning TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  size INTEGER NOT NULL,
  capacity INTEGER NOT NULL,
  bed_configuration TEXT NOT NULL,
  main_image TEXT,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  amenities JSONB NOT NULL DEFAULT '[]'::jsonb,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  price INTEGER NOT NULL,
  max_guests INTEGER NOT NULL,
  rating NUMERIC(3,1) NOT NULL,
  location TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  villa_id UUID REFERENCES villas(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  guest_info JSONB,
  status TEXT NOT NULL DEFAULT 'pending',
  booking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Ensure booking end_date is after start_date
  CONSTRAINT bookings_date_check CHECK (end_date > start_date)
);

-- Create restricted dates table
CREATE TABLE restricted_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  villa_id UUID REFERENCES villas(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Ensure restricted end_date is after start_date
  CONSTRAINT restricted_dates_check CHECK (end_date > start_date)
);

-- Create profiles table for users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Update the profiles table when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Set up the trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Set up RLS (Row Level Security) policies

-- Enable RLS on all tables
ALTER TABLE villas ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE restricted_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Villas table policies
CREATE POLICY "Allow public read access to villas" 
  ON villas FOR SELECT 
  USING (true);

CREATE POLICY "Allow admin full access to villas"
  ON villas FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Bookings table policies
CREATE POLICY "Allow guests to view their own bookings"
  ON bookings FOR SELECT
  USING ((guest_info->>'email')::text = auth.jwt() ->> 'email');

CREATE POLICY "Allow guests to create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow admin full access to bookings"
  ON bookings FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Restricted dates table policies
CREATE POLICY "Allow public to view restricted dates"
  ON restricted_dates FOR SELECT
  USING (true);

CREATE POLICY "Allow admin full access to restricted dates"
  ON restricted_dates FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Profiles table policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Allow admin full access to profiles"
  ON profiles FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));
