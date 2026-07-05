"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleMount = () => {
      setMounted(true);
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };
    const id = requestAnimationFrame(handleMount);

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", handleScroll);
    };
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

  const navLinks = (
    <nav className="flex items-center flex-wrap justify-center gap-4 md:gap-[24px]">
      <a
        href="#about"
        className="relative text-[14px] md:text-[16px] font-medium text-brand-secondary hover:text-brand-primary transition-colors duration-300 py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[var(--primary-color)] after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-300"
      >
        About
      </a>
      <a
        href="#project"
        className="relative text-[14px] md:text-[16px] font-medium text-brand-secondary hover:text-brand-primary transition-colors duration-300 py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[var(--primary-color)] after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-300"
      >
        Project
      </a>
      <a
        href="#ui-kita"
        className="relative text-[14px] md:text-[16px] font-medium text-brand-secondary hover:text-brand-primary transition-colors duration-300 py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[var(--primary-color)] after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-300"
      >
        UI Kit
      </a>
    </nav>
  );

  const themeButton = (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center rounded-full border border-brand-border-toggle text-brand-secondary hover:text-brand-primary hover:border-brand-primary transition-all duration-200 cursor-pointer focus:outline-none"
      aria-label="Toggle Theme"
    >
      {mounted && theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
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
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-y-4 w-full">
        <div className="text-[20px] md:text-[24px] font-semibold text-brand-primary leading-none select-none tracking-tight">
          Hola!
        </div>

        <div className="flex items-center flex-wrap gap-4 md:gap-0">
          {navLinks}
          <div className="hidden md:block w-[32px]" />
          {themeButton}
        </div>
      </header>

      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full z-40 bg-container/85 shadow-sm"
            style={{ backdropFilter: "blur(12px)" }}
          >
            {/* inner container aligning with main content */}
            <div className="w-full max-w-[1120px] mx-auto px-6 sm:px-12 md:px-[80px] h-[72px] flex items-center justify-between">
              <div className="text-[18px] md:text-[20px] font-semibold text-brand-primary leading-none select-none tracking-tight">
                Hola!
              </div>
              <div className="flex items-center gap-4 md:gap-8">
                {navLinks}
                {themeButton}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
