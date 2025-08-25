"use client";
import React, { useMemo, useRef } from "react";
import styles from "./styles.module.css";

export type Clinic = {
  id: string;
  name: string;
  logo_url?: string;
};

type Props = {
  title?: string;
  clinics: Clinic[];
};

const ClinicsSwiper: React.FC<Props> = ({
  title = "Mashhur klinikalar",
  clinics,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const items = useMemo(() => clinics ?? [], [clinics]);

  const scrollBy = (delta: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const getScrollStep = () => {
    const el = containerRef.current;
    if (!el) return 0;
    // Approximate one-card width: container width split into 5, including gap
    const gap = 16; // must match CSS gap
    const oneCard = Math.floor((el.clientWidth - gap * 4) / 5) + gap;
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
          {items.map((c) => (
            <div className={styles.card} key={c.id}>
              <div className={styles.logoWrap}>
                <img
                  className={styles.logo}
                  src={c.logo_url || "/clinic-default.svg"}
                  alt={c.name}
                />
              </div>
              <div className={styles.textWrap}>
                <div className={styles.cardName}>{c.name}</div>
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

export default ClinicsSwiper;
