import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SectionDividerProps {
  showScrollHint?: boolean;
  transitionText?: string;
}

export function SectionDivider({ 
  showScrollHint = true,
  transitionText = 'But the research goes deeper'
}: SectionDividerProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={ref}
      className="relative py-12 md:py-16 bg-deep-forest overflow-hidden"
    >
      {/* Static center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-pear/20 to-transparent" />

      {/* Content container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center transform-gpu"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Decorative lines */}
        <div className="relative w-full max-w-md mx-auto mb-6 px-6">
          <div className="flex items-center justify-center gap-4">
            {/* Left line */}
            <motion.div 
              className="h-px flex-1 bg-gradient-to-l from-pear/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ originX: 1 }}
            />
            
            {/* Center diamond - static on mobile, rotating on desktop */}
            <div className="w-2 h-2 border border-pear/50 rotate-45 flex-shrink-0" />
            
            {/* Right line */}
            <motion.div 
              className="h-px flex-1 bg-gradient-to-r from-pear/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ originX: 0 }}
            />
          </div>
        </div>

        {/* Transition text */}
        {transitionText && (
          <p className="text-stone/50 text-xs md:text-sm tracking-widest uppercase font-nav mb-4 text-center px-6">
            {transitionText}
          </p>
        )}

        {/* Scroll hint - simplified */}
        {showScrollHint && (
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block"
          >
            <ChevronDown className="w-4 h-4 text-pear/30" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
