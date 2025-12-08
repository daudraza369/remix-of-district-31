import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import oliveTreeImg from '@/assets/collection-olive-tree.jpg';
import ficusTreeImg from '@/assets/collection-ficus-tree.jpg';
import palmTreeImg from '@/assets/collection-palm-tree.jpg';
import flowersImg from '@/assets/flowers-collection.jpg';
import greenWallImg from '@/assets/green-wall.jpg';
import plantersImg from '@/assets/planters.jpg';
const collections = [{
  title: 'Trees',
  description: 'Curated artificial and natural trees sized for villas, offices, and commercial spaces.',
  image: oliveTreeImg
}, {
  title: 'Flowers',
  description: 'Floral arrangements and stems that add refined color and softness.',
  image: flowersImg
}, {
  title: 'Leaves/Foliage',
  description: 'Dense, realistic foliage to build volume and texture into your designs.',
  image: ficusTreeImg
}, {
  title: 'Green Walls',
  description: 'Vertical installations that bring nature into every corner.',
  image: greenWallImg
}, {
  title: 'Trunks and Branches',
  description: 'Custom trunks and branch structures for unique sculptural statements.',
  image: palmTreeImg
}, {
  title: 'Planters',
  description: 'GRC, acrylic, and stone planters tailored to your space.',
  image: plantersImg
}];
export function CollectionPreviewSection() {
  const {
    ref,
    isVisible
  } = useScrollAnimation<HTMLElement>();
  return <section ref={ref} className="section-padding bg-pear">
      <div className="container-luxury">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={isVisible ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }} className="text-center mb-16">
          <h2 className="text-night-green mb-4">Explore Our Collection</h2>
          <p className="text-body-large text-slate-moss max-w-2xl mx-auto">
            Premium greenery solutions for every environment.
          </p>
        </motion.div>

        {/* Collection Grid - 3 per row consistent with services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((item, index) => <motion.div key={item.title} initial={{
          opacity: 0,
          y: 40
        }} animate={isVisible ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1]
        }} className="h-full">
              <Link to="/collection" className="group block bg-ivory rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Image - same aspect ratio as services */}
                <div className="aspect-[4/3] relative overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-night-green/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center shadow-md">
                    <span className="text-ivory flex items-center gap-2 text-sm uppercase tracking-wider font-semibold">
                      View Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Content - same padding and structure as services */}
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-night-green mb-3 text-lg group-hover:text-slate-moss transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-moss text-sm leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>)}
        </div>
      </div>
    </section>;
}