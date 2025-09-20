import React, { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AuthFlow } from "@/components/AuthFlow";
import { StudentRegistration, StudentFormData } from "@/components/StudentRegistration";
import { GradeSelection } from "@/components/GradeSelection";
import { useToast } from "@/hooks/use-toast";

type AppState = 'home' | 'auth' | 'registration' | 'dashboard';
type UserType = 'student' | 'teacher' | null;

const Index = () => {
  const { toast } = useToast();
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [userType, setUserType] = useState<UserType>(null);
  const [studentData, setStudentData] = useState<StudentFormData | null>(null);

  const handleGetStarted = () => {
    setCurrentState('auth');
  };

  const handleAuthSuccess = (type: 'student' | 'teacher') => {
    setUserType(type);
    if (type === 'student') {
      setCurrentState('registration');
    } else {
      // For teachers, go to teacher dashboard (placeholder)
      toast({
        title: "Teacher Dashboard",
        description: "Teacher dashboard coming soon!",
      });
    }
  };

  const handleRegistrationComplete = (data: StudentFormData) => {
    setStudentData(data);
    setCurrentState('dashboard');
  };

  const handleGradeSelect = (grade: string) => {
    toast({
      title: "Grade Selected",
      description: `Welcome to Grade ${grade}! Loading your personalized content...`,
    });
    // Here you would navigate to the grade-specific learning content
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setUserType(null);
    setStudentData(null);
  };

  // Render different components based on current state
  switch (currentState) {
    case 'auth':
      return (
        <div>
          <Header showAuthButton={false} />
          <AuthFlow 
            onAuthSuccess={handleAuthSuccess}
            onBack={handleBackToHome}
          />
        </div>
      );

    case 'registration':
      return (
        <div>
          <Header showAuthButton={false} />
          <StudentRegistration 
            onComplete={handleRegistrationComplete}
            onBack={handleBackToHome}
          />
        </div>
      );

    case 'dashboard':
      return (
        <div>
          <Header showAuthButton={false} />
          <GradeSelection 
            onGradeSelect={handleGradeSelect}
            userName={studentData ? `${studentData.firstName} ${studentData.lastName}` : 'Student'}
          />
        </div>
      );

    default:
      return (
        <div className="min-h-screen bg-background">
          <Header onAuthClick={handleGetStarted} />
          <main>
            <HeroSection onGetStarted={handleGetStarted} />
            
            {/* SEO Content Section */}
            <section id="features" className="py-16 bg-muted/30">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Why Choose GAME RURAL INDIA?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Our platform is specifically designed for the unique needs of rural Indian students, 
                    providing accessible, engaging, and culturally relevant education.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎮</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Gamified Learning</h3>
                    <p className="text-muted-foreground">
                      Interactive games and challenges make learning fun and engaging for students of all grades.
                    </p>
                  </div>
                  
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📱</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Offline Support</h3>
                    <p className="text-muted-foreground">
                      Learn anytime, anywhere with our Progressive Web App that works without internet connectivity.
                    </p>
                  </div>
                  
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-learning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">AI Personalization</h3>
                    <p className="text-muted-foreground">
                      Advanced AI adapts to each student's learning pace and style for optimal educational outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="about" className="py-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Empowering Rural Education in India
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    GAME RURAL INDIA bridges the educational gap in rural areas by providing 
                    high-quality, interactive learning experiences in multiple Indian languages. 
                    Our platform supports students from grades 6-12 with curriculum-aligned content, 
                    gamified assessments, and teacher dashboards for progress tracking.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">12K+</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">500+</div>
                      <div className="text-sm text-muted-foreground">Schools</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-learning">4</div>
                      <div className="text-sm text-muted-foreground">Languages</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">7</div>
                      <div className="text-sm text-muted-foreground">Grades</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      );
  }
};

export default Index;
