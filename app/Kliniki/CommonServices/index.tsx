"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "./CommonServices.module.css";

type Service = {
  id: string;
  name: string;
  category?: string;
};

type Props = {
  filterCategory?: string;
};

const CommonServices: React.FC<Props> = ({ filterCategory }) => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services-all-for-common"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/services?limit=1000`
      );
      return res.data?.data as Service[];
    },
  });

  const sortedServices = useMemo(() => {
    if (!services) return [] as Service[];
    const filtered = filterCategory
      ? services.filter((s: Service) => s.category === filterCategory)
      : services;
    return [...filtered].sort((a: Service, b: Service) =>
      a.name.localeCompare(b.name)
    );
  }, [services, filterCategory]);

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Keng tarqalgan tibbiy xizmatlar</h2>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Keng tarqalgan tibbiy xizmatlar</h2>
      <div className={styles.grid}>
        {sortedServices.map((s) => (
          <Link
            key={s.id}
            href={`/uslugi/${encodeURIComponent(s.name)}`}
            className={styles.link}
          >
            {s.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommonServices;
