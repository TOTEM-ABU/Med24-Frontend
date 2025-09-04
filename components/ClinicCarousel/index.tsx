import React from "react";
import styles from "./ClinicCarousel.module.css";
import ClinicCard from "../ClinicCard";
import { Clinic } from "../ClinicCard";

export type ClinicItem = Clinic & {
  id?: string | number;
};

export interface ClinicCarouselProps {
  items: ClinicItem[];
  className?: string;
}

const ArrowIcon: React.FC<{ direction: "left" | "right" }> = ({
  direction,
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {direction === "left" ? (
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="#0F172A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <path
        d="M7.5 15L12.5 10L7.5 5"
        stroke="#0F172A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

const ClinicCarousel: React.FC<ClinicCarouselProps> = ({
  items,
  className,
}) => {
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: -1 | 1) => {
    const node = listRef.current;
    if (!node) return;
    const delta = node.clientWidth - 80;
    node.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(" ");

  return (
    <div className={wrapperClass}>
      <button
        type="button"
        className={`${styles.nav} ${styles.left}`}
        onClick={() => scrollBy(-1)}
        aria-label="Previous"
      >
        <ArrowIcon direction="left" />
      </button>

      <div className={styles.scroller} ref={listRef}>
        <div className={styles.row}>
          {items.map((item, idx) => (
            <ClinicCard key={item.id ?? idx} clinic={item} />
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.nav} ${styles.right}`}
        onClick={() => scrollBy(1)}
        aria-label="Next"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
};

export default ClinicCarousel;
