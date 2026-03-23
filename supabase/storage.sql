-- Create the storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist (to avoid errors if run multiple times)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Insert" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;

-- Set up access controls for storage.objects
-- Allow anyone to read images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-images');

-- Allow anyone to upload images (Required since app has no Auth)
CREATE POLICY "Public Insert" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'portfolio-images');

-- Allow anyone to update images
CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-images');

-- Allow anyone to delete images
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-images');
