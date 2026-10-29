"use client";

import { useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Writing from "./Writing";
import GithubContributions from "./GithubContributions";
import ToolsIUse from "./ToolsIUse";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import { LandingPageData } from "@/app/types/sanity";
import { scrollToHash } from "@/app/lib/scroll-to-hash";

interface ClientHomeLayoutProps {
  data: LandingPageData | null;
}

export default function ClientHomeLayout({ data }: ClientHomeLayoutProps) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    let frameId: number | null = null;
    const hash = window.location.hash.slice(1);

    if (hash) {
      // Browser sudah jump ke anchor saat load; ratakan ulang posisinya setelah layout siap.
      frameId = window.requestAnimationFrame(() => scrollToHash(hash, "instant"));
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

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
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-page md:px-6 flex flex-col justify-start">
      <main className="w-full max-w-280 mx-auto my-0 md:my-8 lg:my-16 bg-container rounded-none md:rounded-[48px] lg:rounded-[64px] border border-brand-border-container p-6 sm:p-10 md:p-12 lg:p-20 flex flex-col transition-all duration-300 relative overflow-hidden">
        <Header />

        <Hero profile={data?.profile} />

        <Projects projects={data?.featuredProjects} />

        <Writing writings={data?.writings} />

        <GithubContributions username={data?.profile?.githubUsername} />

        <ToolsIUse tools={data?.tools} />

        <AboutMe profile={data?.profile} />

        <Footer profile={data?.profile} />
      </main>

      <BackToTop />
    </div>
  );
}