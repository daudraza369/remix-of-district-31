import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sun, Shield, Eye, TreeDeciduous } from 'lucide-react';
import oliveTree from '@/assets/olive-tree.jpg';
import treeDetail from '@/assets/tree-detail.jpg';
import maintenanceTech from '@/assets/maintenance-tech.jpg';

const processSteps = [
  {
    step: 1,
    title: "Understanding Your Space",
    description: "Share photos, dimensions, and layout details so our team can design trees that fit perfectly within your environment."
  },
  {
    step: 2,
    title: "Choosing Tree Type",
    description: "Select from our premium olive, ficus, and palm models, or request a fully custom species."
  },
  {
    step: 3,
    title: "Defining Size & Scale",
    description: "We assess ceiling heights and proportions to propose tree heights that look visually balanced."
  },
  {
    step: 4,
    title: "Customization & Detailing",
    description: "Pick trunk type, leaf density, and color tone, blending authenticity with your design palette."
  },
  {
    step: 5,
    title: "Scheduling & Installation",
    description: "Once approved, our technicians complete installation within 3 to 5 working days."
  }
];

const features = [
  { icon: Sun, label: "UV-Resistant Foliage" },
  { icon: Shield, label: "Fire-Rated Materials" },
  { icon: Eye, label: "High-Realism Details" },
  { icon: TreeDeciduous, label: "Indoor & Outdoor Ready" }
];

const TreeSolutions = () => {
  const heroRef = useScrollAnimation<HTMLElement>();
  const processRef = useScrollAnimation<HTMLElement>();
  const materialsRef = useScrollAnimation<HTMLElement>();
  const maintenanceRef = useScrollAnimation<HTMLElement>();
  const ctaRef = useScrollAnimation<HTMLElement>();

  const scrollToForm = () => {
    const formSection = document.getElementById('consultation-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Hero Section */}
        <section ref={heroRef.ref} className="relative min-h-[80vh] bg-night-green overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-night-green via-night-green/90 to-night-green/60 z-10" />
            <motion.img
              src={oliveTree}
              alt="Custom tree installation"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <div className="absolute inset-0 pattern-overlay z-20 opacity-20" />
          
          <div className="relative z-30 min-h-[80vh] flex items-center">
            <div className="container-luxury px-6 md:px-12 lg:px-20 py-32">
              <div className="max-w-3xl">
                <motion.h1
                  initial={{ opacity: 0, y: 60 }}
                  animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-ivory mb-6"
                >
                  Trees that Transform Spaces
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl text-stone mb-6"
                >
                  From custom creation to restoration, we design, craft, and install trees that bring enduring beauty to homes and businesses alike.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-body text-stone/80 mb-10"
                >
                  Every project starts with a conversation. Our consultation experience makes tree selection effortless, guiding you from defining your vision to fine-tuning size, species, and finishes.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Button variant="hero" size="lg" onClick={scrollToForm}>
                    Book Your Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef.ref} className="section-padding bg-ivory">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={processRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-sm uppercase tracking-widest text-slate-moss mb-4 block">Our Process</span>
              <h2 className="text-night-green">How We Bring Tree Projects to Life</h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-night-green/20 -translate-x-1/2" />
              
              <div className="space-y-12 lg:space-y-0">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 40 }}
                    animate={processRef.isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`lg:grid lg:grid-cols-2 lg:gap-12 items-center ${
                      index % 2 === 0 ? '' : 'lg:direction-rtl'
                    }`}
                  >
                    <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:order-2 lg:pl-12'}`}>
                      <div className="bg-pear/30 p-8 rounded-sm">
                        <span className="text-4xl font-display text-night-green/30 block mb-2">0{step.step}</span>
                        <h3 className="text-night-green mb-3 text-2xl">{step.title}</h3>
                        <p className="text-slate-moss">{step.description}</p>
                      </div>
                    </div>
                    <div className={`hidden lg:flex justify-center ${index % 2 === 0 ? '' : 'lg:order-1'}`}>
                      <div className="w-4 h-4 rounded-full bg-night-green border-4 border-ivory" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section ref={materialsRef.ref} className="section-padding bg-night-green pattern-overlay">
          <div className="container-luxury relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={materialsRef.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-ivory mb-6">Built for Beauty and Longevity</h2>
                <p className="text-xl text-stone mb-4">
                  We engineer every tree to thrive where it's planted, indoors or out.
                </p>
                <p className="text-body text-stone/80 mb-8">
                  From UV-resistant foliage to fire-rated olive leaves, each material is chosen for safety, durability, and realism. Whether exposed to sunlight, humidity, or heavy foot traffic, our trees are crafted to endure.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={materialsRef.isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-sm bg-pear/20 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-pear" />
                      </div>
                      <span className="text-ivory text-sm">{feature.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={materialsRef.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-sm overflow-hidden">
                  <img src={treeDetail} alt="Tree craftsmanship detail" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Maintenance Section */}
        <section ref={maintenanceRef.ref} className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={maintenanceRef.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="aspect-[4/3] rounded-sm overflow-hidden">
                  <img src={maintenanceTech} alt="Tree maintenance" className="w-full h-full object-cover" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={maintenanceRef.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-night-green mb-6">We Don't Just Install. We Preserve.</h2>
                <p className="text-xl text-slate-moss mb-4">
                  Because every great tree deserves lasting care.
                </p>
                <p className="text-body text-slate-moss/80 mb-8">
                  Our maintenance programs include scheduled cleaning, leaf replacement, and branch realignment to ensure your trees stay flawless over time. We also offer upgrade options for clients expanding their greenery portfolio.
                </p>
                <Button variant="default" size="lg">
                  Ask About Maintenance
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Consultation Form Section */}
        <section ref={ctaRef.ref} id="consultation-form" className="section-padding bg-stone relative">
          <div className="absolute inset-0 pattern-overlay opacity-10" />
          <div className="container-luxury relative z-10">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={ctaRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-night-green mb-4">Ready to Begin Your Tree Project?</h2>
                <p className="text-xl text-slate-moss mb-2">Let's design something extraordinary together.</p>
                <p className="text-slate-moss/80">
                  Whether you're outfitting a villa courtyard, a restaurant lobby, or a corporate space, our team is ready to guide you.
                </p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 40 }}
                animate={ctaRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-ivory p-8 md:p-12 rounded-sm shadow-xl"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-night-green mb-2 uppercase tracking-wider">Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-stone/40 rounded-sm bg-transparent focus:border-night-green focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm text-night-green mb-2 uppercase tracking-wider">Email</label>
                    <input type="email" className="w-full px-4 py-3 border border-stone/40 rounded-sm bg-transparent focus:border-night-green focus:outline-none transition-colors" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-night-green mb-2 uppercase tracking-wider">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 border border-stone/40 rounded-sm bg-transparent focus:border-night-green focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm text-night-green mb-2 uppercase tracking-wider">Project Type</label>
                    <select className="w-full px-4 py-3 border border-stone/40 rounded-sm bg-transparent focus:border-night-green focus:outline-none transition-colors">
                      <option value="">Select type...</option>
                      <option value="villa">Villa</option>
                      <option value="office">Office</option>
                      <option value="hotel">Hotel</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="mall">Mall</option>
                      <option value="public">Public Space</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-night-green mb-2 uppercase tracking-wider">Preferred Tree Type</label>
                    <select className="w-full px-4 py-3 border border-stone/40 rounded-sm bg-transparent focus:border-night-green focus:outline-none transition-colors">
                      <option value="">Select type...</option>
                      <option value="olive">Olive</option>
                      <option value="ficus">Ficus</option>
                      <option value="palm">Palm</option>
                      <option value="custom">Custom</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-night-green mb-2 uppercase tracking-wider">Timeline</label>
                    <select className="w-full px-4 py-3 border border-stone/40 rounded-sm bg-transparent focus:border-night-green focus:outline-none transition-colors">
                      <option value="">Select timeline...</option>
                      <option value="immediate">Immediately</option>
                      <option value="1-3">1–3 months</option>
                      <option value="3-6">3–6 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                <div className="mb-8">
                  <label className="block text-sm text-night-green mb-2 uppercase tracking-wider">Project Details</label>
                  <textarea rows={4} className="w-full px-4 py-3 border border-stone/40 rounded-sm bg-transparent focus:border-night-green focus:outline-none transition-colors resize-none" placeholder="Tell us about your vision..."></textarea>
                </div>
                <Button variant="default" size="lg" className="w-full">
                  Book a Free Consultation
                </Button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TreeSolutions;
