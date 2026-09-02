"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Avatar from "./Avatar";
import { TestimonialData } from "@/app/types/sanity";
import { urlFor } from "@/app/lib/sanity";
import { fallbackTestimonials } from "@/app/lib/fallback-data";

interface TestimonialItem {
    id: string;
    quote: string;
    name: string;
    role: string;
    avatar?: string | null;
}

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

function CardContent({ testimonial }: { testimonial: TestimonialItem }) {
    return (
        <div className="flex h-full w-full flex-col justify-between">
            <p
                className="text-left"
                style={{ fontSize: 13, fontWeight: 500, lineHeight: "20px", color: "var(--secondary-color)" }}
            >
                {testimonial.quote}
            </p>

            <div className="flex items-center gap-2.5 mt-4">
                <div
                    className="flex items-center justify-center rounded-lg shrink-0"
                    style={{ width: 32, height: 32, backgroundColor: "var(--surface-color)" }}
                >
                    <Avatar
                        src={testimonial.avatar}
                        name={testimonial.name}
                        size={28}
                        roundedClassName="rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <span style={{ fontSize: 13, fontWeight: 600, lineHeight: "18px", color: "var(--primary-color)" }}>
                        {testimonial.name}
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 500, lineHeight: "14px", color: "var(--secondary-color)" }}>
                        {testimonial.role}
                    </span>
                </div>
            </div>
        </div>
    );
}

interface TestimonialsProps {
    items?: TestimonialData[];
}

export default function Testimonials({ items }: TestimonialsProps) {
    const list: TestimonialItem[] = items && items.length > 0
        ? items.map((t, i) => ({
            id: t._id || `${i + 1}`,
            quote: t.quote,
            name: t.name,
            role: t.role,
            avatar: t.avatar ? urlFor(t.avatar).width(56).height(56).url() : null,
        }))
        : fallbackTestimonials;

    const [frontIndex, setFrontIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(list.length > 1 ? 1 : 0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [instant, setInstant] = useState(false);

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
        if (list.length <= 1) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setFrontIndex((currentFront) => {
                const target = (currentFront + 1) % list.length;
                runTransition(target);
                return currentFront;
            });
        }, ROTATE_INTERVAL);
    }, [list.length, runTransition]);

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

    const front = list[frontIndex] || list[0];
    const back = list[nextIndex] || list[0];
    const activeDot = isAnimating ? nextIndex : frontIndex;

    const baseTransition = `all ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    const frontTransitionStyle = instant ? "none" : baseTransition;
    const backTransitionStyle = baseTransition;

    return (
        <div className="flex flex-col items-start w-full">
            <div className="w-full relative" style={{ maxWidth: FRONT_WIDTH, height: STAGE_HEIGHT }}>
                {/* Back card */}
                <div
                    className="absolute rounded-xl overflow-hidden"
                    style={{
                        top: BACK_OFFSET_TOP,
                        left: isAnimating ? "0%" : "3%",
                        right: isAnimating ? "0%" : "3%",
                        height: CARD_HEIGHT,
                        padding: CARD_PADDING,
                        backgroundColor: "var(--bg-container)",
                        border: isAnimating
                            ? "1px solid var(--border-container-color)"
                            : "1px solid transparent",
                        boxShadow: isAnimating ? SHADOW_HIDDEN : SHADOW_VISIBLE,
                        transform: isAnimating
                            ? `translateY(${-BACK_OFFSET_TOP}px)`
                            : "translateY(0px)",
                        transition: backTransitionStyle,
                        zIndex: 1,
                    }}
                >
                    <CardContent testimonial={back} />
                </div>

                {/* Front card */}
                <div
                    className="absolute w-full rounded-xl"
                    style={{
                        top: 0,
                        left: 0,
                        right: 0,
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

            {/* Dots pagination centered relative to the card */}
            <div
                className="mt-4 flex items-center gap-1.5 justify-center w-full"
                style={{ maxWidth: FRONT_WIDTH }}
            >
                {list.map((t, index) => {
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

