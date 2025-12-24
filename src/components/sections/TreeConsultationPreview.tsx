import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import oliveTree from '@/assets/olive-tree.jpg';

export function TreeConsultationPreview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const decorY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <section 
      ref={sectionRef}
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-night-green via-slate-moss/80 to-night-green" />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(60 30% 98%) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(60 30% 98%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div ref={ref} className="container-luxury px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
            animate={isVisible ? { opacity: 1, x: 0, filter: 'blur(0)' } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pear/10 border border-pear/20 mb-6">
              <span className="text-sm text-pear uppercase tracking-widest font-nav">Featured Service</span>
            </div>

            <h2 className="text-ivory mb-6 uppercase font-heading">
              <span className="block text-3xl md:text-4xl lg:text-5xl">Custom Tree</span>
              <span className="block text-shimmer text-4xl md:text-5xl lg:text-6xl">Solutions</span>
            </h2>
            
            <p className="text-xl text-stone/90 mb-4">
              From concept to creation—trees tailored to your exact specifications.
            </p>
            
            <p className="text-body text-stone/70 leading-relaxed mb-8">
              Whether you need a statement olive tree for your lobby, preserved botanicals for a restaurant, 
              or a complete green wall installation, our team guides you through every decision. 
              We match species, scale, and aesthetic to your space perfectly.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/tree-solutions">
                <Button variant="hero" size="lg" className="group">
                  Explore Tree Solutions
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/collection">
                <Button variant="heroOutline" size="lg">
                  View Collection
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Visual with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
            animate={isVisible ? { opacity: 1, x: 0, filter: 'blur(0)' } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main image with parallax */}
            <motion.div 
              className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-cinematic-lg"
              style={{ y: imageY }}
            >
              <img
                src={oliveTree}
                alt="Custom olive tree installation"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-night-green/40 via-transparent to-transparent" />
            </motion.div>

            {/* Decorative elements with parallax */}
            <motion.div
              style={{ y: decorY }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-pear/20 rounded-sm -z-10"
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-40 h-40 border-2 border-ivory/10 rounded-sm -z-10"
            />

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 md:bottom-8 md:-left-8 bg-ivory p-6 rounded-sm shadow-cinematic"
            >
              <div className="text-4xl font-heading text-night-green mb-1">50+</div>
              <p className="text-sm text-slate-moss">Tree species available</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}