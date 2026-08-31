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

    const handleImageClick = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    return (
        <>
            <div className="flex flex-col gap-4 w-full md:w-92 shrink-0">
                {imagesToRender.map((img, index) => (
                    <div
                        key={`${img.src}-${index}`}
                        className="relative overflow-hidden rounded-xl bg-brand-border-container/10 w-full aspect-368/200 md:h-50 cursor-pointer group"
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
                            <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
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

            <ImageLightbox
                images={imagesToRender}
                initialIndex={lightboxIndex}
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
            />
        </>
    );
}

