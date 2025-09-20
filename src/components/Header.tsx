import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, Globe, User } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onAuthClick?: () => void;
  showAuthButton?: boolean;
}

export const Header = ({ onAuthClick, showAuthButton = true }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">
                GAME RURAL INDIA
              </h1>
              <p className="text-xs text-muted-foreground">
                Gamified Learning Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-foreground hover:text-primary transition-smooth">
              Features
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-smooth">
              About
            </a>
            <Button variant="ghost" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              English
            </Button>
            {showAuthButton && (
              <Button variant="gradient" size="sm" onClick={onAuthClick}>
                <User className="w-4 h-4 mr-2" />
                Login / Register
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-foreground hover:text-primary transition-smooth"
              >
                Features
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-smooth"
              >
                About
              </a>
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Button variant="ghost" size="sm" className="justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  English
                </Button>
                {showAuthButton && (
                  <Button variant="gradient" size="sm" onClick={onAuthClick}>
                    <User className="w-4 h-4 mr-2" />
                    Login / Register
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};