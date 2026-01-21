-- Create storage bucket for product images
-- Run this in your Supabase SQL Editor

-- Create the images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'images'
    AND auth.role() = 'authenticated'
  );

-- Allow anyone to view images (public bucket)
CREATE POLICY "Anyone can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to update their own images
CREATE POLICY "Authenticated users can update images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'images'
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'images'
    AND auth.role() = 'authenticated'
  );
