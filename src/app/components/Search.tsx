import { useState } from 'react';
import { Search as SearchIcon, Users, Hash, MessageSquare, TrendingUp } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface SearchResult {
  id: string;
  type: 'user' | 'community' | 'post' | 'topic';
  title: string;
  subtitle?: string;
  avatar?: string;
  members?: number;
  content?: string;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'user',
    title: 'Sarah Chen',
    subtitle: '@sarahchen · Trust Score 94',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  },
  {
    id: '2',
    type: 'community',
    title: 'Ethical Tech',
    subtitle: '12.5K members',
    avatar: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=150',
    members: 12500,
  },
  {
    id: '3',
    type: 'post',
    title: 'Best practices for implementing privacy-by-design',
    content: 'I\'ve been working on integrating privacy-by-design principles...',
  },
  {
    id: '4',
    type: 'topic',
    title: 'privacy',
    subtitle: '1.2K discussions',
  },
];

export function Search() {
  const [query, setQuery] = useState('');
  const [results] = useState<SearchResult[]>(mockResults);
  const [isSearching, setIsSearching] = useState(false);

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'community':
        return <Users className="w-5 h-5 text-emerald-600" />;
      case 'post':
        return <MessageSquare className="w-5 h-5 text-purple-600" />;
      case 'topic':
        return <Hash className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Search</h1>

        {/* Search Input */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search for people, communities, topics..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsSearching(e.target.value.length > 0);
            }}
            className="pl-12 h-14 text-lg"
          />
        </div>
      </div>

      {!isSearching ? (
        /* Empty State */
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Trending Topics
            </h3>
            <div className="space-y-3">
              {['privacy-by-design', 'ethical-tech', 'digital-wellness', 'open-source'].map((topic, index) => (
                <button
                  key={topic}
                  className="w-full p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Hash className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-900">{topic}</span>
                    </div>
                    <span className="text-sm text-slate-500">{Math.floor(Math.random() * 500 + 100)} posts</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Suggested Communities</h3>
            <div className="space-y-3">
              {['Privacy Advocates', 'Sustainable Future', 'Open Source Builders'].map((community, index) => (
                <button
                  key={community}
                  className="w-full p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{community}</p>
                      <p className="text-sm text-slate-600">{Math.floor(Math.random() * 10000 + 5000)} members</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        /* Search Results */
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {results.length === 0 ? (
              <Card className="p-12 text-center">
                <SearchIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-600">Try adjusting your search terms</p>
              </Card>
            ) : (
              results.map((result) => (
                <Card key={result.id} className="p-5 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex gap-4">
                    {result.type === 'user' || result.type === 'community' ? (
                      <Avatar className="w-12 h-12 flex-shrink-0">
                        <AvatarImage src={result.avatar} alt={result.title} />
                        <AvatarFallback>{result.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        {getResultIcon(result.type)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{result.title}</h3>
                        {result.type === 'user' && (
                          <Badge className="bg-emerald-600">Verified</Badge>
                        )}
                      </div>
                      {result.subtitle && (
                        <p className="text-sm text-slate-600 mb-2">{result.subtitle}</p>
                      )}
                      {result.content && (
                        <p className="text-sm text-slate-700 line-clamp-2">{result.content}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">Search results for users will appear here</p>
            </Card>
          </TabsContent>

          <TabsContent value="communities">
            <Card className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">Search results for communities will appear here</p>
            </Card>
          </TabsContent>

          <TabsContent value="posts">
            <Card className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">Search results for posts will appear here</p>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
