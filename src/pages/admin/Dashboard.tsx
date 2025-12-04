import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { FolderKanban, Briefcase, TreePine, MessageSquare, Building2, Image, ArrowRight } from 'lucide-react';

interface Stats {
  projects: number;
  services: number;
  collection: number;
  testimonials: number;
  clients: number;
  media: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    services: 0,
    collection: 0,
    testimonials: 0,
    clients: 0,
    media: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [projects, services, collection, testimonials, clients, media] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('collection_items').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('client_logos').select('id', { count: 'exact', head: true }),
        supabase.from('media_assets').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        projects: projects.count || 0,
        services: services.count || 0,
        collection: collection.count || 0,
        testimonials: testimonials.count || 0,
        clients: clients.count || 0,
        media: media.count || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FolderKanban, href: '/admin/projects', color: 'bg-blue-500' },
    { label: 'Services', value: stats.services, icon: Briefcase, href: '/admin/services', color: 'bg-green-500' },
    { label: 'Collection Items', value: stats.collection, icon: TreePine, href: '/admin/collection', color: 'bg-emerald-500' },
    { label: 'Testimonials', value: stats.testimonials, icon: MessageSquare, href: '/admin/testimonials', color: 'bg-purple-500' },
    { label: 'Client Logos', value: stats.clients, icon: Building2, href: '/admin/clients', color: 'bg-orange-500' },
    { label: 'Media Files', value: stats.media, icon: Image, href: '/admin/media', color: 'bg-pink-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to the District Interiors admin panel</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((card) => (
            <Link key={card.label} to={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </CardTitle>
                  <div className={`${card.color} p-2 rounded-lg`}>
                    <card.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">
                      {loading ? '...' : card.value}
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to do</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link 
                to="/admin/projects" 
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <FolderKanban className="h-5 w-5 text-primary" />
                <span className="font-medium">Add New Project</span>
              </Link>
              <Link 
                to="/admin/media" 
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Image className="h-5 w-5 text-primary" />
                <span className="font-medium">Upload Media</span>
              </Link>
              <Link 
                to="/admin/testimonials" 
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="font-medium">Add Testimonial</span>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Website Links</CardTitle>
              <CardDescription>View your public website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link 
                to="/" 
                target="_blank"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <span className="font-medium">Homepage</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Link>
              <Link 
                to="/projects" 
                target="_blank"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <span className="font-medium">Projects Page</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Link>
              <Link 
                to="/collection" 
                target="_blank"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <span className="font-medium">Collection Page</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
