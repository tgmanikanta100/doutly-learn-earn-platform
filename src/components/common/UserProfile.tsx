
import React, { useState } from 'react';
import { User, Settings, LogOut, Bell, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const UserProfile = () => {
  const { user, userRole } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:text-red-700">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email || ''} disabled />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={userRole || ''} disabled />
            </div>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter your phone number" />
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-gray-600">Receive email notifications</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4" />
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <Button variant="outline" className="w-full">
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
