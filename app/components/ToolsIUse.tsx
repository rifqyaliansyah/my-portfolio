"use client";

import { useState, useEffect, useMemo, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import Title from './Title';

const FigmaIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <path d="M20 20C20 23.682 17.015 26.667 13.333 26.667C9.652 26.667 6.667 23.682 6.667 20C6.667 16.318 9.652 13.333 13.333 13.333H20V20Z" fill="#0ACF83" />
    <path d="M13.333 13.333C9.652 13.333 6.667 10.348 6.667 6.667C6.667 2.985 9.652 0 13.333 0H20V13.333H13.333Z" fill="#A259FF" />
    <path d="M20 0H26.667C30.348 0 33.333 2.985 33.333 6.667C33.333 10.348 30.348 13.333 26.667 13.333H20V0Z" fill="#F24E1E" />
    <path d="M20 13.333H26.667C30.348 13.333 33.333 16.318 33.333 20C33.333 23.682 30.348 26.667 26.667 26.667H20V13.333Z" fill="#FF7262" />
    <path d="M20 40C16.318 40 13.333 37.015 13.333 33.333C13.333 29.652 16.318 26.667 20 26.667V40Z" fill="#1ABCFE" />
  </svg>
);

const CleanShotIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <rect x="5" y="10" width="25" height="25" rx="6" stroke="var(--primary-color)" strokeWidth="3" />
    <path d="M28 2L30 10L38 12L30 14L28 22L26 14L18 12L26 10L28 2Z" fill="var(--primary-color)" />
  </svg>
);

const AvatarIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <circle cx="20" cy="20" r="16" fill="var(--primary-color)" />
    <circle cx="20" cy="15" r="7" fill="var(--bg-container)" />
    <path d="M10 32C10 26.477 14.477 22 20 22C25.523 22 30 26.477 30 32" stroke="var(--bg-container)" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const DaVinciIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <rect x="2" y="2" width="36" height="36" rx="10" fill="#1A1A1A" />
    <circle cx="20" cy="15" r="8" fill="#FF3B30" style={{ mixBlendMode: 'screen' }} />
    <circle cx="15" cy="25" r="8" fill="#4CD964" style={{ mixBlendMode: 'screen' }} />
    <circle cx="25" cy="25" r="8" fill="#007AFF" style={{ mixBlendMode: 'screen' }} />
  </svg>
);

const ObsidianIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <path d="M20 2L35 15L25 38L15 38L5 15L20 2Z" fill="#A259FF" />
    <path d="M20 2L20 20L35 15L20 2Z" fill="#8A2BE2" />
    <path d="M20 20L25 38L35 15L20 20Z" fill="#6A0DAD" />
    <path d="M20 2L5 15L20 20L20 2Z" fill="#B388FF" />
    <path d="M5 15L15 38L20 20L5 15Z" fill="#9575CD" />
  </svg>
);

const CubeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <path d="M20 5L35 12V28L20 35L5 28V12L20 5Z" fill="#E0E0E0" />
    <path d="M20 20L35 12V28L20 35V20Z" fill="#252525" />
    <path d="M5 12L20 20V35L5 28V12Z" fill="#4A4A4A" />
    <path d="M20 5L35 12L20 20L5 12L20 5Z" fill="#F2F0EF" />
  </svg>
);

const RaycastIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <rect x="8" y="8" width="8" height="24" fill="var(--primary-color)" />
    <rect x="16" y="8" width="12" height="8" fill="var(--primary-color)" />
    <rect x="24" y="16" width="8" height="8" fill="var(--primary-color)" />
    <rect x="16" y="24" width="8" height="8" fill="var(--primary-color)" />
    <rect x="24" y="32" width="8" height="8" fill="var(--primary-color)" />
  </svg>
);

const ArcIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <path d="M5 20C5 11.716 11.716 5 20 5C28.284 5 35 11.716 35 20V35H20C11.716 35 5 28.284 5 20Z" fill="#007AFF" />
    <circle cx="20" cy="20" r="8" fill="#FFFFFF" />
  </svg>
);

const VSCodeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <path d="M28 6L11 18.5L5 14L28 6Z" fill="#007ACC" />
    <path d="M28 34L11 21.5L5 26L28 34Z" fill="#007ACC" />
    <path d="M35 12L28 6L11 18.5L28 34L35 28V12Z" fill="#1F9CF0" />
    <path d="M5 14V26L11 21.5L11 18.5L5 14Z" fill="#AE81FF" />
  </svg>
);

const NotionIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <rect x="5" y="5" width="30" height="30" rx="6" fill="#1A1A1A" />
    <path d="M11 10H29V12H11V10Z" fill="white" />
    <path d="M11 14L15 28H18L21 17L24 28H27L31 14H27L25 24L22 14H18L15 24L13 14H11Z" fill="white" />
  </svg>
);

const NextJsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
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
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <circle cx="20" cy="20" r="16" fill="#1ED760" />
    <path d="M27.5 13.5C22.5 10.5 14.5 11.5 10.5 13C9.8 13.2 9.2 12.8 9 12.2C8.8 11.5 9.2 10.9 9.8 10.7C14.5 9 23.5 8 29.2 11.5C29.8 11.9 30 12.7 29.6 13.3C29.2 13.8 28.2 14 27.5 13.5Z" fill="black" />
    <path d="M25.5 17.5C21.2 15 14.5 15.5 11.2 16.8C10.5 17 9.8 16.5 9.6 15.8C9.4 15.1 9.9 14.4 10.6 14.2C14.8 12.7 22.2 12.2 27.1 15C27.7 15.4 27.9 16.2 27.5 16.8C27 17.3 26.1 17.7 25.5 17.5Z" fill="black" />
    <path d="M23.5 21.2C20 19 14.8 19.2 12 20.2C11.3 20.4 10.7 20 10.5 19.3C10.3 18.6 10.7 18 11.4 17.8C14.8 16.7 20.5 16.5 24.6 19C25.2 19.4 25.4 20.2 25 20.8C24.5 21.2 23.8 21.4 23.5 21.2Z" fill="black" />
  </svg>
);

const SlackIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <rect x="2" y="2" width="36" height="36" rx="8" fill="#4A154B" />
    <circle cx="15" cy="12" r="3" fill="#36C5F0" />
    <rect x="15" y="16" width="6" height="12" rx="3" fill="#2EB67D" />
    <circle cx="25" cy="15" r="3" fill="#ECB22E" />
    <rect x="9" y="19" width="12" height="6" rx="3" fill="#E01E5A" />
  </svg>
);

const GitIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <path d="M37.5 18.5L21.5 2.5C20.5 1.5 19.5 1.5 18.5 2.5L2.5 18.5C1.5 19.5 1.5 20.5 2.5 21.5L18.5 37.5C19.5 38.5 20.5 38.5 21.5 37.5L37.5 21.5C38.5 20.5 38.5 19.5 37.5 18.5Z" fill="#F05032" />
    <circle cx="20" cy="15" r="3.5" fill="white" />
    <circle cx="20" cy="27" r="3.5" fill="white" />
    <circle cx="27" cy="20" r="3.5" fill="white" />
    <path d="M20 18.5V23.5" stroke="white" strokeWidth="2.5" />
    <path d="M20 20L24.5 20" stroke="white" strokeWidth="2.5" />
  </svg>
);

const TailwindIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <path d="M20 11C23 6.5 29 6.5 32 11C29 15.5 23 15.5 20 11Z" fill="#38BDF8" />
    <path d="M12 21C15 16.5 21 16.5 24 21C21 25.5 15 25.5 12 21Z" fill="#38BDF8" />
    <path d="M20 21C23 16.5 29 16.5 32 21C29 25.5 23 25.5 20 21Z" fill="#0EA5E9" />
    <path d="M12 11C15 6.5 21 6.5 24 11C21 15.5 15 15.5 12 11Z" fill="#0EA5E9" />
  </svg>
);

const LinearIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
    <circle cx="20" cy="20" r="16" fill="black" />
    <path d="M20 8C13.4 8 8 13.4 8 20C8 26.6 13.4 32 20 32C26.6 32 32 26.6 32 20H20V8Z" fill="#5E6AD2" />
  </svg>
);

const tools = [
  { id: 1, icon: <FigmaIcon />, zIndex: 20 },
  { id: 2, icon: <CleanShotIcon />, zIndex: 10 },
  { id: 3, icon: <AvatarIcon />, zIndex: 30 },
  { id: 4, icon: <DaVinciIcon />, zIndex: 15 },
  { id: 5, icon: <ObsidianIcon />, zIndex: 40 },
  { id: 6, icon: <CubeIcon />, zIndex: 25 },
  { id: 7, icon: <RaycastIcon />, zIndex: 35 },
  { id: 8, icon: <ArcIcon />, zIndex: 20 },
  { id: 9, icon: <VSCodeIcon />, zIndex: 18 },
  { id: 10, icon: <NotionIcon />, zIndex: 22 },
  { id: 11, icon: <NextJsIcon />, zIndex: 28 },
  { id: 12, icon: <SpotifyIcon />, zIndex: 12 },
  { id: 13, icon: <SlackIcon />, zIndex: 16 },
  { id: 14, icon: <GitIcon />, zIndex: 32 },
  { id: 15, icon: <TailwindIcon />, zIndex: 24 },
  { id: 16, icon: <LinearIcon />, zIndex: 38 },
];

const MOBILE_CARD_SIZE = 72; 
const MOBILE_OVERLAP = 18;
const ARC_HEIGHT = 26; 
const ARC_MAX_TILT = 14; 
const ROW_GAP = 36; 

interface CardPosition {
  left: number;
  top: number;
  rotate: number;
}

interface ToolsIUseProps {
  constraintsRef?: React.RefObject<HTMLElement | null>;
  revealed?: boolean;
}

const ToolCard = memo(function ToolCard({
  tool,
  pos,
  constraintsRef,
  enableHover,
}: {
  tool: (typeof tools)[number];
  pos: CardPosition;
  constraintsRef?: React.RefObject<HTMLElement | null>;
  enableHover: boolean;
}) {
  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      dragMomentum={true}
      dragTransition={{ power: 0.15, timeConstant: 250 }}
      whileHover={enableHover ? { scale: 1.1, zIndex: 50 } : undefined}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className={`
        absolute w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px]
        bg-container rounded-[16px] flex items-center justify-center
        border border-brand-border-container shadow-[0_8px_30px_var(--card-shadow-color)]
        cursor-grab active:cursor-grabbing select-none touch-none
      `}
      style={{
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        rotate: `${pos.rotate}deg`,
        zIndex: tool.zIndex,
        willChange: "transform",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      {tool.icon}
    </motion.div>
  );
});

const MobileToolCard = memo(function MobileToolCard({
  tool,
  posInRow,
  rowLength,
  isRowStart,
}: {
  tool: (typeof tools)[number];
  posInRow: number;
  rowLength: number;
  isRowStart: boolean;
}) {
  const normalized = rowLength > 1 ? (posInRow - (rowLength - 1) / 2) / ((rowLength - 1) / 2) : 0;

  const arcY = -ARC_HEIGHT * (1 - normalized * normalized);

  const rotate = normalized * ARC_MAX_TILT;
  const baseZIndex = 100 - Math.abs(posInRow - (rowLength - 1) / 2) * 10;

  return (
    <motion.div
      className="
        relative shrink-0
        bg-container rounded-[16px] flex items-center justify-center
        border border-brand-border-container shadow-[0_8px_30px_var(--card-shadow-color)]
        select-none cursor-pointer
      "
      style={{
        width: MOBILE_CARD_SIZE,
        height: MOBILE_CARD_SIZE,
        marginLeft: isRowStart ? 0 : -MOBILE_OVERLAP,
        y: arcY,
        rotate: `${rotate}deg`,
        zIndex: baseZIndex,
      }}

      whileHover={{ scale: 1.2, zIndex: 200, rotate: 0 }}
      whileTap={{ scale: 1.15, zIndex: 200, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {tool.icon}
    </motion.div>
  );
});



export default function ToolsIUse({ constraintsRef, revealed = true }: ToolsIUseProps) {
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState<CardPosition[]>([]);
  const [enableHover, setEnableHover] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(5);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const widthQuery = window.matchMedia("(max-width: 767px)");

    const updateFlags = () => {
      setEnableHover(!coarseQuery.matches);
      setIsMobile(coarseQuery.matches || widthQuery.matches);
    };

    updateFlags();
    coarseQuery.addEventListener("change", updateFlags);
    widthQuery.addEventListener("change", updateFlags);

    return () => {
      coarseQuery.removeEventListener("change", updateFlags);
      widthQuery.removeEventListener("change", updateFlags);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const el = mobileContainerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const computeItemsPerRow = (width: number) => {
      const step = MOBILE_CARD_SIZE - MOBILE_OVERLAP;
      const count = Math.floor((width - MOBILE_OVERLAP) / step);
      return Math.max(1, count);
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setItemsPerRow(computeItemsPerRow(entry.contentRect.width));
      }
    });

    observer.observe(el);
    setItemsPerRow(computeItemsPerRow(el.getBoundingClientRect().width));

    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    const cells: { row: number; col: number }[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        cells.push({ row: r, col: c });
      }
    }

    const shuffledCells = [...cells].sort(() => Math.random() - 0.5);

    const generated = tools.map((_, index) => {
      const cell = shuffledCells[index];

      const baseLeft = 5 + cell.col * 18;
      const leftOffset = Math.random() * 6 - 3;
      const left = Math.max(2, Math.min(90, baseLeft + leftOffset));

      const baseTop = 5 + cell.row * 22;
      const topOffset = Math.random() * 6 - 3;
      const top = Math.max(2, Math.min(90, baseTop + topOffset));

      const rotate = -20 + Math.random() * 40;
      return { left, top, rotate };
    });
    setPositions(generated);
  }, []);

  useEffect(() => {
    if (revealed && positions.length > 0 && !mounted) {
      const raf = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [revealed, positions, mounted]);

  const desktopCards = useMemo(() => {
    if (!mounted || positions.length === 0) return null;
    return tools.map((tool, index) => (
      <ToolCard
        key={tool.id}
        tool={tool}
        pos={positions[index]}
        constraintsRef={constraintsRef}
        enableHover={enableHover}
      />
    ));
  }, [mounted, positions, constraintsRef, enableHover]);

  const mobileRows = useMemo(() => {
    const rows: (typeof tools)[] = [];
    for (let i = 0; i < tools.length; i += itemsPerRow) {
      rows.push(tools.slice(i, i + itemsPerRow));
    }
    return rows;
  }, [itemsPerRow]);

  return (
    <section className="mt-[128px] w-full flex flex-col items-center">
      <Title
        title="Tools I Use"
        description="The tools I reach for when designing and building digital products."
        descriptionGap="mt-[24px]"
        align="center"
        showLink={false}
      />

      {isMobile ? (
        <div
          ref={mobileContainerRef}
          className="mt-[64px] w-full flex flex-col items-center"
          style={{ gap: ROW_GAP, paddingTop: ARC_HEIGHT + 8, paddingBottom: 8 }}
        >
          {mobileRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center">
              {row.map((tool, posInRow) => (
                <MobileToolCard
                  key={tool.id}
                  tool={tool}
                  posInRow={posInRow}
                  rowLength={row.length}
                  isRowStart={posInRow === 0}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-[64px] relative w-full h-[360px] sm:h-[440px] md:h-[520px] mx-auto pb-[60px]">
          {desktopCards}
        </div>
      )}
    </section>
  );
}