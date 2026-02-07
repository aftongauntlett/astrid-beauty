import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Sparkle-particle + ambient-glow hover effect for section titles   */
/*  Sparkles play once then fade; the glow persists while hovered.    */
/* ------------------------------------------------------------------ */

interface SparkleData {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const makeSparkles = (count: number): SparkleData[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 14 + Math.random() * 72,
    size: 1.4 + Math.random() * 1.8,
    delay: i * 0.12 + Math.random() * 0.15,
    duration: 1.1 + Math.random() * 0.7,
  }));

/** How long sparkles animate after hover starts (seconds) */
const SPARKLE_WINDOW = 2;

export default function TitleSparkles(): React.JSX.Element {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sparkles] = useState(() => makeSparkles(4));
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

  /* Listen for hover / keyboard focus on the nearest card ancestor */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const card = el.closest("article") ?? el.closest("[data-bst]");
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
    <div ref={wrapRef} className="bst__fx" aria-hidden="true">
      {/* Soft ambient glow — stays visible the entire hover */}
      <motion.div
        className="bst__glow"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: hovered ? 0.4 : 0.25, ease: "easeOut" }}
      />

      {/* Sparkles — play once then fade out */}
      {!prefersReduced &&
        sparkles.map((s) => (
          <motion.span
            key={s.id}
            className="bst__sparkle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
            }}
            animate={
              showSparkles
                ? {
                    opacity: [0, 0.8, 0.2, 0.85, 0],
                    scale: [0, 1.1, 0.5, 1.15, 0],
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
        ))}
    </div>
  );
}
