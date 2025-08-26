"use client";
import React from "react";
import styles from "./KlinikiName.module.css";

export type ClinicHeaderProps = {
  name?: string;
  address?: string;
  rating?: number | string;
  reviewsCount?: number;
  cover_url?: string | null;
  logo_url?: string | null;
  description?: string;
  clinicservices?: Array<{
    id: string;
    price?: string | number;
    Services?: { id?: string; name?: string };
  }>;
};

const KlinikiNameHeader: React.FC<{ clinic: ClinicHeaderProps }> = ({
  clinic,
}) => {
  const {
    name,
    address,
    rating,
    reviewsCount,
    cover_url,
    logo_url,
    description,
    clinicservices,
  } = clinic || {};

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
            src={
              logo_url ||
              "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp"
            }
            alt={name || "Clinic"}
          />
          <div className={styles.meta}>
            <div className={styles.title}>{name}</div>
            <div className={styles.subrow}>
              {typeof rating !== "undefined" ? (
                <>
                  <svg
                    className={styles.starIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="#F59E0B"
                    aria-hidden
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 0 0-1.176 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                  </svg>
                  <span className={styles.rating}>{String(rating)}</span>
                </>
              ) : null}
              <span className={styles.dot}>•</span>
              {typeof reviewsCount === "number" ? (
                <a className={styles.reviews} href="#review">
                  <svg
                    className={styles.commentIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M20 2H4a2 2 0 0 0-2 2v16l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                  </svg>{" "}
                  {reviewsCount} Sharhlar
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {description ||
      (Array.isArray(clinicservices) && clinicservices.length) ? (
        <div className={styles.content}>
          {description ? <p className={styles.desc}>{description}</p> : null}
          {Array.isArray(clinicservices) && clinicservices.length ? (
            <div className={styles.services}>
              {clinicservices.slice(0, 3).map((cs) => (
                <div key={cs.id} className={styles.serviceRow}>
                  <span className={styles.serviceName}>
                    {cs?.Services?.name}
                  </span>
                  {typeof cs.price !== "undefined" ? (
                    <span className={styles.servicePrice}>
                      {Intl.NumberFormat("uz-UZ").format(Number(cs.price))}{" "}
                      so&#39;m
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className={styles.infoCard}>
        {/* Static map placeholder image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.map}
          src={
            "https://maps.gstatic.com/tactile/omnibox/markers/marker_sprite.png"
          }
          alt="Xarita"
        />
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
