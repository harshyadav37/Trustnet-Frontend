import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LandingPage } from "@/app/components/LandingPage";
import { Login } from "@/app/components/Login";
import { Onboarding } from "@/app/components/Onboarding";
import { Sidebar } from "@/app/components/Sidebar";
import { Feed } from "@/app/components/Feed";
import { PrivacyDashboard } from "@/app/components/PrivacyDashboard";
import { Communities } from "@/app/components/Communities";
import { Messaging } from "@/app/components/Messaging";
import { VideoCall } from "@/app/components/VideoCall";
import { Forums } from "@/app/components/Forums";
import { Profile } from "@/app/components/Profile";
import { Notifications } from "@/app/components/Notifications";
import { Settings } from "@/app/components/Settings";
import { Search } from "@/app/components/Search";
import { Trending } from "@/app/components/Trending";

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState(false);
  const [activeView, setActiveView] = useState("feed");
  const [unreadMessages] = useState(3);
  const [unreadNotifications] = useState(7);

  const handleLogout = () => {
    setHasStarted(false);
    setHasCompletedOnboarding(false);
    setIsLoginMode(false);
    setActiveView("feed");
  };

  const handleLogin = (email: string, password: string) => {
    // Here you would typically validate credentials
    console.log('Login attempt:', { email, password });
    setHasCompletedOnboarding(true);
  };

  // Show landing page first
  if (!hasStarted) {
    return <LandingPage onGetStarted={() => setHasStarted(true)} onLogin={() => setIsLoginMode(true)} />;
  }

  // Show login page if user chose to login
  if (isLoginMode && !hasCompletedOnboarding) {
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToSignup={() => setIsLoginMode(false)}
      />
    );
  }

  // Show onboarding for new users
  if (!hasCompletedOnboarding) {
    return (
      <Onboarding
        onComplete={() => setHasCompletedOnboarding(true)}
      />
    );
  }

  // Render the active view
  const renderView = () => {
    switch (activeView) {
      case "feed":
        return <Feed />;
      case "communities":
        return <Communities />;
      case "messages":
        return <Messaging />;
      case "video":
        return <VideoCall />;
      case "forums":
        return <Forums />;
      case "privacy":
        return <PrivacyDashboard />;
      case "profile":
        return <Profile />;
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings />;
      case "search":
        return <Search />;
      case "trending":
        return <Trending />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        unreadMessages={unreadMessages}
        unreadNotifications={unreadNotifications}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}