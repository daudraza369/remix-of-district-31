import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  quote: string;
  client_name: string;
  role: string | null;
  company: string | null;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: "District transformed our corporate headquarters into a space that employees genuinely want to come to. The attention to detail and understanding of our brand was remarkable.",
    client_name: "Sarah Al-Rashid",
    role: "Facilities Director",
    company: "Aramco",
  },
  {
    id: '2',
    quote: "From the initial consultation to the final installation, the professionalism was outstanding. Our hotel lobby has become a talking point for every guest.",
    client_name: "Mohammed Al-Faisal",
    role: "General Manager",
    company: "Four Seasons Riyadh",
  },
  {
    id: '3',
    quote: "They didn't just add plants—they created an atmosphere. Our restaurant feels completely transformed, and customers notice the difference.",
    client_name: "Layla Hassan",
    role: "Owner",
    company: "Naya Restaurant",
  },
];

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, quote, client_name, role, company')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        setTestimonials(data);
      }
    }
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      filter: 'blur(10px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0)',
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      filter: 'blur(10px)',
    }),
  };

  return (
    <section ref={ref} className="relative py-28 md:py-36 lg:py-44 overflow-hidden bg-ivory">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-pear/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-pear/10 to-transparent pointer-events-none" />

      <div className="container-luxury px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-night-green mb-4 uppercase font-heading">
            Trusted By Industry Leaders
          </h2>
          <p className="text-body-large text-slate-moss max-w-2xl mx-auto">
            What our clients say about working with District
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Large quote icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -top-8 left-0 md:left-8"
          >
            <Quote className="w-16 h-16 md:w-24 md:h-24 text-pear/30" />
          </motion.div>

          {/* Testimonial content */}
          <div className="relative min-h-[300px] flex items-center justify-center px-8 md:px-16">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl text-night-green font-heading leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-px bg-pear mb-4" />
                  <p className="text-lg font-nav text-night-green">
                    {testimonials[currentIndex].client_name}
                  </p>
                  {(testimonials[currentIndex].role || testimonials[currentIndex].company) && (
                    <p className="text-sm text-slate-moss mt-1">
                      {testimonials[currentIndex].role}
                      {testimonials[currentIndex].role && testimonials[currentIndex].company && ', '}
                      {testimonials[currentIndex].company}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-night-green/20 flex items-center justify-center hover:bg-night-green hover:text-ivory transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 text-night-green group-hover:text-ivory" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-pear'
                      : 'w-2 bg-night-green/20 hover:bg-night-green/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-night-green/20 flex items-center justify-center hover:bg-night-green hover:text-ivory transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 text-night-green group-hover:text-ivory" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}