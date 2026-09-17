-- 1. Handle New User Trigger (Creates profile)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new auth users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Updated At Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables
DROP TRIGGER IF EXISTS set_updated_at_profiles ON profiles;
CREATE TRIGGER set_updated_at_profiles
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Prevent role elevation trigger
CREATE OR REPLACE FUNCTION prevent_role_elevation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF NOT public.is_admin() THEN
      NEW.role = OLD.role;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS check_role_elevation ON profiles;
CREATE TRIGGER check_role_elevation
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE prevent_role_elevation();

DROP TRIGGER IF EXISTS set_updated_at_listings ON listings;
CREATE TRIGGER set_updated_at_listings
BEFORE UPDATE ON listings
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_projects ON projects;
CREATE TRIGGER set_updated_at_projects
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 3. is_admin() function (SECURITY DEFINER for safe RLS checks)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  is_admin BOOLEAN;
BEGIN
  SELECT (role = 'admin') INTO is_admin FROM public.profiles WHERE id = auth.uid();
  RETURN COALESCE(is_admin, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 4. RPCs for Atomic Listing Creation

-- Create Real Estate
CREATE OR REPLACE FUNCTION create_real_estate_listing(
  p_title TEXT,
  p_description TEXT,
  p_price NUMERIC,
  p_city TEXT,
  p_district TEXT,
  p_neighborhood TEXT,
  p_category TEXT,
  p_area_m2 NUMERIC,
  p_rooms TEXT,
  p_building_age INTEGER,
  p_floor TEXT,
  p_heating TEXT,
  p_bathrooms INTEGER,
  p_balcony BOOLEAN,
  p_images TEXT[]
) RETURNS UUID AS $$
DECLARE
  new_listing_id UUID;
  img TEXT;
BEGIN
  -- Insert into listings
  INSERT INTO listings (owner_id, listing_type, title, description, price, city, district, neighborhood, status)
  VALUES (auth.uid(), 'real_estate', p_title, p_description, p_price, p_city, p_district, p_neighborhood, 'pending')
  RETURNING id INTO new_listing_id;

  -- Insert into real_estate_details
  INSERT INTO real_estate_details (listing_id, category, area_m2, rooms, building_age, floor, heating, bathrooms, balcony)
  VALUES (new_listing_id, p_category, p_area_m2, p_rooms, p_building_age, p_floor, p_heating, p_bathrooms, p_balcony);

  -- Insert images
  IF p_images IS NOT NULL THEN
    FOREACH img IN ARRAY p_images
    LOOP
      INSERT INTO listing_images (listing_id, storage_path) VALUES (new_listing_id, img);
    END LOOP;
  END IF;

  RETURN new_listing_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create Vehicle
CREATE OR REPLACE FUNCTION create_vehicle_listing(
  p_title TEXT,
  p_description TEXT,
  p_price NUMERIC,
  p_city TEXT,
  p_district TEXT,
  p_category TEXT,
  p_brand TEXT,
  p_model TEXT,
  p_year INTEGER,
  p_mileage INTEGER,
  p_fuel TEXT,
  p_transmission TEXT,
  p_body_type TEXT,
  p_engine_capacity NUMERIC,
  p_engine_power NUMERIC,
  p_images TEXT[]
) RETURNS UUID AS $$
DECLARE
  new_listing_id UUID;
  img TEXT;
BEGIN
  -- Insert into listings
  INSERT INTO listings (owner_id, listing_type, title, description, price, city, district, status)
  VALUES (auth.uid(), 'vehicle', p_title, p_description, p_price, p_city, p_district, 'pending')
  RETURNING id INTO new_listing_id;

  -- Insert into vehicle_details
  INSERT INTO vehicle_details (listing_id, category, brand, model, year, mileage, fuel, transmission, body_type, engine_capacity, engine_power)
  VALUES (new_listing_id, p_category, p_brand, p_model, p_year, p_mileage, p_fuel, p_transmission, p_body_type, p_engine_capacity, p_engine_power);

  -- Insert images
  IF p_images IS NOT NULL THEN
    FOREACH img IN ARRAY p_images
    LOOP
      INSERT INTO listing_images (listing_id, storage_path) VALUES (new_listing_id, img);
    END LOOP;
  END IF;

  RETURN new_listing_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
