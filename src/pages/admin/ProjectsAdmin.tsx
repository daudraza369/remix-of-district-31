import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, Link2, Video, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  client_name: string | null;
  project_type: string | null;
  description: string | null;
  hero_image: string | null;
  video_url: string | null;
  is_published: boolean;
  display_order: number;
}

// Visual grid for display order selection
const DisplayOrderGrid = ({ 
  selectedPosition, 
  onSelect, 
  existingProjects,
  currentProjectId
}: { 
  selectedPosition: number; 
  onSelect: (pos: number) => void; 
  existingProjects: Project[];
  currentProjectId?: string;
}) => {
  // Create a grid of 12 positions (4 columns x 3 rows like the project page)
  const gridPositions = Array.from({ length: 12 }, (_, i) => i);
  
  // Map existing projects to their positions
  const projectAtPosition = (pos: number) => {
    return existingProjects.find(p => p.display_order === pos && p.id !== currentProjectId);
  };

  // Layout pattern matching the project page (alternating tall/short)
  const layoutVariants = [
    'row-span-2', 'row-span-1', 'row-span-2', 'row-span-1',
    'row-span-1', 'row-span-2', 'row-span-1', 'row-span-2',
    'row-span-2', 'row-span-1', 'row-span-2', 'row-span-1',
  ];

  return (
    <div className="space-y-3">
      <Label>Display Position (click to select)</Label>
      <div className="grid grid-cols-4 gap-2 auto-rows-[40px] p-4 bg-muted/30 rounded-lg border">
        {gridPositions.map((pos) => {
          const existingProject = projectAtPosition(pos);
          const isSelected = selectedPosition === pos;
          const isTall = layoutVariants[pos] === 'row-span-2';
          
          return (
            <motion.button
              key={pos}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(pos)}
              className={`
                ${layoutVariants[pos]}
                relative rounded-sm border-2 transition-all duration-200 overflow-hidden
                ${isSelected 
                  ? 'border-primary bg-primary/20 ring-2 ring-primary/30' 
                  : existingProject 
                    ? 'border-muted-foreground/30 bg-muted cursor-pointer hover:border-primary/50' 
                    : 'border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5'
                }
              `}
            >
              {existingProject ? (
                <div className="absolute inset-0 flex items-center justify-center p-1">
                  <span className="text-[10px] text-muted-foreground text-center line-clamp-2 leading-tight">
                    {existingProject.title}
                  </span>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-muted-foreground/40'}`}>
                    {pos + 1}
                  </span>
                </div>
              )}
              {isSelected && (
                <motion.div 
                  layoutId="selected-position"
                  className="absolute inset-0 bg-primary/10 rounded-sm"
                  initial={false}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        The grid matches the project page layout. Tall cards span 2 rows.
      </p>
    </div>
  );
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoTab, setVideoTab] = useState<'upload' | 'link'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: '',
    slug: '',
    location: '',
    client_name: '',
    project_type: '',
    description: '',
    hero_image: '',
    video_url: '',
    is_published: false,
    display_order: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      toast({ title: 'Error fetching projects', description: error.message, variant: 'destructive' });
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  }

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function openDialog(project?: Project) {
    if (project) {
      setEditingProject(project);
      setForm({
        title: project.title,
        slug: project.slug,
        location: project.location || '',
        client_name: project.client_name || '',
        project_type: project.project_type || '',
        description: project.description || '',
        hero_image: project.hero_image || '',
        video_url: project.video_url || '',
        is_published: project.is_published,
        display_order: project.display_order,
      });
      setVideoTab(project.video_url ? 'link' : 'upload');
    } else {
      setEditingProject(null);
      setForm({
        title: '',
        slug: '',
        location: '',
        client_name: '',
        project_type: '',
        description: '',
        hero_image: '',
        video_url: '',
        is_published: false,
        display_order: projects.length,
      });
      setVideoTab('upload');
    }
    setDialogOpen(true);
  }

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(file.type)) {
      toast({ 
        title: 'Invalid file type', 
        description: 'Please upload MP4, WebM, MOV, or AVI files', 
        variant: 'destructive' 
      });
      return;
    }

    // Validate file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      toast({ 
        title: 'File too large', 
        description: 'Maximum file size is 100MB', 
        variant: 'destructive' 
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('project-videos')
        .getPublicUrl(filePath);

      setForm(prev => ({ ...prev, video_url: publicUrl }));
      toast({ title: 'Video uploaded successfully' });
    } catch (error: any) {
      toast({ 
        title: 'Upload failed', 
        description: error.message, 
        variant: 'destructive' 
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const payload = {
      ...form,
      slug: form.slug || generateSlug(form.title),
    };

    if (editingProject) {
      const { error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', editingProject.id);
      
      if (error) {
        toast({ title: 'Error updating project', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Project updated' });
        setDialogOpen(false);
        fetchProjects();
      }
    } else {
      const { error } = await supabase
        .from('projects')
        .insert([payload]);
      
      if (error) {
        toast({ title: 'Error creating project', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Project created' });
        setDialogOpen(false);
        fetchProjects();
      }
    }
  }

  async function togglePublish(project: Project) {
    const { error } = await supabase
      .from('projects')
      .update({ is_published: !project.is_published })
      .eq('id', project.id);
    
    if (error) {
      toast({ title: 'Error updating project', description: error.message, variant: 'destructive' });
    } else {
      fetchProjects();
    }
  }

  async function deleteProject(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: 'Error deleting project', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Project deleted' });
      fetchProjects();
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      placeholder="auto-generated-from-title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client_name">Client Name</Label>
                    <Input
                      id="client_name"
                      value={form.client_name}
                      onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_type">Project Type</Label>
                  <Input
                    id="project_type"
                    value={form.project_type}
                    onChange={(e) => setForm({ ...form, project_type: e.target.value })}
                    placeholder="Office, Hospitality, F&B, Villa"
                  />
                </div>

                {/* Video Upload Section */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Project Video
                  </Label>
                  <Tabs value={videoTab} onValueChange={(v) => setVideoTab(v as 'upload' | 'link')}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upload" className="flex items-center gap-2">
                        <Upload className="h-3 w-3" />
                        Upload Video
                      </TabsTrigger>
                      <TabsTrigger value="link" className="flex items-center gap-2">
                        <Link2 className="h-3 w-3" />
                        External Link
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="space-y-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full h-20 border-dashed"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        {uploading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Uploading...
                          </span>
                        ) : (
                          <span className="flex flex-col items-center gap-1">
                            <Upload className="h-5 w-5" />
                            <span className="text-xs text-muted-foreground">
                              Click to upload video (MP4, WebM, MOV - max 100MB)
                            </span>
                          </span>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Supports Google Drive shared links - paste the link in External Link tab
                      </p>
                    </TabsContent>
                    <TabsContent value="link" className="space-y-3">
                      <Input
                        value={form.video_url}
                        onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                        placeholder="https://drive.google.com/... or direct video URL"
                      />
                      <p className="text-xs text-muted-foreground">
                        Paste a direct video URL or Google Drive shared link
                      </p>
                    </TabsContent>
                  </Tabs>
                  {form.video_url && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Current Video:</p>
                      <p className="text-xs break-all">{form.video_url}</p>
                    </div>
                  )}
                </div>

                {/* Hero Image */}
                <div className="space-y-2">
                  <Label htmlFor="hero_image">Hero Image URL (fallback if no video)</Label>
                  <Input
                    id="hero_image"
                    value={form.hero_image}
                    onChange={(e) => setForm({ ...form, hero_image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                {/* Display Order Grid */}
                <DisplayOrderGrid
                  selectedPosition={form.display_order}
                  onSelect={(pos) => setForm({ ...form, display_order: pos })}
                  existingProjects={projects}
                  currentProjectId={editingProject?.id}
                />

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                  />
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={form.is_published}
                    onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
                  />
                  <Label htmlFor="is_published">Publish immediately</Label>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProject ? 'Update' : 'Create'}
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
            ) : projects.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No projects yet. Click "Add Project" to create one.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">Order</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Media</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-mono text-xs">{project.display_order}</TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.project_type || '-'}</TableCell>
                      <TableCell>
                        {project.video_url ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600">
                            <Video className="h-3 w-3" /> Video
                          </span>
                        ) : project.hero_image ? (
                          <span className="text-xs text-muted-foreground">Image</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePublish(project)}
                          className={project.is_published ? 'text-green-600' : 'text-muted-foreground'}
                        >
                          {project.is_published ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
                          {project.is_published ? 'Published' : 'Draft'}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openDialog(project)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteProject(project.id)}>
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