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

  // Duplicate for seamless loop
  const duplicatedClients = [...clients, ...clients];

  // Don't render section if no clients
  if (!loading && clients.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="section-padding bg-ivory overflow-hidden">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-night-green mb-4">Trusted By Leading Brands</h2>
          <p className="text-body-large text-slate-moss max-w-2xl mx-auto">
            Proud collaborations with top names in hospitality and design.
          </p>
        </motion.div>
      </div>

      {/* Logo Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ivory to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ivory to-transparent z-10" />

        {/* Scrolling container */}
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-slate-moss">Loading...</div>
          </div>
        ) : (
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 px-12 md:px-16 lg:px-20 flex items-center justify-center group cursor-pointer"
              >
                {/* Logo */}
                <div className="w-32 h-16 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
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
                        className="max-w-24 max-h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </a>
                  ) : (
                    <img
                      src={client.logo_url}
                      alt={client.client_name}
                      className="max-w-24 max-h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
