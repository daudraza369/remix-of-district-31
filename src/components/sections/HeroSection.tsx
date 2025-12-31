import { useEffect, useState, useRef, memo } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';
import heroImage from '@/assets/hero-interior.jpg';
import hotelAtriumImg from '@/assets/hotel-atrium.jpg';
import restaurantImg from '@/assets/restaurant-plants.jpg';

const slides = [
  {
    image: heroImage,
    title: 'BEYOND DESIGN',
    eyebrow: 'Premium Plantscaping for Modern Interiors',
    subtitle: 'From Vision to Reality',
    description: 'We engineer environments that elevate human experience, productivity, and well-being through considered botanical design.',
  },
  {
    image: hotelAtriumImg,
    title: 'CRAFTED ATMOSPHERE',
    eyebrow: 'Bespoke Solutions for Hospitality & Corporate',
    subtitle: 'Strategic Biophilic Design',
    description: 'Every installation is a considered response to space, light, and the people who inhabit it.',
  },
  {
    image: restaurantImg,
    title: 'LIVING SPACES',
    eyebrow: 'Custom Trees, Green Walls & Plantscaping',
    subtitle: 'Where Interiors Meet Nature',
    description: 'Bespoke greenery solutions for hospitality, corporate, and residential environments across the&nbsp;region.',
  },
];

// Optimized animation variants - removed filter:blur for performance
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const headlineVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 }
};

const HeroBackground = memo(({ currentSlide, backgroundY, scale }: { 
  currentSlide: number; 
  backgroundY: any; 
  scale: any;
}) => (
  <motion.div 
    className="absolute inset-0 will-change-transform"
    style={{ y: backgroundY, scale }}
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>
    </AnimatePresence>
    
    {/* Optimized gradient overlays - single div with multiple gradients */}
    <div 
      className="absolute inset-0" 
      style={{
        background: `
          linear-gradient(to right, hsl(155 22% 16% / 0.95) 0%, hsl(155 22% 16% / 0.8) 40%, transparent 100%),
          linear-gradient(to bottom, hsl(155 22% 16% / 0.3) 0%, transparent 50%, hsl(155 28% 10% / 0.95) 100%)
        `
      }}
    />
  </motion.div>
));

HeroBackground.displayName = 'HeroBackground';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 1.1]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const easing = [0.16, 1, 0.3, 1] as const;

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen overflow-hidden bg-deep-forest contain-layout"
    >
      <HeroBackground 
        currentSlide={currentSlide} 
        backgroundY={backgroundY} 
        scale={scale} 
      />

      {/* Static glow accent - no animation */}
      <div 
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] pointer-events-none opacity-10 hidden md:block"
        style={{
          background: 'radial-gradient(circle, hsl(72 46% 83% / 0.2), transparent 60%)',
        }}
      />

      {/* Content */}
      <motion.div 
        className="relative z-30 min-h-screen flex items-center"
        style={{ opacity }}
      >
        <div className="container mx-auto px-6 md:px-10 lg:px-12 py-32">
          <div className="max-w-3xl mx-auto lg:mx-0 lg:ml-[calc(50%-384px)]">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide}>
                {/* Primary eyebrow - service category */}
                <motion.p
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  exit="exit"
                  transition={{ duration: 0.6, ease: easing, delay: 0.05 }}
                  className="text-stone/80 text-xs md:text-sm uppercase tracking-[0.25em] font-body mb-2"
                >
                  {slides[currentSlide].eyebrow}
                </motion.p>

                {/* Secondary eyebrow - brand tagline */}
                <motion.p
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  exit="exit"
                  transition={{ duration: 0.6, ease: easing, delay: 0.1 }}
                  className="text-pear text-sm md:text-base uppercase tracking-[0.3em] font-nav mb-4"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Main headline - optimized shimmer */}
                <motion.h1
                  variants={headlineVariants}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  exit="exit"
                  transition={{ duration: 0.6, ease: easing, delay: 0.2 }}
                  className="text-ivory mb-6 font-heading uppercase tracking-tight leading-[0.9]"
                >
                  <span className="block">{slides[currentSlide].title.split(' ')[0]}</span>
                  <span className="block text-shimmer-optimized">{slides[currentSlide].title.split(' ').slice(1).join(' ')}</span>
                </motion.h1>

                {/* Description - using dangerouslySetInnerHTML for &nbsp; support */}
                <motion.p
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  exit="exit"
                  transition={{ duration: 0.6, ease: easing, delay: 0.3 }}
                  className="text-xl md:text-2xl text-stone font-body mb-4 leading-relaxed max-w-2xl"
                  dangerouslySetInnerHTML={{ __html: slides[currentSlide].description }}
                />
              </motion.div>
            </AnimatePresence>

            <div className="mb-10" />

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easing, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                variant="hero" 
                size="lg" 
                onClick={scrollToContact}
                className="group"
              >
                Start a Project
              </Button>
              <Button 
                variant="heroOutline" 
                size="lg" 
                onClick={scrollToPortfolio}
                className="group"
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                View Our Work
              </Button>
            </motion.div>

            {/* Slide Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-4 mt-16"
            >
              <span className="text-xs text-stone/50 uppercase tracking-widest font-nav">
                {String(currentSlide + 1).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="relative h-1 overflow-hidden rounded-full transition-all duration-300"
                    style={{ width: index === currentSlide ? '48px' : '24px' }}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <div className="absolute inset-0 bg-ivory/20" />
                    {index === currentSlide && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 7, ease: "linear" }}
                        className="absolute inset-0 bg-pear origin-left will-change-transform"
                      />
                    )}
                  </button>
                ))}
              </div>
              <span className="text-xs text-stone/50 uppercase tracking-widest font-nav">
                {String(slides.length).padStart(2, '0')}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
      >
        <button
          onClick={scrollToPortfolio}
          className="flex flex-col items-center gap-3 group cursor-pointer"
          aria-label="Scroll to portfolio"
        >
          <span className="text-ivory/50 text-xs uppercase tracking-[0.2em] font-nav group-hover:text-pear transition-colors duration-200">
            Discover
          </span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-ivory/50 group-hover:text-pear transition-colors duration-200" />
          </motion.div>
        </button>
      </motion.div>

      {/* Corner decorative element */}
      <div className="absolute top-32 right-12 hidden lg:block opacity-50">
        <div className="w-px h-24 bg-gradient-to-b from-pear/50 to-transparent" />
      </div>
    </section>
  );
}