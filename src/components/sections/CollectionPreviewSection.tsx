import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, TreeDeciduous, Flower2, Leaf, Grid3X3, Waves, Box } from 'lucide-react';
import { Link } from 'react-router-dom';

const collections = [
  {
    title: 'Trees',
    description: 'Curated artificial and natural trees sized for villas, offices, and commercial spaces.',
    icon: TreeDeciduous,
    color: 'pear',
  },
  {
    title: 'Flowers',
    description: 'Floral arrangements and stems that add refined color and softness.',
    icon: Flower2,
    color: 'lavender',
  },
  {
    title: 'Leaves/Foliage',
    description: 'Dense, realistic foliage to build volume and texture into your designs.',
    icon: Leaf,
    color: 'pear',
  },
  {
    title: 'Green Walls',
    description: 'Vertical installations that bring nature into every corner.',
    icon: Grid3X3,
    color: 'mauve',
  },
  {
    title: 'Trunks & Branches',
    description: 'Custom trunks and branch structures for unique sculptural statements.',
    icon: Waves,
    color: 'blush',
  },
  {
    title: 'Planters',
    description: 'GRC, acrylic, and stone planters tailored to your space.',
    icon: Box,
    color: 'lavender',
  },
];

export function CollectionPreviewSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="section-padding bg-night-green">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-ivory mb-4 uppercase font-heading">OUR COLLECTION</h2>
          <p className="text-body-large text-stone max-w-2xl mx-auto">
            Premium greenery solutions for every environment.
          </p>
        </motion.div>

        {/* Collection Grid - Interactive Icon Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full"
            >
              <Link
                to="/collection"
                className="group block relative bg-slate-moss/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-ivory/10 hover:border-ivory/30 transition-all duration-500 h-full"
              >
                {/* Decorative curved corners */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-ivory/20 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-ivory/20 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-ivory/20 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-ivory/20 rounded-br-2xl" />

                <div className="p-8 flex flex-col items-center text-center h-full">
                  {/* Icon Container with animation */}
                  <motion.div
                    className={`w-20 h-20 rounded-full bg-${item.color}/20 flex items-center justify-center mb-6 group-hover:bg-${item.color}/40 transition-all duration-500`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.2 }}
                      className="relative"
                    >
                      <item.icon className={`w-10 h-10 text-${item.color} group-hover:text-ivory transition-colors duration-300`} />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <h4 className="text-ivory mb-3 text-xl font-heading uppercase tracking-wide group-hover:text-pear transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-stone/80 text-sm leading-relaxed flex-grow mb-4">
                    {item.description}
                  </p>

                  {/* Hover CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-pear text-sm font-nav uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    View Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </div>

                {/* Background glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-${item.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
