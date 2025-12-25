import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SectionDividerProps {
  variant?: 'default' | 'minimal';
  showScrollHint?: boolean;
  transitionText?: string;
}

export function SectionDivider({ 
  variant = 'default', 
  showScrollHint = true,
  transitionText = 'But the research goes deeper'
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div 
      ref={ref}
      className="relative py-16 md:py-24 bg-deep-forest overflow-hidden"
    >
      {/* Animated center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
        <motion.div 
          className="w-full bg-gradient-to-b from-transparent via-pear/30 to-transparent"
          style={{ 
            height: '100%',
            opacity 
          }}
        />
      </div>

      {/* Content container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ y, opacity }}
      >
        {/* Decorative lines expanding from center */}
        <div className="relative w-full max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-4">
            {/* Left line */}
            <motion.div 
              className="h-px bg-gradient-to-l from-pear/40 to-transparent"
              style={{ width: lineWidth }}
            />
            
            {/* Center diamond */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 border border-pear/50 rotate-45 flex-shrink-0"
            />
            
            {/* Right line */}
            <motion.div 
              className="h-px bg-gradient-to-r from-pear/40 to-transparent"
              style={{ width: lineWidth }}
            />
          </div>
        </div>

        {/* Transition text */}
        {transitionText && (
          <motion.p 
            className="text-stone/50 text-sm md:text-base tracking-widest uppercase font-nav mb-6 text-center px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {transitionText}
          </motion.p>
        )}

        {/* Animated scroll hint */}
        {showScrollHint && (
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-pear/40" />
            </motion.div>
          </motion.div>
        )}

        {/* Decorative dots */}
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-3 mt-12">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-pear/30"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(72 46% 83% / 0.03), transparent 70%)',
        }}
      />
    </div>
  );
}
