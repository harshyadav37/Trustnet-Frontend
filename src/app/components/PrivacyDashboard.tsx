import { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Globe, Users, Bell, Download, Trash2, FileText, Database, Share2, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Slider } from '@/app/components/ui/slider';
import { Separator } from '@/app/components/ui/separator';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

export function PrivacyDashboard() {
  const [settings, setSettings] = useState({
    profileVisibility: 'friends',
    showEmail: false,
    showLocation: false,
    activityStatus: true,
    readReceipts: true,
    personalization: 75,
    dataCollection: true,
    thirdPartySharing: false,
    analyticsOptIn: false,
    notifications: {
      messages: true,
      comments: true,
      mentions: true,
      communities: false,
      recommendations: false,
    },
  });

  const updateSetting = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const updateNotification = (key: string, value: boolean) => {
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [key]: value },
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Privacy Dashboard</h1>
            <p className="text-slate-600">Complete control over your data and privacy</p>
          </div>
        </div>
      </div>

      {/* Privacy Score */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Your Privacy Score</h3>
            <p className="text-sm text-slate-600 mb-4">Based on your current settings and data sharing preferences</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-emerald-700">87</span>
              <span className="text-2xl text-emerald-600">/100</span>
            </div>
            <Badge className="mt-3 bg-emerald-600">Strong Privacy</Badge>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-white">
              <Shield className="w-12 h-12 text-emerald-600" />
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="visibility" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
          <TabsTrigger value="data">Data Control</TabsTrigger>
          <TabsTrigger value="personalization">Personalization</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Visibility Settings */}
        <TabsContent value="visibility" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">Profile Visibility</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Control who can see your profile and information</p>

            <div className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">Who can see your profile?</Label>
                <div className="space-y-2">
                  {['everyone', 'friends', 'private'].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateSetting('profileVisibility', option)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        settings.profileVisibility === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {option === 'everyone' && <Globe className="w-5 h-5 text-slate-600" />}
                        {option === 'friends' && <Users className="w-5 h-5 text-slate-600" />}
                        {option === 'private' && <Lock className="w-5 h-5 text-slate-600" />}
                        <div>
                          <div className="font-semibold text-slate-900 capitalize">{option}</div>
                          <div className="text-sm text-slate-600">
                            {option === 'everyone' && 'Anyone on TrustNet can view your profile'}
                            {option === 'friends' && 'Only people in your network can view'}
                            {option === 'private' && 'Only you can view your full profile'}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                  <div className="flex-1">
                    <Label htmlFor="show-email" className="font-semibold cursor-pointer">
                      Show email address
                    </Label>
                    <p className="text-sm text-slate-600 mt-1">Let others see your email on your profile</p>
                  </div>
                  <Switch
                    id="show-email"
                    checked={settings.showEmail}
                    onCheckedChange={(checked) => updateSetting('showEmail', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                  <div className="flex-1">
                    <Label htmlFor="show-location" className="font-semibold cursor-pointer">
                      Show location
                    </Label>
                    <p className="text-sm text-slate-600 mt-1">Display your city/region on your profile</p>
                  </div>
                  <Switch
                    id="show-location"
                    checked={settings.showLocation}
                    onCheckedChange={(checked) => updateSetting('showLocation', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                  <div className="flex-1">
                    <Label htmlFor="activity-status" className="font-semibold cursor-pointer">
                      Activity status
                    </Label>
                    <p className="text-sm text-slate-600 mt-1">Show when you're online or active</p>
                  </div>
                  <Switch
                    id="activity-status"
                    checked={settings.activityStatus}
                    onCheckedChange={(checked) => updateSetting('activityStatus', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                  <div className="flex-1">
                    <Label htmlFor="read-receipts" className="font-semibold cursor-pointer">
                      Read receipts
                    </Label>
                    <p className="text-sm text-slate-600 mt-1">Let others know when you've read their messages</p>
                  </div>
                  <Switch
                    id="read-receipts"
                    checked={settings.readReceipts}
                    onCheckedChange={(checked) => updateSetting('readReceipts', checked)}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Data Control */}
        <TabsContent value="data" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">Data Ownership & Control</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Manage how your data is collected, used, and shared</p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <Label htmlFor="data-collection" className="font-semibold cursor-pointer">
                    Basic data collection
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">
                    Allow collection of basic usage data to improve your experience
                  </p>
                </div>
                <Switch
                  id="data-collection"
                  checked={settings.dataCollection}
                  onCheckedChange={(checked) => updateSetting('dataCollection', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex-1">
                  <Label htmlFor="third-party" className="font-semibold cursor-pointer">
                    Third-party data sharing
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">
                    Share data with verified partners (always disabled by default)
                  </p>
                </div>
                <Switch
                  id="third-party"
                  checked={settings.thirdPartySharing}
                  onCheckedChange={(checked) => updateSetting('thirdPartySharing', checked)}
                  disabled
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <Label htmlFor="analytics" className="font-semibold cursor-pointer">
                    Anonymous analytics
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">
                    Help improve TrustNet with anonymized usage statistics
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={settings.analyticsOptIn}
                  onCheckedChange={(checked) => updateSetting('analyticsOptIn', checked)}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Data Actions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Your Data
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Request Data Report
                </Button>
                <Button variant="outline" className="justify-start text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete All Data
                </Button>
                <Button variant="outline" className="justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Export to Another Platform
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-amber-200 bg-amber-50">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Data Transparency</h4>
                <p className="text-sm text-slate-700">
                  We store only what's necessary for the service to function. You can download or delete your data at any time. 
                  We never sell your data to third parties or use it for advertising outside our platform.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Personalization */}
        <TabsContent value="personalization" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">Content Personalization</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Control how we personalize your feed and recommendations
            </p>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base">Personalization Level</Label>
                  <Badge variant="secondary">{settings.personalization}%</Badge>
                </div>
                <Slider
                  value={[settings.personalization]}
                  onValueChange={(value) => updateSetting('personalization', value[0])}
                  max={100}
                  step={5}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Chronological only</span>
                  <span>Fully personalized</span>
                </div>
                <p className="text-sm text-slate-600 mt-3 p-3 bg-slate-50 rounded-lg">
                  {settings.personalization < 33
                    ? 'Posts shown in chronological order with minimal personalization'
                    : settings.personalization < 66
                    ? 'Balanced mix of chronological and interest-based content'
                    : 'Highly personalized based on your interests and engagement'}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">What influences your feed?</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <span className="text-sm text-slate-700">People you follow</span>
                    <Badge className="bg-blue-600">Always</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <span className="text-sm text-slate-700">Your communities</span>
                    <Badge className="bg-blue-600">Always</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <span className="text-sm text-slate-700">Your interests</span>
                    <Badge className="bg-emerald-600">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <span className="text-sm text-slate-700">Trending topics</span>
                    <Badge variant="secondary">Limited</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <span className="text-sm text-slate-700">Recommended content</span>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">Notification Preferences</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Choose what updates you want to receive</p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <Label htmlFor="notif-messages" className="font-semibold cursor-pointer">
                    Messages
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">Get notified about new direct messages</p>
                </div>
                <Switch
                  id="notif-messages"
                  checked={settings.notifications.messages}
                  onCheckedChange={(checked) => updateNotification('messages', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <Label htmlFor="notif-comments" className="font-semibold cursor-pointer">
                    Comments & Replies
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">When someone responds to your posts or comments</p>
                </div>
                <Switch
                  id="notif-comments"
                  checked={settings.notifications.comments}
                  onCheckedChange={(checked) => updateNotification('comments', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <Label htmlFor="notif-mentions" className="font-semibold cursor-pointer">
                    Mentions
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">When someone mentions you in a post or comment</p>
                </div>
                <Switch
                  id="notif-mentions"
                  checked={settings.notifications.mentions}
                  onCheckedChange={(checked) => updateNotification('mentions', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <Label htmlFor="notif-communities" className="font-semibold cursor-pointer">
                    Community Updates
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">Updates from communities you've joined</p>
                </div>
                <Switch
                  id="notif-communities"
                  checked={settings.notifications.communities}
                  onCheckedChange={(checked) => updateNotification('communities', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <Label htmlFor="notif-recommendations" className="font-semibold cursor-pointer">
                    Recommendations
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">Suggested content and connections</p>
                </div>
                <Switch
                  id="notif-recommendations"
                  checked={settings.notifications.recommendations}
                  onCheckedChange={(checked) => updateNotification('recommendations', checked)}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}