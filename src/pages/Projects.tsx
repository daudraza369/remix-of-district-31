import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Fallback images for static demo projects
import heroImage from '@/assets/hero-interior.jpg';
import hotelAtrium from '@/assets/hotel-atrium.jpg';
import restaurantPlants from '@/assets/restaurant-plants.jpg';
import greenWall from '@/assets/green-wall.jpg';
import oliveTree from '@/assets/olive-tree.jpg';
import planters from '@/assets/planters.jpg';

const projectCategories = ["All", "Office", "Hospitality", "F&B", "Villa"];

// Static fallback projects (used when DB is empty)
const fallbackProjects = [
  {
    id: 'static-1',
    title: "Corporate HQ Transformation",
    project_type: "Office",
    location: "Riyadh, KSA",
    description: "Complete interior plantscaping with custom planters and green walls",
    hero_image: heroImage,
    video_url: null,
    display_order: 0,
  },
  {
    id: 'static-2',
    title: "Five-Star Hotel Atrium",
    project_type: "Hospitality",
    location: "Jeddah, KSA",
    description: "Grand atrium featuring 8-meter olive trees and cascading greenery",
    hero_image: hotelAtrium,
    video_url: null,
    display_order: 1,
  },
  {
    id: 'static-3',
    title: "Fine Dining Restaurant",
    project_type: "F&B",
    location: "Dubai, UAE",
    description: "Intimate botanical atmosphere with preserved plants and moss features",
    hero_image: restaurantPlants,
    video_url: null,
    display_order: 2,
  },
  {
    id: 'static-4',
    title: "Private Villa Garden",
    project_type: "Villa",
    location: "Al Khobar, KSA",
    description: "Custom olive grove with integrated irrigation system",
    hero_image: oliveTree,
    video_url: null,
    display_order: 3,
  },
  {
    id: 'static-5',
    title: "Tech Campus Renovation",
    project_type: "Office",
    location: "Riyadh, KSA",
    description: "Biophilic design throughout with custom planter solutions",
    hero_image: planters,
    video_url: null,
    display_order: 4,
  },
  {
    id: 'static-6',
    title: "Boutique Hotel Lobby",
    project_type: "Hospitality",
    location: "Riyadh, KSA",
    description: "Sculptural green installations with ambient lighting",
    hero_image: greenWall,
    video_url: null,
    display_order: 5,
  },
];

interface Project {
  id: string;
  title: string;
  project_type: string | null;
  location: string | null;
  description: string | null;
  hero_image: string | null;
  video_url: string | null;
  display_order: number;
}

// Interactive project card with magnetic hover effect
const ProjectCard = ({ 
  project, 
  index, 
  isVisible 
}: { 
  project: Project; 
  index: number; 
  isVisible: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Staggered layout - alternating sizes for visual interest
  const layoutVariants = [
    'col-span-1 row-span-2', // Tall portrait
    'col-span-1 row-span-1', // Square-ish
    'col-span-1 row-span-2', // Tall portrait
    'col-span-1 row-span-1', // Square-ish
    'col-span-1 row-span-1', // Square-ish
    'col-span-1 row-span-2', // Tall portrait
  ];

  const layoutClass = layoutVariants[index % layoutVariants.length];
  const isTall = layoutClass.includes('row-span-2');
  const hasVideo = !!project.video_url;
  const mediaSource = project.video_url || project.hero_image;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: 15 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1]
        }
      } : {}}
      whileHover={{ 
        z: 50,
        transition: { duration: 0.3 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${layoutClass} group cursor-pointer perspective-1000`}
      style={{
        transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className={`relative overflow-hidden rounded-sm h-full ${isTall ? 'min-h-[500px] md:min-h-[600px]' : 'min-h-[280px] md:min-h-[320px]'}`}>
        {/* Media with parallax effect */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              src={project.video_url!}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              poster={project.hero_image || undefined}
            />
          ) : (
            <img
              src={mediaSource || heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>

        {/* Color overlay on hover - transitions from grayscale to vibrant */}
        <motion.div 
          className="absolute inset-0 bg-night-green mix-blend-color"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: isHovered ? 0 : 0.6 }}
          transition={{ duration: 0.5 }}
        />

        {/* Gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-night-green via-night-green/50 to-transparent"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: isHovered ? 0.9 : 0.4 }}
          transition={{ duration: 0.4 }}
        />

        {/* Decorative corner accents */}
        <motion.div 
          className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-pear/60"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
        <motion.div 
          className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pear/60"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />

        {/* Video play indicator */}
        {hasVideo && (
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1 : 0.8, 
              opacity: isHovered ? 1 : 0.7 
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Pulsing ring */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-pear/30"
                animate={{ 
                  scale: isHovered ? [1, 1.5, 1] : 1,
                  opacity: isHovered ? [0.5, 0, 0.5] : 0
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-ivory/20 backdrop-blur-md flex items-center justify-center border border-ivory/30 group-hover:bg-pear/90 group-hover:border-pear transition-all duration-500">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-ivory ml-1 group-hover:text-night-green transition-colors duration-500" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
          {/* Category pill */}
          <motion.span 
            className="inline-block self-start px-3 py-1 bg-pear/90 text-night-green text-xs uppercase tracking-wider font-nav rounded-sm mb-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ 
              x: isHovered ? 0 : -20, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {project.project_type || 'Project'}
          </motion.span>

          {/* Title with slide-up effect */}
          <motion.h3 
            className="text-ivory text-xl md:text-2xl font-heading mb-1"
            initial={{ y: 20 }}
            animate={{ y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4 }}
          >
            {project.title}
          </motion.h3>

          {/* Location */}
          <motion.span 
            className="text-pear/80 text-sm mb-2"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {project.location}
          </motion.span>

          {/* Description - only visible on hover */}
          <motion.p 
            className="text-stone/90 text-sm leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: isHovered ? 0 : 20, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {project.description}
          </motion.p>

          {/* Animated line */}
          <motion.div 
            className="mt-4 h-px bg-gradient-to-r from-pear via-pear/50 to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const heroRef = useScrollAnimation<HTMLElement>();
  const gridRef = useScrollAnimation<HTMLElement>();
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Fetch projects from database
  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, project_type, location, description, hero_image, video_url, display_order')
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching projects:', error);
        setProjects(fallbackProjects);
      } else if (data && data.length > 0) {
        setProjects(data);
      } else {
        // Use fallback projects if no published projects
        setProjects(fallbackProjects);
      }
      setLoading(false);
    }
    
    fetchProjects();
  }, []);
  
  // Smooth scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const headerY = useTransform(smoothProgress, [0, 1], [0, -100]);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.project_type === activeCategory);

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Hero Section with parallax */}
        <section ref={heroRef.ref} className="relative py-32 md:py-40 bg-night-green overflow-hidden">
          <div className="absolute inset-0 pattern-overlay opacity-20" />
          
          {/* Floating decorative elements */}
          <motion.div 
            className="absolute top-20 left-10 w-32 h-32 rounded-full bg-pear/5 blur-3xl"
            animate={{ 
              y: [0, 30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-pear/5 blur-3xl"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="container-luxury relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroRef.isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span 
                className="inline-block text-pear uppercase tracking-[0.3em] text-sm mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Portfolio
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-ivory mb-6"
              >
                Our Projects
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl text-stone max-w-2xl mx-auto"
              >
                Spaces transformed through green design. A showcase of curated interiors and custom installations.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Filter & Grid */}
        <section ref={gridRef.ref} className="section-padding bg-ivory" id="gallery">
          <div ref={containerRef} className="container-luxury">
            {/* Category Filter - pill style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
              {projectCategories.map((category, i) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all duration-500 ${
                    activeCategory === category
                      ? 'bg-night-green text-ivory shadow-lg shadow-night-green/20'
                      : 'bg-transparent text-night-green border border-night-green/20 hover:border-night-green hover:bg-night-green/5'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Loading state */}
            {loading ? (
              <div className="text-center py-20">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-night-green border-t-transparent rounded-full mx-auto"
                />
              </div>
            ) : (
              <>
                {/* Artistic Masonry Grid for portrait videos */}
                <motion.div 
                  layout
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(140px,1fr)]"
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      index={index}
                      isVisible={gridRef.isVisible}
                    />
                  ))}
                </motion.div>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <p className="text-slate-moss text-lg">No projects found in this category.</p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;