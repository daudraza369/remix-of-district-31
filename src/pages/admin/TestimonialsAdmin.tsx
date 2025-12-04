import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Eye, EyeOff, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  role: string | null;
  company: string | null;
  quote: string;
  client_logo: string | null;
  is_published: boolean;
  display_order: number;
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    client_name: '',
    role: '',
    company: '',
    quote: '',
    client_logo: '',
    is_published: false,
    display_order: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      toast({ title: 'Error fetching testimonials', description: error.message, variant: 'destructive' });
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  }

  function openDialog(testimonial?: Testimonial) {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setForm({
        client_name: testimonial.client_name,
        role: testimonial.role || '',
        company: testimonial.company || '',
        quote: testimonial.quote,
        client_logo: testimonial.client_logo || '',
        is_published: testimonial.is_published,
        display_order: testimonial.display_order,
      });
    } else {
      setEditingTestimonial(null);
      setForm({
        client_name: '',
        role: '',
        company: '',
        quote: '',
        client_logo: '',
        is_published: false,
        display_order: testimonials.length,
      });
    }
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingTestimonial) {
      const { error } = await supabase
        .from('testimonials')
        .update(form)
        .eq('id', editingTestimonial.id);
      
      if (error) {
        toast({ title: 'Error updating testimonial', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Testimonial updated' });
        setDialogOpen(false);
        fetchTestimonials();
      }
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert([form]);
      
      if (error) {
        toast({ title: 'Error creating testimonial', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Testimonial created' });
        setDialogOpen(false);
        fetchTestimonials();
      }
    }
  }

  async function togglePublish(testimonial: Testimonial) {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_published: !testimonial.is_published })
      .eq('id', testimonial.id);
    
    if (error) {
      toast({ title: 'Error updating testimonial', description: error.message, variant: 'destructive' });
    } else {
      fetchTestimonials();
    }
  }

  async function deleteTestimonial(id: string) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: 'Error deleting testimonial', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Testimonial deleted' });
      fetchTestimonials();
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Testimonials</h1>
            <p className="text-muted-foreground mt-1">Manage client testimonials</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client_name">Client Name *</Label>
                  <Input
                    id="client_name"
                    value={form.client_name}
                    onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      placeholder="e.g. CEO, Manager"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote">Quote *</Label>
                  <Textarea
                    id="quote"
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_logo">Client Logo URL</Label>
                    <Input
                      id="client_logo"
                      value={form.client_logo}
                      onChange={(e) => setForm({ ...form, client_logo: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={form.display_order}
                      onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={form.is_published}
                    onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
                  />
                  <Label htmlFor="is_published">Publish immediately</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingTestimonial ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : testimonials.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No testimonials yet. Click "Add Testimonial" to create one.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Quote</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{t.client_name}</p>
                          <p className="text-sm text-muted-foreground">{[t.role, t.company].filter(Boolean).join(', ')}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="flex items-start gap-2">
                          <Quote className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="truncate">{t.quote}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePublish(t)}
                          className={t.is_published ? 'text-green-600' : 'text-muted-foreground'}
                        >
                          {t.is_published ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
                          {t.is_published ? 'Published' : 'Draft'}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openDialog(t)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteTestimonial(t.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
