import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink, Upload, Loader2, Info } from 'lucide-react';

interface ClientLogo {
  id: string;
  client_name: string;
  logo_url: string;
  website_url: string | null;
  is_published: boolean;
  display_order: number;
}

export default function ClientsAdmin() {
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientLogo | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    client_name: '',
    logo_url: '',
    website_url: '',
    is_published: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    const { data, error } = await supabase
      .from('client_logos')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      toast({ title: 'Error fetching clients', description: error.message, variant: 'destructive' });
    } else {
      setClients(data || []);
    }
    setLoading(false);
  }

  function openDialog(client?: ClientLogo) {
    if (client) {
      setEditingClient(client);
      setForm({
        client_name: client.client_name,
        logo_url: client.logo_url,
        website_url: client.website_url || '',
        is_published: client.is_published,
        display_order: client.display_order,
      });
    } else {
      setEditingClient(null);
      setForm({
        client_name: '',
        logo_url: '',
        website_url: '',
        is_published: true,
        display_order: clients.length,
      });
    }
    setDialogOpen(true);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please upload an image file', variant: 'destructive' });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please upload an image under 2MB', variant: 'destructive' });
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `client-logos/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      setForm({ ...form, logo_url: publicUrl });
      toast({ title: 'Logo uploaded successfully' });
    } catch (error: any) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingClient) {
      const { error } = await supabase
        .from('client_logos')
        .update(form)
        .eq('id', editingClient.id);
      
      if (error) {
        toast({ title: 'Error updating client', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Client updated' });
        setDialogOpen(false);
        fetchClients();
      }
    } else {
      const { error } = await supabase
        .from('client_logos')
        .insert([form]);
      
      if (error) {
        toast({ title: 'Error creating client', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Client added' });
        setDialogOpen(false);
        fetchClients();
      }
    }
  }

  async function togglePublish(client: ClientLogo) {
    const { error } = await supabase
      .from('client_logos')
      .update({ is_published: !client.is_published })
      .eq('id', client.id);
    
    if (error) {
      toast({ title: 'Error updating client', description: error.message, variant: 'destructive' });
    } else {
      fetchClients();
    }
  }

  async function deleteClient(id: string) {
    if (!confirm('Are you sure you want to delete this client?')) return;
    
    const { error } = await supabase
      .from('client_logos')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: 'Error deleting client', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Client deleted' });
      fetchClients();
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Client Logos</h1>
            <p className="text-muted-foreground mt-1">Manage the client logo carousel</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>
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

                {/* Logo Upload Section */}
                <div className="space-y-2">
                  <Label>Client Logo *</Label>
                  
                  {/* Dimension Guidelines */}
                  <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                      <Info className="h-3.5 w-3.5" />
                      Logo Guidelines for Infinite Slider
                    </div>
                    <ul className="text-muted-foreground space-y-0.5 ml-5 list-disc">
                      <li>Recommended size: <strong>200×80 pixels</strong> (or similar 2.5:1 ratio)</li>
                      <li>Format: PNG with transparent background preferred</li>
                      <li>Max file size: 2MB</li>
                      <li>Logos will be displayed at ~96px width in the slider</li>
                    </ul>
                  </div>

                  {/* Upload Button */}
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex-1"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Preview or URL input */}
                  {form.logo_url && (
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <img
                        src={form.logo_url}
                        alt="Logo preview"
                        className="max-h-16 max-w-full object-contain mx-auto"
                      />
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground">Or paste a URL:</div>
                  <Input
                    id="logo_url"
                    value={form.logo_url}
                    onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    value={form.website_url}
                    onChange={(e) => setForm({ ...form, website_url: e.target.value })}
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
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={form.is_published}
                    onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
                  />
                  <Label htmlFor="is_published">Show in carousel</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingClient ? 'Update' : 'Add'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <div className="col-span-full p-8 text-center text-muted-foreground">Loading...</div>
          ) : clients.length === 0 ? (
            <div className="col-span-full p-8 text-center text-muted-foreground">
              No clients yet. Click "Add Client" to add one.
            </div>
          ) : (
            clients.map((client) => (
              <Card key={client.id} className={!client.is_published ? 'opacity-50' : ''}>
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3 overflow-hidden">
                    {client.logo_url ? (
                      <img
                        src={client.logo_url}
                        alt={client.client_name}
                        className="max-h-full max-w-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">No logo</span>
                    )}
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{client.client_name}</p>
                      {client.website_url && (
                        <a 
                          href={client.website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Website
                        </a>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => togglePublish(client)}
                      >
                        {client.is_published ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openDialog(client)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteClient(client.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
