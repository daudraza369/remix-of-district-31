CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'editor'
);


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
  );
  RETURN NEW;
END;
$$;


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;


--
-- Name: is_admin_or_editor(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_admin_or_editor(_user_id uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'editor')
  )
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: client_logos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_logos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_name text NOT NULL,
    logo_url text NOT NULL,
    website_url text,
    is_published boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: collection_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collection_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    category text NOT NULL,
    short_description text,
    dimensions text,
    materials text,
    price text,
    images jsonb DEFAULT '[]'::jsonb,
    application text,
    is_published boolean DEFAULT false,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: media_assets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_assets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    file_name text NOT NULL,
    file_path text NOT NULL,
    file_type text NOT NULL,
    file_size integer,
    alt_text text,
    uploaded_by uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    email text NOT NULL,
    full_name text,
    avatar_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    location text,
    client_name text,
    project_type text,
    description text,
    hero_image text,
    gallery jsonb DEFAULT '[]'::jsonb,
    services_used text[],
    highlights text[],
    is_published boolean DEFAULT false,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    video_url text
);


--
-- Name: section_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.section_content (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    section_key text NOT NULL,
    section_name text NOT NULL,
    page text NOT NULL,
    content jsonb DEFAULT '{}'::jsonb NOT NULL,
    is_published boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.services (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    short_description text,
    long_description text,
    hero_image text,
    icon text,
    key_benefits jsonb DEFAULT '[]'::jsonb,
    process_steps jsonb DEFAULT '[]'::jsonb,
    is_published boolean DEFAULT false,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: stats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stats (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label text NOT NULL,
    value text NOT NULL,
    unit text,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.testimonials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_name text NOT NULL,
    role text,
    company text,
    quote text NOT NULL,
    client_logo text,
    is_published boolean DEFAULT false,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: client_logos client_logos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_logos
    ADD CONSTRAINT client_logos_pkey PRIMARY KEY (id);


--
-- Name: collection_items collection_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_items
    ADD CONSTRAINT collection_items_pkey PRIMARY KEY (id);


--
-- Name: collection_items collection_items_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_items
    ADD CONSTRAINT collection_items_slug_key UNIQUE (slug);


--
-- Name: media_assets media_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_assets
    ADD CONSTRAINT media_assets_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: projects projects_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_slug_key UNIQUE (slug);


--
-- Name: section_content section_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.section_content
    ADD CONSTRAINT section_content_pkey PRIMARY KEY (id);


--
-- Name: section_content section_content_section_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.section_content
    ADD CONSTRAINT section_content_section_key_key UNIQUE (section_key);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: services services_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_slug_key UNIQUE (slug);


--
-- Name: stats stats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stats
    ADD CONSTRAINT stats_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: collection_items update_collection_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_collection_updated_at BEFORE UPDATE ON public.collection_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: client_logos update_logos_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_logos_updated_at BEFORE UPDATE ON public.client_logos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: projects update_projects_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: section_content update_section_content_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_section_content_updated_at BEFORE UPDATE ON public.section_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: services update_services_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: testimonials update_testimonials_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: media_assets media_assets_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_assets
    ADD CONSTRAINT media_assets_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES auth.users(id);


--
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles Admins can delete roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can insert roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: profiles Admins can view all profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can view all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: collection_items Admins/editors can manage collection; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins/editors can manage collection" ON public.collection_items USING (public.is_admin_or_editor(auth.uid()));


--
-- Name: client_logos Admins/editors can manage logos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins/editors can manage logos" ON public.client_logos USING (public.is_admin_or_editor(auth.uid()));


--
-- Name: media_assets Admins/editors can manage media; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins/editors can manage media" ON public.media_assets USING (public.is_admin_or_editor(auth.uid()));


--
-- Name: projects Admins/editors can manage projects; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins/editors can manage projects" ON public.projects USING (public.is_admin_or_editor(auth.uid()));


--
-- Name: section_content Admins/editors can manage section content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins/editors can manage section content" ON public.section_content USING (public.is_admin_or_editor(auth.uid()));


--
-- Name: services Admins/editors can manage services; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins/editors can manage services" ON public.services USING (public.is_admin_or_editor(auth.uid()));


--
-- Name: stats Admins/editors can manage stats; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins/editors can manage stats" ON public.stats USING (public.is_admin_or_editor(auth.uid()));


--
-- Name: testimonials Admins/editors can manage testimonials; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins/editors can manage testimonials" ON public.testimonials USING (public.is_admin_or_editor(auth.uid()));


--
-- Name: media_assets Public can view media; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view media" ON public.media_assets FOR SELECT USING (true);


--
-- Name: collection_items Public can view published collection; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view published collection" ON public.collection_items FOR SELECT USING ((is_published = true));


--
-- Name: client_logos Public can view published logos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view published logos" ON public.client_logos FOR SELECT USING ((is_published = true));


--
-- Name: projects Public can view published projects; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING ((is_published = true));


--
-- Name: section_content Public can view published section content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view published section content" ON public.section_content FOR SELECT USING ((is_published = true));


--
-- Name: services Public can view published services; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING ((is_published = true));


--
-- Name: testimonials Public can view published testimonials; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING ((is_published = true));


--
-- Name: stats Public can view stats; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view stats" ON public.stats FOR SELECT USING (true);


--
-- Name: profiles Users can update own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can view own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: client_logos; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;

--
-- Name: collection_items; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;

--
-- Name: media_assets; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: projects; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

--
-- Name: section_content; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.section_content ENABLE ROW LEVEL SECURITY;

--
-- Name: services; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

--
-- Name: stats; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;

--
-- Name: testimonials; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;