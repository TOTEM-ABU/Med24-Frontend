"use client";
import React from "react";
import Link from "next/link";
import styles from "./ClinicFilters.module.css";
import Image from "next/image";

const ClinicFilters = () => {
  return (
    <div className={styles.filtersContainer}>
      <Link href="/Kliniki?filter=open_now" className={styles.filterButton}>
        <span>Hozir ochiq</span>
        <span className={styles.arrow}>›</span>
      </Link>

      <Link
        href="/Kliniki?filter=online_appointment"
        className={styles.filterButton}
      >
        <span>Onlayn yozib olish</span>
        <span className={styles.arrow}>›</span>
      </Link>

      <Link
        href="/Kliniki?filter=treatment_schedule"
        className={styles.filterButton}
      >
        <span>Dam olish kunlari ishlaydi</span>
        <span className={styles.arrow}>›</span>
      </Link>

      <Link href="/Kliniki?filter=24_7" className={styles.filterButton}>
        <span>24/7 ishlaydi</span>
        <span className={styles.arrow}>›</span>
      </Link>

      <Link
        href="/Kliniki"
        className={`${styles.filterButton} ${styles.viewAllButton}`}
      >
        <span>Barcha klinikalar</span>
      </Link>
    </div>
  );
};

export default ClinicFilters;
