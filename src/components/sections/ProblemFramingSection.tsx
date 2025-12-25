import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AlertTriangle, Brain, TrendingDown, Flame, CalendarX } from 'lucide-react';

const problems = [
  {
    icon: Brain,
    headline: 'Brainpower is Stifled',
    stat: '61%',
    label: 'Lower Cognitive Scores',
    description: 'Harvard researchers found that employees in sterile, conventional offices scored 61% lower on cognitive function tests compared to those in green, enhanced environments.',
    source: 'Harvard T.H. Chan School of Public Health',
  },
  {
    icon: TrendingDown,
    headline: 'Output is Lost',
    stat: '15%',
    label: 'Productivity Gap',
    description: '"Lean" minimalist offices don\'t help focus—they hurt it. University of Exeter found that simply adding plants to a bare office increases productivity by 15%.',
    source: 'University of Exeter',
  },
  {
    icon: Flame,
    headline: 'Talent Burns Out',
    stat: '37%',
    label: 'Higher Tension Levels',
    description: 'Without natural release points, employee tension and anxiety levels remain 37% higher, fueling burnout and hidden turnover costs.',
    source: 'University of Technology Sydney (UTS)',
  },
  {
    icon: CalendarX,
    headline: 'Sick Leave Spikes',
    stat: '60%',
    label: 'More Sick Days',
    description: 'Poor indoor air quality and lack of greenery are linked to higher illness rates. Offices with plants can reduce sick leave absences by up to 60%.',
    source: 'Green Building Council of Australia',
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
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden bg-deep-forest content-auto"
    >
      {/* Simplified parallax background - GPU accelerated */}
      <motion.div 
        className="absolute inset-0 opacity-30 transform-gpu"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-night-green via-deep-forest to-night-green" />
      </motion.div>

      {/* Simplified grid pattern - hidden on mobile for performance */}
      <div 
        className="absolute inset-0 opacity-5 hidden md:block"
        style={{
          backgroundImage: `linear-gradient(hsl(72 46% 83% / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(72 46% 83% / 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Static glow accent - no animation for performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden md:block">
        <div 
          className="w-full h-full opacity-40"
          style={{
            background: 'radial-gradient(circle, hsl(72 46% 83% / 0.08), transparent 60%)',
          }}
        />
      </div>

      <div ref={ref} className="container-luxury px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pear/10 border border-pear/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-pear" />
            <span className="text-sm text-pear uppercase tracking-widest font-nav">The Hidden Cost</span>
          </div>
          
          <h2 className="text-ivory mb-6 uppercase font-heading leading-tight">
            <span className="block text-3xl md:text-4xl lg:text-5xl mb-2">The Hidden Cost of</span>
            <span className="text-shimmer text-4xl md:text-5xl lg:text-6xl">Sterile Spaces</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-stone/80 leading-relaxed max-w-3xl mx-auto">
            Bland interiors are not neutral. They are actively suppressing your team's performance. 
            Science confirms the difference.
          </p>
        </motion.div>

        {/* Problem stats grid - 2x2 layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative"
            >
              <div className="relative p-6 md:p-8 rounded-sm bg-night-green/50 backdrop-blur-sm border border-ivory/5 hover:border-pear/30 transition-all duration-500 h-full flex flex-col">
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm">
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, hsl(72 46% 83% / 0.1), transparent 60%)',
                    }}
                  />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header row with icon and headline */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-pear/10 flex items-center justify-center group-hover:bg-pear/20 transition-colors duration-300 flex-shrink-0">
                      <problem.icon className="w-6 h-6 text-pear" />
                    </div>
                    <span className="text-sm text-pear uppercase tracking-widest font-nav">
                      {problem.headline}
                    </span>
                  </div>
                  
                  {/* Stat */}
                  <div className="text-5xl md:text-6xl lg:text-7xl font-heading text-ivory mb-2">
                    {problem.stat}
                  </div>
                  
                  {/* Label */}
                  <p className="text-base md:text-lg text-pear font-nav uppercase tracking-wide mb-4">
                    {problem.label}
                  </p>
                  
                  {/* Description */}
                  <p className="text-stone/70 text-sm md:text-base leading-relaxed flex-grow mb-4">
                    {problem.description}
                  </p>
                  
                  {/* Source citation */}
                  <div className="pt-4 border-t border-ivory/10">
                    <p className="text-xs text-stone/50 italic">
                      Source: {problem.source}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-forest to-transparent pointer-events-none" />
    </section>
  );
}