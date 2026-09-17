-- Insert buckets if they don't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('listing-images', 'listing-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true) ON CONFLICT (id) DO NOTHING;

-- RLS for Storage (Objects)
-- We must enable RLS on storage.objects if not already enabled (Supabase usually does this by default, but it's safe to assume it is)

-- LISTING IMAGES BUCKET
CREATE POLICY "Public Access" ON storage.objects FOR SELECT 
USING (bucket_id = 'listing-images');

CREATE POLICY "Users can upload their own images" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own images" ON storage.objects FOR DELETE 
USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Admin overrides for listing-images
CREATE POLICY "Admin can manage all listing images" ON storage.objects FOR ALL 
USING (bucket_id = 'listing-images' AND public.is_admin());

-- PROJECT IMAGES BUCKET
CREATE POLICY "Public Access for Projects" ON storage.objects FOR SELECT 
USING (bucket_id = 'project-images');

CREATE POLICY "Admin can manage project images" ON storage.objects FOR ALL 
USING (bucket_id = 'project-images' AND public.is_admin());
