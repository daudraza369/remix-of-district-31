import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
import heroImage from '@/assets/hero-interior.jpg';
import hotelAtrium from '@/assets/hotel-atrium.jpg';
import restaurantPlants from '@/assets/restaurant-plants.jpg';
import greenWall from '@/assets/green-wall.jpg';
import oliveTree from '@/assets/olive-tree.jpg';
import planters from '@/assets/planters.jpg';

const projectCategories = ["All", "Office", "Hospitality", "F&B", "Retail", "Villa"];

const projects = [
  {
    id: 1,
    title: "Corporate HQ Transformation",
    category: "Office",
    location: "Riyadh, KSA",
    description: "Complete interior plantscaping with custom planters and green walls",
    image: heroImage
  },
  {
    id: 2,
    title: "Five-Star Hotel Atrium",
    category: "Hospitality",
    location: "Jeddah, KSA",
    description: "Grand atrium featuring 8-meter olive trees and cascading greenery",
    image: hotelAtrium
  },
  {
    id: 3,
    title: "Fine Dining Restaurant",
    category: "F&B",
    location: "Dubai, UAE",
    description: "Intimate botanical atmosphere with preserved plants and moss features",
    image: restaurantPlants
  },
  {
    id: 4,
    title: "Luxury Mall Installation",
    category: "Retail",
    location: "Riyadh, KSA",
    description: "Multi-level green wall and sculptural tree installations",
    image: greenWall
  },
  {
    id: 5,
    title: "Private Villa Garden",
    category: "Villa",
    location: "Al Khobar, KSA",
    description: "Custom olive grove with integrated irrigation system",
    image: oliveTree
  },
  {
    id: 6,
    title: "Tech Campus Renovation",
    category: "Office",
    location: "Riyadh, KSA",
    description: "Biophilic design throughout with custom planter solutions",
    image: planters
  },
];

const Projects = () => {
  const heroRef = useScrollAnimation<HTMLElement>();
  const gridRef = useScrollAnimation<HTMLElement>();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Hero Section */}
        <section ref={heroRef.ref} className="relative py-32 bg-night-green overflow-hidden">
          <div className="absolute inset-0 pattern-overlay opacity-20" />
          <div className="container-luxury relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-ivory mb-6"
            >
              Our Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-stone max-w-2xl mx-auto"
            >
              Spaces transformed through green design. A showcase of curated interiors and custom installations.
            </motion.p>
          </div>
        </section>

        {/* Filter & Grid */}
        <section ref={gridRef.ref} className="section-padding bg-ivory">
          <div className="container-luxury">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {projectCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-sm text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-night-green text-ivory'
                      : 'bg-transparent text-night-green border border-night-green/30 hover:border-night-green'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Projects Grid - Masonry-like */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={gridRef.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group cursor-pointer ${index % 3 === 0 ? 'md:row-span-2' : ''}`}
                >
                  <div className={`relative overflow-hidden rounded-sm ${index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-green via-night-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-xs uppercase tracking-wider text-pear mb-2">{project.category} · {project.location}</span>
                      <h3 className="text-ivory text-xl mb-2">{project.title}</h3>
                      <p className="text-stone/90 text-sm">{project.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
