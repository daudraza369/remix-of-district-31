import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AlertTriangle, Brain, TrendingDown, Users } from 'lucide-react';

const problems = [
  {
    icon: Brain,
    stat: '61%',
    label: 'Lower Cognitive Scores',
    description: 'Harvard researchers found that employees in conventional offices scored 61% lower on cognitive tests than those in green, enhanced environments.',
    source: 'Harvard T.H. Chan School of Public Health',
    category: 'Brainpower is Stifled',
  },
  {
    icon: TrendingDown,
    stat: '15%',
    label: 'Productivity Gap',
    description: '"Lean" minimalist offices do not help focus. Adding plants alone has been proven to boost productivity by 15%.',
    source: 'University of Exeter',
    category: 'Output is Lost',
  },
  {
    icon: Users,
    stat: '15%',
    label: 'Lower Well-being',
    description: 'Employees in spaces without natural elements report 15% lower well-being and higher anxiety levels, driving hidden turnover costs.',
    source: 'Human Spaces Global Report',
    category: 'Talent Burns Out',
  },
];

const quotes = [
  {
    text: "It is a misconception that a 'clean' desk equals a focused mind. We found that simply enriching a sterile space with plants increased productivity by 15%.",
    author: 'Dr. Chris Knight',
    title: 'University of Exeter',
  },
  {
    text: "We have exiled nature from our daily lives, and it is costing us our health and happiness. The absence of nature is not a neutral condition. It is a deprivation.",
    author: 'Stephen R. Kellert',
    title: 'Pioneer of Biophilic Design, Yale Professor',
  },
  {
    text: "No one creates their best work in a beige box. If you want your team to thrive, you have to build a habitat, not just an office.",
    author: 'Biophilic Design Principles',
    title: '',
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
            <span className="block text-3xl md:text-4xl lg:text-5xl mb-2">The Hidden Cost of</span>
            <span className="text-shimmer text-4xl md:text-5xl lg:text-6xl">Sterile Spaces</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-stone/80 leading-relaxed max-w-3xl mx-auto">
            Bland interiors are not neutral. They are actively suppressing your team's performance. 
            Science confirms the difference.
          </p>
        </motion.div>

        {/* Problem stats grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              <div className="relative p-8 rounded-sm bg-night-green/50 backdrop-blur-sm border border-ivory/5 hover:border-pear/30 transition-all duration-500 h-full flex flex-col">
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
                  {/* Category badge */}
                  <span className="text-xs text-pear/70 uppercase tracking-widest font-nav mb-4">
                    {problem.category}
                  </span>
                  
                  <div className="w-12 h-12 rounded-full bg-pear/10 flex items-center justify-center mb-6 group-hover:bg-pear/20 transition-colors duration-300">
                    <problem.icon className="w-6 h-6 text-pear" />
                  </div>
                  
                  <div className="text-5xl md:text-6xl font-heading text-ivory mb-2">
                    {problem.stat}
                  </div>
                  
                  <p className="text-lg text-pear font-nav uppercase tracking-wide mb-3">
                    {problem.label}
                  </p>
                  
                  <p className="text-stone/70 text-sm leading-relaxed flex-grow mb-4">
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

        {/* Quotes section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <div className="space-y-12">
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="relative"
              >
                <div className="relative pl-6 border-l-2 border-pear/30">
                  <p className="text-lg md:text-xl text-stone/80 italic leading-relaxed mb-3">
                    "{quote.text}"
                  </p>
                  <p className="text-sm text-pear font-nav">
                    {quote.author}
                    {quote.title && (
                      <span className="text-stone/50 font-sans ml-2">
                        {quote.title}
                      </span>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-moss/20 to-transparent pointer-events-none" />
    </section>
  );
}