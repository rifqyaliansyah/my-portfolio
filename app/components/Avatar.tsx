"use client";

import { useState } from "react";
import Image from "next/image";
import { getInitials } from "@/app/lib/avatar";

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: number; // size in pixels (width and height)
  className?: string;
  roundedClassName?: string; // e.g. "rounded-xl", "rounded-md", "rounded-full"
  priority?: boolean;
}

export default function Avatar({
  src,
  name,
  size = 70,
  className = "",
  roundedClassName = "rounded-xl",
  priority = false,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name);

  const shouldShowImage = Boolean(src) && !imageError;

  if (shouldShowImage && src) {
    return (
      <Image
        src={src}
        alt={name || "Avatar"}
        width={size}
        height={size}
        priority={priority}
        onError={() => setImageError(true)}
        className={`${roundedClassName} object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // Fallback: Initials display with theme tokens
  const fontSize = Math.max(11, Math.floor(size * 0.38));

  return (
    <div
      className={`flex items-center justify-center select-none font-semibold ${roundedClassName} ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: "var(--surface-color)",
        border: "1px solid var(--border-container-color)",
        color: "var(--primary-color)",
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        letterSpacing: "0.04em",
      }}
      aria-label={name}
      title={name}
    >
      <span>{initials}</span>
    </div>
  );
}
