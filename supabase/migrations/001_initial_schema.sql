-- Create enums if they don't exist
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE listing_type_enum AS ENUM ('real_estate', 'vehicle');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE listing_status_enum AS ENUM ('pending', 'approved', 'rejected', 'inactive');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    role user_role DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. LISTINGS
CREATE TABLE IF NOT EXISTS listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    listing_type listing_type_enum NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    city TEXT,
    district TEXT,
    neighborhood TEXT,
    status listing_status_enum NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. REAL ESTATE DETAILS
CREATE TABLE IF NOT EXISTS real_estate_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID UNIQUE NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    category TEXT,
    area_m2 NUMERIC,
    rooms TEXT,
    building_age INTEGER,
    floor TEXT,
    heating TEXT,
    bathrooms INTEGER,
    balcony BOOLEAN
);

-- 4. VEHICLE DETAILS
CREATE TABLE IF NOT EXISTS vehicle_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID UNIQUE NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    category TEXT,
    brand TEXT,
    model TEXT,
    year INTEGER,
    mileage INTEGER,
    fuel TEXT,
    transmission TEXT,
    body_type TEXT,
    engine_capacity NUMERIC,
    engine_power NUMERIC
);

-- 5. LISTING IMAGES
CREATE TABLE IF NOT EXISTS listing_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_cover BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PROJECTS (Construction)
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    location TEXT,
    image TEXT, -- cover image
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Note: We skipped project_images table to keep construction section perfectly matching the existing UI's simple single-image project mock data as per user instructions.

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_listings_owner_id ON listings(owner_id);
CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(listing_type);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price);

CREATE INDEX IF NOT EXISTS idx_real_estate_category ON real_estate_details(category);
CREATE INDEX IF NOT EXISTS idx_vehicle_brand ON vehicle_details(brand);
CREATE INDEX IF NOT EXISTS idx_vehicle_model ON vehicle_details(model);
CREATE INDEX IF NOT EXISTS idx_vehicle_year ON vehicle_details(year);
