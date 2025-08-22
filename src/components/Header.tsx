import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="bg-card shadow-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-hero text-white p-3 rounded-lg shadow-elegant">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">
                Annamacharya University
              </h1>
              <p className="text-muted-foreground text-sm">
                Rajampet, Andhra Pradesh
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-card-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#departments" className="text-card-foreground hover:text-primary transition-colors">
              Departments
            </a>
            <a href="#about" className="text-card-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-card-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDark(!isDark)}
              className="hidden sm:flex"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};