"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ImageLightboxProps {
  images: { src: string; previewSrc?: string; alt: string }[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const DOUBLE_CLICK_ZOOM = 2.5;

interface ZoomTransform {
  scale: number;
  x: number;
  y: number;
}

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
}

interface PinchState {
  distance: number;
  scale: number;
  x: number;
  y: number;
}

const IDENTITY_TRANSFORM: ZoomTransform = { scale: 1, x: 0, y: 0 };

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const [transform, setTransform] = useState<ZoomTransform>(IDENTITY_TRANSFORM);
  const [isDragging, setIsDragging] = useState(false);
  const [isPinching, setIsPinching] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const pinchStateRef = useRef<PinchState | null>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync when opening with a new initialIndex
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Reset zoom when the image changes or the lightbox closes
  useEffect(() => {
    setTransform(IDENTITY_TRANSFORM);
    dragStateRef.current = null;
    pinchStateRef.current = null;
    pointersRef.current.clear();
    setIsDragging(false);
    setIsPinching(false);
  }, [currentIndex, isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keep the zoomed image within the viewport bounds
  const boundTransform = useCallback((next: ZoomTransform): ZoomTransform => {
    if (next.scale <= MIN_ZOOM) {
      return IDENTITY_TRANSFORM;
    }

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) {
      return next;
    }

    const maxX = Math.max(0, (image.clientWidth * next.scale - container.clientWidth) / 2);
    const maxY = Math.max(0, (image.clientHeight * next.scale - container.clientHeight) / 2);

    return {
      scale: next.scale,
      x: clamp(next.x, -maxX, maxX),
      y: clamp(next.y, -maxY, maxY),
    };
  }, []);

  // Zoom keeping the point under the cursor/fingers fixed
  const zoomAtPoint = useCallback(
    (targetScale: number, clientX: number, clientY: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const originX = clientX - (rect.left + rect.width / 2);
      const originY = clientY - (rect.top + rect.height / 2);

      setTransform((prev) => {
        const nextScale = clamp(targetScale, MIN_ZOOM, MAX_ZOOM);
        if (Math.abs(nextScale - prev.scale) < 0.001) return prev;
        if (nextScale === MIN_ZOOM) return IDENTITY_TRANSFORM;

        const ratio = nextScale / prev.scale;
        return boundTransform({
          scale: nextScale,
          x: originX - (originX - prev.x) * ratio,
          y: originY - (originY - prev.y) * ratio,
        });
      });
    },
    [boundTransform]
  );

  // Wheel zoom (native listener so preventDefault works)
  useEffect(() => {
    if (!isOpen || !mounted) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const containerRect = container.getBoundingClientRect();
      const originX = event.clientX - (containerRect.left + containerRect.width / 2);
      const originY = event.clientY - (containerRect.top + containerRect.height / 2);
      const deltaMultiplier = event.deltaMode === 1 ? 0.05 : 0.0015;

      setTransform((prev) => {
        const nextScale = clamp(
          prev.scale * Math.exp(-event.deltaY * deltaMultiplier),
          MIN_ZOOM,
          MAX_ZOOM
        );
        if (Math.abs(nextScale - prev.scale) < 0.001) return prev;
        if (nextScale === MIN_ZOOM) return IDENTITY_TRANSFORM;

        const ratio = nextScale / prev.scale;
        return boundTransform({
          scale: nextScale,
          x: originX - (originX - prev.x) * ratio,
          y: originY - (originY - prev.y) * ratio,
        });
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isOpen, mounted, currentIndex, boundTransform]);

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (transform.scale > MIN_ZOOM) {
      setTransform(IDENTITY_TRANSFORM);
      return;
    }

    zoomAtPoint(DOUBLE_CLICK_ZOOM, event.clientX, event.clientY);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size === 2) {
      const [first, second] = Array.from(pointersRef.current.values());
      pinchStateRef.current = {
        distance: Math.hypot(first.x - second.x, first.y - second.y),
        scale: transform.scale,
        x: transform.x,
        y: transform.y,
      };
      dragStateRef.current = null;
      setIsDragging(false);
      setIsPinching(true);
      return;
    }

    if (transform.scale > MIN_ZOOM) {
      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: transform.x,
        originY: transform.y,
      };
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return;

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    const pinch = pinchStateRef.current;
    if (pinch && pointersRef.current.size >= 2) {
      const [first, second] = Array.from(pointersRef.current.values());
      const distance = Math.hypot(first.x - second.x, first.y - second.y);

      if (pinch.distance > 0) {
        const nextScale = clamp(
          pinch.scale * (distance / pinch.distance),
          MIN_ZOOM,
          MAX_ZOOM
        );
        setTransform(boundTransform({ scale: nextScale, x: pinch.x, y: pinch.y }));
      }
      return;
    }

    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    setTransform((prev) =>
      boundTransform({
        scale: prev.scale,
        x: drag.originX + (event.clientX - drag.startX),
        y: drag.originY + (event.clientY - drag.startY),
      })
    );
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);

    if (pointersRef.current.size < 2) {
      pinchStateRef.current = null;
      setIsPinching(false);
    }

    if (dragStateRef.current?.pointerId === event.pointerId) {
      dragStateRef.current = null;
      setIsDragging(false);
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goNext, goPrev]);

  if (!mounted) return null;

  const current = images[currentIndex];
  if (!current) return null;

  const activeImageSrc = current.previewSrc || current.src;

  // Use portal to render at document.body level, escaping any overflow-hidden containers
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 md:p-12"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.92)", backdropFilter: "blur(16px)" }}
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-pointer shadow-lg"
            aria-label="Close lightbox"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer shadow-lg"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Image Container - Full authentic view without rounding or cropping */}
          <motion.div
            key={currentIndex}
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center max-w-7xl w-full h-full max-h-[82vh] sm:max-h-[88vh] select-none"
            style={{
              cursor:
                transform.scale > MIN_ZOOM
                  ? isDragging
                    ? "grabbing"
                    : "grab"
                  : "zoom-in",
              touchAction: "none",
            }}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={handleDoubleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src={activeImageSrc}
              alt={current.alt}
              draggable={false}
              className="max-w-full max-h-full object-contain shadow-2xl select-none"
              onDragStart={(e) => e.preventDefault()}
              style={{
                maxHeight: "calc(88vh - 50px)",
                transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
                transition: isDragging || isPinching ? "none" : "transform 150ms ease-out",
              }}
            />
          </motion.div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer shadow-lg"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Dot Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className="cursor-pointer p-0 transition-all duration-300"
                  aria-label={`Go to image ${idx + 1}`}
                  style={{
                    width: idx === currentIndex ? 22 : 7,
                    height: 7,
                    borderRadius: 999,
                    backgroundColor: idx === currentIndex ? "#ffffff" : "rgba(255,255,255,0.4)",
                    border: "none",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
