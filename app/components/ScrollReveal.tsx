"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, duration = 0.8, className = "" }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 1.02, 0.43, 1.01] // Custom smooth easeOutBack-like curve
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
