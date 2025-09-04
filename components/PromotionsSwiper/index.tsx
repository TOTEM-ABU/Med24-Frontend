"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";

export type Promotion = {
  id?: string;
  title: string;
  description?: string;
  discount_percent: number;
  clinicsId: string;
  logo_url?: string 
  image_url?: string 
  Clinics?: {logo_url?: string }
  onClick?: () => void
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  const updateArrows = () => {
    const el = containerRef.current;
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const maxScroll = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    setCanScrollLeft(left > 2);
    setCanScrollRight(left < maxScroll - 2);
  };

  useEffect(() => {
    updateArrows();
    const handle = () => updateArrows();
    window.addEventListener("resize", handle);
    const id = setInterval(updateArrows, 400);
    return () => {
      window.removeEventListener("resize", handle);
      clearInterval(id);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollerWrap}>
        {canScrollLeft ? (
          <button
            aria-label="Prev"
            className={`${styles.arrowBtn} ${styles.arrowLeft}`}
            onClick={() => {
              scrollBy(-getScrollStep());
              setTimeout(updateArrows, 200);
            }}
          >
            <span className={styles.arrowIcon}>‹</span>
          </button>
        ) : null}
        <div
          className={styles.scroller}
          ref={containerRef}
          onScroll={updateArrows}
        >
          {items.map((p, idx) => (
            <div className={styles.card} key={p.id ?? `${p.clinicsId}-${idx}`} onClick={p.onClick}>
              <div className={styles.badge}>{`-${p.discount_percent}%`}</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.banner}
                src={
                  p.image_url ||
                  p?.Clinics?.logo_url ||
                  "data:image/png;base64,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"
                }
                alt={p.title}
              />
              <div className={styles.textWrap}>
                <div className={styles.cardTitle}>{p.title}</div>
                {p.description ? (
                  <div className={styles.cardDesc}>{p.description}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        {canScrollRight ? (
          <button
            aria-label="Next"
            className={`${styles.arrowBtn} ${styles.arrowRight}`}
            onClick={() => {
              scrollBy(getScrollStep());
              setTimeout(updateArrows, 200);
            }}
          >
            <span className={styles.arrowIcon}>›</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PromotionsSwiper;
