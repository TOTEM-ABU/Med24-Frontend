"use client";
import React from "react";
import Link from "next/link";
import styles from "./ClinicFilters.module.css";
import Image from "next/image";

const ClinicFilters = () => {
  return (
    <div className={styles.filtersContainer}>
      <Link href="/Kliniki?filter=open_now" className={styles.filterButton}>
        <Image
          src="/icons/open-now.svg"
          alt="Open now icon"
          width={20}
          height={20}
          className={styles.filterIcon}
        />
        <span>Hozir ochiq</span>
        <span className={styles.arrow}>›</span>
      </Link>

      <Link
        href="/Kliniki?filter=online_appointment"
        className={styles.filterButton}
      >
        <Image
          src="/icons/online-appointment.svg"
          alt="Online appointment icon"
          width={20}
          height={20}
          className={styles.filterIcon}
        />
        <span>Onlayn yozib olish</span>
        <span className={styles.arrow}>›</span>
      </Link>

      <Link
        href="/Kliniki?filter=treatment_schedule"
        className={styles.filterButton}
      >
        <Image
          src="/icons/weekend-schedule.svg"
          alt="Weekend schedule icon"
          width={20}
          height={20}
          className={styles.filterIcon}
        />
        <span>Dam olish kunlari ishlaydi</span>
        <span className={styles.arrow}>›</span>
      </Link>

      <Link href="/Kliniki?filter=24_7" className={styles.filterButton}>
        <Image
          src="/icons/24-7.svg"
          alt="24/7 service icon"
          width={20}
          height={20}
          className={styles.filterIcon}
        />
        <span>24/7 ishlaydi</span>
        <span className={styles.arrow}>›</span>
      </Link>

      <Link
        href="/Kliniki"
        className={`${styles.filterButton} ${styles.viewAllButton}`}
      >
        <Image
          src="/icons/all-clinics.svg"
          alt="All clinics icon"
          width={20}
          height={20}
          className={styles.filterIcon}
        />
        <span>Barcha klinikalar</span>
      </Link>
    </div>
  );
};

export default ClinicFilters;
