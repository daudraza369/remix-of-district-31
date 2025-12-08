-- Create section_content table for managing media and content per section
CREATE TABLE public.section_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key text NOT NULL UNIQUE,
  section_name text NOT NULL,
  page text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.section_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view published section content"
ON public.section_content
FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins/editors can manage section content"
ON public.section_content
FOR ALL
USING (is_admin_or_editor(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_section_content_updated_at
BEFORE UPDATE ON public.section_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default section data
INSERT INTO public.section_content (section_key, section_name, page, content) VALUES
('hero', 'Hero Section', 'Home', '{"title": "Where Design Takes Root", "subtitle": "Partnering with architects, designers, and fit-out specialists to deliver premium plantscaping and custom greenery for modern interiors.", "description": "District Interiors helps invigorate spaces with thoughtful greenery. From bespoke artificial trees and living plant installations to ongoing maintenance, our work blends craftsmanship with smart design to keep every environment fresh and enduring.", "background_image": "", "accent_image": ""}'::jsonb),
('about_snapshot', 'About Snapshot', 'Home', '{"title": "Designed to Breathe Life Into Spaces", "subtitle": "A design-driven approach to greenery.", "description": "District Interiors specializes in transforming indoor and outdoor environments through expert plantscaping, luxury softscaping, and custom tree fabrication. Our mission is simple: to merge natural aesthetics with architectural precision to deliver beauty, sustainability, and comfort.", "image": ""}'::jsonb),
('services', 'Services Section', 'Home', '{"title": "Explore Our Services", "items": []}'::jsonb),
('portfolio', 'Portfolio Section', 'Home', '{"title": "Spaces Transformed Through Green Design", "subtitle": "A showcase of curated interiors and custom installations.", "items": [{"title": "Modern Corporate Lobby", "description": "Custom planters, preserved wall, and focal tree installation.", "category": "Office", "image": ""}, {"title": "Luxury Hotel Atrium", "description": "Full-scale artificial palm grove with integrated lighting.", "category": "Hospitality", "image": ""}, {"title": "Fine Dining Restaurant", "description": "Living green wall with preserved moss accents.", "category": "F&B", "image": ""}, {"title": "Private Villa Garden", "description": "Custom olive trees and Mediterranean plantscaping.", "category": "Residential", "image": ""}, {"title": "Shopping Mall Entrance", "description": "Statement ficus installation with seasonal rotation.", "category": "Retail", "image": ""}, {"title": "Co-Working Space", "description": "Biophilic design with desk planters and partition walls.", "category": "Office", "image": ""}]}'::jsonb),
('collection_preview', 'Collection Preview', 'Home', '{"title": "Explore Our Collection", "subtitle": "Premium greenery solutions for every environment.", "items": [{"title": "Trees", "description": "Curated artificial and natural trees sized for villas, offices, and commercial spaces.", "image": ""}, {"title": "Flowers", "description": "Floral arrangements and stems that add refined color and softness.", "image": ""}, {"title": "Leaves/Foliage", "description": "Dense, realistic foliage to build volume and texture into your designs.", "image": ""}, {"title": "Green Walls", "description": "Vertical installations that bring nature into every corner.", "image": ""}, {"title": "Trunks and Branches", "description": "Custom trunks and branch structures for unique sculptural statements.", "image": ""}, {"title": "Planters", "description": "GRC, acrylic, and stone planters tailored to your space.", "image": ""}]}'::jsonb),
('maintenance', 'Maintenance Section', 'Home', '{"title": "Keep Your Green Alive", "description": "We offer ongoing maintenance programs to ensure your plants stay vibrant and healthy year-round.", "image": ""}'::jsonb),
('why_choose_us', 'Why Choose Us', 'Home', '{"title": "Why District Interiors?", "items": []}'::jsonb),
('dual_cta', 'Dual CTA Section', 'Home', '{"left_title": "Ready to Transform Your Space?", "left_cta": "Get a Quote", "right_title": "Explore Our Collection", "right_cta": "View Collection", "background_image": ""}'::jsonb);