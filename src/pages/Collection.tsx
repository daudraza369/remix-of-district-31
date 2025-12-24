import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState, useRef } from 'react';
import oliveTree from '@/assets/olive-tree.jpg';
import flowersCollection from '@/assets/flowers-collection.jpg';
import treeDetail from '@/assets/tree-detail.jpg';
import greenWall from '@/assets/green-wall.jpg';
import planters from '@/assets/planters.jpg';
import hotelAtrium from '@/assets/hotel-atrium.jpg';

const categories = [
  "All",
  "Trees",
  "Flowers",
  "Leaves/Foliage",
  "Green Walls",
  "Trunks & Branches",
  "Planters"
];

const collectionItems = [
  { id: 1, name: "Premium Olive Tree", category: "Trees", image: oliveTree, price: "Price on Request" },
  { id: 2, name: "Deluxe Ficus", category: "Trees", image: treeDetail, price: "Price on Request" },
  { id: 3, name: "Royal Palm", category: "Trees", image: hotelAtrium, price: "Price on Request" },
  { id: 4, name: "Orchid Arrangement", category: "Flowers", image: flowersCollection, price: "From SAR 850" },
  { id: 5, name: "Preserved Rose Display", category: "Flowers", image: flowersCollection, price: "From SAR 1,200" },
  { id: 6, name: "Monstera Leaves", category: "Leaves/Foliage", image: treeDetail, price: "From SAR 450" },
  { id: 7, name: "Vertical Garden Panel", category: "Green Walls", image: greenWall, price: "Price on Request" },
  { id: 8, name: "Moss Wall Installation", category: "Green Walls", image: greenWall, price: "Price on Request" },
  { id: 9, name: "Sculptural Trunk", category: "Trunks & Branches", image: treeDetail, price: "Price on Request" },
  { id: 10, name: "GRC Planter Large", category: "Planters", image: planters, price: "From SAR 2,800" },
  { id: 11, name: "Acrylic Planter Set", category: "Planters", image: planters, price: "From SAR 1,600" },
  { id: 12, name: "Stone Planter Premium", category: "Planters", image: planters, price: "Price on Request" },
];

// Interactive collection card with magnetic hover effect
const CollectionCard = ({ 
  item, 
  index, 
  isVisible 
}: { 
  item: typeof collectionItems[0]; 
  index: number; 
  isVisible: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Staggered layout - alternating sizes for visual interest
  const layoutVariants = [
    'col-span-1 row-span-2', // Tall portrait
    'col-span-1 row-span-1', // Square-ish
    'col-span-1 row-span-2', // Tall portrait
    'col-span-1 row-span-1', // Square-ish
    'col-span-1 row-span-1', // Square-ish
    'col-span-1 row-span-2', // Tall portrait
  ];

  const layoutClass = layoutVariants[index % layoutVariants.length];
  const isTall = layoutClass.includes('row-span-2');

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: 15 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1]
        }
      } : {}}
      whileHover={{ 
        z: 50,
        transition: { duration: 0.3 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${layoutClass} group cursor-pointer perspective-1000`}
      style={{
        transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className={`relative overflow-hidden rounded-sm h-full ${isTall ? 'min-h-[450px] md:min-h-[550px]' : 'min-h-[260px] md:min-h-[300px]'}`}>
        {/* Image with parallax effect */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Color overlay on hover - transitions from grayscale to vibrant */}
        <motion.div 
          className="absolute inset-0 bg-night-green mix-blend-color"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: isHovered ? 0 : 0.6 }}
          transition={{ duration: 0.5 }}
        />

        {/* Gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-night-green via-night-green/50 to-transparent"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: isHovered ? 0.9 : 0.4 }}
          transition={{ duration: 0.4 }}
        />

        {/* Decorative corner accents */}
        <motion.div 
          className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-pear/60"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
        <motion.div 
          className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pear/60"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
          {/* Category pill */}
          <motion.span 
            className="inline-block self-start px-3 py-1 bg-pear/90 text-night-green text-xs uppercase tracking-wider font-nav rounded-sm mb-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ 
              x: isHovered ? 0 : -20, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {item.category}
          </motion.span>

          {/* Title with slide-up effect */}
          <motion.h3 
            className="text-ivory text-xl md:text-2xl font-heading mb-1"
            initial={{ y: 20 }}
            animate={{ y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4 }}
          >
            {item.name}
          </motion.h3>

          {/* Price */}
          <motion.span 
            className="text-pear/80 text-sm mb-2"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {item.price}
          </motion.span>

          {/* View details - only visible on hover */}
          <motion.p 
            className="text-stone/90 text-sm leading-relaxed uppercase tracking-wider"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: isHovered ? 0 : 20, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            View Details
          </motion.p>

          {/* Animated line */}
          <motion.div 
            className="mt-4 h-px bg-gradient-to-r from-pear via-pear/50 to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Collection = () => {
  const heroRef = useScrollAnimation<HTMLElement>();
  const gridRef = useScrollAnimation<HTMLElement>();
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const filteredItems = activeCategory === "All" 
    ? collectionItems 
    : collectionItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Hero Section with parallax */}
        <section ref={heroRef.ref} className="relative py-32 md:py-40 bg-night-green overflow-hidden">
          <div className="absolute inset-0 pattern-overlay opacity-20" />
          
          {/* Floating decorative elements */}
          <motion.div 
            className="absolute top-20 left-10 w-32 h-32 rounded-full bg-pear/5 blur-3xl"
            animate={{ 
              y: [0, 30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-pear/5 blur-3xl"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="container-luxury relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroRef.isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span 
                className="inline-block text-pear uppercase tracking-[0.3em] text-sm mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Curated Greenery
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-ivory mb-6"
              >
                Our Collection
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl text-stone max-w-2xl mx-auto"
              >
                Premium greenery solutions for every environment. Explore our curated selection of trees, plants, and planters.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Filter & Grid */}
        <section ref={gridRef.ref} className="section-padding bg-ivory" id="gallery">
          <div ref={containerRef} className="container-luxury">
            {/* Category Filter - pill style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
              {categories.map((category, i) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all duration-500 ${
                    activeCategory === category
                      ? 'bg-night-green text-ivory shadow-lg shadow-night-green/20'
                      : 'bg-transparent text-night-green border border-night-green/20 hover:border-night-green hover:bg-night-green/5'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Artistic Masonry Grid */}
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(130px,1fr)]"
            >
              {filteredItems.map((item, index) => (
                <CollectionCard 
                  key={item.id} 
                  item={item} 
                  index={index}
                  isVisible={gridRef.isVisible}
                />
              ))}
            </motion.div>

            {/* Empty state */}
            {filteredItems.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-slate-moss text-lg">No items found in this category.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collection;