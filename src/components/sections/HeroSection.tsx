import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from '@/assets/hero-interior.jpg';
import hotelAtriumImg from '@/assets/hotel-atrium.jpg';
import restaurantImg from '@/assets/restaurant-plants.jpg';

const slides = [
  {
    image: heroImage,
    title: 'WHERE DESIGN TAKES ROOT',
    subtitle: 'Premium plantscaping for modern interiors',
  },
  {
    image: hotelAtriumImg,
    title: 'TRANSFORM YOUR SPACE',
    subtitle: 'Custom greenery solutions for every environment',
  },
  {
    image: restaurantImg,
    title: 'CRAFTED FOR ELEGANCE',
    subtitle: 'Bespoke installations that inspire',
  },
];

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
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
    <section className="relative min-h-screen overflow-hidden bg-night-green">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-night-green via-night-green/95 to-slate-moss/80" />
      
      {/* Slider Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-30 min-h-screen flex items-center">
        <div className="container-luxury px-6 md:px-12 lg:px-20 py-32">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide}>
                <motion.h1
                  initial={{ opacity: 0, y: 60 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-ivory mb-6 font-heading uppercase tracking-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xl md:text-2xl text-stone font-body mb-8 leading-relaxed"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-body text-stone/80 mb-10 leading-relaxed max-w-2xl"
            >
              District Interiors helps invigorate spaces with thoughtful greenery. From bespoke artificial trees and living plant installations to ongoing maintenance, our work blends craftsmanship with smart design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="hero" size="lg" onClick={scrollToPortfolio}>
                Explore Our Work
              </Button>
              <Button variant="heroOutline" size="lg" onClick={scrollToContact}>
                Request a Consultation
              </Button>
            </motion.div>

            {/* Slide Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-3 mt-12"
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide
                      ? 'w-12 bg-pear'
                      : 'w-6 bg-ivory/30 hover:bg-ivory/50'
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-ivory/60 text-xs uppercase tracking-widest font-nav">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-ivory/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
