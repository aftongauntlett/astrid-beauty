import React, { useEffect, useRef } from "react";

type ShapeKind = "circle" | "square" | "diamond" | "triangle";

interface Shape {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  phase: number;
  driftSpeed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  strokeWidth: number;
  kind: ShapeKind;
  color: string;
}

const resolveIsDark = (): boolean => {
  if (typeof document === "undefined") return false;

  const explicitTheme = document.documentElement.dataset?.["theme"];
  if (explicitTheme === "dark") return true;
  if (explicitTheme === "light") return false;

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
};

const getThemePalette = (): {
  colors: string[];
  maxOpacity: number;
} => {
  // SSR fallback: assume light-ish
  if (typeof document === "undefined") {
    return {
      // Light mode: neutral + gold (outline-only in render).
      colors: ["#0f0f10", "#3f3f43", "#d4af37"],
      maxOpacity: 0.14,
    };
  }

  const isDark = resolveIsDark();

  if (isDark) {
    // Dark mode: white + gold outlines, keep low opacity.
    return {
      colors: ["#f5f5f6", "#c9c9cd", "#d4af37"],
      maxOpacity: 0.14,
    };
  }

  // Light mode: neutral + gold outlines.
  return {
    colors: ["#0f0f10", "#3f3f43", "#d4af37"],
    maxOpacity: 0.14,
  };
};

export default function HeroBackdrop(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const shapesRef = useRef<Shape[]>([]);
  const paletteRef = useRef(getThemePalette());
  const isDarkRef = useRef(false);
  const isVisibleRef = useRef(true);
  const isInViewRef = useRef(true);
  const layoutRef = useRef({ w: 0, h: 0 });
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * nextDpr));
      canvas.height = Math.max(1, Math.floor(rect.height * nextDpr));
      // Avoid cumulative scaling on successive resizes.
      ctx.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      layoutRef.current = { w: rect.width, h: rect.height };
    };

    const initShapes = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const isDark = resolveIsDark();

      isDarkRef.current = isDark;

      // Refresh palette on (re)layout and before seeding shapes.
      paletteRef.current = getThemePalette();

      const palette = paletteRef.current;
      // Keep the same density/feel between themes, but reduce clutter on mobile.
      // (Desktop should remain visually unchanged.)
      const isVerySmall = w < 30 * 16; // < 480px
      const isMobile = w < 48 * 16; // < 768px
      const count = isVerySmall ? 6 : isMobile ? 9 : 18;

      const kinds: readonly ShapeKind[] = [
        "circle",
        "square",
        "diamond",
        "triangle",
      ] as const;

      const clamp = (value: number, min: number, max: number) =>
        Math.max(min, Math.min(max, value));

      const sampleInRange = (min: number, max: number) =>
        min + Math.random() * (max - min);

      const isWide = w >= 56 * 16; // ~896px

      // Keep the very center from getting too busy, but avoid leaving the
      // hero feeling empty (especially in light mode).
      // Use top / middle / bottom bands, with more weight in the middle.
      const topMinY = h * 0.06;
      const topMaxY = h * (isWide ? 0.28 : 0.24);
      const midMinY = h * (isWide ? 0.32 : 0.3);
      const midMaxY = h * (isWide ? 0.68 : 0.7);
      const bottomMinY = h * (isWide ? 0.72 : 0.74);
      const bottomMaxY = h * 0.94;

      // On wide layouts, keep left/right density balanced so neither side feels empty.
      const leftShare = isWide ? 0.5 : 0.52;
      const leftMinX = w * (isWide ? 0.02 : 0.04);
      const leftMaxX = w * (isWide ? 0.38 : 0.48);
      const rightMinX = w * (isWide ? 0.62 : 0.52);
      const rightMaxX = w * (isWide ? 0.98 : 0.96);

      shapesRef.current = Array.from({ length: count }, (_, i) => {
        const leftCount = Math.max(1, Math.round(count * leftShare));
        const isLeftSide = i < leftCount;

        const bandRoll = Math.random();
        const inTopBand = bandRoll < (isWide ? 0.33 : 0.36);
        const inMidBand = !inTopBand && bandRoll < (isWide ? 0.72 : 0.7);
        const y = inTopBand
          ? sampleInRange(topMinY, Math.max(topMinY + 2, topMaxY))
          : inMidBand
            ? sampleInRange(midMinY, Math.max(midMinY + 2, midMaxY))
            : sampleInRange(
                Math.min(bottomMinY, bottomMaxY - 2),
                Math.max(bottomMinY + 2, bottomMaxY),
              );

        const x = isLeftSide
          ? sampleInRange(leftMinX, Math.max(leftMinX + 2, leftMaxX))
          : sampleInRange(rightMinX, Math.max(rightMinX + 2, rightMaxX));

        const clampedX = clamp(x, w * 0.03, w * 0.97);
        const clampedY = clamp(y, h * 0.05, h * 0.95);

        const kind = kinds[i % kinds.length] ?? "circle";
        const size = 22 + Math.random() * 64;
        const strokeWidth = 1.0 + Math.random() * 1.1;
        // Apply the theme palette's maxOpacity consistently for both themes.
        // Tighter range keeps shapes reading more evenly.
        const opacity = palette.maxOpacity * (0.62 + Math.random() * 0.33);
        const color = palette.colors[i % palette.colors.length] ?? "#0f0f10";

        return {
          baseX: clampedX,
          baseY: clampedY,
          x: clampedX,
          y: clampedY,
          size,
          strokeWidth,
          opacity,
          color,
          kind,
          phase: Math.random() * Math.PI * 2,
          driftSpeed: 0.00006 + Math.random() * 0.00009,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed:
            (Math.random() * 2 - 1) * (0.00012 + Math.random() * 0.0001),
        };
      });
    };

    const shouldAnimate = () =>
      !reducedMotion.current && isVisibleRef.current && isInViewRef.current;

    const stopAnimation = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = 0;
      }
    };

    const startAnimation = () => {
      if (!shouldAnimate() || animationFrameRef.current) return;
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    const renderFrame = (time: number, force = false) => {
      if (!force && !shouldAnimate() && !reducedMotion.current) return;

      const w = layoutRef.current.w;
      const h = layoutRef.current.h;
      if (w <= 0 || h <= 0) {
        return;
      }

      ctx.clearRect(0, 0, w, h);

      shapesRef.current.forEach((shape) => {
        const driftX = reducedMotion.current
          ? 0
          : Math.sin(time * shape.driftSpeed + shape.phase) * 18;
        const driftY = reducedMotion.current
          ? 0
          : Math.cos(time * shape.driftSpeed * 0.8 + shape.phase) * 14;

        shape.x = shape.baseX + driftX;
        shape.y = shape.baseY + driftY;

        const breathe = reducedMotion.current
          ? 1
          : 0.92 + Math.sin(time * 0.00022 + shape.phase) * 0.08;

        const rot = reducedMotion.current
          ? shape.rotation
          : shape.rotation + time * shape.rotationSpeed;

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(rot);
        const baseAlpha = shape.opacity * (0.75 + 0.25 * breathe);
        ctx.lineWidth = shape.strokeWidth;
        ctx.strokeStyle = shape.color;
        ctx.fillStyle = shape.color;

        ctx.globalCompositeOperation = "source-over";

        ctx.shadowBlur = 0;

        const s = shape.size * breathe;
        const half = s / 2;

        ctx.beginPath();
        switch (shape.kind) {
          case "circle": {
            ctx.arc(0, 0, half, 0, Math.PI * 2);
            break;
          }
          case "square": {
            ctx.rect(-half, -half, s, s);
            break;
          }
          case "diamond": {
            // Square rotated 45°
            ctx.rotate(Math.PI / 4);
            ctx.rect(-half, -half, s, s);
            break;
          }
          case "triangle": {
            ctx.moveTo(0, -half);
            ctx.lineTo(half, half);
            ctx.lineTo(-half, half);
            ctx.closePath();
            break;
          }
          default: {
            ctx.arc(0, 0, half, 0, Math.PI * 2);
          }
        }

        // Light mode: outlines only (no fill).

        const strokeAlpha = isDarkRef.current
          ? Math.min(1, baseAlpha * 0.95)
          : Math.min(1, baseAlpha * 0.9);
        ctx.globalAlpha = strokeAlpha;
        ctx.stroke();

        ctx.restore();
      });
    };

    const tick = (time: number) => {
      // This frame is now running; allow rescheduling.
      animationFrameRef.current = 0;

      renderFrame(time);

      if (shouldAnimate()) {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };

    resize();
    initShapes();

    // Always paint at least one frame so the backdrop never stays blank
    // if observers pause animation before the first rAF runs (common on refresh).
    renderFrame(reducedMotion.current ? 0 : performance.now(), true);

    if (!reducedMotion.current) {
      startAnimation();
    }

    // Handle resize (prefer observing the parent hero element).
    let resizeRaf = 0;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resize();
        initShapes();

        // If the canvas was 0x0 during initial hydration (common on refresh),
        // ensure we paint as soon as layout becomes available.
        renderFrame(performance.now(), true);
      });
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas.parentElement ?? canvas);
    window.addEventListener("resize", onResize, { passive: true });

    // Handle visibility (pause when tab hidden)
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (shouldAnimate()) {
        renderFrame(performance.now(), true);
        startAnimation();
      } else stopAnimation();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Pause animation when the hero scrolls offscreen.
    const observedElement = canvas.parentElement ?? canvas;
    const intersectionObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              isInViewRef.current = Boolean(entry?.isIntersecting);
              if (shouldAnimate()) {
                renderFrame(performance.now(), true);
                startAnimation();
              } else stopAnimation();
            },
            { root: null, threshold: 0.01 },
          )
        : null;

    intersectionObserver?.observe(observedElement);

    // Handle theme changes
    const handleThemeChange = () => {
      paletteRef.current = getThemePalette();
      initShapes();

      // Ensure theme toggles update even when animation is paused/static.
      renderFrame(performance.now(), true);
    };
    window.addEventListener("themechange", handleThemeChange);

    // Also respond to OS theme changes when no explicit theme is set.
    const colorSchemeMql = window.matchMedia?.("(prefers-color-scheme: dark)");
    const handleColorSchemeChange = () => {
      if (document.documentElement.dataset?.["theme"]) return;
      paletteRef.current = getThemePalette();
      initShapes();

      renderFrame(performance.now(), true);
    };
    colorSchemeMql?.addEventListener?.("change", handleColorSchemeChange);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      intersectionObserver?.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("themechange", handleThemeChange);
      colorSchemeMql?.removeEventListener?.("change", handleColorSchemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
