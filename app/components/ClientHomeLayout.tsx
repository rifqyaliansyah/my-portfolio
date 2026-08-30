"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import Header from "./Header";
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Writing from "./Writing";
import GithubContributions from "./GithubContributions";
import ToolsIUse from "./ToolsIUse";
import Footer from "./Footer";
import ScrollReveal from "./ScrollReveal";
import BackToTop from "./BackToTop";
import { LandingPageData } from "@/app/types/sanity";

interface ClientHomeLayoutProps {
  data: LandingPageData | null;
}

export default function ClientHomeLayout({ data }: ClientHomeLayoutProps) {
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
      <main
        ref={mainRef}
        className="w-full max-w-280 mx-auto my-0 md:my-16 bg-container rounded-none md:rounded-[64px] border border-brand-border-container p-6 sm:p-12 md:p-20 flex flex-col transition-all duration-300 relative overflow-hidden"
      >
        <Header />

        <ScrollReveal delay={0.1}>
          <Hero profile={data?.profile} testimonials={data?.testimonials} />
        </ScrollReveal>

        <ScrollReveal>
          <Projects projects={data?.featuredProjects} />
        </ScrollReveal>

        <ScrollReveal>
          <Writing writings={data?.writings} />
        </ScrollReveal>

        <ScrollReveal>
          <GithubContributions username={data?.profile?.githubUsername} />
        </ScrollReveal>

        <ScrollReveal
          className="relative z-20"
          onAnimationComplete={() => setToolsRevealed(true)}
        >
          <ToolsIUse
            constraintsRef={mainRef}
            revealed={toolsRevealed}
            tools={data?.tools}
          />
        </ScrollReveal>

        <ScrollReveal>
          <AboutMe profile={data?.profile} />
        </ScrollReveal>

        <Footer profile={data?.profile} />
      </main>

      <BackToTop />
    </div>
  );
}
