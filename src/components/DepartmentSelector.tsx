import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Computer, Cpu, Zap, Wrench, ChevronRight } from "lucide-react";

interface DepartmentSelectorProps {
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedSemester: string;
  setSelectedSemester: (semester: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
}

const departments = [
  { code: "CSE", name: "Computer Science & Engineering", icon: Computer, color: "text-blue-600" },
  { code: "ECE", name: "Electronics & Communication", icon: Cpu, color: "text-green-600" },
  { code: "EEE", name: "Electrical & Electronics", icon: Zap, color: "text-yellow-600" },
  { code: "ME", name: "Mechanical Engineering", icon: Wrench, color: "text-red-600" },
];

const academicYears = ["1", "2", "3", "4"];

const subjects = {
  CSE: {
    "1": {
      "1": ["Problem Solving through C Programming", "Algebra and Calculus", "Communicative English", "Chemistry"],
      "2": ["Basic Electrical and Electronics Engineering", "Differential Equations and Vector Calculus", "Data Structures through Python", "Engineering Drawing", "Applied Physics"]
    },
    "2": {
      "3": ["Discrete Mathematics", "Object Oriented Programming using Java", "Computer System Architecture", "Database Management Systems"],
      "4": ["Formal Languages and Automata Theory", "Microprocessor and Interfacing", "Operating Systems", "Probability & Statistics", "Design and Analysis of Algorithms"]
    }
    "3": {
      "5": ["Computer Networks", "Principles of Programming Languages", "Software Engineering", "Advanced Databases", "Artificial Intelligence"],
      "6": ["Compiler Design", "Metrology & MeasurementData Mining and Data Warehousing", "Internet of Things", "Machine Learning","Software Project Management", "Cryptography and Network Security"]
    },
    "4": {
      "7": ["Data Science", "Disaster Management", "R Programming", "Cloud Computing","Cyber Security and Ethical Hacking"],
      "8": ["Algorithms for Data Engineering"]
    }
  },
  ECE: {
    "1": {
      "1": ["Engineering Drawing", "Problem Solving through C Programming", "Applied Physics", "Basic Electrical & Electronics Engineering", "Algebra and Calculus"],
      "2": ["Electrical Circuits and Technology", "Electronic Devices and Circuits", "Chemistry", "Differential Equations and Vector Calculus"]
    },
    "2": {
      "3": ["Digital Logic Design", "Managerial Economics and Financial Analysis", "Signals and Systems", "Transform Techniques & Complex Variables","Analog Circuits"],
      "4": ["Electromagnetic Theory", "Numerical Methods and Random Variables", "Advanced Digital Design Concepts", "Communication Systems"]
    }
    "3": {
      "5": ["Industrial Management", "Microprocessors and Interfacing", "Pulse and Digital Circuits", "VLSI Design", "Control Systems","Electric Vehicles","Human Resource Management"],
      "6": ["Digital Signal Processing", "Embedded Systems", "Microwave Engineering", "Radar Engineering","Internet of Things", "Computer Organization"]
    },
    "4": {
      "7": ["Satellite Communications", "Wireless Communications & Neworks", "Cellular and Mobile Communications", "Digital Image Processing"],
      "8": ["Feature Engineering in Machine Learning"]
    }
  }
  EEE: {
    "1": {
      "1": ["Engineering Drawing", "Problem Solving through C Programming", "Applied Physics", "Algebra and Calculus", "Basic Electrical Engineering"],
      "2": ["Differential Equations and Vector Calculus", "Electrical Circuits", "Fundamentals of Electronic Devices and Circuits", "Chemistry"]
    },
    "2": {  
      "3": ["Switching Theory and Logic Design", "Transform Techniques & Complex Variables", "Analog Electronics", "Electrical Machines–I", "Network Analysis and Signals"],
      "4": ["Electro Magnetic Fields", "Electrical Machines-II", "Managerial Economics and Financial Analysis", "Numerical Methods and Random Variables","Electrical and Electronics Measurements"]
    }
    "3": {
      "5": ["Basics of VLSI Design", "Distribution of Electric Power", "Data Structures & Algorithms", "Electric Power Transmission and Switch Gear", "Foundations of Artificial Intelligence and Data Science","Introduction to Communications","Power Electronics","Renewable Energy Systems"],
      "6": ["Introduction to Verilog Programming", "Microprocessors and Microcontrollers", "Power System Analysis", "Power Semiconductor Drives","Power System Operation and Control", "Computer Organization","Power System Protection","Solar and Wind Energy Systems"]
    },
    "4": {
      "7": ["Energy Storage Systems", "Hybrid Electric Vehicles", "IoT Applications in Electrical Engineering", "Smart Grid","Utilization of Electrical Energy","Energy Auditing and Demand Side Management"],
      "8": ["Feature Engineering in Machine Learning","Fundamentals of Operating Systems","Deregulated Power Systems"]
    }
    
  },
  ME: {
    "1": {
      "1": ["Communicative English", "Engineering Chemistry", "Problem Solving through C Programming", "Algebra and Calculus"],
      "2": ["Engineering Mechanics", "Engineering Physics", "Differential Equations and Vector Calculus"]
    },
    "2": {
      "3": ["Mechanics of Solids", "Manufacturing Processes", "Partial Differential Equations and Numerical Methods", "Basic Thermodynamics"],
      "4": ["Managerial Economics and Financial Analysis", "Probability & Statistics", "Theory of Machines", "Design of Machine Elements-I","Fluid Mechanics and Hydraulic Machines"]
    }
    "3": {
      "5": ["IC Engines", "Industrial Management", "Machining Processes", "Design of Machine Elements-II", "Data Structures using Python"],
      "6": ["Heat Transfer", "Metrology & Measurements", "Automation & Robotics", "CAD/CAM"]
    },
    "4": {
      "7": ["Total Quality Management", "Operations Research", "Power Plant Engineering"],
      "8": ["Disaster Management", "Fundamentals of Operating Systems"]
    }
  }
};

export const DepartmentSelector = ({
  selectedDepartment,
  setSelectedDepartment,
  selectedYear,
  setSelectedYear,
  selectedSemester,
  setSelectedSemester,
  selectedSubject,
  setSelectedSubject
}: DepartmentSelectorProps) => {
  
  const getSemesters = (year: string) => {
    const yearNum = parseInt(year);
    return [
      (yearNum * 2 - 1).toString(),
      (yearNum * 2).toString()
    ];
  };

  const getSubjects = () => {
    if (!selectedDepartment || !selectedYear || !selectedSemester) return [];
    return subjects[selectedDepartment as keyof typeof subjects]?.[selectedYear as keyof typeof subjects.CSE]?.[selectedSemester as keyof typeof subjects.CSE["1"]] || [];
  };

  return (
    <div className="space-y-8">
      {/* Department Selection */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8 text-card-foreground">
          Select Your Department
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => {
            const IconComponent = dept.icon;
            return (
              <Card
                key={dept.code}
                className={`cursor-pointer transition-all duration-300 hover:shadow-elegant hover:scale-105 ${
                  selectedDepartment === dept.code
                    ? 'ring-2 ring-primary shadow-glow bg-gradient-card'
                    : 'bg-card hover:bg-gradient-card'
                }`}
                onClick={() => setSelectedDepartment(dept.code)}
              >
                <CardHeader className="text-center pb-2">
                  <div className={`mx-auto p-3 rounded-lg bg-muted ${dept.color}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg">{dept.code}</CardTitle>
                  <CardDescription className="text-sm">
                    {dept.name}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Academic Year Selection */}
      {selectedDepartment && (
        <div className="animate-fade-up">
          <h3 className="text-2xl font-bold mb-6 text-card-foreground">
            Select Academic Year
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {academicYears.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                className="h-16 text-lg"
                onClick={() => setSelectedYear(year)}
              >
                Year {year}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Semester & Subject Selection */}
      {selectedDepartment && selectedYear && (
        <div className="grid md:grid-cols-2 gap-6 animate-fade-up">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Select Semester</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose semester..." />
                </SelectTrigger>
                <SelectContent>
                  {getSemesters(selectedYear).map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Select Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={selectedSubject} 
                onValueChange={setSelectedSubject}
                disabled={!selectedSemester}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose subject..." />
                </SelectTrigger>
                <SelectContent>
                  {getSubjects().map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Continue Button */}
      {selectedSubject && (
        <div className="text-center animate-fade-up">
          <Button size="lg" className="shadow-elegant">
            Access Study Materials
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};