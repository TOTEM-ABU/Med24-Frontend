"use client";
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import styles from "./LatestReviews.module.css";

interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  User?: {
    id: string;
    name: string;
    surname: string;
    avatar_url?: string;
  };
  Clinics?: {
    id: string;
    name: string;
  };
}

const fetchLatestReviews = async (): Promise<ReviewItem[]> => {
  const { data } = await api.get("/reviews", {
    params: {
      include: "User,Clinics",
      limit: 50,
    },
  });
  const list: ReviewItem[] = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : [];
  return list
    .filter((r) => typeof r.rating === "number")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);
};

const getInitials = (name?: string, surname?: string): string => {
  const a = (name || "").trim();
  const b = (surname || "").trim();
  const first = a ? a[0] : "";
  const second = b ? b[0] : a.length > 1 ? a[1] : "";
  return (first + second).toUpperCase();
};

const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const Stars: React.FC<{ value: number }> = ({ value }) => {
  const count = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className={styles.stars} aria-label={`${count} yulduz`}>
      {new Array(5).fill(0).map((_, i) => (
        <span
          key={i}
          className={i < count ? styles.starFilled : styles.starEmpty}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const LatestReviews: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: fetchLatestReviews,
  });

  const reviews = useMemo(() => data ?? [], [data]);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Klinikalarning so'nggi sharhlari</h3>
      {isLoading && <p>Yuklanmoqda...</p>}
      {isError && <p>Xatolik yuz berdi</p>}
      <div className={styles.grid}>
        {reviews.map((r) => (
          <div key={r.id} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.avatar}>
                {getInitials(r.User?.name, r.User?.surname)}
              </div>
              <div className={styles.meta}>
                <div className={styles.userName}>
                  {r.User?.name} {r.User?.surname}
                </div>
                <div className={styles.date}>{formatDate(r.createdAt)}</div>
              </div>
            </div>
            <Stars value={r.rating} />
            <p className={styles.comment}>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
