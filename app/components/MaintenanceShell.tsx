"use client";

import type { MouseEvent, ReactNode } from "react";

export default function MaintenanceShell({ children }: { children: ReactNode }) {
  const toggleTheme = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a")) {
      return;
    }

    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <main
      onClick={toggleTheme}
      className="min-h-screen bg-page flex items-center justify-center px-6 py-16"
    >
      {children}
    </main>
  );
}
