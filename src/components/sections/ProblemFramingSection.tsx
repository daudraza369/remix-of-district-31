import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AlertTriangle, TrendingDown, Users, Building2 } from 'lucide-react';

const problems = [
  {
    icon: TrendingDown,
    stat: '67%',
    label: 'report lower productivity',
    description: 'in sterile, plant-free environments',
  },
  {
    icon: Users,
    stat: '23%',
    label: 'higher turnover',
    description: 'in offices lacking natural elements',
  },
  {
    icon: Building2,
    stat: '$2.8M',
    label: 'annual productivity loss',
    description: 'for mid-size companies with poor air quality',
  },
];

export function ProblemFramingSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section 
      ref={sectionRef}
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden bg-deep-forest"
    >
      {/* Parallax background texture */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-night-green via-deep-forest to-night-green" />
      </motion.div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(72 46% 83% / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(72 46% 83% / 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div 
          className="w-full h-full animate-glow-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(72 46% 83% / 0.08), transparent 60%)',
          }}
        />
      </div>

      <div ref={ref} className="container-luxury px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pear/10 border border-pear/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-pear" />
            <span className="text-sm text-pear uppercase tracking-widest font-nav">The Hidden Cost</span>
          </div>
          
          <h2 className="text-ivory mb-6 uppercase font-heading leading-tight">
            <span className="block text-3xl md:text-4xl lg:text-5xl mb-2">Your Space Is</span>
            <span className="text-shimmer text-4xl md:text-5xl lg:text-6xl">Costing You</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-stone/80 leading-relaxed max-w-3xl mx-auto">
            Bland interiors don't just look uninspiring—they actively drain productivity, 
            increase turnover, and diminish your brand's perceived value.
          </p>
        </motion.div>

        {/* Problem stats grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.label}
              initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
              animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative"
            >
              <div className="relative p-8 rounded-sm bg-night-green/50 backdrop-blur-sm border border-ivory/5 hover:border-pear/30 transition-all duration-500">
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm">
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, hsl(72 46% 83% / 0.1), transparent 60%)',
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-pear/10 flex items-center justify-center mb-6 group-hover:bg-pear/20 transition-colors duration-300">
                    <problem.icon className="w-6 h-6 text-pear" />
                  </div>
                  
                  <div className="text-5xl md:text-6xl font-heading text-ivory mb-2">
                    {problem.stat}
                  </div>
                  
                  <p className="text-lg text-pear font-nav uppercase tracking-wide mb-2">
                    {problem.label}
                  </p>
                  
                  <p className="text-stone/70 text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-xl text-stone/60 italic">
            "The absence of nature in a space isn't neutral—it's negative."
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-moss/20 to-transparent pointer-events-none" />
    </section>
  );
}