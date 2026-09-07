"use client";

import { useState } from "react";
import Image from "next/image";
import { SanityImage } from "@/app/types/sanity";
import { urlFor } from "@/app/lib/sanity";
import { fallbackHeroPreviewImages } from "@/app/lib/fallback-data";
import ImageLightbox from "./ImageLightbox";

interface ImageStackProps {
    previewImages?: SanityImage[] | null;
}

export default function ImageStack({ previewImages }: ImageStackProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);

    const imagesToRender = previewImages && previewImages.length > 0
        ? previewImages.map((img, i) => ({
            src: urlFor(img).width(736).height(400).auto('format').url(),
            previewSrc: urlFor(img).width(1920).auto('format').url(),
            alt: img.alt || `Hero Preview ${i + 1}`,
        }))
        : fallbackHeroPreviewImages.map((img) => ({
            ...img,
            previewSrc: img.src,
        }));

    const VISIBLE_COUNT = 3;
    const totalImages = imagesToRender.length;
    const maxIndex = Math.max(0, totalImages - VISIBLE_COUNT);
    const hasMultiplePages = totalImages > VISIBLE_COUNT;

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setStartIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    const handleImageClick = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    // Card height: 200px (md:h-50), gap: 16px (gap-4). Step = 216px
    const stepOffset = 216;

    return (
        <>
            <div className="relative flex flex-col items-center w-full md:w-92 shrink-0 select-none">
                {/* Up Arrow Navigation Button */}
                {hasMultiplePages && (
                    <div className="absolute -top-5 z-20 flex items-center justify-center pointer-events-auto">
                        <button
                            type="button"
                            onClick={handlePrev}
                            disabled={startIndex === 0}
                            aria-label="Previous certificates"
                            className={`w-9 h-9 rounded-full bg-container/90 backdrop-blur-md border border-brand-border-container shadow-md flex items-center justify-center text-brand-primary transition-all duration-200 ${startIndex === 0
                                    ? "opacity-30 cursor-not-allowed scale-95"
                                    : "hover:scale-110 hover:shadow-lg active:scale-95 cursor-pointer"
                                }`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="18 15 12 9 6 15" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Viewport container with fixed height for exactly 3 cards */}
                <div className="relative w-full h-[632px] overflow-hidden rounded-2xl">
                    {/* Top gradient fade */}
                    {hasMultiplePages && startIndex > 0 && (
                        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-bg-page/60 to-transparent z-10 pointer-events-none transition-opacity duration-300" />
                    )}

                    {/* Sliding Track */}
                    <div
                        className="flex flex-col gap-4 w-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        style={{
                            transform: `translateY(-${startIndex * stepOffset}px)`,
                        }}
                    >
                        {imagesToRender.map((img, index) => (
                            <div
                                key={`${img.src}-${index}`}
                                className="relative overflow-hidden rounded-xl bg-brand-border-container/10 w-full aspect-368/200 md:h-50 shrink-0 cursor-pointer group shadow-xs"
                                onClick={() => handleImageClick(index)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleImageClick(index);
                                    }
                                }}
                                aria-label={`Preview ${img.alt}`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    priority={index === 0}
                                    sizes="(max-width: 768px) 100vw, 368px"
                                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-sm">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 3h6v6" />
                                            <path d="M9 21H3v-6" />
                                            <path d="M21 3l-7 7" />
                                            <path d="M3 21l7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom gradient fade */}
                    {hasMultiplePages && startIndex < maxIndex && (
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-bg-page/60 to-transparent z-10 pointer-events-none transition-opacity duration-300" />
                    )}
                </div>

                {/* Down Arrow Navigation Button */}
                {hasMultiplePages && (
                    <div className="absolute -bottom-5 z-20 flex items-center justify-center pointer-events-auto">
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={startIndex === maxIndex}
                            aria-label="Next certificates"
                            className={`w-9 h-9 rounded-full bg-container/90 backdrop-blur-md border border-brand-border-container shadow-md flex items-center justify-center text-brand-primary transition-all duration-200 ${startIndex === maxIndex
                                    ? "opacity-30 cursor-not-allowed scale-95"
                                    : "hover:scale-110 hover:shadow-lg active:scale-95 cursor-pointer"
                                }`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <ImageLightbox
                images={imagesToRender}
                initialIndex={lightboxIndex}
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
            />
        </>
    );
}

