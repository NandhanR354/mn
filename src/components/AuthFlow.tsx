import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Users, GraduationCap, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthFlowProps {
  onAuthSuccess?: (userType: 'student' | 'teacher') => void;
  onBack?: () => void;
}

export const AuthFlow = ({ onAuthSuccess, onBack }: AuthFlowProps) => {
  const { toast } = useToast();
  const [authStep, setAuthStep] = useState<'login' | 'otp' | 'userType'>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [contactInfo, setContactInfo] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactInfo) {
      toast({
        title: "Missing Information",
        description: `Please enter your ${loginMethod}.`,
        variant: "destructive",
      });
      return;
    }

    // Simulate OTP sending
    toast({
      title: "OTP Sent!",
      description: `Verification code sent to your ${loginMethod}.`,
    });
    
    setAuthStep('otp');
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP sent to you.",
        variant: "destructive",
      });
      return;
    }

    // Simulate OTP verification
    toast({
      title: "OTP Verified!",
      description: "Please select your account type.",
    });
    
    setAuthStep('userType');
  };

  const handleUserTypeSelect = (userType: 'student' | 'teacher') => {
    toast({
      title: "Welcome!",
      description: `Continue as ${userType}.`,
    });
    
    onAuthSuccess?.(userType);
  };

  const handleGoogleAuth = () => {
    // Simulate Google OAuth
    toast({
      title: "Google Auth",
      description: "Google authentication would be implemented here.",
    });
    setAuthStep('userType');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        {authStep === 'login' && (
          <>
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                Welcome to GAME RURAL INDIA
              </CardTitle>
              <CardDescription>
                Login or create your account to start learning
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google OAuth Button */}
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleGoogleAuth}
              >
                <Mail className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSendOTP} className="space-y-4">
                <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'phone')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="phone">Phone</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="email" className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </TabsContent>
                  
                  <TabsContent value="phone" className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </TabsContent>
                </Tabs>

                <Button type="submit" variant="gradient" size="lg" className="w-full">
                  Send OTP
                </Button>
              </form>

              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack} className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              )}
            </CardContent>
          </>
        )}

        {authStep === 'otp' && (
          <>
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                Verify OTP
              </CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to your {loginMethod}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                    required
                  />
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full">
                  Verify OTP
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setAuthStep('login')}
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </form>
            </CardContent>
          </>
        )}

        {authStep === 'userType' && (
          <>
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                I am a...
              </CardTitle>
              <CardDescription>
                Choose your account type to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Button
                variant="card"
                size="xl"
                className="w-full h-auto p-6 flex-col space-y-2"
                onClick={() => handleUserTypeSelect('student')}
              >
                <GraduationCap className="w-8 h-8 text-learning" />
                <div className="text-center">
                  <div className="font-semibold text-foreground">Student</div>
                  <div className="text-sm text-muted-foreground">
                    I want to learn and play games
                  </div>
                </div>
              </Button>

              <Button
                variant="card"
                size="xl"
                className="w-full h-auto p-6 flex-col space-y-2"
                onClick={() => handleUserTypeSelect('teacher')}
              >
                <Users className="w-8 h-8 text-success" />
                <div className="text-center">
                  <div className="font-semibold text-foreground">Teacher</div>
                  <div className="text-sm text-muted-foreground">
                    I want to track student progress
                  </div>
                </div>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAuthStep('login')}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};