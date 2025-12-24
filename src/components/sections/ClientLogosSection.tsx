import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ClientLogo {
  id: string;
  client_name: string;
  logo_url: string;
  website_url: string | null;
  display_order: number;
}

export function ClientLogosSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase
        .from('client_logos')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (!error && data) {
        setClients(data);
      }
      setLoading(false);
    }

    fetchClients();
  }, []);

  // Quadruple for ultra-smooth seamless loop
  const repeatedClients = [...clients, ...clients, ...clients, ...clients];

  // Don't render section if no clients
  if (!loading && clients.length === 0) {
    return null;
  }

  const LogoItem = ({ client }: { client: ClientLogo }) => (
    <div className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16 flex items-center justify-center group">
      <div className="w-36 md:w-44 h-20 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-all duration-500 ease-out">
        {client.website_url ? (
          <a 
            href={client.website_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full"
          >
            <img
              src={client.logo_url}
              alt={client.client_name}
              className="max-w-full max-h-14 md:max-h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 ease-out transform group-hover:scale-110"
            />
          </a>
        ) : (
          <img
            src={client.logo_url}
            alt={client.client_name}
            className="max-w-full max-h-14 md:max-h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 ease-out transform group-hover:scale-110"
          />
        )}
      </div>
    </div>
  );

  return (
    <section ref={ref} className="py-16 md:py-20 bg-ivory overflow-hidden">
      <div className="container-luxury px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-slate-moss mb-3">Our Partners</p>
          <h2 className="text-night-green text-2xl md:text-3xl lg:text-4xl">Trusted By Leading Brands</h2>
        </motion.div>
      </div>

      {/* Logo Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* Smooth gradient masks - larger and more elegant */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-24 md:w-40 lg:w-56 z-10 pointer-events-none"
          style={{ 
            background: 'linear-gradient(to right, hsl(60 30% 98%) 0%, hsl(60 30% 98% / 0.9) 30%, hsl(60 30% 98% / 0.5) 60%, transparent 100%)'
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-24 md:w-40 lg:w-56 z-10 pointer-events-none"
          style={{ 
            background: 'linear-gradient(to left, hsl(60 30% 98%) 0%, hsl(60 30% 98% / 0.9) 30%, hsl(60 30% 98% / 0.5) 60%, transparent 100%)'
          }}
        />

        {/* Scrolling container - faster, smoother animation */}
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="text-slate-moss/60 text-sm">Loading partners...</div>
          </div>
        ) : (
          <div 
            className="flex items-center py-4 hover:[animation-play-state:paused]"
            style={{
              animation: 'logo-scroll 20s linear infinite',
              width: 'fit-content'
            }}
          >
            {repeatedClients.map((client, index) => (
              <LogoItem key={`${client.id}-${index}`} client={client} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Inline keyframes for smoother scroll */}
      <style>{`
        @keyframes logo-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
      `}</style>
    </section>
  );
}
