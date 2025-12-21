import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hospitality = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main className="pt-20">
        <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-night-green via-slate-moss to-night-green">
          <div className="container-luxury px-6 md:px-12 lg:px-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block px-4 py-2 bg-pear/20 text-pear text-sm font-nav uppercase tracking-widest rounded-sm mb-6">
                Coming Soon
              </span>
              <h1 className="text-ivory mb-6 font-heading uppercase">
                HOSPITALITY
              </h1>
              <p className="text-xl text-stone max-w-2xl mx-auto mb-10">
                We're crafting exceptional greenery solutions tailored for the hospitality industry. 
                Premium plantscaping for hotels, resorts, and luxury venues is on its way.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/contact')}
                >
                  Get in Touch
                </Button>
                <Button 
                  variant="heroOutline" 
                  size="lg"
                  onClick={() => navigate('/')}
                >
                  Explore Interiors
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Hospitality;
