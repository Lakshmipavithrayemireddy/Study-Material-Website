import { useState } from "react";
import { Header } from "@/components/Header";
import { DepartmentSelector } from "@/components/DepartmentSelector";
import { StudyMaterials } from "@/components/StudyMaterials";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Search, Download } from "lucide-react";

const Index = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const resetSelection = () => {
    setSelectedDepartment("");
    setSelectedYear("");
    setSelectedSemester("");
    setSelectedSubject("");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-up">
            Annamacharya University
            <span className="block text-3xl mt-2 opacity-90">Study Materials Portal</span>
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-fade-up">
            Access comprehensive study materials organized by department, semester, and subject. 
            Enhanced with AI-powered learning assistance for better understanding.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-up">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <BookOpen className="w-5 h-5" />
              <span>Organized Materials</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Brain className="w-5 h-5" />
              <span>AI Assistant</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Download className="w-5 h-5" />
              <span>Easy Download</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {!selectedSubject ? (
          <DepartmentSelector
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedSemester={selectedSemester}
            setSelectedSemester={setSelectedSemester}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-card shadow-card rounded-lg p-6">
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-2">
                  {selectedSubject}
                </h2>
                <p className="text-muted-foreground">
                  {selectedDepartment} • Year {selectedYear} • Semester {selectedSemester}
                </p>
              </div>
              <Button variant="outline" onClick={resetSelection}>
                <Search className="w-4 h-4 mr-2" />
                Change Selection
              </Button>
            </div>

            <StudyMaterials 
              subject={selectedSubject}
              department={selectedDepartment}
              year={selectedYear}
              semester={selectedSemester}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;