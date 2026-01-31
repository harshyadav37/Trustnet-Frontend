import { TrendingUp, ArrowUp, Hash, Users, MessageCircle, Eye } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface TrendingItem {
  id: string;
  type: 'topic' | 'post' | 'community';
  title: string;
  description?: string;
  count: number;
  trend: 'up' | 'stable';
  change: number;
  author?: {
    name: string;
    avatar: string;
  };
  category?: string;
}

const mockTrending: TrendingItem[] = [
  {
    id: '1',
    type: 'topic',
    title: 'privacy-by-design',
    count: 1247,
    trend: 'up',
    change: 34,
    category: 'Technology',
  },
  {
    id: '2',
    type: 'post',
    title: 'The future of ethical AI development',
    description: 'A comprehensive guide to building AI systems that respect user privacy...',
    count: 892,
    trend: 'up',
    change: 156,
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
  },
  {
    id: '3',
    type: 'topic',
    title: 'digital-wellness',
    count: 834,
    trend: 'up',
    change: 23,
    category: 'Wellness',
  },
  {
    id: '4',
    type: 'community',
    title: 'Sustainable Future',
    description: 'Building a better tomorrow through sustainable practices',
    count: 567,
    trend: 'up',
    change: 89,
  },
  {
    id: '5',
    type: 'post',
    title: 'Why transparency matters in social media',
    description: 'Exploring the importance of algorithmic transparency and user control...',
    count: 423,
    trend: 'stable',
    change: 12,
    author: {
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
  },
];

export function Trending() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Trending</h1>
            <p className="text-slate-600">What's popular in your communities</p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-5 mb-6 border-blue-200 bg-blue-50">
        <div className="flex gap-3">
          <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Ethical Trending</h3>
            <p className="text-sm text-slate-700">
              Our trending algorithm prioritizes quality discussions and diverse perspectives, not just engagement metrics.
              Topics are weighted by community trust scores and meaningful interactions.
            </p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Trending</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {mockTrending.map((item, index) => (
            <Card key={item.id} className="p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex gap-4">
                {/* Ranking */}
                <div className="flex-shrink-0 text-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <span className="font-bold text-white">{index + 1}</span>
                  </div>
                  {item.trend === 'up' && (
                    <div className="mt-2 flex items-center justify-center text-emerald-600">
                      <ArrowUp className="w-4 h-4" />
                      <span className="text-xs font-semibold">{item.change}</span>
                    </div>
                  )}
                </div>

                {/* Icon/Avatar */}
                <div className="flex-shrink-0">
                  {item.author ? (
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={item.author.avatar} alt={item.author.name} />
                      <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : item.type === 'topic' ? (
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Hash className="w-6 h-6 text-amber-600" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-slate-900 text-lg">
                      {item.type === 'topic' ? `#${item.title}` : item.title}
                    </h3>
                    <Badge variant="secondary" className="ml-2">
                      {item.category || item.type}
                    </Badge>
                  </div>
                  {item.description && (
                    <p className="text-sm text-slate-700 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.author && (
                    <p className="text-sm text-slate-600 mb-2">
                      by <span className="font-medium">{item.author.name}</span>
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {item.count} {item.type === 'topic' ? 'discussions' : item.type === 'community' ? 'members' : 'engagements'}
                    </span>
                    {item.trend === 'up' && (
                      <Badge className="bg-emerald-100 text-emerald-700">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="topics">
          <div className="space-y-3">
            {mockTrending.filter(item => item.type === 'topic').map((item, index) => (
              <Card key={item.id} className="p-5 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white">{index + 1}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Hash className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">#{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>{item.count} discussions</span>
                      <Badge className="bg-emerald-100 text-emerald-700">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        +{item.change}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="posts">
          <Card className="p-12 text-center">
            <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Trending posts will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="communities">
          <Card className="p-12 text-center">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Trending communities will appear here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
