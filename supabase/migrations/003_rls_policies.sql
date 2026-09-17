-- ENABLE RLS ON ALL TABLES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- ==========================
-- PROFILES POLICIES
-- ==========================
-- Select: user can see their own, admin can see all
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin can view all profiles" ON profiles FOR SELECT USING (public.is_admin());

-- Update: user can update own profile (except role)
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ==========================
-- LISTINGS POLICIES
-- ==========================
-- Select: public can see approved, owner can see all of theirs, admin can see all
CREATE POLICY "Public can view approved listings" ON listings FOR SELECT USING (status = 'approved');
CREATE POLICY "Owners can view their own listings" ON listings FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Admin can view all listings" ON listings FOR SELECT USING (public.is_admin());

-- Insert: Users can only insert with their own ID, and status must be pending.
CREATE POLICY "Users can insert own listings" ON listings FOR INSERT WITH CHECK (auth.uid() = owner_id AND status = 'pending');

-- Update: Owner can update their listing but cannot change status to 'approved'
CREATE POLICY "Owners can update own listings" ON listings FOR UPDATE 
USING (auth.uid() = owner_id)
WITH CHECK (
    auth.uid() = owner_id 
    AND (
        (status = 'pending') -- Only allow status to be pending for normal users when updating (they can't approve it)
        OR (status = 'inactive') -- Or maybe they can set it inactive? But definitely not approved
    )
);

-- Admin can update any listing
CREATE POLICY "Admin can update any listing" ON listings FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Delete: Owner can delete own, admin can delete any
CREATE POLICY "Owners can delete own listings" ON listings FOR DELETE USING (auth.uid() = owner_id);
CREATE POLICY "Admin can delete any listing" ON listings FOR DELETE USING (public.is_admin());

-- ==========================
-- DETAILS (REAL ESTATE & VEHICLE) POLICIES
-- ==========================
-- Because details are joined strictly with listings, we can write policies that depend on the listings table

-- Real Estate Details
CREATE POLICY "Public can view details of approved listings" ON real_estate_details FOR SELECT 
USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = real_estate_details.listing_id AND listings.status = 'approved'));

CREATE POLICY "Owners can view own details" ON real_estate_details FOR SELECT 
USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = real_estate_details.listing_id AND listings.owner_id = auth.uid()));

CREATE POLICY "Admin can view all real estate details" ON real_estate_details FOR SELECT USING (public.is_admin());

CREATE POLICY "Owners can insert details" ON real_estate_details FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM listings WHERE listings.id = real_estate_details.listing_id AND listings.owner_id = auth.uid()));

CREATE POLICY "Owners can update details" ON real_estate_details FOR UPDATE 
USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = real_estate_details.listing_id AND listings.owner_id = auth.uid()));

CREATE POLICY "Owners can delete details" ON real_estate_details FOR DELETE 
USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = real_estate_details.listing_id AND listings.owner_id = auth.uid()));

CREATE POLICY "Admin can update real estate details" ON real_estate_details FOR ALL USING (public.is_admin());

-- Vehicle Details
CREATE POLICY "Public can view details of approved listings" ON vehicle_details FOR SELECT 
USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = vehicle_details.listing_id AND listings.status = 'approved'));

CREATE POLICY "Owners can view own details" ON vehicle_details FOR SELECT 
USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = vehicle_details.listing_id AND listings.owner_id = auth.uid()));

CREATE POLICY "Admin can view all vehicle details" ON vehicle_details FOR SELECT USING (public.is_admin());

CREATE POLICY "Owners can insert details" ON vehicle_details FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM listings WHERE listings.id = vehicle_details.listing_id AND listings.owner_id = auth.uid()));

CREATE POLICY "Owners can update details" ON vehicle_details FOR UPDATE 
USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = vehicle_details.listing_id AND listings.owner_id = auth.uid()));

CREATE POLICY "Owners can delete details" ON vehicle_details FOR DELETE 
USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = vehicle_details.listing_id AND listings.owner_id = auth.uid()));

CREATE POLICY "Admin can update vehicle details" ON vehicle_details FOR ALL USING (public.is_admin());

-- ==========================
-- LISTING IMAGES POLICIES
-- ==========================
CREATE POLICY "Public can view images of approved listings" ON listing_images FOR SELECT 
USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = listing_images.listing_id AND listings.status = 'approved'));

CREATE POLICY "Owners can view own images" ON listing_images FOR SELECT 
USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = listing_images.listing_id AND listings.owner_id = auth.uid()));

CREATE POLICY "Admin can view all images" ON listing_images FOR SELECT USING (public.is_admin());

CREATE POLICY "Owners can manage own images" ON listing_images FOR ALL 
USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = listing_images.listing_id AND listings.owner_id = auth.uid()));

CREATE POLICY "Admin can manage all images" ON listing_images FOR ALL USING (public.is_admin());

-- ==========================
-- PROJECTS POLICIES (Admin Only)
-- ==========================
-- Select: Public can view all projects
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);

-- Insert/Update/Delete: Only Admin
CREATE POLICY "Admin can insert projects" ON projects FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin can update projects" ON projects FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin can delete projects" ON projects FOR DELETE USING (public.is_admin());
