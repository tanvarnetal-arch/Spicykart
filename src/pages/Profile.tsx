import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/db/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Shield, Calendar, Edit2, Check, X, Camera, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const ProfilePage: React.FC = () => {
  const auth = useAuth();
  const user = auth.user;
  const profile = auth.profile;
  const { refreshProfile, signOut } = auth;
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || '');
    }
  }, [profile]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const profileRef = doc(db, 'profiles', user.uid);
      await updateDoc(profileRef, {
        fullName,
        updatedAt: new Date().toISOString(),
      });

      await refreshProfile();
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.info('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  if (!user || !profile) return null;

  return (
    <div className="container py-12 md:py-24 max-w-4xl">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Badge variant="outline" className="w-fit px-4 py-1 text-xs font-black bg-primary/5 border-primary/20 text-primary uppercase tracking-widest">
            Personal Garden
          </Badge>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-5xl font-black text-foreground tracking-tight sm:text-6xl">Your Profile</h1>
            <Button
              variant="destructive"
              className="w-fit rounded-xl font-bold gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar and Info Card */}
          <Card className="md:col-span-1 border-none shadow-xl rounded-[2.5rem] bg-white dark:bg-card overflow-hidden h-fit">
            <div className="bg-primary/10 h-32 relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-3xl bg-white dark:bg-card flex items-center justify-center shadow-xl border-4 border-white dark:border-card overflow-hidden">
                    {profile?.avatarUrl ? (
                      <img src={profile.avatarUrl} alt={profile.username} className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-12 w-12 text-primary/40" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <CardContent className="pt-16 pb-8 text-center flex flex-col gap-4">
              <div>
                <h3 className="text-2xl font-black text-foreground">@{profile.username}</h3>
                <p className="text-muted-foreground font-bold">{profile.role === 'admin' ? 'Store Administrator' : 'Spicy Enthusiast'}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {profile?.role === 'admin' && (
                  <Badge className="bg-accent text-accent-foreground font-bold">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                )}
                <Badge variant="outline" className="font-bold">
                  Verified Buyer
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="md:col-span-2 border-none shadow-xl rounded-[3rem] bg-white dark:bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-8 pb-4">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-2xl font-black">Account Details</CardTitle>
                <CardDescription className="font-medium text-sm">Manage your personal information</CardDescription>
              </div>
              {!isEditing ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-secondary/50 hover:bg-primary hover:text-white transition-colors h-12 w-12 shadow-sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-5 w-5" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors h-12 w-12 shadow-sm"
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors h-12 w-12 shadow-sm"
                    onClick={handleUpdateProfile}
                    disabled={isLoading}
                  >
                    <Check className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <User className="h-3 w-3" /> Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12 rounded-xl bg-secondary/50 border-none focus-visible:ring-primary font-bold"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-lg font-black text-foreground">{profile?.fullName || 'Not provided'}</p>
                  )}
                </div>
                <div className="space-y-3">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Mail className="h-3 w-3" /> Email Address
                  </Label>
                  <p className="text-lg font-bold text-muted-foreground">{profile.email}</p>
                </div>
                <div className="space-y-3">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Shield className="h-3 w-3" /> Member Role
                  </Label>
                  <p className="text-lg font-bold capitalize">{profile.role}</p>
                </div>
                <div className="space-y-3">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3 w-3" /> Last Updated
                  </Label>
                  <p className="text-lg font-bold text-muted-foreground">
                    {new Date(profile.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <Separator className="bg-primary/5" />

              <div className="flex flex-col gap-6">
                <h4 className="text-xl font-black">Security Settings</h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border-none">
                    <div className="flex flex-col">
                      <span className="font-bold">Password</span>
                      <span className="text-xs text-muted-foreground font-medium">Last changed 2 months ago</span>
                    </div>
                    <Button variant="outline" className="rounded-xl font-bold h-10 border-primary/10">Change</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border-none">
                    <div className="flex flex-col">
                      <span className="font-bold">Two-Factor Authentication</span>
                      <span className="text-xs text-muted-foreground font-medium">Currently disabled</span>
                    </div>
                    <Button variant="outline" className="rounded-xl font-bold h-10 border-primary/10">Enable</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
