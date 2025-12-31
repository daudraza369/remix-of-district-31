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
    title: 'BEYOND DESIGN',
    subtitle: 'Where Interiors Meet Nature',
    description: 'We engineer environments that elevate human experience, productivity, and well-being.',
  },
  {
    image: hotelAtriumImg,
    title: 'CRAFTED AMBIANCE',
    subtitle: 'Where Interiors Meet Nature',
    description: 'Every installation is a considered response to space, light, and the people who inhabit it.',
  },
  {
    image: restaurantImg,
    title: 'LIVING SPACES',
    subtitle: 'Where Interiors Meet Nature',
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
      {/* Cinematic background with parallax - GPU accelerated */}
      <motion.div 
        className="absolute inset-0 transform-gpu"
        style={{ y: backgroundY, scale }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Simplified gradient overlay for better performance */}
        <div className="absolute inset-0 bg-gradient-to-r from-night-green/95 via-night-green/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-night-green/30 via-transparent to-deep-forest/95" />
      </motion.div>

      {/* Animated glow accent - simplified for performance */}
      <div 
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] pointer-events-none opacity-10 hidden md:block"
        style={{
          background: 'radial-gradient(circle, hsl(72 46% 83% / 0.2), transparent 60%)',
        }}
      />

      {/* Content with stagger animations */}
      <motion.div 
        className="relative z-30 min-h-screen flex items-center"
        style={{ opacity }}
      >
        <div className="w-full px-6 md:px-10 lg:px-12 xl:px-16 py-32">
          {/* Align with nav - logo width + gap */}
          <div className="max-w-4xl lg:ml-[104px] xl:ml-[112px]">
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

            {/* Spacer for CTAs */}
            <div className="mb-10" />

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

      {/* Scroll indicator - simplified arrow only */}
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
          >
            <ArrowDown className="w-5 h-5 text-ivory/50 group-hover:text-pear transition-colors" />
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