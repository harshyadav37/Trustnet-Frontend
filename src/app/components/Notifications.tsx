import { useState } from 'react';
import { Heart, MessageCircle, Users, UserPlus, Award, Check, Trash2, Settings } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'community' | 'achievement';
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
    content: 'liked your post about privacy-by-design',
    timestamp: '5 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
    content: 'commented on your discussion: "This is exactly what we need!"',
    timestamp: '1 hour ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'follow',
    user: {
      name: 'Priya Patel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    },
    content: 'started following you',
    timestamp: '2 hours ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'community',
    user: {
      name: 'Ethical Tech',
      avatar: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=150',
    },
    content: 'New discussion: Best practices for data encryption',
    timestamp: '3 hours ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'achievement',
    user: {
      name: 'TrustNet',
      avatar: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=150',
    },
    content: 'You earned the "Trusted Member" badge!',
    timestamp: '1 day ago',
    isRead: true,
  },
];

export function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-600" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-600" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-purple-600" />;
      case 'community':
        return <Users className="w-5 h-5 text-emerald-600" />;
      case 'achievement':
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Notifications</h1>
            <p className="text-slate-600">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <Check className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-blue-600 text-white">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-2">
          {notifications.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-slate-400 mb-4">
                <Check className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                You're all caught up!
              </h3>
              <p className="text-slate-600">No new notifications to show</p>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-5 transition-all hover:shadow-md ${
                  !notification.isRead ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Avatar */}
                  <Avatar className="w-12 h-12 flex-shrink-0">
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 mb-1">
                      <span className="font-semibold">{notification.user.name}</span>{' '}
                      <span className="text-slate-700">{notification.content}</span>
                    </p>
                    <p className="text-sm text-slate-500">{notification.timestamp}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-start gap-2">
                    {!notification.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-600" />
                    </Button>
                  </div>

                  {/* Unread indicator */}
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="mentions" className="space-y-2">
          <Card className="p-12 text-center">
            <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No mentions yet</h3>
            <p className="text-slate-600">When someone mentions you, it will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="communities" className="space-y-2">
          <Card className="p-12 text-center">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No community updates
            </h3>
            <p className="text-slate-600">
              Updates from your communities will appear here
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
