import { useState } from 'react';
import { Users, Search, Plus, CheckCircle, AlertCircle, Shield, TrendingUp, Clock, MessageCircle } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  members: number;
  posts: number;
  category: string;
  moderationLevel: 'strict' | 'moderate' | 'relaxed';
  isJoined: boolean;
  isVerified: boolean;
  privacy: 'public' | 'private';
}

const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Ethical Tech',
    description: 'Discussing technology that respects privacy, autonomy, and human values',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300',
    members: 12453,
    posts: 3421,
    category: 'Technology',
    moderationLevel: 'strict',
    isJoined: true,
    isVerified: true,
    privacy: 'public',
  },
  {
    id: '2',
    name: 'Mindful Living',
    description: 'Community focused on mental health, wellness, and balanced digital life',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300',
    members: 8934,
    posts: 2156,
    category: 'Wellness',
    moderationLevel: 'moderate',
    isJoined: true,
    isVerified: true,
    privacy: 'public',
  },
  {
    id: '3',
    name: 'Privacy Advocates',
    description: 'Learning and sharing best practices for online privacy and data protection',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=300',
    members: 15672,
    posts: 5234,
    category: 'Privacy',
    moderationLevel: 'strict',
    isJoined: false,
    isVerified: true,
    privacy: 'public',
  },
  {
    id: '4',
    name: 'Sustainable Future',
    description: 'Building a better tomorrow through sustainable practices and innovation',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300',
    members: 10234,
    posts: 2891,
    category: 'Environment',
    moderationLevel: 'moderate',
    isJoined: false,
    isVerified: true,
    privacy: 'public',
  },
  {
    id: '5',
    name: 'Open Source Builders',
    description: 'Collaborating on open-source projects that benefit everyone',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300',
    members: 18923,
    posts: 7645,
    category: 'Technology',
    moderationLevel: 'relaxed',
    isJoined: false,
    isVerified: true,
    privacy: 'public',
  },
];

export function Communities() {
  const [communities, setCommunities] = useState(mockCommunities);
  const [searchQuery, setSearchQuery] = useState('');

  const handleJoinToggle = (communityId: string) => {
    setCommunities(
      communities.map((community) =>
        community.id === communityId
          ? { ...community, isJoined: !community.isJoined }
          : community
      )
    );
  };

  const getModerationColor = (level: string) => {
    switch (level) {
      case 'strict':
        return 'bg-emerald-100 text-emerald-700';
      case 'moderate':
        return 'bg-blue-100 text-blue-700';
      case 'relaxed':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getModerationDescription = (level: string) => {
    switch (level) {
      case 'strict':
        return 'Actively moderated with clear guidelines';
      case 'moderate':
        return 'Community-driven moderation';
      case 'relaxed':
        return 'Light moderation, member self-governance';
      default:
        return '';
    }
  };

  const joinedCommunities = communities.filter((c) => c.isJoined);
  const suggestedCommunities = communities.filter((c) => !c.isJoined);

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Communities</h1>
            <p className="text-slate-600">Connect with people who share your interests</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Community
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="joined" className="space-y-6">
        <TabsList>
          <TabsTrigger value="joined">
            Your Communities ({joinedCommunities.length})
          </TabsTrigger>
          <TabsTrigger value="discover">
            Discover
          </TabsTrigger>
        </TabsList>

        {/* Joined Communities */}
        <TabsContent value="joined" className="space-y-4">
          {joinedCommunities.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No communities yet
              </h3>
              <p className="text-slate-600 mb-6">
                Join communities to connect with like-minded people
              </p>
              <Button>Explore Communities</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {joinedCommunities.map((community) => (
                <Card key={community.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-32 bg-gradient-to-br from-blue-500 to-indigo-600">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute top-3 right-3">
                      {community.isVerified && (
                        <Badge className="bg-white text-blue-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-slate-900 mb-1">
                          {community.name}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {community.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {community.members.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {community.posts.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {community.category}
                        </Badge>
                        <Badge className={`text-xs ${getModerationColor(community.moderationLevel)}`}>
                          <Shield className="w-3 h-3 mr-1" />
                          {community.moderationLevel}
                        </Badge>
                      </div>
                      <Button
                        variant={community.isJoined ? 'outline' : 'default'}
                        size="sm"
                        onClick={() => handleJoinToggle(community.id)}
                      >
                        {community.isJoined ? 'Joined' : 'Join'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Discover Communities */}
        <TabsContent value="discover" className="space-y-6">
          {/* Moderation Info Card */}
          <Card className="p-5 border-blue-200 bg-blue-50">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  Community Moderation Levels
                </h4>
                <p className="text-sm text-slate-700 mb-3">
                  Each community displays its moderation approach to help you find the right fit
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge className="bg-emerald-100 text-emerald-700">Strict</Badge>
                    <span className="text-slate-600">{getModerationDescription('strict')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge className="bg-blue-100 text-blue-700">Moderate</Badge>
                    <span className="text-slate-600">{getModerationDescription('moderate')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge className="bg-amber-100 text-amber-700">Relaxed</Badge>
                    <span className="text-slate-600">{getModerationDescription('relaxed')}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Suggested Communities */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Suggested for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedCommunities.map((community) => (
                <Card key={community.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-32 bg-gradient-to-br from-blue-500 to-indigo-600">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute top-3 right-3">
                      {community.isVerified && (
                        <Badge className="bg-white text-blue-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {community.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {community.description}
                    </p>

                    <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {community.members.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {community.posts.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {community.category}
                      </Badge>
                      <Badge className={`text-xs ${getModerationColor(community.moderationLevel)}`}>
                        <Shield className="w-3 h-3 mr-1" />
                        {community.moderationLevel}
                      </Badge>
                    </div>

                    <Button
                      className="w-full"
                      variant={community.isJoined ? 'outline' : 'default'}
                      onClick={() => handleJoinToggle(community.id)}
                    >
                      {community.isJoined ? 'Joined' : 'Join Community'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
