import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';
import heroImage from '@/assets/hero-interior.jpg';
import hotelAtriumImg from '@/assets/hotel-atrium.jpg';
import restaurantImg from '@/assets/restaurant-plants.jpg';

const slides = [
  {
    image: heroImage,
    title: 'SPACES THAT BREATHE',
    subtitle: 'Where Architecture Meets Nature',
    description: 'We don\'t just add plants—we engineer environments that elevate human experience, productivity, and well-being.',
  },
  {
    image: hotelAtriumImg,
    title: 'BEYOND DECORATION',
    subtitle: 'Strategic Biophilic Design',
    description: 'Every installation is a considered response to space, light, and the people who inhabit it.',
  },
  {
    image: restaurantImg,
    title: 'CRAFTED ATMOSPHERES',
    subtitle: 'From Vision to Reality',
    description: 'Bespoke greenery solutions for hospitality, corporate, and residential environments.',
  },
];

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

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
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-deep-forest">
      {/* Cinematic background with parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY, scale }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-night-green via-night-green/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-transparent to-night-green/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-forest/90" />
        
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(155 28% 10% / 0.4) 100%)'
        }} />
      </motion.div>

      {/* Animated glow accent */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: 'radial-gradient(circle, hsl(72 46% 83% / 0.15), transparent 60%)',
        }}
      />

      {/* Content with stagger animations */}
      <motion.div 
        className="relative z-30 min-h-screen flex items-center"
        style={{ opacity }}
      >
        <div className="container-luxury px-6 md:px-12 lg:px-20 py-32">
          <div className="max-w-4xl">
            {/* Slide indicator line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-20 h-0.5 bg-pear mb-8 origin-left"
            />

            <AnimatePresence mode="wait">
              <motion.div key={currentSlide}>
                {/* Eyebrow text */}
                <motion.p
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-pear text-sm md:text-base uppercase tracking-[0.3em] font-nav mb-4"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Main headline with cinematic reveal */}
                <motion.h1
                  initial={{ opacity: 0, y: 80, filter: 'blur(20px)' }}
                  animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-ivory mb-6 font-heading uppercase tracking-tight leading-[0.9]"
                >
                  <span className="block">{slides[currentSlide].title.split(' ')[0]}</span>
                  <span className="block text-shimmer">{slides[currentSlide].title.split(' ').slice(1).join(' ')}</span>
                </motion.h1>

                {/* Description with fade */}
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl text-stone font-body mb-4 leading-relaxed max-w-2xl"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Static value proposition */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-body text-stone/70 mb-10 leading-relaxed max-w-2xl"
            >
              Trusted by leading hotels, corporate headquarters, and luxury residences across the region.
            </motion.p>

            {/* CTA Buttons with magnetic hover */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                variant="hero" 
                size="lg" 
                onClick={scrollToContact}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10">Start a Project</span>
                <motion.div
                  className="absolute inset-0 bg-pear"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
              <Button 
                variant="heroOutline" 
                size="lg" 
                onClick={scrollToPortfolio}
                className="group"
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                View Our Work
              </Button>
            </motion.div>

            {/* Slide Indicators - redesigned */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
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
                    className="relative h-1 overflow-hidden rounded-full transition-all duration-500"
                    style={{ width: index === currentSlide ? '48px' : '24px' }}
                  >
                    <div className="absolute inset-0 bg-ivory/20" />
                    {index === currentSlide && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 7 }}
                        className="absolute inset-0 bg-pear origin-left"
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

      {/* Scroll indicator - cinematic */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.button
          onClick={scrollToPortfolio}
          className="flex flex-col items-center gap-3 group cursor-pointer"
          whileHover={{ y: 5 }}
        >
          <span className="text-ivory/50 text-xs uppercase tracking-[0.2em] font-nav group-hover:text-pear transition-colors">
            Discover
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-10 rounded-full border border-ivory/30 flex items-center justify-center group-hover:border-pear transition-colors"
          >
            <ArrowDown className="w-4 h-4 text-ivory/50 group-hover:text-pear transition-colors" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Corner decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="absolute top-32 right-12 hidden lg:block"
      >
        <div className="w-px h-24 bg-gradient-to-b from-pear/50 to-transparent" />
      </motion.div>
    </section>
  );
}