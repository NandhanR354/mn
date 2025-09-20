import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { School, parseSchoolsCSV, searchSchools, getSchoolByUDISE } from "@/utils/schoolData";
import { Search, MapPin, School as SchoolIcon, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentRegistrationProps {
  onComplete?: (data: StudentFormData) => void;
  onBack?: () => void;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  grade: string;
  school: string;
  dob: string;
  state: string;
  medium: string;
  district: string;
  udiseCode: string;
}

const grades = ["6", "7", "8", "9", "10", "11", "12"];
const states = ["Odisha", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Jharkhand", "Madhya Pradesh", "Other"];
const mediums = ["English", "Hindi", "Odia", "Telugu", "Other"];

export const StudentRegistration = ({ onComplete, onBack }: StudentRegistrationProps) => {
  const { toast } = useToast();
  const [schools, setSchools] = useState<School[]>([]);
  const [searchResults, setSearchResults] = useState<School[]>([]);
  const [isLoadingSchools, setIsLoadingSchools] = useState(true);
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    grade: "",
    school: "",
    dob: "",
    state: "Odisha",
    medium: "English",
    district: "",
    udiseCode: "",
  });

  // Load schools data on component mount
  useEffect(() => {
    const loadSchools = async () => {
      try {
        const response = await fetch('/data/schools.csv');
        const csvContent = await response.text();
        const parsedSchools = parseSchoolsCSV(csvContent);
        setSchools(parsedSchools);
        setIsLoadingSchools(false);
      } catch (error) {
        console.error('Error loading schools data:', error);
        setIsLoadingSchools(false);
        toast({
          title: "Warning",
          description: "Could not load schools database. You can still enter UDISE code manually.",
          variant: "destructive",
        });
      }
    };

    loadSchools();
  }, [toast]);

  // Handle UDISE code search
  const handleUDISESearch = (query: string) => {
    setFormData(prev => ({ ...prev, udiseCode: query }));
    
    if (query.length >= 3 && schools.length > 0) {
      const results = searchSchools(schools, query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }

    // Auto-fill if exact match found
    if (query.length === 11) {
      const school = getSchoolByUDISE(schools, query);
      if (school) {
        setFormData(prev => ({
          ...prev,
          school: school.school_name,
          district: school.district,
          udiseCode: school.udise_code,
        }));
        setSearchResults([]);
      }
    }
  };

  // Handle school selection from search results
  const handleSchoolSelect = (school: School) => {
    setFormData(prev => ({
      ...prev,
      school: school.school_name,
      district: school.district,
      udiseCode: school.udise_code,
    }));
    setSearchResults([]);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.grade || !formData.dob || !formData.udiseCode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Successful!",
      description: "Welcome to GAME RURAL INDIA. Let's start learning!",
    });

    onComplete?.(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-learning-light/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-card">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center">
            <User className="w-6 h-6 text-primary mr-2" />
            Student Registration
          </CardTitle>
          <CardDescription>
            Join thousands of students learning with GAME RURAL INDIA
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade *</Label>
                <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* School Information */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <SchoolIcon className="w-5 h-5 text-learning mr-2" />
                School Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="udiseCode">UDISE Code *</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="udiseCode"
                    value={formData.udiseCode}
                    onChange={(e) => handleUDISESearch(e.target.value)}
                    placeholder="Enter UDISE code or search school name"
                    className="pl-10"
                    required
                  />
                </div>
                
                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="border border-border rounded-md bg-card max-h-48 overflow-y-auto">
                    {searchResults.map((school, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-muted/50 cursor-pointer border-b border-border last:border-b-0"
                        onClick={() => handleSchoolSelect(school)}
                      >
                        <div className="font-medium text-foreground">{school.school_name}</div>
                        <div className="text-sm text-muted-foreground">
                          <span className="flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {school.district}, {school.block} • {school.udise_code}
                          </span>
                        </div>
                      </div>
                    ))
                    }
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="school">School Name</Label>
                  <Input
                    id="school"
                    value={formData.school}
                    onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
                    placeholder="Auto-filled from UDISE"
                    readOnly={!!formData.school}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                    placeholder="Auto-filled from UDISE"
                    readOnly={!!formData.district}
                  />
                </div>
              </div>
            </div>

            {/* Other Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))
                    }
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medium">Medium of Instruction</Label>
                <Select value={formData.medium} onValueChange={(value) => setFormData(prev => ({ ...prev, medium: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select medium" />
                  </SelectTrigger>
                  <SelectContent>
                    {mediums.map((medium) => (
                      <SelectItem key={medium} value={medium}>{medium}</SelectItem>
                    ))
                    }
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {onBack && (
                <Button type="button" variant="outline" size="lg" onClick={onBack} className="flex-1">
                  Back
                </Button>
              )}
              <Button type="submit" variant="gradient" size="lg" className="flex-1">
                Complete Registration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
