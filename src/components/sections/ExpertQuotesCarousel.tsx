import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const quotes = [
  {
    text: "It is a misconception that a 'clean' desk equals a focused mind. We found that simply enriching a sterile space with plants increased productivity by 15%.",
    author: 'Dr. Chris Knight',
    title: 'University of Exeter',
    type: 'Scientific',
  },
  {
    text: "We have exiled nature from our daily lives, and it is costing us our health and happiness. The absence of nature is not a neutral condition. It is a deprivation.",
    author: 'Stephen R. Kellert',
    title: 'Pioneer of Biophilic Design, Yale Professor',
    type: 'Visionary',
  },
  {
    text: "No one creates their best work in a beige box. If you want your team to thrive, you have to build a habitat, not just an office.",
    author: 'Biophilic Design Principles',
    title: '',
    type: 'Modern Business',
  },
];

export function ExpertQuotesCarousel() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextQuote = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  }, []);

  const prevQuote = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;
    const interval = setInterval(nextQuote, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isVisible, nextQuote]);

  const handleManualNavigation = (action: () => void) => {
    setIsAutoPlaying(false);
    action();
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(10px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(10px)',
    }),
  };

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-deep-forest">
      {/* Remove top gradient - divider handles the transition */}
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse, hsl(72 46% 83% / 0.05), transparent 70%)',
          }}
        />
      </div>

      {/* Decorative quote marks */}
      <div className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <Quote className="w-32 h-32 md:w-48 md:h-48 text-pear" />
      </div>
      <div className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none rotate-180">
        <Quote className="w-32 h-32 md:w-48 md:h-48 text-pear" />
      </div>

      <div ref={ref} className="container-luxury px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section label */}
          <div className="text-center mb-12">
            <span className="text-xs text-pear/60 uppercase tracking-[0.3em] font-nav">
              Expert Insights
            </span>
          </div>

          {/* Carousel container */}
          <div className="relative min-h-[280px] md:min-h-[240px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  filter: { duration: 0.4 },
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                {/* Quote type badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-pear/10 border border-pear/20 text-xs text-pear uppercase tracking-widest font-nav mb-6">
                  {quotes[currentIndex].type}
                </span>

                {/* Quote text */}
                <blockquote className="text-xl md:text-2xl lg:text-3xl text-ivory/90 leading-relaxed font-light italic mb-8 max-w-3xl">
                  "{quotes[currentIndex].text}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-pear font-nav text-sm tracking-wide">
                    {quotes[currentIndex].author}
                  </span>
                  {quotes[currentIndex].title && (
                    <span className="text-stone/50 text-xs">
                      {quotes[currentIndex].title}
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-12">
            {/* Previous button */}
            <button
              onClick={() => handleManualNavigation(prevQuote)}
              className="group p-3 rounded-full border border-ivory/10 hover:border-pear/40 transition-all duration-300 hover:bg-pear/5"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-5 h-5 text-ivory/50 group-hover:text-pear transition-colors" />
            </button>

            {/* Dots indicator */}
            <div className="flex gap-3">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    handleManualNavigation(() => setCurrentIndex(index));
                  }}
                  className="group relative p-1"
                  aria-label={`Go to quote ${index + 1}`}
                >
                  <span
                    className={`block w-2 h-2 rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? 'bg-pear scale-125'
                        : 'bg-ivory/20 group-hover:bg-ivory/40'
                    }`}
                  />
                  {index === currentIndex && (
                    <motion.span
                      layoutId="activeQuoteDot"
                      className="absolute inset-0 rounded-full border border-pear/50"
                      style={{ padding: '2px' }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={() => handleManualNavigation(nextQuote)}
              className="group p-3 rounded-full border border-ivory/10 hover:border-pear/40 transition-all duration-300 hover:bg-pear/5"
              aria-label="Next quote"
            >
              <ChevronRight className="w-5 h-5 text-ivory/50 group-hover:text-pear transition-colors" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-8 max-w-xs mx-auto">
            <div className="h-px bg-ivory/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-pear/40"
                initial={{ width: '0%' }}
                animate={{ width: isAutoPlaying ? '100%' : '0%' }}
                transition={{
                  duration: isAutoPlaying ? 6 : 0,
                  ease: 'linear',
                  repeat: isAutoPlaying ? Infinity : 0,
                }}
                key={`${currentIndex}-${isAutoPlaying}`}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-moss/30 to-transparent pointer-events-none" />
    </section>
  );
}
