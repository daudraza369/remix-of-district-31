import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2, Copy, Check, Image, FileVideo, File, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaAsset {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  alt_text: string | null;
  created_at: string;
}

export default function MediaAdmin() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAssets();
  }, []);

  async function fetchAssets() {
    const { data, error } = await supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: 'Error fetching media', description: error.message, variant: 'destructive' });
    } else {
      setAssets(data || []);
    }
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    for (const file of Array.from(files)) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) {
        toast({ title: `Error uploading ${file.name}`, description: uploadError.message, variant: 'destructive' });
        continue;
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
        toast({ title: `Error saving ${file.name}`, description: dbError.message, variant: 'destructive' });
      }
    }

    toast({ title: 'Upload complete' });
    setUploading(false);
    fetchAssets();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function deleteAsset(asset: MediaAsset) {
    if (!confirm('Are you sure you want to delete this file?')) return;

    // Extract the path from the URL
    const pathMatch = asset.file_path.match(/\/media\/(.+)$/);
    if (pathMatch) {
      await supabase.storage.from('media').remove([pathMatch[1]]);
    }

    const { error } = await supabase
      .from('media_assets')
      .delete()
      .eq('id', asset.id);
    
    if (error) {
      toast({ title: 'Error deleting file', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'File deleted' });
      fetchAssets();
      setSelectedAsset(null);
    }
  }

  function copyUrl(url: string, id: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: 'URL copied to clipboard' });
  }

  function getFileIcon(type: string) {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return FileVideo;
    return File;
  }

  function formatFileSize(bytes: number | null) {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const filteredAssets = assets.filter(asset =>
    asset.file_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Media Library</h1>
            <p className="text-muted-foreground mt-1">Upload and manage your images and files</p>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleUpload}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : filteredAssets.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? 'No files match your search' : 'No files uploaded yet'}
              </p>
              {!searchQuery && (
                <Button variant="outline" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                  Upload your first file
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredAssets.map((asset) => {
              const Icon = getFileIcon(asset.file_type);
              const isImage = asset.file_type.startsWith('image/');
              
              return (
                <Card 
                  key={asset.id} 
                  className="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  onClick={() => setSelectedAsset(asset)}
                >
                  <CardContent className="p-2">
                    <div className="aspect-square bg-muted rounded-md overflow-hidden flex items-center justify-center">
                      {isImage ? (
                        <img
                          src={asset.file_path}
                          alt={asset.alt_text || asset.file_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs mt-2 truncate">{asset.file_name}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Detail Dialog */}
        <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="truncate">{selectedAsset?.file_name}</DialogTitle>
            </DialogHeader>
            {selectedAsset && (
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                  {selectedAsset.file_type.startsWith('image/') ? (
                    <img
                      src={selectedAsset.file_path}
                      alt={selectedAsset.alt_text || selectedAsset.file_name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <File className="h-16 w-16 text-muted-foreground" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input value={selectedAsset.file_path} readOnly className="flex-1" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyUrl(selectedAsset.file_path, selectedAsset.id)}
                    >
                      {copiedId === selectedAsset.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{selectedAsset.file_type}</span>
                    <span>{formatFileSize(selectedAsset.file_size)}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedAsset(null)}>
                    Close
                  </Button>
                  <Button variant="destructive" onClick={() => deleteAsset(selectedAsset)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
