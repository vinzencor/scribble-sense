-- ============================================
-- SUPABASE RLS POLICY SETUP FOR SCRIBBLESENSE
-- ============================================
-- INSTRUCTIONS:
-- 1. Go to: https://supabase.com/dashboard
-- 2. Select your project: vbjctzcyjdlumcuhpwso
-- 3. Click on "SQL Editor" in the left sidebar
-- 4. Click "New Query"
-- 5. Copy and paste ALL of this SQL
-- 6. Click "Run" or press Ctrl+Enter
-- ============================================

-- First, drop existing policies if any to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated insert" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated update" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated delete" ON gallery_images;
DROP POLICY IF EXISTS "Allow all access" ON gallery_images;

DROP POLICY IF EXISTS "Allow public read access" ON services;
DROP POLICY IF EXISTS "Allow authenticated insert" ON services;
DROP POLICY IF EXISTS "Allow authenticated update" ON services;
DROP POLICY IF EXISTS "Allow authenticated delete" ON services;
DROP POLICY IF EXISTS "Allow all access" ON services;

DROP POLICY IF EXISTS "Allow public read access" ON resources;
DROP POLICY IF EXISTS "Allow authenticated insert" ON resources;
DROP POLICY IF EXISTS "Allow authenticated update" ON resources;
DROP POLICY IF EXISTS "Allow authenticated delete" ON resources;
DROP POLICY IF EXISTS "Allow all access" ON resources;

DROP POLICY IF EXISTS "Allow public read access" ON workbooks;
DROP POLICY IF EXISTS "Allow authenticated insert" ON workbooks;
DROP POLICY IF EXISTS "Allow authenticated update" ON workbooks;
DROP POLICY IF EXISTS "Allow authenticated delete" ON workbooks;
DROP POLICY IF EXISTS "Allow all access" ON workbooks;

-- ============================================
-- OPTION 1: Simple - Allow ALL operations (for testing/development)
-- Use this if you want quick access without authentication
-- ⚠️ WARNING: This is NOT secure for production!
-- ============================================

-- For gallery_images table
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access" ON gallery_images FOR ALL USING (true) WITH CHECK (true);

-- For services table
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access" ON services FOR ALL USING (true) WITH CHECK (true);

-- For resources table
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access" ON resources FOR ALL USING (true) WITH CHECK (true);

-- For workbooks table
ALTER TABLE workbooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access" ON workbooks FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- STORAGE BUCKET POLICIES (IMPORTANT!)
-- ============================================
-- These policies allow file uploads to storage buckets

-- Create buckets if they don't exist (this might error if they already exist - that's OK)
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('gallery', 'gallery', true),
  ('images', 'images', true),
  ('documents', 'documents', true),
  ('workbooks', 'workbooks', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies
DROP POLICY IF EXISTS "Allow all uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow all reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow all deletes" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;

-- Create storage policies that allow anyone to upload/read/delete
CREATE POLICY "Allow all uploads" ON storage.objects 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all reads" ON storage.objects 
FOR SELECT USING (true);

CREATE POLICY "Allow all deletes" ON storage.objects 
FOR DELETE USING (true);

-- ============================================
-- OPTION 2: Secure - Commented out below
-- Uncomment these and comment out Option 1 for production
-- ============================================

/*
-- For gallery_images table
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON gallery_images
FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON gallery_images
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON gallery_images
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON gallery_images
FOR DELETE TO authenticated USING (true);

-- For services table
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON services FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON services FOR DELETE TO authenticated USING (true);

-- For resources table
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON resources FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON resources FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON resources FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON resources FOR DELETE TO authenticated USING (true);

-- For workbooks table
ALTER TABLE workbooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON workbooks FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON workbooks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON workbooks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON workbooks FOR DELETE TO authenticated USING (true);
*/

-- ============================================
-- VERIFY THE POLICIES WERE CREATED
-- ============================================
-- Run this query after to check:
-- SELECT schemaname, tablename, policyname FROM pg_policies 
-- WHERE tablename IN ('gallery_images', 'services', 'resources', 'workbooks');
