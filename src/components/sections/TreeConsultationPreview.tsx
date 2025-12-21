import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import oliveTree from '@/assets/olive-tree.jpg';

export function TreeConsultationPreview() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="section-padding bg-gradient-to-r from-night-green to-slate-moss">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-ivory mb-6 uppercase font-heading">TREE SOLUTIONS</h2>
            <p className="text-xl text-stone mb-4">
              Guided Tree Design, Tailored to Your Space
            </p>
            <p className="text-body text-stone/80 leading-relaxed mb-8">
              From idea to installation, we help you choose, customize, and install trees that transform your environment. Our consultation process ensures each project fits seamlessly within your environment, budget, and design intent.
            </p>
            <Link to="/tree-solutions">
              <Button variant="hero" size="lg" className="group">
                Explore Tree Solutions
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-video rounded-sm overflow-hidden shadow-2xl border border-ivory/10">
              <img
                src={oliveTree}
                alt="Custom olive tree installation"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-pear/30 rounded-sm -z-10"
            />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-ivory/20 rounded-sm -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
