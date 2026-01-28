import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ExternalLink } from "lucide-react";

import styles from "./HeroBookNowCta.module.css";

export type HeroBookNowCtaProps = {
  href: string;
  label: string;
  labelMobile?: string;
  className?: string;
  target?: string;
  rel?: string;
};

export default function HeroBookNowCta({
  href,
  label,
  labelMobile,
  className,
  target = "_blank",
  rel = "noopener noreferrer",
}: HeroBookNowCtaProps): React.JSX.Element {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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

  const baseClasses = "btn btn--primary btn--lg";
  const classes = [baseClasses, className].filter(Boolean).join(" ");

  if (reducedMotion) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        data-hero-cta
      >
        <span className="btn__externalSpacer" aria-hidden="true" />
        <span className="btn__externalLabel">
          <span className={styles["labelDesktop"]}>{label}</span>
          {labelMobile ? (
            <span className={styles["labelMobile"]}>{labelMobile}</span>
          ) : null}
        </span>
        <ExternalLink
          className="btn__externalIcon"
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
              background: isSmallScreen
                ? "radial-gradient(45% 55% at 30% 30%, rgba(231, 199, 122, 0.42), transparent 66%), radial-gradient(40% 50% at 70% 70%, rgba(122, 91, 152, 0.28), transparent 72%)"
                : "radial-gradient(45% 55% at 30% 30%, rgba(231, 199, 122, 0.55), transparent 65%), radial-gradient(40% 50% at 70% 70%, rgba(122, 91, 152, 0.35), transparent 70%)",
              filter: isSmallScreen ? "blur(9px)" : "blur(12px)",
              mixBlendMode: "soft-light",
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
        className="btn__externalSpacer"
        aria-hidden="true"
        style={{ position: "relative", zIndex: 1 }}
      />
      <span
        className="btn__externalLabel"
        style={{ position: "relative", zIndex: 1 }}
      >
        <span className={styles["labelDesktop"]}>{label}</span>
        {labelMobile ? (
          <span className={styles["labelMobile"]}>{labelMobile}</span>
        ) : null}
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
        <ExternalLink
          className="btn__externalIcon"
          size={20}
          aria-hidden="true"
          focusable="false"
          style={{ display: "block" }}
        />
      </motion.span>
    </motion.a>
  );
}
