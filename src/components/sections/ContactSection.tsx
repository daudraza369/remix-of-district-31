import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactInfo = {
  email: 'Sales@district.sa',
  phone: '+966 056 228 8177',
  whatsapp: '+966 50 060 6506',
  address: 'Al Zoubair Ibn Al Awwam, Ar Rawabi, Riyadh 14214',
  googleMaps: 'https://share.google/OwSIbmaVwv0vXcatO',
};

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/districtflora', abbr: 'IG' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@districtflora', abbr: 'TT' },
  { label: 'Snapchat', href: '#', abbr: 'SC' },
];

const projectTypes = [
  'Corporate Office',
  'Hotel / Hospitality',
  'Restaurant / F&B',
  'Retail Space',
  'Private Residence',
  'Healthcare Facility',
  'Other',
];

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', projectType: '', message: '' });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden bg-night-green"
    >
      {/* Parallax background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-deep-forest via-night-green to-slate-moss/50" />
        
        {/* Animated glow */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] pointer-events-none"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'radial-gradient(circle, hsl(72 46% 83% / 0.15), transparent 60%)',
          }}
        />
      </motion.div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(60 30% 98% / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(60 30% 98% / 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div ref={ref} className="container-luxury px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header with badge */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0)' } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pear/10 border border-pear/20 mb-6">
            <Sparkles className="w-4 h-4 text-pear" />
            <span className="text-sm text-pear uppercase tracking-widest font-nav">Start Your Transformation</span>
          </div>
          
          <h2 className="text-ivory mb-6 uppercase font-heading">
            <span className="block text-3xl md:text-4xl lg:text-5xl">Let's Create</span>
            <span className="block text-shimmer text-4xl md:text-5xl lg:text-6xl">Something Remarkable</span>
          </h2>
          
          <p className="text-xl text-stone/80 max-w-2xl mx-auto">
            Every great space starts with a conversation. Tell us about your vision.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
            animate={isVisible ? { opacity: 1, x: 0, filter: 'blur(0)' } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-ivory/5 border-ivory/10 text-ivory placeholder:text-stone/50 h-14 px-5 focus:border-pear/50 focus:ring-pear/20 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 }}
                >
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-ivory/5 border-ivory/10 text-ivory placeholder:text-stone/50 h-14 px-5 focus:border-pear/50 focus:ring-pear/20 transition-all duration-300"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                >
                  <SelectTrigger className="bg-ivory/5 border-ivory/10 text-ivory h-14 px-5 [&>span]:text-stone/50 data-[state=open]:text-ivory focus:border-pear/50 focus:ring-pear/20">
                    <SelectValue placeholder="What type of project?" />
                  </SelectTrigger>
                  <SelectContent className="bg-ivory border-stone/30">
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-night-green">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 }}
              >
                <Textarea
                  placeholder="Tell us about your space and what you're looking to achieve..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="bg-ivory/5 border-ivory/10 text-ivory placeholder:text-stone/50 px-5 py-4 resize-none focus:border-pear/50 focus:ring-pear/20 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="xl" 
                  className="w-full group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Request Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>

              <p className="text-sm text-stone/50 text-center">
                We typically respond within 24 hours during business days.
              </p>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
            animate={isVisible ? { opacity: 1, x: 0, filter: 'blur(0)' } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {/* Direct contact options */}
              <div className="space-y-4">
                <p className="text-sm text-pear uppercase tracking-widest font-nav mb-6">Or reach out directly</p>
                
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-sm bg-ivory/5 border border-ivory/10 hover:border-pear/30 hover:bg-ivory/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-pear/10 flex items-center justify-center group-hover:bg-pear/20 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-pear" />
                  </div>
                  <div>
                    <p className="text-xs text-stone/50 uppercase tracking-wider">Email</p>
                    <p className="text-ivory group-hover:text-pear transition-colors duration-300">{contactInfo.email}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\s/g, '').replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-sm bg-ivory/5 border border-ivory/10 hover:border-pear/30 hover:bg-ivory/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-pear/10 flex items-center justify-center group-hover:bg-pear/20 transition-colors duration-300">
                    <MessageCircle className="w-5 h-5 text-pear" />
                  </div>
                  <div>
                    <p className="text-xs text-stone/50 uppercase tracking-wider">WhatsApp</p>
                    <p className="text-ivory group-hover:text-pear transition-colors duration-300">{contactInfo.whatsapp}</p>
                  </div>
                </a>

                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 p-4 rounded-sm bg-ivory/5 border border-ivory/10 hover:border-pear/30 hover:bg-ivory/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-pear/10 flex items-center justify-center group-hover:bg-pear/20 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-pear" />
                  </div>
                  <div>
                    <p className="text-xs text-stone/50 uppercase tracking-wider">Phone</p>
                    <p className="text-ivory group-hover:text-pear transition-colors duration-300">{contactInfo.phone}</p>
                  </div>
                </a>

                <a
                  href={contactInfo.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-sm bg-ivory/5 border border-ivory/10 hover:border-pear/30 hover:bg-ivory/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-pear/10 flex items-center justify-center group-hover:bg-pear/20 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-pear" />
                  </div>
                  <div>
                    <p className="text-xs text-stone/50 uppercase tracking-wider">Location</p>
                    <p className="text-ivory group-hover:text-pear transition-colors duration-300 text-sm">{contactInfo.address}</p>
                  </div>
                </a>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-ivory/10">
                <p className="text-sm text-stone/50 mb-4">Follow our work</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-ivory/5 border border-ivory/10 flex items-center justify-center hover:bg-pear hover:border-pear hover:text-night-green transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <span className="text-sm font-nav text-ivory group-hover:text-night-green">{social.abbr}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-forest/50 to-transparent pointer-events-none" />
    </section>
  );
}