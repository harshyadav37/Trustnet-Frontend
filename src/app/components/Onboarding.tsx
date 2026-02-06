import { useState } from 'react';
import { Shield, Eye, Lock, UserCheck, ArrowRight, Check, Database, Share2, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Progress } from '@/app/components/ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { authService } from '@/app/services/authService';

interface OnboardingProps {
  onComplete: (userData: any) => void;
  onError?: (error: string) => void;
  onNavigateToLogin?: () => void;
}

export function Onboarding({ onComplete, onError, onNavigateToLogin }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: false,
    personalization: true,
    location: false,
    activitySharing: false,
    notifications: true,
  });

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleSignup = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await authService.signup({
        name: userName,
        email: email,
        password: password,
      });

      console.log('Signup Response:', response);
      setSuccessMessage('Account created successfully!');

      // Call onComplete with the response data
      onComplete({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        token: response.token,
        privacySettings,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      setError(errorMessage);
      console.error('Signup error:', err);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      handleSignup();
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Step {step + 1} of {totalSteps}</span>
            <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-green-800 font-medium">{successMessage}</p>
            </div>
          )}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome to TrustNet</h2>
                  <p className="text-slate-600">A privacy-first social network built for meaningful connections</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <Eye className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Full Transparency</h3>
                      <p className="text-sm text-slate-600">You'll always know why content is shown and how your data is used</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                    <Lock className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">You Own Your Data</h3>
                      <p className="text-sm text-slate-600">Complete control over what you share and with whom</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl bg-purple-50 border border-purple-100">
                    <UserCheck className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Quality Over Addiction</h3>
                      <p className="text-sm text-slate-600">Designed for meaningful engagement, not endless scrolling</p>
                    </div>
                  </div>
                </div>

                <Button onClick={nextStep} className="w-full" size="lg">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Your Account</h2>
                <p className="text-slate-600 mb-6">Let's start with the basics</p>

                <div className="space-y-4 mb-8">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="janedoe"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="mt-1.5"
                    />
                    <p className="text-xs text-slate-500 mt-1">Choose a unique username for your profile</p>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5"
                    />
                    <p className="text-xs text-slate-500 mt-1">We'll never share your email without permission</p>
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1.5"
                    />
                    <p className="text-xs text-slate-500 mt-1">Use at least 8 characters with numbers and symbols</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={prevStep} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={nextStep} className="flex-1" disabled={!userName || !email || !password}>
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-2">How Your Data Flows</h2>
                <p className="text-slate-600 mb-6">Understanding data usage before you share</p>

                <div className="mb-8 p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Database className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">Your Content</h4>
                        <p className="text-sm text-slate-600">Posts, photos, and messages are encrypted and stored securely. Only you and people you share with can access them.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Share2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">Personalization</h4>
                        <p className="text-sm text-slate-600">We use your interests (not personal data) to recommend content. You can tune or disable this anytime.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">What We Don't Do</h4>
                        <p className="text-sm text-slate-600">No selling data. No tracking across other sites. No manipulative algorithms.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={prevStep} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={nextStep} className="flex-1">
                    I Understand
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Privacy Preferences</h2>
                <p className="text-slate-600 mb-6">Customize your privacy settings (you can change these anytime)</p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
                    <div className="flex-1 mr-4">
                      <Label htmlFor="public-profile" className="font-semibold text-slate-900 cursor-pointer">
                        Public Profile
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">Allow people outside your network to view your profile</p>
                    </div>
                    <Switch
                      id="public-profile"
                      checked={privacySettings.publicProfile}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, publicProfile: checked })
                      }
                    />
                  </div>

                  <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
                    <div className="flex-1 mr-4">
                      <Label htmlFor="personalization" className="font-semibold text-slate-900 cursor-pointer">
                        Content Personalization
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">Show recommended content based on your interests</p>
                    </div>
                    <Switch
                      id="personalization"
                      checked={privacySettings.personalization}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, personalization: checked })
                      }
                    />
                  </div>

                  <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
                    <div className="flex-1 mr-4">
                      <Label htmlFor="location" className="font-semibold text-slate-900 cursor-pointer">
                        Location Services
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">Help find local communities and events</p>
                    </div>
                    <Switch
                      id="location"
                      checked={privacySettings.location}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, location: checked })
                      }
                    />
                  </div>

                  <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
                    <div className="flex-1 mr-4">
                      <Label htmlFor="notifications" className="font-semibold text-slate-900 cursor-pointer">
                        Notifications
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">Receive updates about your activity and connections</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={privacySettings.notifications}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, notifications: checked })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={prevStep} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={nextStep} className="flex-1" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Complete Setup'}
                    {!isLoading && <Check className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Privacy Note */}
        <div className="text-center text-sm text-slate-500 mt-6 space-y-3">
          <p>
            By continuing, you agree to our{' '}
            <button className="text-blue-600 hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button className="text-blue-600 hover:underline">Privacy Policy</button>
          </p>
          <p>
            Already signed up?{' '}
            <button 
              onClick={onNavigateToLogin}
              className="text-blue-600 hover:underline font-semibold transition-colors"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
