import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed', duration: 2000 },
  { value: 12, suffix: '+', label: 'Years Experience', duration: 1500 },
  { value: 98, suffix: '%', label: 'Client Satisfaction', duration: 1800 },
  { value: 150, suffix: '+', label: 'Corporate Clients', duration: 1600 },
];

function AnimatedCounter({ 
  value, 
  suffix, 
  duration, 
  isVisible 
}: { 
  value: number; 
  suffix: string; 
  duration: number; 
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-night-green">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse, hsl(72 46% 83% / 0.2), transparent 60%)',
          }}
        />
      </div>

      {/* Horizontal lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pear/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pear/30 to-transparent" />

      <div ref={ref} className="container-luxury px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center group"
            >
              <div className="relative inline-block">
                {/* Glow behind number */}
                <div 
                  className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  style={{ background: 'hsl(72 46% 83% / 0.3)' }}
                />
                <div className="text-5xl md:text-6xl lg:text-7xl font-heading text-ivory relative">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    duration={stat.duration}
                    isVisible={isInView}
                  />
                </div>
              </div>
              <p className="text-stone/70 text-sm md:text-base uppercase tracking-widest font-nav mt-3">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}