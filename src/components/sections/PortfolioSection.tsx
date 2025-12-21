import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import corporateLobbyImg from '@/assets/portfolio-corporate-lobby.jpg';
import restaurantImg from '@/assets/portfolio-restaurant.jpg';
import villaImg from '@/assets/portfolio-villa.jpg';
import coworkingImg from '@/assets/portfolio-coworking.jpg';

const projects = [
  {
    title: 'Modern Corporate Lobby',
    description: 'Custom planters, preserved wall, and focal tree installation.',
    category: 'Offices',
    image: corporateLobbyImg,
  },
  {
    title: 'Fine Dining Restaurant',
    description: 'Living green wall with preserved moss accents.',
    category: 'F&B',
    image: restaurantImg,
  },
  {
    title: 'Private Villa Garden',
    description: 'Custom olive trees and Mediterranean plantscaping.',
    category: 'Private Villa',
    image: villaImg,
  },
  {
    title: 'Co-Working Space',
    description: 'Biophilic design with desk planters and partition walls.',
    category: 'Offices',
    image: coworkingImg,
  },
];

export function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="portfolio" ref={ref} className="section-padding bg-gradient-to-b from-ivory to-pear/20">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-night-green mb-4 uppercase font-heading">GLIMPSE INTO OUR WORLD</h2>
          <p className="text-body-large text-slate-moss max-w-2xl mx-auto">
            A showcase of curated interiors and custom installations.
          </p>
        </motion.div>

        {/* Portfolio Grid - consistent card sizes for video covers (9:16 aspect ratio) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                to="/projects"
                className="group block relative rounded-sm overflow-hidden"
              >
                {/* 9:16 aspect ratio for vertical video covers */}
                <div className="aspect-[9/16]">
                  {/* Image */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay - always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night-green/90 via-night-green/30 to-transparent" />

                  {/* Content - positioned at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block px-3 py-1 bg-pear/90 text-night-green text-xs uppercase tracking-wider font-nav rounded-sm mb-3">
                      {project.category}
                    </span>
                    <h4 className="text-ivory mb-2 text-lg font-heading">{project.title}</h4>
                    <p className="text-stone/90 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <span className="text-pear flex items-center gap-2 text-sm font-nav uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Project
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
