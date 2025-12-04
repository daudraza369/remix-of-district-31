import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: string;
  unit: string | null;
  display_order: number;
}

export default function StatsAdmin() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    label: '',
    value: '',
    unit: '',
    display_order: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      toast({ title: 'Error fetching stats', description: error.message, variant: 'destructive' });
    } else {
      setStats(data || []);
    }
    setLoading(false);
  }

  function openDialog(stat?: Stat) {
    if (stat) {
      setEditingStat(stat);
      setForm({
        label: stat.label,
        value: stat.value,
        unit: stat.unit || '',
        display_order: stat.display_order,
      });
    } else {
      setEditingStat(null);
      setForm({
        label: '',
        value: '',
        unit: '',
        display_order: stats.length,
      });
    }
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingStat) {
      const { error } = await supabase
        .from('stats')
        .update(form)
        .eq('id', editingStat.id);
      
      if (error) {
        toast({ title: 'Error updating stat', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Stat updated' });
        setDialogOpen(false);
        fetchStats();
      }
    } else {
      const { error } = await supabase
        .from('stats')
        .insert([form]);
      
      if (error) {
        toast({ title: 'Error creating stat', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Stat created' });
        setDialogOpen(false);
        fetchStats();
      }
    }
  }

  async function deleteStat(id: string) {
    if (!confirm('Are you sure you want to delete this stat?')) return;
    
    const { error } = await supabase
      .from('stats')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: 'Error deleting stat', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Stat deleted' });
      fetchStats();
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Statistics</h1>
            <p className="text-muted-foreground mt-1">Manage the statistics displayed on the homepage</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Stat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingStat ? 'Edit Stat' : 'Add New Stat'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Value *</Label>
                  <Input
                    id="value"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value })}
                    placeholder="e.g. 250+"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="label">Label *</Label>
                  <Input
                    id="label"
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    placeholder="e.g. Projects Completed"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit (optional)</Label>
                    <Input
                      id="unit"
                      value={form.unit}
                      onChange={(e) => setForm({ ...form, unit: e.target.value })}
                      placeholder="e.g. Days, Locations"
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
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingStat ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Preview */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Preview</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-display font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : stats.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No stats yet. Click "Add Stat" to create one.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Value</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.map((stat) => (
                    <TableRow key={stat.id}>
                      <TableCell className="font-bold">{stat.value}</TableCell>
                      <TableCell>{stat.label}</TableCell>
                      <TableCell>{stat.unit || '-'}</TableCell>
                      <TableCell>{stat.display_order}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openDialog(stat)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteStat(stat.id)}>
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
