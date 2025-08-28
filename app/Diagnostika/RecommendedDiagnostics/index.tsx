"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { useMemo } from "react";
import styles from "./styles.module.css";

type Service = {
  id: string;
  name: string;
  category: string;
};

type ClinicService = {
  id: string;
  servicesId: string;
};

const RecommendedDiagnostics: React.FC = () => {
  const { data: services, isLoading: sLoading } = useQuery({
    queryKey: ["services-all"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/services?limit=1000`
      );
      return res.data?.data as Service[];
    },
  });

  const { data: clinicServices, isLoading: csLoading } = useQuery({
    queryKey: ["clinicServices-all"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/clinicservices?include=Clinics,Services&limit=1000`
      );
      return res.data?.data as ClinicService[];
    },
  });

  const grouped = useMemo(() => {
    if (!services || !clinicServices)
      return {} as Record<string, { service: Service; clinicCount: number }[]>;
    const diagnostics = services.filter((s) => s.category === "DIAGNOSTICS");
    const byLetter: Record<
      string,
      { service: Service; clinicCount: number }[]
    > = {};
    diagnostics.forEach((service) => {
      const count = clinicServices.filter(
        (cs) => cs.servicesId === service.id
      ).length;
      const letter = service.name.charAt(0).toUpperCase();
      if (!byLetter[letter]) byLetter[letter] = [];
      byLetter[letter].push({ service, clinicCount: count });
    });
    Object.keys(byLetter).forEach((k) =>
      byLetter[k].sort((a, b) => a.service.name.localeCompare(b.service.name))
    );
    return byLetter;
  }, [services, clinicServices]);

  const isLoading = sLoading || csLoading;

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
      <div className={styles.letterGroupsContainer}>
        {Object.keys(grouped)
          .sort()
          .map((letter) => (
            <div key={letter} className={styles.letterGroup}>
              <h4 className={styles.letterHeader}>{letter}</h4>
              <div className={styles.servicesList}>
                {grouped[letter].map(({ service }) => (
                  <Link
                    key={service.id}
                    href={`/uslugi/${encodeURIComponent(service.name)}`}
                    className={styles.serviceLink}
                  >
                    <span className={styles.serviceName}>{service.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecommendedDiagnostics;
