import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Plus, 
  GripVertical,
  X,
  Check
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

export default function SectionsAdmin() {
  const [sections, setSections] = useState<SectionContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionContent | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, any>>({});
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [currentImageField, setCurrentImageField] = useState<string | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);
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
      if (typedData.length > 0 && !selectedSection) {
        setSelectedSection(typedData[0]);
        setEditedContent(typedData[0].content as Record<string, any>);
      }
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

  function selectSection(section: SectionContent) {
    setSelectedSection(section);
    setEditedContent(section.content as Record<string, any>);
  }

  async function saveSection() {
    if (!selectedSection) return;
    
    setSaving(true);
    const { error } = await supabase
      .from('section_content')
      .update({ content: editedContent })
      .eq('id', selectedSection.id);
    
    if (error) {
      toast({ title: 'Error saving section', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Section saved successfully' });
      fetchSections();
    }
    setSaving(false);
  }

  function updateField(field: string, value: any) {
    setEditedContent(prev => ({ ...prev, [field]: value }));
  }

  function updateItemField(index: number, field: string, value: any) {
    const items = [...(editedContent.items || [])];
    items[index] = { ...items[index], [field]: value };
    setEditedContent(prev => ({ ...prev, items }));
  }

  function addItem() {
    const items = [...(editedContent.items || [])];
    items.push({ title: 'New Item', description: '', image: '' });
    setEditedContent(prev => ({ ...prev, items }));
  }

  function removeItem(index: number) {
    const items = [...(editedContent.items || [])];
    items.splice(index, 1);
    setEditedContent(prev => ({ ...prev, items }));
  }

  function openMediaSelector(field: string, itemIndex?: number) {
    setCurrentImageField(field);
    setCurrentItemIndex(itemIndex ?? null);
    setMediaDialogOpen(true);
  }

  function selectMedia(asset: MediaAsset) {
    if (currentImageField) {
      if (currentItemIndex !== null) {
        updateItemField(currentItemIndex, currentImageField, asset.file_path);
      } else {
        updateField(currentImageField, asset.file_path);
      }
    }
    setMediaDialogOpen(false);
    setCurrentImageField(null);
    setCurrentItemIndex(null);
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

  // Group sections by page
  const sectionsByPage = sections.reduce((acc, section) => {
    if (!acc[section.page]) {
      acc[section.page] = [];
    }
    acc[section.page].push(section);
    return acc;
  }, {} as Record<string, SectionContent[]>);

  const pages = Object.keys(sectionsByPage);

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-muted-foreground">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Section Content</h1>
            <p className="text-muted-foreground mt-1">Manage media and content for each section</p>
          </div>
          {selectedSection && (
            <Button onClick={saveSection} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Sections List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sections</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue={pages[0]} className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b px-4">
                  {pages.map(page => (
                    <TabsTrigger key={page} value={page} className="text-xs">
                      {page}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {pages.map(page => (
                  <TabsContent key={page} value={page} className="m-0">
                    <div className="divide-y">
                      {sectionsByPage[page].map(section => (
                        <button
                          key={section.id}
                          onClick={() => selectSection(section)}
                          className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors ${
                            selectedSection?.id === section.id ? 'bg-muted border-l-2 border-primary' : ''
                          }`}
                        >
                          <p className="font-medium text-sm">{section.section_name}</p>
                          <p className="text-xs text-muted-foreground">{section.section_key}</p>
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Editor Panel */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedSection?.section_name || 'Select a section'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedSection ? (
                <div className="space-y-6">
                  {/* Text Fields */}
                  {Object.entries(editedContent).map(([key, value]) => {
                    if (key === 'items') return null;
                    
                    const isImage = key.includes('image') || key.includes('Image');
                    
                    if (isImage) {
                      return (
                        <div key={key} className="space-y-2">
                          <Label className="capitalize">{key.replace(/_/g, ' ')}</Label>
                          <div className="flex gap-2">
                            <Input 
                              value={value as string || ''} 
                              onChange={(e) => updateField(key, e.target.value)}
                              placeholder="Image URL"
                              className="flex-1"
                            />
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => openMediaSelector(key)}
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          {value && (
                            <div className="relative w-32 h-20 rounded overflow-hidden bg-muted">
                              <img 
                                src={value as string} 
                                alt="" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      );
                    }

                    if (typeof value === 'string' && value.length > 100) {
                      return (
                        <div key={key} className="space-y-2">
                          <Label className="capitalize">{key.replace(/_/g, ' ')}</Label>
                          <Textarea 
                            value={value} 
                            onChange={(e) => updateField(key, e.target.value)}
                            rows={4}
                          />
                        </div>
                      );
                    }

                    if (typeof value === 'string') {
                      return (
                        <div key={key} className="space-y-2">
                          <Label className="capitalize">{key.replace(/_/g, ' ')}</Label>
                          <Input 
                            value={value} 
                            onChange={(e) => updateField(key, e.target.value)}
                          />
                        </div>
                      );
                    }

                    return null;
                  })}

                  {/* Items Array */}
                  {editedContent.items && Array.isArray(editedContent.items) && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Items</Label>
                        <Button variant="outline" size="sm" onClick={addItem}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Item
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {editedContent.items.map((item: any, index: number) => (
                          <Card key={index} className="relative">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => removeItem(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <CardContent className="pt-6 space-y-4">
                              {Object.entries(item).map(([itemKey, itemValue]) => {
                                const isItemImage = itemKey.includes('image') || itemKey.includes('Image');
                                
                                if (isItemImage) {
                                  return (
                                    <div key={itemKey} className="space-y-2">
                                      <Label className="capitalize text-sm">{itemKey.replace(/_/g, ' ')}</Label>
                                      <div className="flex gap-2">
                                        <Input 
                                          value={itemValue as string || ''} 
                                          onChange={(e) => updateItemField(index, itemKey, e.target.value)}
                                          placeholder="Image URL"
                                          className="flex-1"
                                        />
                                        <Button 
                                          variant="outline" 
                                          size="icon"
                                          onClick={() => openMediaSelector(itemKey, index)}
                                        >
                                          <ImageIcon className="h-4 w-4" />
                                        </Button>
                                      </div>
                                      {itemValue && (
                                        <div className="relative w-24 h-16 rounded overflow-hidden bg-muted">
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
                                      <Label className="capitalize text-sm">{itemKey.replace(/_/g, ' ')}</Label>
                                      <Input 
                                        value={itemValue} 
                                        onChange={(e) => updateItemField(index, itemKey, e.target.value)}
                                      />
                                    </div>
                                  );
                                }

                                return null;
                              })}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">Select a section from the list to edit its content</p>
              )}
            </CardContent>
          </Card>
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
                    className="aspect-square rounded-md overflow-hidden border-2 border-transparent hover:border-primary transition-colors"
                  >
                    <img 
                      src={asset.file_path} 
                      alt={asset.file_name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
            </div>

            {mediaAssets.filter(a => a.file_type.startsWith('image/')).length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No images in media library. Upload one above.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
