import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: "Address", value: "King Fahd Road, Riyadh, KSA" },
  { icon: Phone, label: "Phone", value: "+966 11 XXX XXXX" },
  { icon: Mail, label: "Email", value: "hello@districtinteriors.com" },
  { icon: Clock, label: "Hours", value: "Sun–Thu: 9AM–6PM" }
];

const Contact = () => {
  const heroRef = useScrollAnimation<HTMLElement>();
  const formRef = useScrollAnimation<HTMLElement>();

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Hero Section */}
        <section ref={heroRef.ref} className="relative py-32 bg-night-green overflow-hidden">
          <div className="absolute inset-0 pattern-overlay opacity-20" />
          <div className="container-luxury relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-ivory mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-stone max-w-2xl mx-auto"
            >
              Let's bring nature into your space. Connect with our design team to start your project.
            </motion.p>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={formRef.ref} className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={formRef.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-night-green mb-6">Get in Touch</h2>
                <p className="text-slate-moss mb-10 leading-relaxed">
                  Whether you're planning a complete transformation or exploring options for your space, we're here to help. Reach out and let's discuss how we can bring your vision to life.
                </p>

                <div className="space-y-6 mb-10">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={formRef.isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-sm bg-pear/30 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-night-green" />
                      </div>
                      <div>
                        <span className="text-sm uppercase tracking-wider text-slate-moss/60 block">{info.label}</span>
                        <span className="text-night-green">{info.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links Placeholder */}
                <div>
                  <span className="text-sm uppercase tracking-wider text-slate-moss/60 block mb-4">Follow Us</span>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-sm bg-night-green/10 flex items-center justify-center hover:bg-night-green hover:text-ivory transition-colors">
                      <span className="text-xs font-semibold">IG</span>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-sm bg-night-green/10 flex items-center justify-center hover:bg-night-green hover:text-ivory transition-colors">
                      <span className="text-xs font-semibold">LI</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={formRef.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <form className="bg-stone/20 p-8 md:p-12 rounded-sm">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm text-night-green mb-2 uppercase tracking-wider">Name *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 border border-stone/40 rounded-sm bg-ivory focus:border-night-green focus:outline-none transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-night-green mb-2 uppercase tracking-wider">Email *</label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-4 py-3 border border-stone/40 rounded-sm bg-ivory focus:border-night-green focus:outline-none transition-colors" 
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm text-night-green mb-2 uppercase tracking-wider">Project Type</label>
                    <select className="w-full px-4 py-3 border border-stone/40 rounded-sm bg-ivory focus:border-night-green focus:outline-none transition-colors">
                      <option value="">Select a service...</option>
                      <option value="plantscaping">Plantscaping</option>
                      <option value="tree-customization">Tree Customization</option>
                      <option value="green-walls">Green Walls</option>
                      <option value="planters">Custom Planters</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-8">
                    <label className="block text-sm text-night-green mb-2 uppercase tracking-wider">Message</label>
                    <textarea 
                      rows={5} 
                      className="w-full px-4 py-3 border border-stone/40 rounded-sm bg-ivory focus:border-night-green focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <Button variant="default" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
