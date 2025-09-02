"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import DoctorTypeCard from "@/components/DoctorTypeCard";
import FindDoctorsCard from "@/components/FindDoctorsCard";
import styles from "./styles.module.css";

type DoctorType = {
  name: string;
  image: string;
};

type Props = {
  title?: string;
  doctorTypes: DoctorType[];
  doctorCount?: number;
  clinicCount?: number;
};

const DoctorTypeSwiper: React.FC<Props> = ({
  title = "Mutaxassislar",
  doctorTypes,
  doctorCount = 1000,
  clinicCount = 230,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const items = useMemo(() => doctorTypes ?? [], [doctorTypes]);
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
    const oneCard = 158 + gap;
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
          <div className={styles.card} key="find-doctors">
            <FindDoctorsCard
              doctorCount={doctorCount}
              clinicCount={clinicCount}
            />
          </div>
          {items.map((doctorType, idx) => (
            <div className={styles.card} key={`${doctorType.name}-${idx}`}>
              <DoctorTypeCard name={doctorType.name} image={doctorType.image} />
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

export default DoctorTypeSwiper;
