import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import TreeSolutions from "./pages/TreeSolutions";
import Services from "./pages/Services";
import Collection from "./pages/Collection";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Hospitality from "./pages/Hospitality";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminAuth from "./pages/admin/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import CollectionAdmin from "./pages/admin/CollectionAdmin";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import ClientsAdmin from "./pages/admin/ClientsAdmin";
import StatsAdmin from "./pages/admin/StatsAdmin";
import MediaAdmin from "./pages/admin/MediaAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import PageBuilder from "./pages/admin/PageBuilder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tree-solutions" element={<TreeSolutions />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/plantscaping" element={<Services />} />
            <Route path="/services/tree-customization" element={<Services />} />
            <Route path="/services/tree-restoration" element={<Services />} />
            <Route path="/services/green-walls" element={<Services />} />
            <Route path="/services/planters" element={<Services />} />
            <Route path="/services/maintenance" element={<Services />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/hospitality" element={<Hospitality />} />
            
            {/* Admin routes */}
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/pages" element={<PageBuilder />} />
            <Route path="/admin/projects" element={<ProjectsAdmin />} />
            <Route path="/admin/services" element={<ServicesAdmin />} />
            <Route path="/admin/collection" element={<CollectionAdmin />} />
            <Route path="/admin/testimonials" element={<TestimonialsAdmin />} />
            <Route path="/admin/clients" element={<ClientsAdmin />} />
            <Route path="/admin/stats" element={<StatsAdmin />} />
            <Route path="/admin/media" element={<MediaAdmin />} />
            <Route path="/admin/users" element={<UsersAdmin />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;