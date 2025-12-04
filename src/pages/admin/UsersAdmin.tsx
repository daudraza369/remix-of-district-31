import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Shield, ShieldCheck, UserX } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

interface UserRole {
  user_id: string;
  role: AppRole;
}

export default function UsersAdmin() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<Record<string, AppRole>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const [profilesRes, rolesRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('user_roles').select('user_id, role'),
    ]);

    if (profilesRes.error) {
      toast({ title: 'Error fetching users', description: profilesRes.error.message, variant: 'destructive' });
    } else {
      setProfiles(profilesRes.data || []);
    }

    if (rolesRes.data) {
      const rolesMap: Record<string, AppRole> = {};
      rolesRes.data.forEach((r: UserRole) => {
        rolesMap[r.user_id] = r.role;
      });
      setRoles(rolesMap);
    }
    
    setLoading(false);
  }

  async function updateRole(userId: string, newRole: AppRole | 'none') {
    if (userId === user?.id) {
      toast({ title: 'Cannot modify your own role', variant: 'destructive' });
      return;
    }

    // Remove existing role first
    await supabase.from('user_roles').delete().eq('user_id', userId);

    if (newRole !== 'none') {
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: newRole }]);
      
      if (error) {
        toast({ title: 'Error updating role', description: error.message, variant: 'destructive' });
        return;
      }
    }

    toast({ title: 'Role updated' });
    fetchUsers();
  }

  function getRoleBadge(userId: string) {
    const role = roles[userId];
    if (!role) {
      return <Badge variant="outline" className="text-muted-foreground">No access</Badge>;
    }
    if (role === 'admin') {
      return <Badge className="bg-primary"><ShieldCheck className="h-3 w-3 mr-1" />Admin</Badge>;
    }
    return <Badge variant="secondary"><Shield className="h-3 w-3 mr-1" />Editor</Badge>;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage admin and editor access</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Users</CardTitle>
            <CardDescription>
              Assign roles to control who can access the admin panel. Admins have full access, editors can manage content but not users.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : profiles.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No users found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Current Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-[180px]">Set Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profiles.map((profile) => {
                    const isCurrentUser = profile.user_id === user?.id;
                    return (
                      <TableRow key={profile.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{profile.full_name || 'No name'}</p>
                            <p className="text-sm text-muted-foreground">{profile.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(profile.user_id)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(profile.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {isCurrentUser ? (
                            <span className="text-sm text-muted-foreground">Cannot modify</span>
                          ) : (
                            <Select
                              value={roles[profile.user_id] || 'none'}
                              onValueChange={(value) => updateRole(profile.user_id, value as AppRole | 'none')}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">
                                  <span className="flex items-center gap-2">
                                    <UserX className="h-4 w-4" />
                                    No access
                                  </span>
                                </SelectItem>
                                <SelectItem value="editor">
                                  <span className="flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Editor
                                  </span>
                                </SelectItem>
                                <SelectItem value="admin">
                                  <span className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" />
                                    Admin
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge className="bg-primary"><ShieldCheck className="h-3 w-3 mr-1" />Admin</Badge>
                <div>
                  <p className="font-medium">Full Access</p>
                  <p className="text-sm text-muted-foreground">Can manage all content, media, and user roles</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary"><Shield className="h-3 w-3 mr-1" />Editor</Badge>
                <div>
                  <p className="font-medium">Content Access</p>
                  <p className="text-sm text-muted-foreground">Can manage content and media, but cannot manage users</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline">No access</Badge>
                <div>
                  <p className="font-medium">No Admin Access</p>
                  <p className="text-sm text-muted-foreground">Cannot access the admin panel</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
