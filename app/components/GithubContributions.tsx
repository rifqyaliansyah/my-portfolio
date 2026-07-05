"use client";

import { useEffect, useState } from 'react';
import Title from './Title';
import { GitHubCalendar } from 'react-github-calendar';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function GithubContributions() {
  const [mounted, setMounted] = useState(false);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    async function fetchContributions() {
      try {
        const response = await fetch('https://github-contributions-api.deno.dev/rifqyaliansyah.json');
        const data = await response.json();

        let sum = 0;
        data.contributions.forEach((week: any[]) => {
          week.forEach((day: any) => {
            sum += day.contributionCount;
          });
        });

        setTotalContributions(sum);
      } catch (error) {
        console.error('Error fetching contributions:', error);
      }
    }

    fetchContributions();

    return () => observer.disconnect();
  }, []);

  const description = totalContributions !== null
    ? `${totalContributions} contributions in the last year`
    : 'Loading contributions...';

  return (
    <section className="mt-32 w-full flex flex-col">
      <Title
        title="GitHub Contributions"
        description={description}
        href="https://github.com/rifqyaliansyah"
        buttonLabel="View GitHub"
        icon={<ArrowIcon />}
      />

      <div className="scrollbar-auto mt-8 w-full overflow-x-auto overflow-y-hidden p-6 rounded-xl border border-brand-border-container bg-surface flex md:justify-center text-brand-primary">
        <div className="min-w-max pb-2 md:pb-0 relative min-h-35">
          {mounted ? (
            <GitHubCalendar
              username="rifqyaliansyah"
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              colorScheme={theme}
              showTotalCount={false}
              showWeekdayLabels={true}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-secondary text-sm">
              Loading calendar...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
