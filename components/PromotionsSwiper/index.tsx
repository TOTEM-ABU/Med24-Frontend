"use client";
import React, { useMemo, useRef } from "react";
import styles from "./styles.module.css";

export type Promotion = {
  id?: string;
  title: string;
  description?: string;
  discount_percent: number;
  clinicsId: string;
  logo_url?: string | null;
};

type Props = {
  title?: string;
  promotions: Promotion[];
};

const PromotionsSwiper: React.FC<Props> = ({
  title = "Aksiya va chegirmalar",
  promotions,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const items = useMemo(() => promotions ?? [], [promotions]);

  const scrollBy = (delta: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const getScrollStep = () => {
    const el = containerRef.current;
    if (!el) return 0;
    const gap = 16;
    const oneCard = Math.floor((el.clientWidth - gap * 2) / 3) + gap;
    return oneCard;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.scrollerWrap}>
        <button
          aria-label="Prev"
          className={`${styles.arrowBtn} ${styles.arrowLeft}`}
          onClick={() => scrollBy(-getScrollStep())}
        >
          <span className={styles.arrowIcon}>‹</span>
        </button>
        <div className={styles.scroller} ref={containerRef}>
          {items.map((p, idx) => (
            <div className={styles.card} key={p.id ?? `${p.clinicsId}-${idx}`}>
              <div className={styles.badge}>{`-${p.discount_percent}%`}</div>
              <div className={styles.logoRow}>
                <div className={styles.logoWrap}>
                  <img
                    className={styles.logo}
                    src={p.logo_url || "/clinic-default.svg"}
                    alt={p.title}
                  />
                </div>
              </div>
              <div className={styles.textWrap}>
                <div className={styles.cardTitle}>{p.title}</div>
                {p.description ? (
                  <div className={styles.cardDesc}>{p.description}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <button
          aria-label="Next"
          className={`${styles.arrowBtn} ${styles.arrowRight}`}
          onClick={() => scrollBy(getScrollStep())}
        >
          <span className={styles.arrowIcon}>›</span>
        </button>
      </div>
    </div>
  );
};

export default PromotionsSwiper;
