import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { MotionStyle } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import styles from "./FeatureIconCard.module.css";

export interface FeatureIconCardProps {
  title: string;
  items?: string[];
  description?: string;
  iconName?: "sparkles" | "shield";
  icon?: LucideIcon;
  iconColor?: string;
}

export default function FeatureIconCard({
  title,
  items,
  description,
  iconName = "sparkles",
  icon,
  iconColor = "var(--color-primary)",
}: FeatureIconCardProps): React.JSX.Element {
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const shouldAnimate = isHovered && !reducedMotion;

  const iconByName: Record<
    NonNullable<FeatureIconCardProps["iconName"]>,
    LucideIcon
  > = {
    sparkles: Sparkles,
    shield: Shield,
  };

  const Icon = icon ?? iconByName[iconName];

  const sparkleConfigs = [
    { className: `${styles["particle"]} ${styles["particle1"]}`, delay: 0 },
    { className: `${styles["particle"]} ${styles["particle2"]}`, delay: 0.45 },
    { className: `${styles["particle"]} ${styles["particle3"]}`, delay: 0.9 },
  ] as const;

  const cardStyle = { "--fic-icon-color": iconColor } as unknown as MotionStyle;

  return (
    <motion.article
      className={styles["card"]}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles["header"]}>
        <motion.div
          className={styles["iconWrap"]}
          style={{ transformStyle: "preserve-3d" }}
          animate={
            shouldAnimate
              ? {
                  rotateX: [0, 7, -5, 0],
                  rotateY: [0, -6, 5, 0],
                  scale: [1, 1.04, 1],
                }
              : { rotateX: 0, rotateY: 0, scale: 1 }
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.9, ease: "easeInOut" }
          }
        >
          <motion.div
            className={styles["glowRadial"]}
            animate={
              shouldAnimate ? { opacity: [0.15, 0.6, 0.2] } : { opacity: 0 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : shouldAnimate
                  ? { duration: 1.4, ease: "easeInOut", repeat: Infinity }
                  : { duration: 0.2, ease: "easeOut" }
            }
          />
          <motion.div
            className={styles["glowBlur"]}
            animate={
              shouldAnimate ? { opacity: [0.1, 0.5, 0.15] } : { opacity: 0 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : shouldAnimate
                  ? { duration: 1.8, ease: "easeInOut", repeat: Infinity }
                  : { duration: 0.2, ease: "easeOut" }
            }
          />

          <motion.div
            className={styles["icon"]}
            animate={
              shouldAnimate
                ? { rotate: [0, -8, 8, 0], scale: [1, 1.05, 1] }
                : { rotate: 0, scale: 1 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.85, ease: "easeInOut" }
            }
          >
            <Icon aria-hidden="true" focusable="false" size={26} />
          </motion.div>

          {shouldAnimate
            ? sparkleConfigs.map(({ className, delay }, index) => (
                <motion.div
                  key={index}
                  className={className}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [-24, -88],
                    x: [-6, 6],
                  }}
                  transition={{
                    duration: 1.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay,
                  }}
                />
              ))
            : null}
        </motion.div>

        <div>
          <h3 className={`${styles["title"]} capitalize`}>{title}</h3>
          {description ? (
            <p className={styles["description"]}>{description}</p>
          ) : null}
        </div>
      </div>

      {items?.length ? (
        <ul className={styles["list"]}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </motion.article>
  );
}
