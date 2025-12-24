import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Leaf, Palette, Recycle, Award, Building2 } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Dual Expertise',
    description: 'Mastery in both living plants and premium artificial greenery for any environment.',
  },
  {
    icon: Palette,
    title: 'Bespoke Design',
    description: 'Every installation is custom-crafted to reflect your brand and spatial requirements.',
  },
  {
    icon: Recycle,
    title: 'Sustainable Focus',
    description: 'Eco-conscious materials and practices that minimize environmental impact.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest specimens and materials, backed by quality guarantees.',
  },
  {
    icon: Building2,
    title: 'End-to-End Service',
    description: 'From concept to installation to ongoing care—we handle everything.',
  },
];

export function WhyChooseUsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden gradient-section-dark">
      {/* Animated background glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: 'radial-gradient(circle, hsl(72 46% 83% / 0.15), transparent 60%)',
        }}
      />

      <div ref={ref} className="container-luxury px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-ivory mb-6 uppercase font-heading">
            <span className="block text-3xl md:text-4xl lg:text-5xl">Why Leaders</span>
            <span className="block text-shimmer text-4xl md:text-5xl lg:text-6xl">Choose District</span>
          </h2>
          <p className="text-xl text-stone/80 max-w-2xl mx-auto">
            Trusted by industry leaders for our flexibility, precision, and unwavering commitment to excellence.
          </p>
        </motion.div>

        {/* Feature Cards - Horizontal scroll on mobile, grid on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
              animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-sm bg-night-green/40 backdrop-blur-sm border border-ivory/5 hover:border-pear/30 transition-all duration-500">
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, hsl(72 46% 83% / 0.1), transparent 60%)',
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-pear/10 flex items-center justify-center mb-6 group-hover:bg-pear/20 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-pear" />
                  </div>
                  
                  <h4 className="text-ivory mb-3 text-lg font-heading uppercase tracking-wide">
                    {feature.title}
                  </h4>
                  
                  <p className="text-stone/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-night-green to-transparent pointer-events-none" />
    </section>
  );
}