import { useState } from 'react';
import { User, Bell, Lock, Palette, Globe, Info, HelpCircle, LogOut, Shield } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Separator } from '@/app/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

export function Settings() {
  const [settings, setSettings] = useState({
    displayName: 'Jane Doe',
    username: 'janedoe',
    email: 'jane@example.com',
    bio: 'Privacy advocate and tech enthusiast',
    language: 'en',
    theme: 'light',
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: false,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="account">
            <User className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  value={settings.displayName}
                  onChange={(e) => updateSetting('displayName', e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={settings.username}
                  onChange={(e) => updateSetting('username', e.target.value)}
                  className="mt-1.5"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Your unique identifier on TrustNet
                </p>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSetting('email', e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={settings.bio}
                  onChange={(e) => updateSetting('bio', e.target.value)}
                  className="mt-1.5"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Brief description for your profile
                </p>
              </div>
            </div>
            <Separator className="my-6" />
            <Button>Save Changes</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Language & Region</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <Label htmlFor="email-notifs" className="font-semibold cursor-pointer">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">
                    Receive important updates via email
                  </p>
                </div>
                <Switch
                  id="email-notifs"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <Label htmlFor="push-notifs" className="font-semibold cursor-pointer">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">
                    Get real-time notifications on your device
                  </p>
                </div>
                <Switch
                  id="push-notifs"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Security</h3>
                <p className="text-sm text-slate-600">
                  Keep your account safe and secure
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <Label htmlFor="2fa" className="font-semibold cursor-pointer">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  id="2fa"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
                />
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Password</h4>
                <Button variant="outline">Change Password</Button>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Active Sessions</h4>
                <p className="text-sm text-slate-600 mb-3">
                  You're currently logged in on 2 devices
                </p>
                <Button variant="outline">Manage Sessions</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-red-200 bg-red-50">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Danger Zone
            </h3>
            <p className="text-sm text-slate-700 mb-4">
              These actions are permanent and cannot be undone
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                Deactivate Account
              </Button>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Theme</h3>
            <div className="space-y-3">
              {['light', 'dark', 'auto'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => updateSetting('theme', theme)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    settings.theme === theme
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-900 capitalize mb-1">
                    {theme}
                  </div>
                  <div className="text-sm text-slate-600">
                    {theme === 'light' && 'Always use light theme'}
                    {theme === 'dark' && 'Always use dark theme'}
                    {theme === 'auto' && 'Match your system preferences'}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Actions */}
      <Card className="p-6 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Need Help?</h3>
            <p className="text-sm text-slate-600">Visit our help center or contact support</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </Button>
            <Button variant="outline" size="sm">
              <Info className="w-4 h-4 mr-2" />
              About
            </Button>
            <Button variant="outline" size="sm" className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
