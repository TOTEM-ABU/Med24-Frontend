"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./UslugiClinics.module.css";

interface Clinic {
  id: string;
  name: string;
  logo_url?: string;
}

interface UslugiClinicsProps {
  clinics: Clinic[];
}

const UslugiClinics: React.FC<UslugiClinicsProps> = ({ clinics }) => {
  const createClinicSlug = (name: string) => {
    return name
      ? name
          .toLowerCase()
          .trim()
          .replace(/[\u2019'`]/g, "")
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
      : "";
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Toshkentdagi mashhur klinikalar va tibbiyot markazlari
      </h3>
      <div className={styles.clinicsGrid}>
        {clinics.map((clinic) => {
          const clinicSlug = createClinicSlug(clinic.name);
          return (
            <Link
              key={clinic.id}
              href={`/klinika/${clinicSlug}`}
              className={styles.clinicCard}
            >
              <div className={styles.logoContainer}>
                <Image
                  src={clinic.logo_url || "/placeholder-logo.png"}
                  alt={clinic.name}
                  width={80}
                  height={80}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <p className={styles.clinicName}>{clinic.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UslugiClinics;
