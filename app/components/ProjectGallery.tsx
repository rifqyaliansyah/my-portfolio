"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/app/components/ImageLightbox";

export interface GalleryImage {
  src: string;
  previewSrc?: string;
  alt: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col gap-3.5 w-full">
      {/* Main Showcase Image (Clickable for Lightbox) */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="group relative w-full aspect-16/9 rounded-2xl md:rounded-3xl overflow-hidden border border-brand-border-container shadow-sm bg-surface-color cursor-zoom-in"
      >
        <Image
          src={activeImage.src}
          alt={activeImage.alt || title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover transition-transform duration-500 group-hover:scale-103"
        />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <span>Click to expand</span>
          </div>
        </div>
      </div>

      {/* Thumbnails Row (E-commerce Style) */}
      {images.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 sm:w-24 aspect-16/10 rounded-xl overflow-hidden shrink-0 border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-(--primary-color) ring-2 ring-(--primary-color)/30 opacity-100 scale-95"
                    : "border-brand-border-container opacity-60 hover:opacity-100 hover:border-brand-border-toggle"
                }`}
                aria-label={`Select image ${idx + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt || `${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox for full preview */}
      <ImageLightbox
        images={images}
        initialIndex={selectedIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
}
