"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";
import styles from "./style.module.css";

type Service = {
  id: string;
  name: string;
  description?: string;
  category: string;
  image_url?: string;
};

const RecommendedDiagnostics: React.FC = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services-diagnostics"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/services?limit=1000`
      );
      return res.data?.data as Service[];
    },
  });

  const diagnosticServices = React.useMemo(() => {
    if (!services || services.length === 0) return [];
    return services.filter((service) => service.category === "DIAGNOSTICS");
  }, [services]);

  const columns = React.useMemo(() => {
    const result: Service[][] = [[], [], []];

    if (!diagnosticServices || diagnosticServices.length === 0) {
      return result;
    }

    diagnosticServices.forEach((service, index) => {
      const columnIndex = index % 3;
      result[columnIndex].push(service);
    });

    return result;
  }, [diagnosticServices]);

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <h3>Diagnostika Toshkentda</h3>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3>Diagnostika Toshkentda</h3>
      <div className={styles.categoriesContainer}>
        {columns.map((columnServices, columnIndex) => (
          <div key={columnIndex} className={styles.categoryColumn}>
            {columnServices.map((service) => (
              <div key={service.id} className={styles.categoryGroup}>
                <h4 className={styles.categoryTitle}>
                  {service.name.split(" ")[0]}
                </h4>
                <div className={styles.servicesList}>
                  <Link
                    href={`/diagnostika/${encodeURIComponent(service.name)}`}
                    className={styles.serviceLink}
                  >
                    {service.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedDiagnostics;
