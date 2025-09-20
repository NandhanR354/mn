import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Star, Users, Trophy } from "lucide-react";

interface GradeSelectionProps {
  onGradeSelect?: (grade: string) => void;
  userName?: string;
}

const gradeData = [
  { grade: "6", title: "Class 6", description: "Foundation building", color: "bg-blue-500", students: "2.5K+" },
  { grade: "7", title: "Class 7", description: "Core concepts", color: "bg-green-500", students: "2.1K+" },
  { grade: "8", title: "Class 8", description: "Advanced topics", color: "bg-purple-500", students: "1.9K+" },
  { grade: "9", title: "Class 9", description: "High school prep", color: "bg-orange-500", students: "1.7K+" },
  { grade: "10", title: "Class 10", description: "Board exam prep", color: "bg-red-500", students: "1.5K+" },
  { grade: "11", title: "Class 11", description: "Stream selection", color: "bg-indigo-500", students: "1.2K+" },
  { grade: "12", title: "Class 12", description: "Final preparation", color: "bg-pink-500", students: "1.0K+" },
];

export const GradeSelection = ({ onGradeSelect, userName = "Student" }: GradeSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-success-light/20 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Welcome back, <span className="text-primary">{userName}!</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Choose your grade to continue your learning journey
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-success" />
              <span>12K+ Students</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1 text-learning" />
              <span>50+ Subjects</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-1 text-primary" />
              <span>AI Personalized</span>
            </div>
          </div>
        </div>

        {/* Grade Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gradeData.map((item) => (
            <Card 
              key={item.grade}
              className="group hover:shadow-primary transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => onGradeSelect?.(item.grade)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{item.students}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 mr-1 text-yellow-500" />
                    <span>4.8</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Content */}
        <div className="mt-12 bg-gradient-card rounded-2xl p-8 shadow-card">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              🎮 Gamified Learning Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Earn points, unlock achievements, and compete with friends while learning. 
              Our AI-powered platform adapts to your learning style and pace.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold text-foreground">Achievements</h3>
                <p className="text-sm text-muted-foreground">Unlock badges as you progress</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-learning/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-learning" />
                </div>
                <h3 className="font-semibold text-foreground">AI Personalization</h3>
                <p className="text-sm text-muted-foreground">Adaptive learning paths</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Leaderboards</h3>
                <p className="text-sm text-muted-foreground">Compete with classmates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};