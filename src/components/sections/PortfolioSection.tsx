import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import corporateLobbyImg from '@/assets/portfolio-corporate-lobby.jpg';
import hotelAtriumImg from '@/assets/portfolio-hotel-atrium.jpg';
import restaurantImg from '@/assets/portfolio-restaurant.jpg';
import villaImg from '@/assets/portfolio-villa.jpg';
import mallImg from '@/assets/portfolio-mall.jpg';
import coworkingImg from '@/assets/portfolio-coworking.jpg';

const projects = [
  {
    title: 'Modern Corporate Lobby',
    description: 'Custom planters, preserved wall, and focal tree installation.',
    category: 'Office',
    image: corporateLobbyImg,
  },
  {
    title: 'Luxury Hotel Atrium',
    description: 'Full-scale artificial palm grove with integrated lighting.',
    category: 'Hospitality',
    image: hotelAtriumImg,
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
    category: 'Residential',
    image: villaImg,
  },
  {
    title: 'Shopping Mall Entrance',
    description: 'Statement ficus installation with seasonal rotation.',
    category: 'Retail',
    image: mallImg,
  },
  {
    title: 'Co-Working Space',
    description: 'Biophilic design with desk planters and partition walls.',
    category: 'Office',
    image: coworkingImg,
  },
];

export function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="portfolio" ref={ref} className="section-padding bg-pear/30">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-night-green mb-4">Spaces Transformed Through Green Design</h2>
          <p className="text-body-large text-slate-moss max-w-2xl mx-auto">
            A showcase of curated interiors and custom installations.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="aspect-[4/3]">
                  {/* Image */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night-green via-night-green/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <span className="text-pear text-xs uppercase tracking-wider mb-2">{project.category}</span>
                    <h4 className="text-ivory mb-2">{project.title}</h4>
                    <p className="text-stone/90 text-sm mb-4">{project.description}</p>
                    <span className="text-ivory flex items-center gap-2 text-sm font-semibold">
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
