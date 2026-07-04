"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleMount = () => {
      setMounted(true);
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };
    const id = requestAnimationFrame(handleMount);
    return () => cancelAnimationFrame(id);
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "light" ? "dark" : "light";

    const updateDOM = () => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    if (!("startViewTransition" in document)) {
      updateDOM();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    document.documentElement.style.setProperty("--ripple-x", `${x}px`);
    document.documentElement.style.setProperty("--ripple-y", `${y}px`);

    const doc = document as Document & {
      startViewTransition: (callback: () => void) => void;
    };
    doc.startViewTransition(updateDOM);
  };

  return (
    <header className="flex items-center justify-between w-full">
      <div className="text-[24px] font-semibold text-brand-primary leading-none select-none tracking-tight">
        Hola!
      </div>

      <div className="flex items-center">
        <nav className="flex items-center gap-[24px]">
          <a
            href="#about"
            className="text-[16px] font-normal text-brand-secondary hover:text-brand-primary transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#project"
            className="text-[16px] font-normal text-brand-secondary hover:text-brand-primary transition-colors duration-200"
          >
            Project
          </a>
          <a
            href="#ui-kita"
            className="text-[16px] font-normal text-brand-secondary hover:text-brand-primary transition-colors duration-200"
          >
            UI Kit
          </a>
        </nav>

        <div className="w-[32px]" />

        <button
          onClick={toggleTheme}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-brand-border-toggle text-brand-secondary hover:text-brand-primary hover:border-brand-primary transition-all duration-200 cursor-pointer focus:outline-none"
          aria-label="Toggle Theme"
        >
          {mounted && theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 rotate-45"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 hover:-rotate-12"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
