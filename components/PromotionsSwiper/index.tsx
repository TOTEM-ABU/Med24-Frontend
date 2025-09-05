"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

export type Promotion = {
  id?: string;
  title: string;
  description?: string;
  discount_percent: number;
  clinicsId: string;
  logo_url?: string;
  image_url?: string;
  Clinics?: { logo_url?: string };
  onClick?: () => void;
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

  console.log(title);

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
            <div
              className={styles.card}
              key={p.id ?? `${p.clinicsId}-${idx}`}
              onClick={p.onClick}
            >
              <div className={styles.badge}>{`-${p.discount_percent}%`}</div>
              <Image
                className={styles.banner}
                src={p.image_url || p?.Clinics?.logo_url || ""}
                alt={p.title}
                width={300}
                height={200}
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
