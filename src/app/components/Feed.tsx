import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Info, Bookmark, AlertCircle, TrendingUp, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    trustScore: number;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  reason: {
    type: 'following' | 'interest' | 'community' | 'trending';
    detail: string;
  };
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      trustScore: 94,
    },
    content: 'Just finished implementing end-to-end encryption for our team\'s messaging system. The peace of mind knowing our conversations are truly private is incredible. Here\'s what we learned about balancing security with usability...',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    timestamp: '2 hours ago',
    likes: 234,
    comments: 45,
    shares: 12,
    reason: {
      type: 'following',
      detail: 'You follow Sarah Chen',
    },
  },
  {
    id: '2',
    author: {
      name: 'Marcus Rodriguez',
      username: 'marcusr',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      trustScore: 88,
    },
    content: 'Hosting a community discussion on ethical AI development tonight at 7 PM. Would love to hear different perspectives on building AI systems that respect user privacy and autonomy. Join us! 🤖',
    timestamp: '4 hours ago',
    likes: 567,
    comments: 89,
    shares: 34,
    reason: {
      type: 'interest',
      detail: 'Based on your interest in Technology Ethics',
    },
  },
  {
    id: '3',
    author: {
      name: 'Priya Patel',
      username: 'priyap',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      trustScore: 96,
    },
    content: 'Amazing sunrise hike this morning! Sometimes disconnecting from screens and reconnecting with nature is the best way to recharge. Remember to take breaks and prioritize your mental health. 🌄',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    timestamp: '6 hours ago',
    likes: 892,
    comments: 123,
    shares: 56,
    reason: {
      type: 'community',
      detail: 'From Mindful Living community',
    },
  },
];

export function Feed() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const getReasonIcon = (type: string) => {
    switch (type) {
      case 'following':
        return <Users className="w-3.5 h-3.5" />;
      case 'interest':
        return <TrendingUp className="w-3.5 h-3.5" />;
      case 'community':
        return <Users className="w-3.5 h-3.5" />;
      default:
        return <Info className="w-3.5 h-3.5" />;
    }
  };

  const getReasonColor = (type: string) => {
    switch (type) {
      case 'following':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'interest':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'community':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Feed Controls */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Your Feed</h2>
          <p className="text-sm text-slate-600 mt-1">Personalized content from your network</p>
        </div>
        <Button variant="outline" size="sm">
          <AlertCircle className="w-4 h-4 mr-2" />
          Feed Preferences
        </Button>
      </div>

      {/* Transparency Notice */}
      <Card className="p-4 mb-6 border-blue-200 bg-blue-50">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 text-sm mb-1">Why am I seeing this?</h3>
            <p className="text-sm text-slate-700">
              Each post shows why it's in your feed. Click the info badge to learn more or adjust your preferences.
            </p>
          </div>
        </div>
      </Card>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            {/* Reason Badge */}
            <div className="px-4 pt-4 pb-2">
              <button
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all hover:shadow-sm ${getReasonColor(post.reason.type)}`}
              >
                {getReasonIcon(post.reason.type)}
                {post.reason.detail}
              </button>
            </div>

            {/* Post Header */}
            <div className="px-4 py-3">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{post.author.name}</h3>
                      <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                        Trust {post.author.trustScore}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span>@{post.author.username}</span>
                      <span>·</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
              <p className="text-slate-800 leading-relaxed">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="relative">
                <ImageWithFallback
                  src={post.image}
                  alt="Post content"
                  className="w-full h-auto max-h-96 object-cover"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="px-4 py-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={post.isLiked ? 'text-red-600' : ''}
                  >
                    <Heart className={`w-4 h-4 mr-1.5 ${post.isLiked ? 'fill-red-600' : ''}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1.5" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4 mr-1.5" />
                    {post.shares}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBookmark(post.id)}
                  className={post.isBookmarked ? 'text-blue-600' : ''}
                >
                  <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-blue-600' : ''}`} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <Button variant="outline" size="lg">
          Load More Posts
        </Button>
      </div>
    </div>
  );
}
