import { useState } from 'react';
import { MessageSquare, ThumbsUp, Pin, Lock, AlertCircle, TrendingUp, Clock, Users } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface Thread {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
    trustScore: number;
  };
  category: string;
  content: string;
  timestamp: string;
  replies: number;
  likes: number;
  isPinned: boolean;
  isLocked: boolean;
  tags: string[];
}

const mockThreads: Thread[] = [
  {
    id: '1',
    title: 'Best practices for implementing privacy-by-design in web applications',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      trustScore: 94,
    },
    category: 'Privacy',
    content: 'I\'ve been working on integrating privacy-by-design principles into our application architecture...',
    timestamp: '2 hours ago',
    replies: 34,
    likes: 156,
    isPinned: true,
    isLocked: false,
    tags: ['privacy', 'development', 'best-practices'],
  },
  {
    id: '2',
    title: 'How can we make social media less addictive?',
    author: {
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      trustScore: 88,
    },
    category: 'Digital Wellness',
    content: 'Opening discussion on alternative design patterns that prioritize user wellbeing over engagement metrics...',
    timestamp: '5 hours ago',
    replies: 67,
    likes: 289,
    isPinned: false,
    isLocked: false,
    tags: ['wellness', 'ux-design', 'ethics'],
  },
  {
    id: '3',
    title: 'Comparing end-to-end encryption implementations',
    author: {
      name: 'Priya Patel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      trustScore: 96,
    },
    category: 'Security',
    content: 'Let\'s discuss the pros and cons of different E2E encryption approaches for messaging apps...',
    timestamp: '1 day ago',
    replies: 45,
    likes: 201,
    isPinned: false,
    isLocked: false,
    tags: ['encryption', 'security', 'messaging'],
  },
  {
    id: '4',
    title: 'Community guidelines update - Feedback wanted',
    author: {
      name: 'Alex Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      trustScore: 92,
    },
    category: 'Meta',
    content: 'We\'re updating our community guidelines to better serve everyone. Your input is valuable...',
    timestamp: '2 days ago',
    replies: 128,
    likes: 421,
    isPinned: true,
    isLocked: false,
    tags: ['community', 'guidelines', 'feedback'],
  },
];

export function Forums() {
  const [threads] = useState(mockThreads);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Privacy', 'Security', 'Digital Wellness', 'Meta', 'Technology'];

  const filteredThreads = selectedCategory === 'all'
    ? threads
    : threads.filter(thread => thread.category.toLowerCase() === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Community Forums</h1>
            <p className="text-slate-600">Structured discussions for meaningful conversations</p>
          </div>
          <Button className="gap-2">
            <MessageSquare className="w-4 h-4" />
            New Thread
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category.toLowerCase() ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.toLowerCase())}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Moderation Info */}
      <Card className="p-5 mb-6 border-blue-200 bg-blue-50">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Transparent Moderation</h3>
            <p className="text-sm text-slate-700">
              Forums are moderated by community members with high trust scores. All moderation actions
              are logged and can be appealed through a fair review process.
            </p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recent">
            <Clock className="w-4 h-4 mr-2" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="trending">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="unanswered">
            <MessageSquare className="w-4 h-4 mr-2" />
            Unanswered
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          {filteredThreads.map((thread) => (
            <Card key={thread.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {/* Author Avatar */}
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                  <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                </Avatar>

                {/* Thread Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {thread.isPinned && (
                          <Pin className="w-4 h-4 text-blue-600" />
                        )}
                        <h3 className="text-lg font-semibold text-slate-900 hover:text-blue-600 cursor-pointer">
                          {thread.title}
                        </h3>
                        {thread.isLocked && (
                          <Lock className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                        <span className="font-medium">{thread.author.name}</span>
                        <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                          Trust {thread.author.trustScore}
                        </Badge>
                        <span>·</span>
                        <span>{thread.timestamp}</span>
                        <span>·</span>
                        <Badge variant="secondary" className="text-xs">{thread.category}</Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 mb-3 line-clamp-2">{thread.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {thread.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm text-slate-600">
                    <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{thread.replies} replies</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{thread.likes} likes</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Trending Discussions</h3>
            <p className="text-slate-600">Popular threads from the past week</p>
          </div>
        </TabsContent>

        <TabsContent value="unanswered" className="space-y-4">
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Unanswered Questions</h3>
            <p className="text-slate-600">Help fellow community members by sharing your knowledge</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Forum Guidelines */}
      <Card className="p-6 mt-8 border-slate-200 bg-slate-50">
        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Forum Guidelines
        </h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Be respectful and constructive in all discussions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Search for existing threads before creating new ones</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Use clear, descriptive titles and appropriate tags</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Quality contributions increase your trust score</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
