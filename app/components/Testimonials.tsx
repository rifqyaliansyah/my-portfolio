"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface Testimonial {
    id: string;
    quote: string;
    name: string;
    role: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        id: "1",
        quote: "Rifqy selalu bisa nerjemahin requirement yang ambigu jadi UI yang rapi dan gampang dipakai.",
        name: "Dimas Pratama",
        role: "Product Manager",
        avatar: "/profile.png",
    },
    {
        id: "2",
        quote: "Kerja bareng Rifqy enak banget, komunikasinya jelas dan hasilnya selalu di atas ekspektasi.",
        name: "Sarah Amelia",
        role: "UI/UX Designer",
        avatar: "/profile.png",
    },
    {
        id: "3",
        quote: "Detail banget soal micro-interaction, portofolionya juga mencerminkan itu.",
        name: "Bagas Nugraha",
        role: "Frontend Lead",
        avatar: "/profile.png",
    },
];

const ROTATE_INTERVAL = 4000;
const TRANSITION_DURATION = 600;

const FRONT_WIDTH = 464;
const BACK_WIDTH = 436;
const CARD_HEIGHT = 180;
const BACK_OFFSET_TOP = 12;
const BACK_OFFSET_LEFT = (FRONT_WIDTH - BACK_WIDTH) / 2;
const CARD_PADDING = 24;
const CONTENT_WIDTH = FRONT_WIDTH - CARD_PADDING * 2;
const STAGE_HEIGHT = CARD_HEIGHT + BACK_OFFSET_TOP;

const SHADOW_VISIBLE = "0 8px 24px var(--card-shadow-color)";
const SHADOW_HIDDEN = "0 8px 24px rgba(0, 0, 0, 0)";

function CardContent({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="flex h-full flex-col justify-between" style={{ width: CONTENT_WIDTH }}>
            <p
                className="text-left"
                style={{ fontSize: 12, fontWeight: 600, lineHeight: "20px", color: "var(--secondary-color)" }}
            >
                {testimonial.quote}
            </p>

            <div className="flex items-center gap-2">
                <div
                    className="flex items-center justify-center rounded-lg shrink-0"
                    style={{ width: 28, height: 28, backgroundColor: "var(--surface-color)" }}
                >
                    <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={24}
                        height={24}
                        className="rounded-md object-cover"
                        style={{ width: 24, height: 24 }}
                    />
                </div>
                <div className="flex flex-col">
                    <span style={{ fontSize: 12, fontWeight: 600, lineHeight: "16px", color: "var(--primary-color)" }}>
                        {testimonial.name}
                    </span>
                    <span style={{ fontSize: 8, fontWeight: 500, lineHeight: "12px", color: "var(--secondary-color)" }}>
                        {testimonial.role}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    const [frontIndex, setFrontIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [instant, setInstant] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const updateScale = () => {
            const width = el.offsetWidth;
            if (width > 0) {
                setScale(Math.min(1, width / FRONT_WIDTH));
            }
        };

        updateScale();
        const observer = new ResizeObserver(updateScale);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimers = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    const runTransition = useCallback((target: number) => {
        setNextIndex(target);
        setIsAnimating(true);

        timeoutRef.current = setTimeout(() => {
            setInstant(true);
            setFrontIndex(target);
            setIsAnimating(false);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setInstant(false);
                });
            });
        }, TRANSITION_DURATION);
    }, []);

    const startInterval = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setFrontIndex((currentFront) => {
                const target = (currentFront + 1) % testimonials.length;
                runTransition(target);
                return currentFront;
            });
        }, ROTATE_INTERVAL);
    }, [runTransition]);

    useEffect(() => {
        startInterval();
        return clearTimers;
    }, [clearTimers, startInterval]);

    const handleDotClick = (index: number) => {
        if (isAnimating || index === frontIndex) return;

        clearTimers();
        runTransition(index);
        startInterval();
    };

    const front = testimonials[frontIndex];
    const back = testimonials[nextIndex];
    const activeDot = isAnimating ? nextIndex : frontIndex;

    const baseTransition = `all ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    const frontTransitionStyle = instant ? "none" : baseTransition;
    const backTransitionStyle = baseTransition;

    return (
        <div className="flex flex-col items-center w-full">
            <div ref={wrapperRef} className="w-full flex justify-center" style={{ maxWidth: FRONT_WIDTH }}>
                <div
                    style={{
                        position: "relative",
                        width: FRONT_WIDTH * scale,
                        height: STAGE_HEIGHT * scale,
                    }}
                >
                    <div
                        className="relative"
                        style={{
                            width: FRONT_WIDTH,
                            height: STAGE_HEIGHT,
                            transform: `scale(${scale})`,
                            transformOrigin: "top left",
                        }}
                    >
                        <div
                            className="absolute rounded-xl overflow-hidden"
                            style={{
                                top: BACK_OFFSET_TOP,
                                left: BACK_OFFSET_LEFT,
                                width: isAnimating ? FRONT_WIDTH : BACK_WIDTH,
                                height: CARD_HEIGHT,
                                padding: CARD_PADDING,
                                backgroundColor: "var(--bg-container)",
                                border: isAnimating
                                    ? "1px solid var(--border-container-color)"
                                    : "1px solid transparent",
                                boxShadow: isAnimating ? SHADOW_HIDDEN : SHADOW_VISIBLE,
                                transform: isAnimating
                                    ? `translate(${-BACK_OFFSET_LEFT}px, ${-BACK_OFFSET_TOP}px)`
                                    : "translate(0px, 0px)",
                                transition: backTransitionStyle,
                                zIndex: 1,
                            }}
                        >
                            <CardContent testimonial={back} />
                        </div>

                        <div
                            className="absolute rounded-xl"
                            style={{
                                top: 0,
                                left: 0,
                                width: FRONT_WIDTH,
                                height: CARD_HEIGHT,
                                padding: CARD_PADDING,
                                backgroundColor: "var(--bg-container)",
                                border: "1px solid var(--border-container-color)",
                                transform: isAnimating ? "translateY(-24px)" : "translateY(0px)",
                                opacity: isAnimating ? 0 : 1,
                                transition: frontTransitionStyle,
                                zIndex: 2,
                            }}
                        >
                            <CardContent testimonial={front} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5                       justify-center">
                {testimonials.map((t, index) => {
                    const active = index === activeDot;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            aria-label={`Lihat testimoni dari ${t.name}`}
                            aria-current={active}
                            onClick={() => handleDotClick(index)}
                            className="cursor-pointer p-0"
                            style={{
                                width: active ? 18 : 6,
                                height: 6,
                                borderRadius: 999,
                                backgroundColor: active ? "var(--primary-color)" : "var(--dot-inactive-color)",
                                transition: `all ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                                border: "none",
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
