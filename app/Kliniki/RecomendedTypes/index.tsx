import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./RecomendedTypes.module.css";

interface Clinic {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  opening_hours: Record<string, string>;
  logo_url: string;
  type: "PUBLIC" | "PRIVATE" | "VETERINARY";
  regionId: string;
  Region: {
    id: string;
    name: string;
  };
  doctors: Array<{
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
  clinicservices: Array<{
    id: string;
    price?: string | number;
    duration_minutes?: number;
    Services?: { id: string; name: string };
  }>;
  appointments: Array<unknown>;
  reviews: Array<unknown>;
  promotions: Array<{ id: string; title: string; discount_percent?: number }>;
}

interface GroupedClinics {
  PUBLIC: Clinic[];
  PRIVATE: Clinic[];
  VETERINARY: Clinic[];
}

const RecomendedTypes = () => {
  const { data: clinics, isLoading } = useQuery({
    queryKey: ["clinics"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/clinics?include=Region&limit=1000`
      );
      return response.data?.data;
    },
  });

  const groupedClinics = useMemo(() => {
    if (!clinics) return { PUBLIC: [], PRIVATE: [], VETERINARY: [] };

    const grouped: GroupedClinics = {
      PUBLIC: [],
      PRIVATE: [],
      VETERINARY: [],
    };

    clinics.forEach((clinic: Clinic) => {
      if (grouped[clinic.type]) {
        grouped[clinic.type].push(clinic);
      }
    });

    Object.keys(grouped).forEach((type) => {
      grouped[type as keyof GroupedClinics].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });

    return grouped;
  }, [clinics]);

  const getTypeTitle = (type: string) => {
    switch (type) {
      case "PUBLIC":
        return "Davlat klinikalari";
      case "PRIVATE":
        return "Xususiy klinikalar";
      case "VETERINARY":
        return "Veterinariya klinikalari";
      default:
        return type;
    }
  };

  if (isLoading) {
    return (
      <div className={styles.recomendedTypes}>
        <h3>Tibbiyot muassasalarining turlari</h3>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className={styles.recomendedTypes}>
      <h3 className={styles.title}>Tibbiyot muassasalarining turlari</h3>

      <div className={styles.typesContainer}>
        {Object.entries(groupedClinics).map(([type, clinicsList]) => (
          <div key={type} className={styles.typeColumn}>
            <h4 className={styles.typeHeader}>{getTypeTitle(type)}</h4>
            <div className={styles.clinicsList}>
              {clinicsList.map((clinic: Clinic) => (
                <Link
                  key={clinic.id}
                  href={`/Kliniki/${encodeURIComponent(clinic.name)}`}
                  className={styles.clinicLink}
                >
                  {clinic.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecomendedTypes;
