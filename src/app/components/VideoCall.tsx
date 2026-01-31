import { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, Phone, Monitor, Settings, Users, Lock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoOff: boolean;
}

const mockParticipants: Participant[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    isMuted: false,
    isVideoOff: false,
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    isMuted: true,
    isVideoOff: false,
  },
  {
    id: '3',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    isMuted: false,
    isVideoOff: true,
  },
];

export function VideoCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants] = useState(mockParticipants);

  return (
    <div className="h-[calc(100vh-2rem)] p-4 bg-slate-900">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800 rounded-xl">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">Community Call</h2>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Lock className="w-4 h-4" />
              <span>End-to-end encrypted</span>
              <span>·</span>
              <span>{participants.length + 1} participants</span>
            </div>
          </div>
          <Badge className="bg-red-600 text-white">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
            Recording
          </Badge>
        </div>

        {/* Main Video Grid */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Main Speaker View */}
          <Card className="col-span-2 bg-slate-800 border-slate-700 overflow-hidden relative">
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src={participants[0].avatar} alt={participants[0].name} />
                <AvatarFallback className="text-4xl">{participants[0].name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-white font-medium">{participants[0].name}</p>
            </div>
            {participants[0].isMuted && (
              <div className="absolute top-4 right-4 bg-red-600 p-2 rounded-full">
                <MicOff className="w-5 h-5 text-white" />
              </div>
            )}
          </Card>

          {/* Other Participants */}
          {participants.slice(1).map((participant) => (
            <Card key={participant.id} className="bg-slate-800 border-slate-700 overflow-hidden relative">
              <div className="aspect-video bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                {participant.isVideoOff ? (
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback className="text-3xl">{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback className="text-3xl">{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <p className="text-white text-sm font-medium">{participant.name}</p>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                {participant.isMuted && (
                  <div className="bg-red-600 p-1.5 rounded-full">
                    <MicOff className="w-4 h-4 text-white" />
                  </div>
                )}
                {participant.isVideoOff && (
                  <div className="bg-slate-700 p-1.5 rounded-full">
                    <VideoOff className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </Card>
          ))}

          {/* Self View */}
          <Card className="bg-slate-800 border-slate-700 overflow-hidden relative">
            <div className="aspect-video bg-gradient-to-br from-emerald-900 to-teal-900 flex items-center justify-center">
              {isVideoOff ? (
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="You" />
                  <AvatarFallback className="text-3xl">You</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="You" />
                  <AvatarFallback className="text-3xl">You</AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <p className="text-white text-sm font-medium">You</p>
            </div>
            <div className="absolute top-3 right-3 flex gap-2">
              {isMuted && (
                <div className="bg-red-600 p-1.5 rounded-full">
                  <MicOff className="w-4 h-4 text-white" />
                </div>
              )}
              {isVideoOff && (
                <div className="bg-slate-700 p-1.5 rounded-full">
                  <VideoOff className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 px-6 py-6 bg-slate-800 rounded-xl">
          <Button
            variant={isMuted ? 'destructive' : 'secondary'}
            size="lg"
            className="w-14 h-14 rounded-full"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>
          <Button
            variant={isVideoOff ? 'destructive' : 'secondary'}
            size="lg"
            className="w-14 h-14 rounded-full"
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </Button>
          <Button
            variant={isScreenSharing ? 'default' : 'secondary'}
            size="lg"
            className="w-14 h-14 rounded-full"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
          >
            <Monitor className="w-6 h-6" />
          </Button>
          <Button variant="secondary" size="lg" className="w-14 h-14 rounded-full">
            <Users className="w-6 h-6" />
          </Button>
          <Button variant="secondary" size="lg" className="w-14 h-14 rounded-full">
            <Settings className="w-6 h-6" />
          </Button>
          <Button variant="destructive" size="lg" className="w-14 h-14 rounded-full ml-4">
            <Phone className="w-6 h-6" />
          </Button>
        </div>

        {/* Privacy Notice */}
        <Card className="p-4 bg-emerald-900/20 border-emerald-700">
          <div className="flex items-center gap-3 text-emerald-300">
            <Lock className="w-5 h-5 flex-shrink-0" />
            <div className="text-sm">
              <span className="font-semibold">Privacy Protected:</span>{' '}
              This call is end-to-end encrypted. Only participants can access the audio and video content.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
