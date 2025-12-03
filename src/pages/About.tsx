import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import hotelAtrium from '@/assets/hotel-atrium.jpg';
import heroImage from '@/assets/hero-interior.jpg';
import maintenanceTech from '@/assets/maintenance-tech.jpg';

const values = [
  {
    title: "Craftsmanship",
    description: "Every installation reflects meticulous attention to detail and premium quality materials."
  },
  {
    title: "Innovation",
    description: "We continuously explore new techniques and materials to push the boundaries of what's possible."
  },
  {
    title: "Sustainability",
    description: "Our solutions are designed for longevity, reducing waste and environmental impact."
  },
  {
    title: "Partnership",
    description: "We work as an extension of your design team, bringing your vision to life with expertise."
  }
];

const About = () => {
  const heroRef = useScrollAnimation<HTMLElement>();
  const storyRef = useScrollAnimation<HTMLElement>();
  const valuesRef = useScrollAnimation<HTMLElement>();
  const teamRef = useScrollAnimation<HTMLElement>();

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Hero Section */}
        <section ref={heroRef.ref} className="relative min-h-[60vh] bg-night-green overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-night-green via-night-green/90 to-night-green/60 z-10" />
            <img src={hotelAtrium} alt="About District Interiors" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 pattern-overlay z-20 opacity-20" />
          
          <div className="relative z-30 min-h-[60vh] flex items-center">
            <div className="container-luxury px-6 md:px-12 lg:px-20 py-32">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-ivory mb-6"
              >
                About District Interiors
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-stone max-w-2xl"
              >
                A design-driven approach to greenery, merging natural aesthetics with architectural precision.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section ref={storyRef.ref} className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={storyRef.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span className="text-sm uppercase tracking-widest text-slate-moss mb-4 block">Our Story</span>
                <h2 className="text-night-green mb-6">Designed to Breathe Life Into Spaces</h2>
                <p className="text-body text-slate-moss mb-6 leading-relaxed">
                  District Interiors was founded with a singular vision: to transform indoor and outdoor environments through expert plantscaping, luxury softscaping, and custom tree fabrication.
                </p>
                <p className="text-body text-slate-moss mb-6 leading-relaxed">
                  We partner with architects, interior designers, and fit-out specialists across the region to deliver greenery solutions that enhance both aesthetic appeal and human wellbeing. Our mission is simple: to merge natural aesthetics with architectural precision to deliver beauty, sustainability, and comfort.
                </p>
                <p className="text-body text-slate-moss leading-relaxed">
                  From concept to installation to ongoing care, we bring decades of combined expertise to every project, ensuring each space we touch is transformed into something extraordinary.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={storyRef.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-sm overflow-hidden">
                  <img src={heroImage} alt="Our story" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pear/30 rounded-sm -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef.ref} className="section-padding bg-blush">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={valuesRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-night-green mb-4">Our Values</h2>
              <p className="text-xl text-slate-moss max-w-2xl mx-auto">
                The principles that guide every project we undertake.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={valuesRef.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-ivory p-8 rounded-sm"
                >
                  <h3 className="text-night-green mb-4 text-xl">{value.title}</h3>
                  <p className="text-slate-moss/80">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef.ref} className="section-padding bg-night-green pattern-overlay">
          <div className="container-luxury relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={teamRef.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="aspect-[4/3] rounded-sm overflow-hidden">
                  <img src={maintenanceTech} alt="Our team" className="w-full h-full object-cover" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={teamRef.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <span className="text-sm uppercase tracking-widest text-stone mb-4 block">Our Team</span>
                <h2 className="text-ivory mb-6">Experts in Green Design</h2>
                <p className="text-stone mb-6">
                  Our team brings together horticultural specialists, designers, craftsmen, and project managers who share a passion for bringing nature into built environments.
                </p>
                <p className="text-stone/80 mb-8">
                  With expertise spanning artificial and natural plantscaping, custom fabrication, and long-term maintenance, we ensure every project receives the attention it deserves.
                </p>
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    Work With Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
