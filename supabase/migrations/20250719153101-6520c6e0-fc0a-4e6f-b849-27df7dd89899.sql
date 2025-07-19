-- Create service categories table
CREATE TABLE public.service_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create technicians table
CREATE TABLE public.technicians (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT NOT NULL,
  hourly_rate DECIMAL(10,2) NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  response_time TEXT DEFAULT '< 2 hours',
  completed_jobs INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create technician specialties junction table
CREATE TABLE public.technician_specialties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  technician_id UUID REFERENCES public.technicians(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.service_categories(id) ON DELETE CASCADE,
  UNIQUE(technician_id, category_id)
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  technician_id UUID REFERENCES public.technicians(id) ON DELETE CASCADE,
  service_category_id UUID REFERENCES public.service_categories(id),
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  total_amount DECIMAL(10,2),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  technician_id UUID REFERENCES public.technicians(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technician_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for service_categories (public read)
CREATE POLICY "Service categories are viewable by everyone" ON public.service_categories FOR SELECT USING (true);

-- RLS policies for technicians (public read)
CREATE POLICY "Technicians are viewable by everyone" ON public.technicians FOR SELECT USING (true);

-- RLS policies for technician_specialties (public read)
CREATE POLICY "Technician specialties are viewable by everyone" ON public.technician_specialties FOR SELECT USING (true);

-- RLS policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for reviews (public read, authenticated write)
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_technicians_updated_at BEFORE UPDATE ON public.technicians FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();