import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function Styling() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-luxury px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-slate-moss mb-4">
              Interior Styling
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-night-green mb-6">
              Styling
            </h1>
            <p className="text-slate-moss max-w-2xl mx-auto text-lg">
              Content coming soon. We're crafting something beautiful for this page.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
