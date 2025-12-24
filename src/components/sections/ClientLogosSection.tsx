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

  // Quadruple for seamless loop
  const repeatedClients = [...clients, ...clients, ...clients, ...clients];

  // Don't render section if no clients
  if (!loading && clients.length === 0) {
    return null;
  }

  const LogoItem = ({ client }: { client: ClientLogo }) => (
    <div className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16 flex items-center justify-center group">
      <div className="w-28 md:w-36 h-16 flex items-center justify-center">
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
              className="max-w-full max-h-10 md:max-h-12 object-contain opacity-70 grayscale brightness-0 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
            />
          </a>
        ) : (
          <img
            src={client.logo_url}
            alt={client.client_name}
            className="max-w-full max-h-10 md:max-h-12 object-contain opacity-70 grayscale brightness-0 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
          />
        )}
      </div>
    </div>
  );

  return (
    <section 
      ref={ref} 
      className="relative py-12 md:py-14 overflow-hidden bg-stone"
    >
      {/* Subtle top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-slate-moss/10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-moss/10" />

      <div className="container-luxury px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-slate-moss/70 mb-2">Trusted By</p>
          <h3 className="text-night-green text-lg md:text-xl font-heading tracking-wide">Industry Leaders</h3>
        </motion.div>
      </div>

      {/* Logo Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative"
      >
        {/* Edge fades */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-20 md:w-32 lg:w-48 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, hsl(60 3% 78%) 0%, transparent 100%)' }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-20 md:w-32 lg:w-48 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, hsl(60 3% 78%) 0%, transparent 100%)' }}
        />

        {/* Scrolling container */}
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="text-slate-moss/40 text-sm">Loading...</div>
          </div>
        ) : (
          <div 
            className="flex items-center py-4 hover:[animation-play-state:paused]"
            style={{
              animation: 'logo-scroll 30s linear infinite',
              width: 'fit-content'
            }}
          >
            {repeatedClients.map((client, index) => (
              <LogoItem key={`${client.id}-${index}`} client={client} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </section>
  );
}
