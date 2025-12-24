-- Add video_url column to projects table for video support
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_url text;

-- Create storage bucket for project videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('project-videos', 'project-videos', true, 104857600, ARRAY['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'])
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to project videos
CREATE POLICY "Public can view project videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-videos');

-- Allow admins/editors to upload project videos
CREATE POLICY "Admins can upload project videos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'project-videos' AND is_admin_or_editor(auth.uid()));

-- Allow admins/editors to update project videos
CREATE POLICY "Admins can update project videos"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'project-videos' AND is_admin_or_editor(auth.uid()));

-- Allow admins/editors to delete project videos
CREATE POLICY "Admins can delete project videos"
ON storage.objects
FOR DELETE
USING (bucket_id = 'project-videos' AND is_admin_or_editor(auth.uid()));