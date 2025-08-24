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
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className={styles["breadcrumb-container"]}>
      <ol className={styles["ordered-list"]}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className={styles["full-list"]}>
              {idx > 0 && <span className={styles['separator']}>/</span>}
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
