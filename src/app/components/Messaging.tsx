import { useState } from 'react';
import { Send, Lock, Search, MoreVertical, Phone, Video, Info, Check, CheckCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ScrollArea } from '@/app/components/ui/scroll-area';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participant: {
    name: string;
    username: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isEncrypted: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participant: {
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      isOnline: true,
    },
    lastMessage: 'Thanks for sharing that article!',
    timestamp: '5m ago',
    unreadCount: 2,
    isEncrypted: true,
  },
  {
    id: '2',
    participant: {
      name: 'Marcus Rodriguez',
      username: 'marcusr',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      isOnline: false,
    },
    lastMessage: 'See you at the community event!',
    timestamp: '2h ago',
    unreadCount: 0,
    isEncrypted: true,
  },
  {
    id: '3',
    participant: {
      name: 'Priya Patel',
      username: 'priyap',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      isOnline: true,
    },
    lastMessage: 'That sounds like a great idea!',
    timestamp: '1d ago',
    unreadCount: 0,
    isEncrypted: true,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'other',
    content: 'Hey! Did you see the new privacy features they announced?',
    timestamp: '10:30 AM',
    isRead: true,
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Yes! The end-to-end encryption upgrade is exactly what we needed.',
    timestamp: '10:32 AM',
    isRead: true,
  },
  {
    id: '3',
    senderId: 'other',
    content: 'Absolutely. I love how transparent they are about data usage.',
    timestamp: '10:35 AM',
    isRead: true,
  },
  {
    id: '4',
    senderId: 'me',
    content: 'Right? And the ability to tune the algorithm is refreshing.',
    timestamp: '10:36 AM',
    isRead: true,
  },
  {
    id: '5',
    senderId: 'other',
    content: 'Thanks for sharing that article!',
    timestamp: '10:40 AM',
    isRead: false,
  },
];

export function Messaging() {
  const [conversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isRead: false,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-4 p-4">
      {/* Conversations List */}
      <Card className="w-80 flex flex-col overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200">
          <h2 className="font-semibold text-lg text-slate-900">Messages</h2>
          <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            End-to-end encrypted
          </p>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          <div className="divide-y divide-slate-100">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 flex gap-3 hover:bg-slate-50 transition-colors text-left ${
                  selectedConversation.id === conversation.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
                    <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conversation.participant.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-slate-900 truncate">
                      {conversation.participant.name}
                    </h3>
                    <span className="text-xs text-slate-500">{conversation.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unreadCount > 0 && (
                      <Badge className="ml-2 bg-blue-600 text-white">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} />
                <AvatarFallback>{selectedConversation.participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {selectedConversation.participant.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{selectedConversation.participant.name}</h3>
              <p className="text-sm text-slate-600">
                {selectedConversation.participant.isOnline ? 'Active now' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Info className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Encryption Notice */}
        <div className="px-6 py-3 bg-emerald-50 border-b border-emerald-100">
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <Lock className="w-4 h-4" />
            <span className="font-medium">End-to-end encrypted</span>
            <span className="text-emerald-600">
              · Only you and {selectedConversation.participant.name} can read these messages
            </span>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md ${message.senderId === 'me' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-2.5 ${
                      message.senderId === 'me'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 px-1 ${
                    message.senderId === 'me' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className="text-xs text-slate-500">{message.timestamp}</span>
                    {message.senderId === 'me' && (
                      <span className="text-blue-600">
                        {message.isRead ? (
                          <CheckCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="px-6 py-4 border-t border-slate-200">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
}
