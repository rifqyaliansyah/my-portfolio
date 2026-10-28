"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Title from './Title';

const FigmaIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <path d="M20 20C20 23.682 17.015 26.667 13.333 26.667C9.652 26.667 6.667 23.682 6.667 20C6.667 16.318 9.652 13.333 13.333 13.333H20V20Z" fill="#0ACF83" />
    <path d="M13.333 13.333C9.652 13.333 6.667 10.348 6.667 6.667C6.667 2.985 9.652 0 13.333 0H20V13.333H13.333Z" fill="#A259FF" />
    <path d="M20 0H26.667C30.348 0 33.333 2.985 33.333 6.667C33.333 10.348 30.348 13.333 26.667 13.333H20V0Z" fill="#F24E1E" />
    <path d="M20 13.333H26.667C30.348 13.333 33.333 16.318 33.333 20C33.333 23.682 30.348 26.667 26.667 26.667H20V13.333Z" fill="#FF7262" />
    <path d="M20 40C16.318 40 13.333 37.015 13.333 33.333C13.333 29.652 16.318 26.667 20 26.667V40Z" fill="#1ABCFE" />
  </svg>
);

const CleanShotIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <rect x="5" y="10" width="25" height="25" rx="6" stroke="var(--primary-color)" strokeWidth="3" />
    <path d="M28 2L30 10L38 12L30 14L28 22L26 14L18 12L26 10L28 2Z" fill="var(--primary-color)" />
  </svg>
);

const AvatarIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <circle cx="20" cy="20" r="16" fill="var(--primary-color)" />
    <circle cx="20" cy="15" r="7" fill="var(--bg-container)" />
    <path d="M10 32C10 26.477 14.477 22 20 22C25.523 22 30 26.477 30 32" stroke="var(--bg-container)" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const DaVinciIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <rect x="2" y="2" width="36" height="36" rx="10" fill="#1A1A1A" />
    <circle cx="20" cy="15" r="8" fill="#FF3B30" style={{ mixBlendMode: 'screen' }} />
    <circle cx="15" cy="25" r="8" fill="#4CD964" style={{ mixBlendMode: 'screen' }} />
    <circle cx="25" cy="25" r="8" fill="#007AFF" style={{ mixBlendMode: 'screen' }} />
  </svg>
);

const ObsidianIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <path d="M20 2L35 15L25 38L15 38L5 15L20 2Z" fill="#A259FF" />
    <path d="M20 2L20 20L35 15L20 2Z" fill="#8A2BE2" />
    <path d="M20 20L25 38L35 15L20 20Z" fill="#6A0DAD" />
    <path d="M20 2L5 15L20 20L20 2Z" fill="#B388FF" />
    <path d="M5 15L15 38L20 20L5 15Z" fill="#9575CD" />
  </svg>
);

const CubeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <path d="M20 5L35 12V28L20 35L5 28V12L20 5Z" fill="#E0E0E0" />
    <path d="M20 20L35 12V28L20 35V20Z" fill="#252525" />
    <path d="M5 12L20 20V35L5 28V12Z" fill="#4A4A4A" />
    <path d="M20 5L35 12L20 20L5 12L20 5Z" fill="#F2F0EF" />
  </svg>
);

const RaycastIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <rect x="8" y="8" width="8" height="24" fill="var(--primary-color)" />
    <rect x="16" y="8" width="12" height="8" fill="var(--primary-color)" />
    <rect x="24" y="16" width="8" height="8" fill="var(--primary-color)" />
    <rect x="16" y="24" width="8" height="8" fill="var(--primary-color)" />
    <rect x="24" y="32" width="8" height="8" fill="var(--primary-color)" />
  </svg>
);

const ArcIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <path d="M5 20C5 11.716 11.716 5 20 5C28.284 5 35 11.716 35 20V35H20C11.716 35 5 28.284 5 20Z" fill="#007AFF" />
    <circle cx="20" cy="20" r="8" fill="#FFFFFF" />
  </svg>
);

const VSCodeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <path d="M28 6L11 18.5L5 14L28 6Z" fill="#007ACC" />
    <path d="M28 34L11 21.5L5 26L28 34Z" fill="#007ACC" />
    <path d="M35 12L28 6L11 18.5L28 34L35 28V12Z" fill="#1F9CF0" />
    <path d="M5 14V26L11 21.5L11 18.5L5 14Z" fill="#AE81FF" />
  </svg>
);

const NotionIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <rect x="5" y="5" width="30" height="30" rx="6" fill="#1A1A1A" />
    <path d="M11 10H29V12H11V10Z" fill="white" />
    <path d="M11 14L15 28H18L21 17L24 28H27L31 14H27L25 24L22 14H18L15 24L13 14H11Z" fill="white" />
  </svg>
);

const NextJsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <circle cx="20" cy="20" r="16" fill="black" />
    <path d="M28 28L18.5 15.5V28H16V12H18.5L25.5 21.5V12H28V28Z" fill="white" />
    <path d="M24.5 23.5L28 28H26L23 24L24.5 23.5Z" fill="url(#nextjs-grad)" />
    <defs>
      <linearGradient id="nextjs-grad" x1="28" y1="28" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const SpotifyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <circle cx="20" cy="20" r="16" fill="#1ED760" />
    <path d="M27.5 13.5C22.5 10.5 14.5 11.5 10.5 13C9.8 13.2 9.2 12.8 9 12.2C8.8 11.5 9.2 10.9 9.8 10.7C14.5 9 23.5 8 29.2 11.5C29.8 11.9 30 12.7 29.6 13.3C29.2 13.8 28.2 14 27.5 13.5Z" fill="black" />
    <path d="M25.5 17.5C21.2 15 14.5 15.5 11.2 16.8C10.5 17 9.8 16.5 9.6 15.8C9.4 15.1 9.9 14.4 10.6 14.2C14.8 12.7 22.2 12.2 27.1 15C27.7 15.4 27.9 16.2 27.5 16.8C27 17.3 26.1 17.7 25.5 17.5Z" fill="black" />
    <path d="M23.5 21.2C20 19 14.8 19.2 12 20.2C11.3 20.4 10.7 20 10.5 19.3C10.3 18.6 10.7 18 11.4 17.8C14.8 16.7 20.5 16.5 24.6 19C25.2 19.4 25.4 20.2 25 20.8C24.5 21.2 23.8 21.4 23.5 21.2Z" fill="black" />
  </svg>
);

const SlackIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <rect x="2" y="2" width="36" height="36" rx="8" fill="#4A154B" />
    <circle cx="15" cy="12" r="3" fill="#36C5F0" />
    <rect x="15" y="16" width="6" height="12" rx="3" fill="#2EB67D" />
    <circle cx="25" cy="15" r="3" fill="#ECB22E" />
    <rect x="9" y="19" width="12" height="6" rx="3" fill="#E01E5A" />
  </svg>
);

const GitIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <path d="M37.5 18.5L21.5 2.5C20.5 1.5 19.5 1.5 18.5 2.5L2.5 18.5C1.5 19.5 1.5 20.5 2.5 21.5L18.5 37.5C19.5 38.5 20.5 38.5 21.5 37.5L37.5 21.5C38.5 20.5 38.5 19.5 37.5 18.5Z" fill="#F05032" />
    <circle cx="20" cy="15" r="3.5" fill="white" />
    <circle cx="20" cy="27" r="3.5" fill="white" />
    <circle cx="27" cy="20" r="3.5" fill="white" />
    <path d="M20 18.5V23.5" stroke="white" strokeWidth="2.5" />
    <path d="M20 20L24.5 20" stroke="white" strokeWidth="2.5" />
  </svg>
);

const TailwindIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <path d="M20 11C23 6.5 29 6.5 32 11C29 15.5 23 15.5 20 11Z" fill="#38BDF8" />
    <path d="M12 21C15 16.5 21 16.5 24 21C21 25.5 15 25.5 12 21Z" fill="#38BDF8" />
    <path d="M20 21C23 16.5 29 16.5 32 21C29 25.5 23 25.5 20 21Z" fill="#0EA5E9" />
    <path d="M12 11C15 6.5 21 6.5 24 11C21 15.5 15 15.5 12 11Z" fill="#0EA5E9" />
  </svg>
);

const LinearIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12">
    <circle cx="20" cy="20" r="16" fill="black" />
    <path d="M20 8C13.4 8 8 13.4 8 20C8 26.6 13.4 32 20 32C26.6 32 32 26.6 32 20H20V8Z" fill="#5E6AD2" />
  </svg>
);

import Image from 'next/image';
import { ToolData } from '@/app/types/sanity';
import { urlFor } from '@/app/lib/sanity';

const toolIconsByName: Record<string, React.ReactNode> = {
  Figma: <FigmaIcon />,
  CleanShot: <CleanShotIcon />,
  Avatar: <AvatarIcon />,
  DaVinci: <DaVinciIcon />,
  Obsidian: <ObsidianIcon />,
  Cube: <CubeIcon />,
  Raycast: <RaycastIcon />,
  Arc: <ArcIcon />,
  'VS Code': <VSCodeIcon />,
  VSCode: <VSCodeIcon />,
  Notion: <NotionIcon />,
  'React / Next.js': <NextJsIcon />,
  Nextjs: <NextJsIcon />,
  'Next.js': <NextJsIcon />,
  Spotify: <SpotifyIcon />,
  Slack: <SlackIcon />,
  Git: <GitIcon />,
  'Tailwind CSS': <TailwindIcon />,
  Tailwind: <TailwindIcon />,
  Linear: <LinearIcon />,
};

interface ToolItem {
  id: string | number;
  name: string;
  icon: React.ReactNode;
}

const defaultTools: ToolItem[] = [
  { id: 1, name: 'Figma', icon: <FigmaIcon /> },
  { id: 2, name: 'CleanShot', icon: <CleanShotIcon /> },
  { id: 3, name: 'Avatar', icon: <AvatarIcon /> },
  { id: 4, name: 'DaVinci', icon: <DaVinciIcon /> },
  { id: 5, name: 'Obsidian', icon: <ObsidianIcon /> },
  { id: 6, name: 'Cube', icon: <CubeIcon /> },
  { id: 7, name: 'Raycast', icon: <RaycastIcon /> },
  { id: 8, name: 'Arc', icon: <ArcIcon /> },
  { id: 9, name: 'VS Code', icon: <VSCodeIcon /> },
  { id: 10, name: 'Notion', icon: <NotionIcon /> },
  { id: 11, name: 'React / Next.js', icon: <NextJsIcon /> },
  { id: 12, name: 'Spotify', icon: <SpotifyIcon /> },
  { id: 13, name: 'Slack', icon: <SlackIcon /> },
  { id: 14, name: 'Git', icon: <GitIcon /> },
  { id: 15, name: 'Tailwind CSS', icon: <TailwindIcon /> },
  { id: 16, name: 'Linear', icon: <LinearIcon /> },
];

interface LayoutMetrics {
  cardSize: number;
  overlap: number;
  arcHeight: number;
  rowGap: number;
  maxPerRow: number;
}

const MOBILE_METRICS: LayoutMetrics = {
  cardSize: 72,
  overlap: 4,
  arcHeight: 16,
  rowGap: 28,
  maxPerRow: 4,
};

const TABLET_METRICS: LayoutMetrics = {
  cardSize: 80,
  overlap: 5,
  arcHeight: 20,
  rowGap: 34,
  maxPerRow: 8,
};

const DESKTOP_METRICS: LayoutMetrics = {
  cardSize: 100,
  overlap: 6,
  arcHeight: 26,
  rowGap: 42,
  maxPerRow: 8,
};

const ARC_MAX_TILT = 10;

const getLayoutMetrics = (): LayoutMetrics => {
  if (typeof window === 'undefined') return MOBILE_METRICS;
  if (window.matchMedia('(min-width: 768px)').matches) return DESKTOP_METRICS;
  if (window.matchMedia('(min-width: 640px)').matches) return TABLET_METRICS;
  return MOBILE_METRICS;
};


interface ToolsIUseProps {
  tools?: ToolData[];
}

export default function ToolsIUse({ tools: sanityTools }: ToolsIUseProps) {
  const activeTools: ToolItem[] = useMemo(() => {
    if (!sanityTools || sanityTools.length === 0) {
      return defaultTools;
    }
    // Map sanity tools to visual tool cards with correct priority
    return sanityTools.map((t, idx) => {
      const fallbackTool = defaultTools[idx % defaultTools.length];
      let icon: React.ReactNode = null;

      // 1. Primary: Uploaded Sanity icon
      if (t.icon && t.icon.asset) {
        try {
          icon = (
            <Image
              src={urlFor(t.icon).width(48).height(48).auto('format').url()}
              alt={t.name || fallbackTool.name}
              width={40}
              height={40}
              draggable={false}
              className="w-10 h-10 md:w-12 md:h-12 object-contain pointer-events-none select-none"
            />
          );
        } catch {
          icon = null;
        }
      }

      // 2. Fallback 1: Predefined SVG icon by tool name
      if (!icon && t.name && toolIconsByName[t.name]) {
        icon = toolIconsByName[t.name];
      }

      // 3. Fallback 2: Default placeholder icon
      if (!icon) {
        icon = fallbackTool.icon;
      }

      return {
        id: t._id || idx + 1,
        name: t.name || fallbackTool.name,
        icon,
      };
    });
  }, [sanityTools]);

  const [metrics, setMetrics] = useState<LayoutMetrics>(MOBILE_METRICS);
  const [containerWidth, setContainerWidth] = useState(0);
  const [hoveredId, setHoveredId] = useState<ToolItem['id'] | null>(null);
  const [activeId, setActiveId] = useState<ToolItem['id'] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMetrics = () => setMetrics(getLayoutMetrics());
    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, []);

  // Follow the real container width so each arc spans the available space
  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const updateWidth = (width: number) => setContainerWidth(width);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      updateWidth(entry ? entry.contentRect.width : el.getBoundingClientRect().width);
    });

    observer.observe(el);
    updateWidth(el.getBoundingClientRect().width);

    return () => observer.disconnect();
  }, []);

  // Close a tapped popover when pressing anywhere outside the stack
  useEffect(() => {
    if (activeId === null) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (!gridRef.current?.contains(event.target as Node)) {
        setActiveId(null);
      }
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown);
    return () => document.removeEventListener('pointerdown', handleOutsidePointerDown);
  }, [activeId]);

  useEffect(() => {
    if (activeId === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveId(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeId]);

  const rows = useMemo(() => {
    if (activeTools.length === 0) return [];

    const rowCount = Math.max(1, Math.ceil(activeTools.length / metrics.maxPerRow));
    const perRow = Math.max(1, Math.ceil(activeTools.length / rowCount));
    const nextRows: ToolItem[][] = [];

    for (let i = 0; i < activeTools.length; i += perRow) {
      nextRows.push(activeTools.slice(i, i + perRow));
    }

    return nextRows;
  }, [activeTools, metrics.maxPerRow]);

  const toggleActive = (id: ToolItem['id']) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="mt-32 w-full flex flex-col items-center">
      <Title
        title="Tech Stack"
        description="The tech stack and tools I use to build seamless web applications and scalable systems."
        descriptionGap="mt-[24px]"
        align="center"
        showLink={false}
      />

      <div
        ref={gridRef}
        className="mt-14 md:mt-16 w-full flex flex-col items-center"
        style={{ gap: metrics.rowGap }}
      >
        {rows.map((row, rowIndex) => {
          const layoutWidth =
            containerWidth > 0 ? containerWidth : metrics.cardSize * metrics.maxPerRow;
          const rawStep =
            row.length > 1 ? (layoutWidth - metrics.cardSize) / (row.length - 1) : 0;
          // Keep a light overlap: never leave a gap, but never crowd the cards either
          const step = Math.min(rawStep, metrics.cardSize - metrics.overlap);
          const spacing = step - metrics.cardSize;

          return (
            <div
              key={rowIndex}
              className="flex items-center justify-center"
              style={{ paddingTop: metrics.arcHeight, paddingBottom: 8 }}
            >
              {row.map((tool, index) => {
              const normalized =
                row.length > 1
                  ? (index - (row.length - 1) / 2) / ((row.length - 1) / 2)
                  : 0;
              const arcY = -metrics.arcHeight * (1 - normalized * normalized);
              const rotate = normalized * ARC_MAX_TILT;
              const isActive = activeId === tool.id;
              const isHovered = hoveredId === tool.id;
              const showPopover = isActive || isHovered;
              const baseZIndex = index % 2 === 0 ? 30 : 10;

              return (
                <div
                  key={tool.id}
                  className="relative shrink-0"
                  style={{
                    marginLeft: index === 0 ? 0 : spacing,
                    transform: `translateY(${arcY}px) rotate(${rotate}deg)`,
                    zIndex: showPopover ? 500 : baseZIndex,
                  }}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={tool.name}
                    className="relative flex items-center justify-center bg-container rounded-2xl border border-brand-border-container shadow-[0_8px_30px_var(--card-shadow-color)] select-none cursor-pointer transition-transform duration-200 ease-out hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-color)"
                    style={{ width: metrics.cardSize, height: metrics.cardSize }}
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') setHoveredId(tool.id);
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === 'mouse') setHoveredId(null);
                    }}
                    onPointerDown={(event) => {
                      if (event.pointerType !== 'mouse') toggleActive(tool.id);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        toggleActive(tool.id);
                      }
                    }}
                  >
                    {tool.icon}

                    <div
                      className={`pointer-events-none absolute bottom-full left-1/2 mb-2.5 whitespace-nowrap rounded-lg border border-brand-border-container bg-container px-2.5 py-1 text-[11px] font-semibold text-brand-primary shadow-lg transition-opacity duration-150 ${
                        showPopover ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ transform: `translateX(-50%) rotate(${-rotate}deg)` }}
                    >
                      {tool.name}
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
