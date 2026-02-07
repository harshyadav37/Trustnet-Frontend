'use client';
import { Camera, MapPin, Link as LinkIcon, Calendar, Award, Shield, TrendingUp, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Progress } from '@/app/components/ui/progress';
import { useEffect, useState } from "react";
import Profileupdate from "@/app/components/Profileupdate";
export function Profile() {
   const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setUser(storedUser);
    }
  }, []);
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Profile Header */}
      <Card className="overflow-hidden mb-6">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 relative">
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4"
          >
            <Camera className="w-4 h-4 mr-2" />
            Edit Cover
          </Button>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="flex items-end justify-between -mt-16 mb-4">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src={user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"} alt={user?.name || 'User'} />
                <AvatarFallback>{(user?.name || user?.userName || 'User').split(' ').map((s: string)=>s[0]).slice(0,2).join('').toUpperCase()}</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <Camera className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900"> {user?.name}</h1>
              <Badge className="bg-emerald-600">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
            <p className="text-slate-600 mb-1">{user?.email}</p>
            {/* ABOUT */}
            <p className="text-slate-700 max-w-2xl">
              {user?.about || 'Privacy advocate, tech enthusiast, and community builder. Passionate about creating technology that respects human autonomy and dignity.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
            {/* LOCATION */}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{user?.location || 'San Francisco, CA'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4" />
              <a href="#" className="text-blue-600 hover:underline">janedoe.com</a>
            </div>
            {/* DOB  */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{user?.dob ? new Date(user.dob).toLocaleDateString() : 'Joined January 2026'}</span>
            </div>
          </div>

          <div className="flex gap-6 text-sm">
            <button className="hover:underline">
              <span className="font-semibold text-slate-900">234</span>
              <span className="text-slate-600 ml-1">Following</span>
            </button>
            <button className="hover:underline">
              <span className="font-semibold text-slate-900">1.2K</span>
              <span className="text-slate-600 ml-1">Followers</span>
            </button>
            <button className="hover:underline">
              <span className="font-semibold text-slate-900">8</span>
              <span className="text-slate-600 ml-1">Communities</span>
            </button>
          </div>
        </div>
      </Card>
        {isOpen && (
          <Profileupdate
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            user={user}
            onSave={(updatedUser: any) => {
              setUser(updatedUser);
              try {
                localStorage.setItem('user', JSON.stringify(updatedUser));
              } catch (e) {
                console.error('Failed to save user to localStorage', e);
              }
              setIsOpen(false);
            }}
          />
        )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Trust Score</p>
              <p className="text-2xl font-bold text-slate-900">92</p>
            </div>
          </div>
          <Progress value={92} className="h-2" />
          <p className="text-xs text-slate-600 mt-2">Top 10% of community members</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Contributions</p>
              <p className="text-2xl font-bold text-slate-900">156</p>
            </div>
          </div>
          <p className="text-xs text-slate-600">Posts, comments, and discussions</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Positive Impact</p>
              <p className="text-2xl font-bold text-slate-900">1.8K</p>
            </div>
          </div>
          <p className="text-xs text-slate-600">Likes and helpful reactions received</p>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <Card className="p-6">
            <p className="text-center text-slate-600 py-12">
              Your posts and activity will appear here
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="communities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Ethical Tech', 'Mindful Living'].map((community, index) => (
              <Card key={index} className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{community}</h3>
                    <p className="text-sm text-slate-600">Member since Jan 2026</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Active contributor
                </Badge>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Early Adopter', icon: Award, color: 'blue' },
              { title: 'Trusted Member', icon: Shield, color: 'emerald' },
              { title: 'Community Builder', icon: TrendingUp, color: 'purple' },
            ].map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className={`p-5 bg-gradient-to-br from-${achievement.color}-50 to-${achievement.color}-100 border-${achievement.color}-200`}>
                  <div className={`w-12 h-12 rounded-full bg-${achievement.color}-600 flex items-center justify-center mb-3 mx-auto`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-center mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-slate-600 text-center">
                    Unlocked Jan 2026
                  </p>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
