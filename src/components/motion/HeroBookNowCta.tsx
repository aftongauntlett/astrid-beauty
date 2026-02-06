import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";

import styles from "./HeroBookNowCta.module.css";

export type HeroBookNowCtaProps = {
  href: string;
  label: string;
  labelMobile?: string;
  className?: string;
  variant?: "primary" | "secondary";
  icon?: "external" | "down";
  target?: string;
  rel?: string;
};

export default function HeroBookNowCta({
  href,
  label,
  labelMobile,
  className,
  variant = "primary",
  icon = "external",
  target = "_blank",
  rel = "noopener noreferrer",
}: HeroBookNowCtaProps): React.JSX.Element {
  // Motion tokens reference (CSS)
  // - duration 0.42s / 0.56s ≈ --motion-duration-slower (560ms) used for entrances
  // - duration 0.55s is a CTA-specific icon wiggle (keep as-is)
  // - duration 0.85s–1.15s ≈ --motion-duration-premium range (one-time burst effects)
  // Framer Motion expects numeric seconds here, so we keep the values hardcoded.
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const inView = useInView(ref, {
    once: true,
    amount: 0.6,
    margin: "0px 0px -10% 0px",
  });

  const [burstId, setBurstId] = useState(0);
  const iconControls = useAnimationControls();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 48rem)");
    const onChange = () => setIsSmallScreen(mq.matches);
    onChange();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }

    const legacyMq = mq as unknown as {
      addListener?: (callback: () => void) => void;
      removeListener?: (callback: () => void) => void;
    };

    if (typeof legacyMq.addListener === "function") {
      legacyMq.addListener(onChange);
      return () => legacyMq.removeListener?.(onChange);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const compute = () => {
      const explicitTheme = document.documentElement.dataset?.["theme"];
      if (explicitTheme === "dark") {
        setIsDarkTheme(true);
        return;
      }
      if (explicitTheme === "light") {
        setIsDarkTheme(false);
        return;
      }

      setIsDarkTheme(
        window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false,
      );
    };

    compute();

    const schemeMq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onScheme = () => compute();
    if (schemeMq && typeof schemeMq.addEventListener === "function") {
      schemeMq.addEventListener("change", onScheme);
    }

    window.addEventListener("themechange", compute);
    return () => {
      window.removeEventListener("themechange", compute);
      if (schemeMq && typeof schemeMq.removeEventListener === "function") {
        schemeMq.removeEventListener("change", onScheme);
      }
    };
  }, []);

  const triggerHoverFx = () => {
    if (!inView || reducedMotion || isSmallScreen) return;

    // One-time burst per hover/focus.
    setBurstId((prev) => prev + 1);

    // CTA-only wiggle for the icon.
    void iconControls.start({
      x: [0, 1, -1, 0],
      rotate: [0, -12, 12, 0],
      transition: { duration: 0.55, ease: "easeInOut" },
    });
  };

  useEffect(() => {
    if (!inView) return;
    // First time entering viewport: play the burst once.
    setBurstId((prev) => (prev === 0 ? 1 : prev));
  }, [inView]);

  const sparkles = useMemo(
    () =>
      [
        { top: "22%", left: "18%", delay: 0.05, x: -6 },
        { top: "34%", left: "74%", delay: 0.12, x: 4 },
        { top: "58%", left: "30%", delay: 0.18, x: -2 },
        { top: "62%", left: "82%", delay: 0.26, x: 6 },
      ] as const,
    [],
  );

  const baseClasses = `btn btn--${variant} btn--lg`;
  const classes = [baseClasses, styles["btnExternal"], className]
    .filter(Boolean)
    .join(" ");

  const Icon = icon === "down" ? ArrowDown : ExternalLink;

  if (reducedMotion) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        data-hero-cta
      >
        <span className={styles["externalSpacer"]} aria-hidden="true" />
        <span className={styles["externalLabel"]}>
          <span className={styles["labelDesktop"]}>{label}</span>
          <span className={styles["labelMobile"]}>{labelMobile ?? label}</span>
        </span>
        <Icon
          className={styles["externalIcon"]}
          size={20}
          aria-hidden="true"
          focusable="false"
        />
      </a>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={classes}
      target={target}
      rel={rel}
      data-hero-cta
      initial={{ opacity: 0, y: isSmallScreen ? 8 : 12 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: isSmallScreen ? 8 : 12 }
      }
      transition={{
        duration: isSmallScreen ? 0.42 : 0.56,
        ease: [0.2, 0.9, 0.2, 1],
        delay: isSmallScreen ? 0.08 : 0.16,
      }}
      style={{ position: "relative", isolation: "isolate" }}
      onPointerEnter={triggerHoverFx}
      onFocus={triggerHoverFx}
    >
      {burstId > 0 ? (
        <React.Fragment key={burstId}>
          <motion.span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: isSmallScreen ? -10 : -12,
              borderRadius: 9999,
              pointerEvents: "none",
              background: isDarkTheme
                ? isSmallScreen
                  ? "radial-gradient(45% 55% at 30% 30%, rgba(212, 175, 55, 0.46), transparent 66%), radial-gradient(40% 50% at 70% 70%, rgba(245, 245, 246, 0.14), transparent 72%)"
                  : "radial-gradient(45% 55% at 30% 30%, rgba(212, 175, 55, 0.58), transparent 65%), radial-gradient(40% 50% at 70% 70%, rgba(245, 245, 246, 0.18), transparent 70%)"
                : isSmallScreen
                  ? "radial-gradient(45% 55% at 30% 30%, rgba(212, 175, 55, 0.2), transparent 68%), radial-gradient(40% 50% at 70% 70%, rgba(15, 15, 16, 0.08), transparent 74%)"
                  : "radial-gradient(45% 55% at 30% 30%, rgba(212, 175, 55, 0.28), transparent 68%), radial-gradient(40% 50% at 70% 70%, rgba(15, 15, 16, 0.1), transparent 74%)",
              filter: isSmallScreen ? "blur(9px)" : "blur(12px)",
              mixBlendMode: isDarkTheme ? "soft-light" : "multiply",
              zIndex: 0,
            }}
            initial={{ opacity: 0, scale: 0.985, y: isSmallScreen ? 6 : 8 }}
            animate={{
              opacity: [0, isSmallScreen ? 0.6 : 0.75, 0],
              scale: isSmallScreen ? [0.985, 1.03, 1.05] : [0.98, 1.04, 1.08],
              y: isSmallScreen ? [8, 0, -1] : [10, 0, -2],
            }}
            transition={{
              duration: isSmallScreen ? 0.85 : 1.05,
              ease: "easeOut",
              delay: isSmallScreen ? 0.04 : 0.06,
            }}
          />

          {sparkles.map((s, idx) => (
            <motion.span
              key={idx}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: s.top,
                left: s.left,
                width: 2,
                height: 2,
                borderRadius: 9999,
                background: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.25)",
                pointerEvents: "none",
                zIndex: 0,
              }}
              initial={{ opacity: 0, scale: 0, y: 8, x: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0.6],
                y: isSmallScreen ? [8, -12, -18] : [10, -18, -28],
                x: isSmallScreen ? [0, s.x * 0.75, s.x] : [0, s.x, s.x * 1.4],
              }}
              transition={{
                duration: isSmallScreen ? 0.9 : 1.15,
                ease: "easeOut",
                delay: (isSmallScreen ? 0.06 : 0.1) + s.delay,
              }}
            />
          ))}
        </React.Fragment>
      ) : null}

      <span
        className={styles["externalSpacer"]}
        aria-hidden="true"
        style={{ position: "relative", zIndex: 1 }}
      />
      <span
        className={styles["externalLabel"]}
        style={{ position: "relative", zIndex: 1 }}
      >
        <span className={styles["labelDesktop"]}>{label}</span>
        <span className={styles["labelMobile"]}>{labelMobile ?? label}</span>
      </span>
      <motion.span
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 0,
        }}
        animate={iconControls}
      >
        <Icon
          className={styles["externalIcon"]}
          size={20}
          aria-hidden="true"
          focusable="false"
          style={{ display: "block" }}
        />
      </motion.span>
    </motion.a>
  );
}
