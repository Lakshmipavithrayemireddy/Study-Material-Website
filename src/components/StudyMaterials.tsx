import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, MessageCircle, Brain, BookOpen, Search, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudyMaterialsProps {
  subject: string;
  department: string;
  year: string;
  semester: string;
}

const mockMaterials = {
  unit1: [
    { name: "Introduction to Programming", type: "PDF", size: "2.3 MB", downloads: 245 },
    { name: "Basic Concepts & Syntax", type: "PPT", size: "1.8 MB", downloads: 189 },
    { name: "Practice Problems", type: "PDF", size: "892 KB", downloads: 156 }
  ],
  unit2: [
    { name: "Control Structures", type: "PDF", size: "3.1 MB", downloads: 298 },
    { name: "Loops and Conditions", type: "PPT", size: "2.4 MB", downloads: 167 },
    { name: "Exercise Solutions", type: "PDF", size: "1.2 MB", downloads: 203 }
  ],
  unit3: [
    { name: "Functions and Arrays", type: "PDF", size: "2.8 MB", downloads: 221 },
    { name: "Memory Management", type: "PPT", size: "1.9 MB", downloads: 134 },
    { name: "Code Examples", type: "PDF", size: "945 KB", downloads: 178 }
  ],
  unit4: [
    { name: "Pointers and Structures", type: "PDF", size: "3.4 MB", downloads: 256 },
    { name: "Dynamic Memory", type: "PPT", size: "2.2 MB", downloads: 142 },
    { name: "Lab Manual", type: "PDF", size: "1.7 MB", downloads: 189 }
  ],
  unit5: [
    { name: "File Handling", type: "PDF", size: "2.6 MB", downloads: 198 },
    { name: "Advanced Topics", type: "PPT", size: "2.0 MB", downloads: 123 },
    { name: "Final Project Guide", type: "PDF", size: "1.4 MB", downloads: 167 }
  ]
};

export const StudyMaterials = ({ subject, department, year, semester }: StudyMaterialsProps) => {
  const [activeUnit, setActiveUnit] = useState("unit1");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const { toast } = useToast();

  const handleDownload = (materialName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${materialName}...`,
    });
  };

  const handleAIQuery = async () => {
    if (!aiQuery.trim()) return;
    
    setIsLoadingAI(true);
    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`Based on your question about "${aiQuery}", here's what I can help you with:

This topic is covered in Unit ${activeUnit.slice(-1)} of ${subject}. The key concepts include:

• Understanding the fundamental principles
• Practical applications and examples  
• Common problem-solving approaches
• Important formulas and theorems

For more detailed explanations, I recommend reviewing the study materials and practicing the example problems provided.`);
      setIsLoadingAI(false);
    }, 2000);
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Study Materials */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Study Materials - {subject}
            </CardTitle>
            <CardDescription>
              Access unit-wise study materials and resources
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs value={activeUnit} onValueChange={setActiveUnit}>
          <TabsList className="grid grid-cols-5 w-full">
            {[1, 2, 3, 4, 5].map((unit) => (
              <TabsTrigger key={unit} value={`unit${unit}`}>
                Unit {unit}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(mockMaterials).map(([unitKey, materials]) => (
            <TabsContent key={unitKey} value={unitKey} className="space-y-4">
              <div className="grid gap-4">
                {materials.map((material, index) => (
                  <Card key={index} className="bg-card hover:bg-gradient-card transition-all duration-300 hover:shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {getFileIcon(material.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-card-foreground">
                              {material.name}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="secondary">{material.type}</Badge>
                              <span>{material.size}</span>
                              <span>•</span>
                              <span>{material.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleDownload(material.name)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* AI Assistant */}
      <div className="space-y-6">
        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Study Assistant
            </CardTitle>
            <CardDescription>
              Ask questions about the current unit content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Ask me anything about this unit..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              rows={3}
            />
            <Button 
              onClick={handleAIQuery}
              disabled={isLoadingAI || !aiQuery.trim()}
              className="w-full"
            >
              {isLoadingAI ? (
                <>Processing...</>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask AI
                </>
              )}
            </Button>

            {aiResponse && (
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <Brain className="w-4 h-4 text-accent mt-1" />
                    <span className="text-sm font-medium text-accent">AI Assistant</span>
                  </div>
                  <p className="text-sm text-card-foreground whitespace-pre-line">
                    {aiResponse}
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Search className="w-4 h-4 mr-2" />
              Search Materials
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Brain className="w-4 h-4 mr-2" />
              Generate Summary
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Practice Questions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};