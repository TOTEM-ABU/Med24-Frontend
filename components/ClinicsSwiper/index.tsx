"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[\u2019'`]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const scrollBy = (delta: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const getScrollStep = () => {
    const el = containerRef.current;
    if (!el) return 0;
    const gap = 16;
    const oneCard = Math.floor((el.clientWidth - gap * 4) / 5) + gap;
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
      <div className={styles.headerRow}>
        <h3 className={styles.title}>{title}</h3>
      </div>
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
          {items.map((c) => {
            const href = `/klinika/${slugify(c.name)}`;
            return (
              <Link href={href} key={c.id} className={styles.card}>
                <div className={styles.logoWrap}>
                  <Image
                    className={styles.logo}
                    src={c.logo_url || ""}
                    alt={c.name}
                    width={50}
                    height={50}
                  />
                </div>
                <div className={styles.textWrap}>
                  <div className={styles.cardName}>{c.name}</div>
                </div>
              </Link>
            );
          })}
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

export default ClinicsSwiper;
