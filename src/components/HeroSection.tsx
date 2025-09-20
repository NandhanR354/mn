import { Button } from "@/components/ui/button";
import { Play, Users, BookOpen, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-success-light/20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Rural students learning together under a banyan tree"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="text-primary">Gamified Learning</span> for{" "}
                <span className="text-success">Rural India</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                Innovative educational platform designed specifically for rural Indian students in grades 6-12. 
                Learn with interactive games, offline support, and AI-powered personalization.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mb-2 mx-auto">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <div className="text-2xl font-bold text-foreground">6-12</div>
                <div className="text-sm text-muted-foreground">Grades</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-learning/10 rounded-full mb-2 mx-auto">
                  <BookOpen className="w-6 h-6 text-learning" />
                </div>
                <div className="text-2xl font-bold text-foreground">4</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-2 mx-auto">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">Offline</div>
                <div className="text-sm text-muted-foreground">Ready</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="hero" 
                onClick={onGetStarted}
                className="flex-1 sm:flex-none"
              >
                Get Started
              </Button>
              <Button variant="outline" size="xl" className="flex-1 sm:flex-none">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Multi-language Support */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Available in:</span>
              <div className="flex space-x-3">
                <span className="px-2 py-1 bg-muted rounded">English</span>
                <span className="px-2 py-1 bg-muted rounded">हिन्दी</span>
                <span className="px-2 py-1 bg-muted rounded">தமிழ்</span>
                <span className="px-2 py-1 bg-muted rounded">ଓଡ଼ିଆ</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <img
                src={heroImage}
                alt="Students learning with technology in rural India"
                className="w-full h-auto rounded-2xl shadow-primary"
              />
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-soft">
                PWA Ready
              </div>
              <div className="absolute -bottom-4 -left-4 bg-learning text-learning-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-soft">
                AI Powered
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};