import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Leaf, Palette, Recycle, Award, Building2 } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Dual Expertise',
    description: 'Specialists in both natural and artificial greenery.',
  },
  {
    icon: Palette,
    title: 'Customization',
    description: 'Trees, planters, and layouts tailored to every project.',
  },
  {
    icon: Recycle,
    title: 'Sustainability',
    description: 'Eco-focused solutions and long-term maintenance.',
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Realistic greenery and reliable upkeep.',
  },
  {
    icon: Building2,
    title: 'Luxury Reach',
    description: 'Serving villas, hotels, and premium corporate projects.',
  },
];

export function WhyChooseUsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="section-padding bg-ivory">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-night-green mb-4">Why Clients Choose District Interiors</h2>
          <p className="text-body-large text-slate-moss max-w-2xl mx-auto">
            Trusted by leading companies for our flexibility, fast turnaround, and dependable delivery in office environments.
          </p>
        </motion.div>

        {/* Feature Cards - Horizontal scroll on mobile, 5 columns on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:pb-0 scrollbar-hide">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5 }}
              className="group flex-shrink-0 w-[260px] sm:w-[220px] lg:w-auto snap-center bg-ivory p-5 lg:p-6 hover:bg-pear/10 transition-all duration-500"
            >
              <motion.div 
                className="w-14 h-14 rounded-full bg-night-green/10 flex items-center justify-center mb-5 group-hover:bg-pear/40 transition-colors duration-300"
                initial={{ scale: 0.8, rotate: -10 }}
                animate={isVisible ? { scale: 1, rotate: 0 } : {}}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <motion.div
                  animate={isVisible ? { 
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ 
                    delay: index * 0.2,
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <feature.icon className="w-7 h-7 text-night-green" />
                </motion.div>
              </motion.div>
              <h4 className="text-night-green mb-2 text-base lg:text-lg">{feature.title}</h4>
              <p className="text-slate-moss text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}