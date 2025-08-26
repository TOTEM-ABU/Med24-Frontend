import React from "react";
import Link from "next/link";
import styles from "./ClinicCard.module.css";

type OpeningHours = Record<string, string>;

export type Clinic = {
  id: string;
  name: string;
  type?: "PUBLIC" | "PRIVATE" | "VETERINARY";
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  opening_hours?: OpeningHours;
  logo_url?: string;
  rating?: string | number;
  Region?: { id: string; name: string } | null;
  promotions?: Array<{ id: string; title: string; discount_percent?: number }>;
  clinicservices?: Array<{
    id: string;
    price?: string | number;
    duration_minutes?: number;
    Services?: { id: string; name: string };
  }>;
  doctors?: Array<{
    id?: string;
    first_name?: string;
    last_name?: string;
    name?: string;
    surname?: string;
    specialty?: string;
    image_url?: string;
    rating?: number;
    reviews_count?: number;
    reviews?: Array<{ id: string; rating?: number }>;
    education?: string;
    qualification?: string;
    title?: string;
    degree?: string;
    experience_years?: number;
    experience?: string;
    bio?: string;
    Specialties?: { id: string; name?: string } | null;
  }>;
  reviews?: Array<unknown>;
};

type Props = {
  clinic: Clinic;
};

const ClinicCard: React.FC<Props> = ({ clinic }) => {
  const DEFAULT_DOCTOR_IMG =
    "data:image/jpeg;base64,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";
  const {
    name,
    // type,
    description,
    address,
    phone,
    // website,
    opening_hours,
    // logo_url,
    rating,
    // Region,
    promotions,
    clinicservices,
    doctors,
    reviews,
  } = clinic;

  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .toLowerCase();
  const hoursToday = opening_hours?.[today as keyof OpeningHours];
  const is24x7 = React.useMemo(() => {
    const values = Object.values(opening_hours ?? {});
    return values.some((v) => /24\s*\/\s*7|24x7|24-7/i.test(String(v)));
  }, [opening_hours]);
  const [expanded, setExpanded] = React.useState(false);
  const reviewsCount = Array.isArray(reviews) ? reviews.length : undefined;
  const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/['’`]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  const reviewsUrl = name ? `/klinika/${slugify(name)}#review` : undefined;

  const doctorsScrollerRef = React.useRef<HTMLDivElement | null>(null);
  const scrollDoctors = (delta: number) => {
    if (doctorsScrollerRef.current) {
      doctorsScrollerRef.current.scrollBy({ left: delta, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.header}>
          <Link
            href={reviewsUrl?.replace("#review", "") ?? "#"}
            style={{ display: "inline-flex" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp"
              }
              alt={name}
              className={styles.logo}
            />
          </Link>
          <div className={styles.titleArea}>
            <div className={styles.topRow}>
              <Link
                href={reviewsUrl?.replace("#review", "") ?? "#"}
                className={styles.name}
              >
                {name}
              </Link>
            </div>
            <div className={styles.ratingWrap}>
              {rating ? (
                <>
                  <svg
                    className={styles.star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="#F59E0B"
                    aria-hidden
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 0 0-1.176 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                  </svg>
                  <span className={styles.rating}>{rating}</span>
                </>
              ) : null}
              {typeof reviewsCount === "number" && reviewsUrl ? (
                <a className={styles.reviews} href={reviewsUrl}>
                  {reviewsCount} sharhlar
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {description ? (
          <div className={styles.descriptionBox}>
            <p className={!expanded ? styles.descClamp : styles.descFull}>
              {description}
            </p>
            {description.length > 140 ? (
              <button
                className={styles.showMore}
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "yopish" : "yana"}
              </button>
            ) : null}
          </div>
        ) : null}

        {Array.isArray(clinicservices) && clinicservices.length ? (
          <div className={styles.services}>
            {clinicservices.slice(0, 3).map((cs) => (
              <div key={cs.id} className={styles.serviceRow}>
                <span className={styles.serviceName}>{cs?.Services?.name}</span>
                {cs.price ? (
                  <span className={styles.servicePrice}>
                    {Intl.NumberFormat("uz-UZ").format(Number(cs.price))}{" "}
                    so&#39;m
                  </span>
                ) : null}
              </div>
            ))}
            {reviewsUrl ? (
              <a
                href={reviewsUrl.replace("#review", "#prices")}
                className={styles.priceLink}
              >
                To&#39;liq praysni ko&#39;rsatish
              </a>
            ) : null}
          </div>
        ) : null}

        {Array.isArray(doctors) && doctors.length ? (
          <div className={styles.doctorsWrap}>
            <button
              type="button"
              aria-label="Oldingi"
              className={styles.navBtn}
              onClick={() => scrollDoctors(-240)}
            >
              ‹
            </button>
            <div className={styles.doctors} ref={doctorsScrollerRef}>
              {doctors.map((d, idx) => {
                // Prefer per-doctor reviews_count; fallback to count reviews linked to doctor from clinic.reviews if provided
                const docReviewsCount =
                  typeof d.reviews_count === "number"
                    ? d.reviews_count
                    : Array.isArray(d.reviews)
                    ? d.reviews.length
                    : undefined;
                const ratingValue =
                  typeof d.rating === "string" ? Number(d.rating) : d.rating;
                return (
                  <div
                    key={(d.id as string) ?? String(idx)}
                    className={styles.doctor}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={DEFAULT_DOCTOR_IMG}
                      alt={`${d.first_name ?? ""}`}
                      className={styles.doctorAvatar}
                    />
                    <div className={styles.doctorMeta}>
                      <div className={styles.doctorName}>
                        {`${d.first_name || d.name || ""} ${
                          d.last_name || d.surname || ""
                        }`.trim()}
                      </div>
                      {d.specialty || d?.Specialties?.name ? (
                        <div className={styles.doctorSpecialty}>
                          {d.specialty || d?.Specialties?.name}
                        </div>
                      ) : null}
                      {d.bio ? (
                        <div className={styles.doctorEducation}>{d.bio}</div>
                      ) : null}
                      {d.title || d.degree || d.qualification ? (
                        <div className={styles.doctorSpecialty}>
                          {(d.title || d.degree || d.qualification) as string}
                        </div>
                      ) : null}
                      {d.education ? (
                        <div className={styles.doctorEducation}>
                          {d.education}
                        </div>
                      ) : null}
                      {typeof d.experience_years === "number" ? (
                        <div className={styles.doctorExperience}>
                          {d.experience_years} yil tajriba
                        </div>
                      ) : d.experience ? (
                        <div className={styles.doctorExperience}>
                          {d.experience}
                        </div>
                      ) : null}
                      {(typeof d.rating === "number" ||
                        typeof docReviewsCount === "number") && (
                        <div className={styles.doctorStats}>
                          {typeof ratingValue === "number" ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 20 20"
                                fill="#F59E0B"
                                aria-hidden
                                className={styles.star}
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 0 0-1.176 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                              </svg>
                              <span className={styles.ratingSmall}>
                                {ratingValue}
                              </span>
                            </>
                          ) : null}
                          {typeof docReviewsCount === "number" ? (
                            <span className={styles.reviewsSmall}>
                              {docReviewsCount} sharhlar
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              aria-label="Keyingi"
              className={styles.navBtn}
              onClick={() => scrollDoctors(240)}
            >
              ›
            </button>
          </div>
        ) : null}

        {reviewsUrl ? (
          <a
            className={styles.allDoctorsLink}
            href={reviewsUrl.replace("#review", "#doctors")}
          >
            Barcha mutaxassislar
          </a>
        ) : null}

        {promotions && promotions.length ? (
          <div className={styles.promotions}>
            {promotions.slice(0, 2).map((p) => (
              <span key={p.id} className={styles.promoTag}>
                {p.title}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.right}>
        {address ? <p className={styles.detailItem}>{address}</p> : null}
        {is24x7 ? (
          <p className={styles.detailItem}>Har doim ochiq</p>
        ) : hoursToday ? (
          <p className={styles.detailItem}>Bugun: {hoursToday}</p>
        ) : null}
        <div className={styles.actions}>
          {phone ? (
            <a href={`tel:${phone}`} className={styles.callBtn}>
              Klinikaga telefon qilish
            </a>
          ) : (
            <a
              href={reviewsUrl?.replace("#review", "") ?? "#"}
              className={styles.callBtn}
            >
              Klinikaga telefon qilish
            </a>
          )}
          <a
            href={reviewsUrl?.replace("#review", "") ?? "#"}
            className={styles.secondaryBtn}
          >
            Qabulga yozilish
          </a>
          {/* Website button removed per design */}
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
