import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Sparkle / glow hover effect for service-card icon badges          */
/*  Sparkles play once then fade; the glow persists while hovered.    */
/* ------------------------------------------------------------------ */

interface SparkleData {
  id: number;
  angle: number;
  dist: number;
  size: number;
  delay: number;
  duration: number;
}

const TAU = Math.PI * 2;

const makeSparkles = (count: number): SparkleData[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (TAU / count) * i + (Math.random() - 0.5) * 0.6,
    dist: 0.52 + Math.random() * 0.44,
    size: 1.3 + Math.random() * 1.6,
    delay: i * 0.14 + Math.random() * 0.1,
    duration: 1.0 + Math.random() * 0.7,
  }));

/** How long sparkles animate after hover starts (seconds) */
const SPARKLE_WINDOW = 1.8;

export default function IconSparkles(): React.JSX.Element {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sparkles] = useState(() => makeSparkles(3));
  const prefersReduced = useReducedMotion();

  /* Auto-stop sparkles after SPARKLE_WINDOW seconds */
  useEffect(() => {
    if (hovered) {
      setShowSparkles(true);
      timerRef.current = setTimeout(
        () => setShowSparkles(false),
        SPARKLE_WINDOW * 1000,
      );
    } else {
      setShowSparkles(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hovered]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const card = el.closest("article");
    if (!card) return;

    const on = () => setHovered(true);
    const off = () => setHovered(false);

    card.addEventListener("pointerenter", on, { passive: true });
    card.addEventListener("pointerleave", off, { passive: true });
    card.addEventListener("focusin", on);
    card.addEventListener("focusout", off);

    return () => {
      card.removeEventListener("pointerenter", on);
      card.removeEventListener("pointerleave", off);
      card.removeEventListener("focusin", on);
      card.removeEventListener("focusout", off);
    };
  }, []);

  return (
    <div ref={wrapRef} className="icon-fx" aria-hidden="true">
      {/* Soft radial glow — stays visible the entire hover */}
      <motion.div
        className="icon-fx__glow"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: hovered ? 0.4 : 0.25, ease: "easeOut" }}
      />

      {/* Sparkles — play once then fade out */}
      {!prefersReduced &&
        sparkles.map((s) => {
          const x = 50 + Math.cos(s.angle) * s.dist * 50;
          const y = 50 + Math.sin(s.angle) * s.dist * 50;

          return (
            <motion.span
              key={s.id}
              className="icon-fx__sparkle"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: s.size,
                height: s.size,
              }}
              animate={
                showSparkles
                  ? {
                      opacity: [0, 0.85, 0.2, 0.9, 0],
                      scale: [0, 1.15, 0.4, 1.2, 0],
                    }
                  : { opacity: 0, scale: 0 }
              }
              transition={
                showSparkles
                  ? {
                      duration: s.duration,
                      delay: s.delay,
                      repeat: 1,
                      ease: "easeInOut",
                    }
                  : { duration: 0.25 }
              }
            />
          );
        })}
    </div>
  );
}
