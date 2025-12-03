import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DualCTASection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="grid md:grid-cols-2 md:h-[450px]">
        {/* Left Panel - Interior Plantscaping */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative group h-full"
        >
          <div className="bg-lavender section-padding h-full flex flex-col justify-center items-center text-center transition-colors duration-500 group-hover:bg-lavender/90">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-night-green/20 to-transparent" />
            </div>

            <div className="relative z-10 max-w-md">
              <h3 className="text-night-green mb-3">Interior Plantscaping</h3>
              <p className="text-slate-moss mb-8">For offices, hotels, and restaurants</p>
              <Link to="/services/plantscaping">
                <Button variant="default" className="group/btn">
                  Explore Plantscaping
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Tree Customization */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group h-full"
        >
          <div className="bg-mauve section-padding h-full flex flex-col justify-center items-center text-center transition-colors duration-500 group-hover:bg-mauve/90">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-bl from-night-green/20 to-transparent" />
            </div>

            <div className="relative z-10 max-w-md">
              <h3 className="text-night-green mb-3">Tree Customization & Restoration</h3>
              <p className="text-slate-moss mb-8">For villas, malls, and public spaces</p>
              <Link to="/tree-solutions">
                <Button variant="default" className="group/btn">
                  View Tree Solutions
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
