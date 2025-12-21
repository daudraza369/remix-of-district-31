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
    <section ref={ref} className="section-padding bg-slate-moss">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-ivory mb-4 uppercase font-heading">WHY CLIENTS CHOOSE DISTRICT</h2>
          <p className="text-body-large text-stone max-w-2xl mx-auto">
            Trusted by leading companies for our flexibility, fast turnaround, and dependable delivery in office environments.
          </p>
        </motion.div>

        {/* Feature Cards - Centered icons, color block style */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
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
              whileHover={{ y: -8, scale: 1.02 }}
              className="group flex-shrink-0 w-[200px] bg-night-green/30 backdrop-blur-sm p-6 rounded-sm hover:bg-pear/20 transition-all duration-500 text-center"
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-pear/20 flex items-center justify-center mb-5 mx-auto group-hover:bg-pear/40 transition-colors duration-300"
                initial={{ scale: 0.8, rotate: -10 }}
                animate={isVisible ? { scale: 1, rotate: 0 } : {}}
                whileHover={{ scale: 1.15, rotate: 5 }}
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
                  <feature.icon className="w-8 h-8 text-pear group-hover:text-ivory transition-colors duration-300" />
                </motion.div>
              </motion.div>
              <h4 className="text-ivory mb-2 text-base font-heading uppercase tracking-wide">{feature.title}</h4>
              <p className="text-stone/80 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
