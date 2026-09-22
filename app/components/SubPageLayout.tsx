"use client";

import { useEffect, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import { ProfileData } from "@/app/types/sanity";

interface SubPageLayoutProps {
  children: ReactNode;
  profile?: ProfileData | null;
}

export default function SubPageLayout({ children, profile }: SubPageLayoutProps) {
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
      <main className="w-full max-w-280 mx-auto my-0 md:my-8 lg:my-16 bg-container rounded-none md:rounded-[48px] lg:rounded-[64px] border border-brand-border-container p-6 sm:p-10 md:p-12 lg:p-20 flex flex-col transition-all duration-300 relative overflow-hidden">
        <Header />
        
        <div className="mt-12 md:mt-16 w-full flex flex-col">
          {children}
        </div>

        <Footer profile={profile} />
      </main>

      <BackToTop />
    </div>
  );
}
