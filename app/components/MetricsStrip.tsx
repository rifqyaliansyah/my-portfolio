"use client";

import { useEffect, useRef, useState } from "react";
import { fallbackStats } from "@/app/lib/fallback-data";

export interface StatItem {
    id: string;
    label: string;
    value: number;
    suffix?: string;
}

interface MetricsStripProps {
    stats?: StatItem[] | null;
}

const COUNT_DURATION = 700;

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

export default function MetricsStrip({ stats }: MetricsStripProps) {
    const items: StatItem[] = stats && stats.length > 0 ? stats : fallbackStats;
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(1);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let frame = 0;
        const startTime = performance.now();

        const tick = (now: number) => {
            const t = Math.min((now - startTime) / COUNT_DURATION, 1);
            setProgress(easeOutCubic(t));
            if (t < 1) frame = requestAnimationFrame(tick);
        };

        setProgress(0);
        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="grid grid-cols-3 gap-x-4 gap-y-7 sm:gap-x-8 sm:gap-y-9 w-full md:max-w-104.25"
        >
            {items.map((item) => (
                <div key={item.id} className="flex flex-col items-start">
                    <span className="sr-only">
                        {item.value}
                        {item.suffix} {item.label}
                    </span>

                    <span
                        aria-hidden="true"
                        className="text-[26px] sm:text-[32px] font-semibold leading-none tracking-tight tabular-nums text-brand-primary"
                    >
                        {Math.round(item.value * progress)}
                        <span className="text-brand-secondary">{item.suffix}</span>
                    </span>

                    <span
                        aria-hidden="true"
                        className="mt-2 text-[10px] sm:text-[11px] leading-4 font-semibold tracking-wider uppercase text-brand-secondary"
                    >
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
}