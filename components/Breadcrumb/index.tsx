"use client";

import React from "react";
import styles from "./Breadcrumb.module.css";
import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
  className?: string;
  style?: React.CSSProperties;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className, style }) => {
  return (
    <nav
      className={`${styles["breadcrumb-container"]} ${className || ""}`}
      style={style}
    >
      <ol className={styles["ordered-list"]}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className={styles["full-list"]}>
              {idx > 0 && <span className={styles["separator"]}>/</span>}
              {isLast || !item.href ? (
                <span className={styles["active"]}>{item.label}</span>
              ) : (
                <Link className={styles["inactive"]} href={item.href}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
