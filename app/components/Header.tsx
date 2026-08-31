"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Read theme instantly on mount
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on resize to desktop & lock body scroll when open
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Project", href: "#projects" },
    { label: "Writing", href: "#writing" },
  ];

  const desktopNavLinks = (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="relative text-[15px] lg:text-[16px] font-medium text-brand-secondary hover:text-brand-primary transition-colors duration-300 py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-(--primary-color) after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-300"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );

  const themeButton = (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 md:w-11 md:h-11 shrink-0 flex items-center justify-center rounded-full border border-brand-border-toggle text-brand-secondary hover:text-brand-primary hover:border-brand-primary transition-all duration-200 cursor-pointer focus:outline-none"
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

  const hamburgerButton = (
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.25 rounded-full border border-brand-border-toggle text-brand-secondary hover:text-brand-primary hover:border-brand-primary transition-all duration-200 cursor-pointer focus:outline-none"
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMobileMenuOpen}
    >
      <motion.span
        animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-4.5 h-[1.75px] bg-current rounded-full"
      />
      <motion.span
        animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="w-4.5 h-[1.75px] bg-current rounded-full"
      />
      <motion.span
        animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-4.5 h-[1.75px] bg-current rounded-full"
      />
    </button>
  );

  return (
    <>
      <header className="relative flex items-center justify-between w-full">
        <a href="#" className="text-[20px] md:text-[24px] font-semibold text-brand-primary leading-none select-none tracking-tight">
          Hola!
        </a>

        <div className="flex items-center gap-3 md:gap-6">
          {desktopNavLinks}
          {themeButton}
          {hamburgerButton}
        </div>
      </header>

      {/* Sticky Header Bar */}
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
            <div className="w-full max-w-280 mx-auto px-6 sm:px-10 md:px-12 lg:px-20 h-16 md:h-18 flex items-center justify-between">
              <a href="#" className="text-[18px] md:text-[20px] font-semibold text-brand-primary leading-none select-none tracking-tight">
                Hola!
              </a>
              <div className="flex items-center gap-3 md:gap-8">
                {desktopNavLinks}
                {themeButton}
                {hamburgerButton}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] md:hidden bg-container flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Top Bar Header inside Fullscreen Menu */}
            <div className="flex items-center justify-between w-full">
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[22px] font-semibold text-brand-primary leading-none select-none tracking-tight"
              >
                Hola!
              </a>

              <div className="flex items-center gap-3">
                {themeButton}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-border-toggle text-brand-secondary hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Links - Large & Clean */}
            <div className="flex flex-col gap-6 my-auto">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + idx * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center justify-between text-[32px] sm:text-[36px] font-bold text-brand-primary hover:text-brand-secondary active:scale-[0.98] transition-all duration-200"
                >
                  <span>{item.label}</span>
                  <span className="text-[18px] opacity-0 group-hover:opacity-100 transition-opacity font-normal">
                    ↗
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

