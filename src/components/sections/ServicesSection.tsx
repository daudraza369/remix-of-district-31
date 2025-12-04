import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Office & F&B Plantscaping',
    description: 'Greenery that works as hard as your space. Purposeful greenery that improves focus, comfort, and the way people experience space.',
    cta: 'Learn More',
    href: '/services/plantscaping',
  },
  {
    title: 'Tree Customization',
    description: 'Your vision, brought to life in green. We design custom artificial trees with bespoke sizing, foliage density, and finishes that match your project\'s scale and aesthetic.',
    cta: 'Book a Consultation',
    href: '/services/tree-customization',
  },
  {
    title: 'Tree Restoration',
    description: 'Breathe new life into your existing trees. Our specialists revive artificial and natural trees with UV-graded materials, extending beauty and lifespan.',
    cta: 'View More',
    href: '/services/tree-restoration',
  },
  {
    title: 'Green Wall Installations',
    description: 'Design vertical landscapes that inspire. We create artificial, natural, and preserved moss walls, integrating irrigation and lighting for lasting impact.',
    cta: 'Discover',
    href: '/services/green-walls',
  },
  {
    title: 'Custom Planter Design',
    description: 'Planters made to match your design vision. Crafted in GRC, acrylic, or stone, our planters complement interiors and exteriors with elegance and durability.',
    cta: 'See Collection',
    href: '/services/planters',
  },
  {
    title: 'Natural Plant Maintenance',
    description: 'Keeping every plant at its best. Routine watering, pruning, and replacement programs ensure your greenery remains vibrant and flawless.',
    cta: 'Learn More',
    href: '/services/maintenance',
  },
];

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="section-padding bg-ivory">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-night-green">Explore Our Services</h2>
        </motion.div>

        {/* Services Grid - 3 per row on all breakpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group h-full"
            >
              <div className="bg-ivory border border-stone/30 rounded-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                {/* Image Placeholder */}
                <div className="aspect-[4/3] relative overflow-hidden bg-stone/20 flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-night-green/10 flex items-center justify-center">
                        <svg className="w-7 h-7 text-night-green/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-night-green/30 text-xs">[Image Placeholder]</p>
                    </div>
                  </div>
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night-green/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-night-green mb-3 text-lg">{service.title}</h4>
                  <p className="text-slate-moss text-sm leading-relaxed mb-5 flex-grow">
                    {service.description}
                  </p>
                  <Link to={service.href}>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="group/btn w-full sm:w-auto"
                    >
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}