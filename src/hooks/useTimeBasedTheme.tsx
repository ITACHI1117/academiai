"use client";

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function useTimeBasedTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
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
  }, [setTheme]);
}
