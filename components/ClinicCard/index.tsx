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
    specialtiesId?: string;
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
  const DEFAULT_DOCTOR_IMG = "/doctor.jpg";
  const {
    name,
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
  const [canScrollLeftDoctors, setCanScrollLeftDoctors] = React.useState(false);
  const [canScrollRightDoctors, setCanScrollRightDoctors] =
    React.useState(false);
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

  const updateDoctorArrows = () => {
    const el = doctorsScrollerRef.current;
    if (!el) {
      setCanScrollLeftDoctors(false);
      setCanScrollRightDoctors(false);
      return;
    }
    const maxScroll = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    setCanScrollLeftDoctors(left > 2);
    setCanScrollRightDoctors(left < maxScroll - 2);
  };

  const scrollDoctors = (delta: number) => {
    if (doctorsScrollerRef.current) {
      doctorsScrollerRef.current.scrollBy({ left: delta, behavior: "smooth" });
      setTimeout(updateDoctorArrows, 200);
    }
  };

  const specialtiesById = React.useMemo(() => {
    const map: Record<string, string> = {};
    (clinic.doctors ?? []).forEach((doc) => {
      const sid = doc?.Specialties?.id;
      const sname = doc?.Specialties?.name;
      if (sid && sname && !map[sid]) map[sid] = String(sname);
    });
    return map;
  }, [clinic.doctors]);

  React.useEffect(() => {
    updateDoctorArrows();
    const handle = () => updateDoctorArrows();
    window.addEventListener("resize", handle);
    const id = setInterval(updateDoctorArrows, 400);
    return () => {
      window.removeEventListener("resize", handle);
      clearInterval(id);
    };
  }, []);

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
              src={clinic.logo_url || "/placeholder-logo.png"}
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
                const docReviewsCount =
                  typeof d.reviews_count === "number"
                    ? d.reviews_count
                    : Array.isArray(d.reviews)
                    ? d.reviews.length
                    : undefined;
                const ratingValue =
                  typeof d.rating === "string" ? Number(d.rating) : d.rating;
                const specialtyName =
                  d?.Specialties?.name ||
                  d?.specialty ||
                  (d?.specialtiesId
                    ? specialtiesById[d.specialtiesId] || ""
                    : "");
                return (
                  <div
                    key={(d.id as string) ?? String(idx)}
                    className={styles.doctor}
                  >
                    {/* Image on the left */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={DEFAULT_DOCTOR_IMG}
                      alt={`${d.first_name || d.name || ""}`}
                      className={styles.doctorAvatar}
                    />
                    {/* Text on the right */}
                    <div className={styles.doctorMeta}>
                      <div className={styles.doctorName}>
                        {`${d.first_name || d.name || ""} ${
                          d.last_name || d.surname || ""
                        }`.trim()}
                      </div>
                      {specialtyName ? (
                        <div className={styles.doctorSpecialty}>
                          {specialtyName}
                        </div>
                      ) : null}
                      {(typeof ratingValue === "number" ||
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
                          {typeof ratingValue === "number" &&
                            typeof docReviewsCount === "number" && (
                              <span className={styles.separator}>|</span>
                            )}
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
