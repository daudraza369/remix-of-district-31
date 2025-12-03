import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
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

const Collection = () => {
  const heroRef = useScrollAnimation<HTMLElement>();
  const gridRef = useScrollAnimation<HTMLElement>();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? collectionItems 
    : collectionItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Hero Section */}
        <section ref={heroRef.ref} className="relative py-32 bg-pear overflow-hidden">
          <div className="absolute inset-0 pattern-overlay opacity-10" />
          <div className="container-luxury relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-night-green mb-6"
            >
              Our Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-moss max-w-2xl mx-auto"
            >
              Premium greenery solutions for every environment. Explore our curated selection of trees, plants, and planters.
            </motion.p>
          </div>
        </section>

        {/* Filter & Grid */}
        <section ref={gridRef.ref} className="section-padding bg-ivory">
          <div className="container-luxury">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-sm text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-night-green text-ivory'
                      : 'bg-transparent text-night-green border border-night-green/30 hover:border-night-green'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Collection Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={gridRef.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden rounded-sm mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-green/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <span className="text-ivory text-sm uppercase tracking-wider">View Details</span>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-slate-moss/60 block mb-1">{item.category}</span>
                  <h4 className="text-night-green mb-1">{item.name}</h4>
                  <span className="text-sm text-slate-moss">{item.price}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collection;
