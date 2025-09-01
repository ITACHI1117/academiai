"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isManualMode, setIsManualMode] = useState(false);

  // Initialize manual mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    setIsManualMode(savedMode === "manual");
  }, []);

  // Handle time-based theme updates
  useEffect(() => {
    if (isManualMode) return;

    const updateThemeBasedOnTime = () => {
      const hour = new Date().getHours();
      // Switch to dark mode from 6 PM (18:00) to 6 AM (6:00)
      if (hour >= 18 || hour < 6) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    // Update theme initially
    updateThemeBasedOnTime();

    // Set up an interval to check time every minute
    const interval = setInterval(updateThemeBasedOnTime, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [isManualMode, setTheme]);

  const handleThemeToggle = () => {
    setIsManualMode(true);
    localStorage.setItem("themeMode", "manual");
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleThemeToggle}
      title={isManualMode ? "Manual theme mode" : "Automatic time-based theme"}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}