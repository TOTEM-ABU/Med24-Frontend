"use client";
import React from "react";
import Link from "next/link";
import styles from "./FindDoctorsCard.module.css";

interface FindDoctorsCardProps {
  doctorCount?: number;
  clinicCount?: number;
  className?: string;
  style?: React.CSSProperties;
}

const FindDoctorsCard = ({
  doctorCount = 1000,
  clinicCount = 230,
  className,
  style,
}: FindDoctorsCardProps) => {
  return (
    <Link href="/Doctors" className={styles.linkWrapper}>
      <div className={`${styles.card} ${className || ""}`} style={style}>
        <h3 className={styles.title}>Shifokor qabuliga yoziling</h3>
        <p className={styles.count}>
          {doctorCount} nafar shifokor, {clinicCount} ta klinika
        </p>
        <button className={styles.searchButton}>
          Shifokor qidirish <span className={styles.arrow}>›</span>
        </button>
      </div>
    </Link>
  );
};

export default FindDoctorsCard;
