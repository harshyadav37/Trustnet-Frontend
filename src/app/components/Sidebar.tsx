import { Home, Users, MessageCircle, Video, Shield, Settings, Bell, Search, TrendingUp, BookOpen, Award, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  unreadMessages?: number;
  unreadNotifications?: number;
  onLogout?: () => void;
  userData?: {
    userName?: string;
    name?: string;
    email: string;
  } | null;

}

export function Sidebar({ activeView, onViewChange, unreadMessages = 0, unreadNotifications = 0, onLogout, userData }: SidebarProps) {
  const menuItems = [
    { id: 'feed', icon: Home, label: 'Home Feed', badge: null },
    { id: 'communities', icon: Users, label: 'Communities', badge: null },
    { id: 'messages', icon: MessageCircle, label: 'Messages', badge: unreadMessages },
    { id: 'video', icon: Video, label: 'Video Calls', badge: null },
    { id: 'forums', icon: BookOpen, label: 'Forums', badge: null },
    { id: 'trending', icon: TrendingUp, label: 'Trending', badge: null },
  ];

  const secondaryItems = [
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: unreadNotifications },
    { id: 'privacy', icon: Shield, label: 'Privacy Dashboard', badge: null },
    // { id: 'profile', icon: User, label: 'Your Profile', badge: null },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-screen overflow-y-auto scrollbar-hide">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-slate-900">TrustNet</h1>
            <p className="text-xs text-slate-500">Privacy First</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-slate-200 flex-shrink-0">
        <button
          onClick={() => onViewChange('search')}
          className="w-full flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search...</span>
        </button>
      </div>

      {/* Main Navigation */}
      <div className="p-3 space-y-1 flex-shrink-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <Badge variant="default" className="ml-auto bg-blue-600 text-white">
                  {item.badge > 99 ? '99+' : item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {/* Trust Score Widget */}
      <div className="mx-3 my-4 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-900">Trust Score</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-emerald-700">92</span>
          <span className="text-xs text-emerald-600">/100</span>
        </div>
        <p className="text-xs text-emerald-700 mt-1">Great community contributions!</p>
      </div>

      {/* Secondary Navigation */}
      <div className="p-3 space-y-1 border-t border-slate-200 mt-2 flex-shrink-0">
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <Badge variant="default" className="ml-auto bg-red-600 text-white">
                  {item.badge > 99 ? '99+' : item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {/* User Profile & Logout Footer */}
      <div className="p-4 border-t border-slate-200 mt-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onViewChange('profile')}
            className="flex items-center gap-3 flex-1 p-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="User" />
                <AvatarFallback>{(userData?.userName || userData?.name)?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-slate-900">{userData?.userName || userData?.name || 'User'}</p>
                <p className="text-xs text-slate-500">@{(userData?.userName || userData?.email)?.toLowerCase() || 'user'}</p>
              </div>
            </button>
            
            <button 
              onClick={onLogout}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
        </div>
      </div>
    </aside>
  );
}
