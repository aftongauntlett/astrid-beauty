import React, { useEffect, useRef, useState } from "react";
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
  disableEntranceAnimation?: boolean;
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
  disableEntranceAnimation = false,
}: HeroBookNowCtaProps): React.JSX.Element {
  // Motion tokens reference (CSS)
  // - duration 0.42s / 0.56s ≈ --motion-duration-slower (560ms) used for entrances
  // - duration 0.55s is a CTA-specific icon wiggle (keep as-is)
  // - duration 0.85s–1.15s ≈ --motion-duration-premium range (one-time burst effects)
  // Framer Motion expects numeric seconds here, so we keep the values hardcoded.
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const inView = useInView(ref, {
    once: true,
    amount: 0.6,
    margin: "0px 0px -10% 0px",
  });

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

    // CTA-only wiggle for the icon.
    void iconControls.start({
      x: [0, 1, -1, 0],
      rotate: [0, -12, 12, 0],
      transition: { duration: 0.55, ease: "easeInOut" },
    });
  };

  const baseClasses = `btn btn--${variant} btn--lg`;
  const classes = [baseClasses, styles["btnExternal"], className]
    .filter(Boolean)
    .join(" ");

  const Icon = icon === "down" ? ArrowDown : ExternalLink;

  if (reducedMotion || disableEntranceAnimation) {
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
      style={{ position: "relative" }}
      onPointerEnter={triggerHoverFx}
      onFocus={triggerHoverFx}
    >
      <span className={styles["externalSpacer"]} aria-hidden="true" />
      <span className={styles["externalLabel"]}>
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
