"use client";
import React from "react";
import styles from "./KlinikiName.module.css";

type Maybe<T> = T | null | undefined;

export type ClinicHeaderProps = {
  name?: string;
  address?: string;
  rating?: number | string;
  reviewsCount?: number;
  cover_url?: string | null;
  logo_url?: string | null;
};

const KlinikiNameHeader: React.FC<{ clinic: ClinicHeaderProps }> = ({
  clinic,
}) => {
  const { name, address, rating, reviewsCount, cover_url, logo_url } =
    clinic || {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.cover}
          src={
            cover_url ||
            "https://images.unsplash.com/photo-1580281780460-82d277b0e3f9?q=80&w=1800&auto=format&fit=crop"
          }
          alt={name || "Clinic"}
        />
        <div className={styles.overlayCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            src={logo_url || "/clinic-default.svg"}
            alt={name || "Clinic"}
          />
          <div className={styles.meta}>
            <div className={styles.title}>{name}</div>
            <div className={styles.subrow}>
              {typeof rating !== "undefined" ? (
                <>
                  <span className={styles.star}>★</span>
                  <span className={styles.rating}>{String(rating)}</span>
                </>
              ) : null}
              {typeof reviewsCount === "number" ? (
                <span className={styles.reviews}>{reviewsCount} Sharhlar</span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.infoCard}>
        {address ? <div className={styles.address}>{address}</div> : null}
        <div className={styles.actions}>
          <a className={styles.callBtn} href="#">
            Klinikaga telefon qilish
          </a>
          <a className={styles.secondaryBtn} href="#">
            Qabulga yozilish
          </a>
        </div>
      </div>
    </div>
  );
};

export default KlinikiNameHeader;
