import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-interior.jpg';
import restaurantPlants from '@/assets/restaurant-plants.jpg';
import oliveTree from '@/assets/olive-tree.jpg';
import greenWall from '@/assets/green-wall.jpg';
import planters from '@/assets/planters.jpg';
import maintenanceTech from '@/assets/maintenance-tech.jpg';
import treeDetail from '@/assets/tree-detail.jpg';

const services = [
  {
    title: "Office & F&B Plantscaping",
    description: "Greenery that works as hard as your space. Purposeful greenery that improves focus, comfort, and the way people experience space.",
    image: restaurantPlants,
    link: "/services/plantscaping"
  },
  {
    title: "Tree Customization & Enhancement",
    description: "Your vision, brought to life in green. We design custom artificial trees with bespoke sizing, foliage density, and finishes.",
    image: oliveTree,
    link: "/tree-solutions"
  },
  {
    title: "Tree Restoration & Refurbishment",
    description: "Breathe new life into your existing trees. Our specialists revive artificial and natural trees with UV-graded materials.",
    image: treeDetail,
    link: "/tree-solutions"
  },
  {
    title: "Green Wall Installations",
    description: "Design vertical landscapes that inspire. We create artificial, natural, and preserved moss walls with integrated systems.",
    image: greenWall,
    link: "/services/green-walls"
  },
  {
    title: "Custom Planter Design & Fabrication",
    description: "Planters made to match your design vision. Crafted in GRC, acrylic, or stone with elegance and durability.",
    image: planters,
    link: "/services/planters"
  },
  {
    title: "Natural Plant Maintenance",
    description: "Keeping every plant at its best. Routine watering, pruning, and replacement programs ensure vibrant greenery.",
    image: maintenanceTech,
    link: "/services/maintenance"
  }
];

const Services = () => {
  const heroRef = useScrollAnimation<HTMLElement>();
  const servicesRef = useScrollAnimation<HTMLElement>();

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Hero Section */}
        <section ref={heroRef.ref} className="relative min-h-[60vh] bg-night-green overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-night-green via-night-green/95 to-night-green/70 z-10" />
            <img src={heroImage} alt="Interior plantscaping" className="absolute inset-0 w-full h-full object-cover" />
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
                Our Services
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-stone max-w-2xl"
              >
                Comprehensive greenery solutions for every space, from bespoke installations to ongoing maintenance.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={servicesRef.ref} className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={servicesRef.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={service.link}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night-green/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <h3 className="text-night-green mb-3 group-hover:text-slate-moss transition-colors">{service.title}</h3>
                    <p className="text-slate-moss/80 mb-4">{service.description}</p>
                    <span className="inline-flex items-center text-sm uppercase tracking-wider text-night-green font-semibold group-hover:text-slate-moss transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-night-green pattern-overlay">
          <div className="container-luxury relative z-10 text-center">
            <h2 className="text-ivory mb-6">Ready to Transform Your Space?</h2>
            <p className="text-xl text-stone mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can bring your vision to life.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Request a Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
