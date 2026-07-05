"use client";

import { useRef, useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Writing from "./components/Writing";
import GithubContributions from "./components/GithubContributions";
import ToolsIUse from "./components/ToolsIUse";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import BackToTop from "./components/BackToTop";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const [toolsRevealed, setToolsRevealed] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0 });

    let timeoutId: number;
    const handleScroll = () => {
      document.documentElement.classList.add("is-scrolling");
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling");
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-page md:px-6 flex flex-col justify-start">
      <main ref={mainRef} className="w-full max-w-[1200px] mx-auto my-0 md:my-[64px] bg-container rounded-none md:rounded-[64px] border border-brand-border-container p-6 sm:p-12 md:p-[80px] flex flex-col transition-all duration-300 relative overflow-hidden">
        <Header />

        <ScrollReveal delay={0.1}>
          <Hero />
        </ScrollReveal>

        <ScrollReveal>
          <Projects />
        </ScrollReveal>

        <ScrollReveal>
          <Writing />
        </ScrollReveal>

        <ScrollReveal>
          <GithubContributions />
        </ScrollReveal>

        <ScrollReveal className="relative z-20" onAnimationComplete={() => setToolsRevealed(true)}>
          <ToolsIUse constraintsRef={mainRef} revealed={toolsRevealed} />
        </ScrollReveal>

        <ScrollReveal>
          <AboutMe />
        </ScrollReveal>

        <Footer />
      </main>

      <BackToTop />
    </div>
  );
}