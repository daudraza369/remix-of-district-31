import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  Image as ImageIcon, 
  Upload, 
  Plus, 
  X,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  GripVertical,
  Layers,
  FileText,
  Home,
  Briefcase,
  Users,
  FolderOpen,
  Phone,
  TreeDeciduous,
  ExternalLink
} from 'lucide-react';

interface SectionContent {
  id: string;
  section_key: string;
  section_name: string;
  page: string;
  content: Record<string, any>;
  is_published: boolean | null;
  created_at: string;
  updated_at: string;
}

interface MediaAsset {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
}

const PAGE_CONFIG = {
  home: { 
    label: 'Home', 
    icon: Home,
    description: 'Main landing page with hero, services, portfolio and more'
  },
  about: { 
    label: 'About', 
    icon: Users,
    description: 'Company story, values and team information'
  },
  services: { 
    label: 'Services', 
    icon: Briefcase,
    description: 'Service offerings and capabilities'
  },
  projects: { 
    label: 'Projects', 
    icon: FolderOpen,
    description: 'Portfolio and project showcase'
  },
  collection: { 
    label: 'Collection', 
    icon: TreeDeciduous,
    description: 'Product catalog and collection items'
  },
  contact: { 
    label: 'Contact', 
    icon: Phone,
    description: 'Contact form and information'
  }
};

export default function PageBuilder() {
  const [sections, setSections] = useState<SectionContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [editedSections, setEditedSections] = useState<Record<string, Record<string, any>>>({});
  const [hasChanges, setHasChanges] = useState(false);
  
  // Media dialog state
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [currentImageField, setCurrentImageField] = useState<{ sectionId: string; field: string; itemIndex?: number } | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchSections();
    fetchMediaAssets();
  }, []);

  async function fetchSections() {
    const { data, error } = await supabase
      .from('section_content')
      .select('*')
      .order('page', { ascending: true });
    
    if (error) {
      toast({ title: 'Error fetching sections', description: error.message, variant: 'destructive' });
    } else {
      const typedData = (data || []) as unknown as SectionContent[];
      setSections(typedData);
      
      // Initialize edited content
      const initial: Record<string, Record<string, any>> = {};
      typedData.forEach(s => {
        initial[s.id] = s.content as Record<string, any>;
      });
      setEditedSections(initial);
    }
    setLoading(false);
  }

  async function fetchMediaAssets() {
    const { data } = await supabase
      .from('media_assets')
      .select('id, file_name, file_path, file_type')
      .order('created_at', { ascending: false });
    
    if (data) {
      setMediaAssets(data);
    }
  }

  function toggleSection(sectionId: string) {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }

  function updateField(sectionId: string, field: string, value: any) {
    setEditedSections(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [field]: value }
    }));
    setHasChanges(true);
  }

  function updateItemField(sectionId: string, itemIndex: number, field: string, value: any) {
    setEditedSections(prev => {
      const sectionContent = prev[sectionId] || {};
      const items = [...(sectionContent.items || [])];
      items[itemIndex] = { ...items[itemIndex], [field]: value };
      return {
        ...prev,
        [sectionId]: { ...sectionContent, items }
      };
    });
    setHasChanges(true);
  }

  function addItem(sectionId: string) {
    setEditedSections(prev => {
      const sectionContent = prev[sectionId] || {};
      const items = [...(sectionContent.items || [])];
      items.push({ title: 'New Item', description: '', image: '' });
      return {
        ...prev,
        [sectionId]: { ...sectionContent, items }
      };
    });
    setHasChanges(true);
  }

  function removeItem(sectionId: string, index: number) {
    setEditedSections(prev => {
      const sectionContent = prev[sectionId] || {};
      const items = [...(sectionContent.items || [])];
      items.splice(index, 1);
      return {
        ...prev,
        [sectionId]: { ...sectionContent, items }
      };
    });
    setHasChanges(true);
  }

  async function saveAllChanges() {
    setSaving(true);
    
    try {
      for (const section of sections.filter(s => s.page === activePage)) {
        const content = editedSections[section.id];
        if (content) {
          const { error } = await supabase
            .from('section_content')
            .update({ content })
            .eq('id', section.id);
          
          if (error) throw error;
        }
      }
      
      toast({ title: 'Page saved successfully' });
      setHasChanges(false);
      fetchSections();
    } catch (error: any) {
      toast({ title: 'Error saving', description: error.message, variant: 'destructive' });
    }
    
    setSaving(false);
  }

  function openMediaSelector(sectionId: string, field: string, itemIndex?: number) {
    setCurrentImageField({ sectionId, field, itemIndex });
    setMediaDialogOpen(true);
  }

  function selectMedia(asset: MediaAsset) {
    if (currentImageField) {
      const { sectionId, field, itemIndex } = currentImageField;
      if (itemIndex !== undefined) {
        updateItemField(sectionId, itemIndex, field, asset.file_path);
      } else {
        updateField(sectionId, field, asset.file_path);
      }
    }
    setMediaDialogOpen(false);
    setCurrentImageField(null);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);

    const { error: dbError } = await supabase
      .from('media_assets')
      .insert([{
        file_name: file.name,
        file_path: urlData.publicUrl,
        file_type: file.type,
        file_size: file.size,
      }]);

    if (dbError) {
      toast({ title: 'Error saving file', description: dbError.message, variant: 'destructive' });
    } else {
      toast({ title: 'File uploaded' });
      fetchMediaAssets();
    }
    
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const pageSections = sections.filter(s => s.page === activePage);
  const pages = Object.keys(PAGE_CONFIG);

  function renderFieldEditor(sectionId: string, key: string, value: any) {
    const isImage = key.toLowerCase().includes('image');
    const content = editedSections[sectionId] || {};
    const currentValue = content[key] ?? value;

    if (isImage) {
      return (
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">{key.replace(/_/g, ' ')}</Label>
          <div className="flex gap-2">
            <Input 
              value={currentValue as string || ''} 
              onChange={(e) => updateField(sectionId, key, e.target.value)}
              placeholder="Image URL"
              className="flex-1 text-sm"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => openMediaSelector(sectionId, key)}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>
          {currentValue && (
            <div className="relative w-full h-32 rounded-md overflow-hidden bg-muted border">
              <img 
                src={currentValue as string} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      );
    }

    if (typeof currentValue === 'string' && currentValue.length > 80) {
      return (
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">{key.replace(/_/g, ' ')}</Label>
          <Textarea 
            value={currentValue} 
            onChange={(e) => updateField(sectionId, key, e.target.value)}
            rows={3}
            className="text-sm"
          />
        </div>
      );
    }

    if (typeof currentValue === 'string') {
      return (
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">{key.replace(/_/g, ' ')}</Label>
          <Input 
            value={currentValue} 
            onChange={(e) => updateField(sectionId, key, e.target.value)}
            className="text-sm"
          />
        </div>
      );
    }

    return null;
  }

  function renderItemEditor(sectionId: string, item: any, index: number) {
    const content = editedSections[sectionId] || {};
    const items = content.items || [];
    const currentItem = items[index] || item;

    return (
      <Card key={index} className="relative border-dashed">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 text-destructive hover:text-destructive"
          onClick={() => removeItem(sectionId, index)}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardContent className="pt-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <GripVertical className="h-3 w-3" />
            Item {index + 1}
          </div>
          {Object.entries(currentItem).map(([itemKey, itemValue]) => {
            const isItemImage = itemKey.toLowerCase().includes('image');
            
            if (isItemImage) {
              return (
                <div key={itemKey} className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">{itemKey.replace(/_/g, ' ')}</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={itemValue as string || ''} 
                      onChange={(e) => updateItemField(sectionId, index, itemKey, e.target.value)}
                      placeholder="Image URL"
                      className="flex-1 text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => openMediaSelector(sectionId, itemKey, index)}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  {itemValue && (
                    <div className="relative w-20 h-14 rounded overflow-hidden bg-muted">
                      <img 
                        src={itemValue as string} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              );
            }

            if (typeof itemValue === 'string') {
              return (
                <div key={itemKey} className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">{itemKey.replace(/_/g, ' ')}</Label>
                  <Input 
                    value={itemValue} 
                    onChange={(e) => updateItemField(sectionId, index, itemKey, e.target.value)}
                    className="text-sm"
                  />
                </div>
              );
            }

            return null;
          })}
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-muted-foreground">Loading Page Builder...</div>
      </AdminLayout>
    );
  }

  const PageIcon = PAGE_CONFIG[activePage as keyof typeof PAGE_CONFIG]?.icon || FileText;

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-background">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-display font-bold">Page Builder</h1>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <PageIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{PAGE_CONFIG[activePage as keyof typeof PAGE_CONFIG]?.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href={`/${activePage === 'home' ? '' : activePage}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Preview
              </a>
            </Button>
            <Button onClick={saveAllChanges} disabled={saving || !hasChanges} size="sm">
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : hasChanges ? 'Save Changes' : 'Saved'}
            </Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Page Sidebar */}
          <div className="w-56 border-r bg-muted/30 overflow-y-auto">
            <div className="p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Pages</p>
              <div className="space-y-1">
                {pages.map(page => {
                  const config = PAGE_CONFIG[page as keyof typeof PAGE_CONFIG];
                  const Icon = config?.icon || FileText;
                  const pageHasContent = sections.some(s => s.page === page);
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setActivePage(page)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                        activePage === page 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="flex-1 text-left">{config?.label}</span>
                      {!pageHasContent && (
                        <span className="text-xs opacity-60">Empty</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section Editor */}
          <div className="flex-1 overflow-y-auto bg-background">
            <div className="max-w-3xl mx-auto p-6 space-y-4">
              {pageSections.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Layers className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg mb-2">No sections configured for this page</p>
                  <p className="text-sm">Add section content from the database to start editing</p>
                </div>
              ) : (
                pageSections.map((section) => {
                  const isExpanded = expandedSections.has(section.id);
                  const content = editedSections[section.id] || section.content as Record<string, any>;
                  const hasItems = content.items && Array.isArray(content.items);
                  
                  return (
                    <Collapsible key={section.id} open={isExpanded} onOpenChange={() => toggleSection(section.id)}>
                      <Card className={`transition-shadow ${isExpanded ? 'shadow-md ring-1 ring-primary/20' : ''}`}>
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                )}
                                <div>
                                  <CardTitle className="text-base">{section.section_name}</CardTitle>
                                  <p className="text-xs text-muted-foreground mt-0.5">{section.section_key}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {section.is_published ? (
                                  <Eye className="h-4 w-4 text-green-600" />
                                ) : (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <CardContent className="pt-0 space-y-6 border-t">
                            {/* Regular Fields */}
                            <div className="pt-4 space-y-4">
                              {Object.entries(content).map(([key, value]) => {
                                if (key === 'items') return null;
                                return (
                                  <div key={key}>
                                    {renderFieldEditor(section.id, key, value)}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Items Array */}
                            {hasItems && (
                              <div className="space-y-4 pt-4 border-t">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-semibold">Items ({content.items.length})</Label>
                                  <Button variant="outline" size="sm" onClick={() => addItem(section.id)}>
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Item
                                  </Button>
                                </div>
                                
                                <div className="space-y-3">
                                  {content.items.map((item: any, index: number) => 
                                    renderItemEditor(section.id, item, index)
                                  )}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Media Selector Dialog */}
      <Dialog open={mediaDialogOpen} onOpenChange={setMediaDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload New Image'}
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {mediaAssets
                .filter(a => a.file_type.startsWith('image/'))
                .map(asset => (
                  <button
                    key={asset.id}
                    onClick={() => selectMedia(asset)}
                    className="relative aspect-square rounded-md overflow-hidden border-2 border-transparent hover:border-primary transition-colors group"
                  >
                    <img 
                      src={asset.file_path} 
                      alt={asset.file_name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs">Select</span>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
