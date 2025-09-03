import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./RecomendedKliniki.module.css";
import { Service } from "@/types/Service.types";

interface ClinicService {
  id: string;
  price: string;
  duration_minutes: number;
  clinicsId: string;
  servicesId: string;
  Clinics: {
    id: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    opening_hours: Record<string, string>;
    logo_url: string;
    type: string;
    regionId: string;
    Region: {
      id: string;
      name: string;
    };
  };
  Services: {
    id: string;
    name: string;
    description: string;
    category: string;
    image_url: string;
  };
}

interface GroupedServices {
  [key: string]: Array<{
    service: Service;
    clinicCount: number;
  }>;
}

const RecomendedKliniki = () => {
  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/services`
      );
      return response.data?.data;
    },
  });

  const { data: clinicServices, isLoading: clinicServicesLoading } = useQuery({
    queryKey: ["clinicServices"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/clinicservices?include=Clinics,Services&limit=1000`
      );
      return response.data?.data;
    },
  });

  const groupedServices = useMemo(() => {
    if (!services || !clinicServices) return {};

    const grouped: GroupedServices = {};

    services.forEach((service: Service) => {
      const firstLetter = service.name.charAt(0).toUpperCase();
      const clinicCount = clinicServices.filter(
        (cs: ClinicService) => cs.servicesId === service.id
      ).length;

      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }

      grouped[firstLetter].push({
        service,
        clinicCount,
      });
    });

    Object.keys(grouped).forEach((letter) => {
      grouped[letter].sort((a, b) =>
        a.service.name.localeCompare(b.service.name)
      );
    });

    return grouped;
  }, [services, clinicServices]);

  const isLoading = servicesLoading || clinicServicesLoading;

  if (isLoading) {
    return (
      <div className={styles.recomendedKliniki}>
        <h3>Tavsiya etilgan klinikalar</h3>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className={styles.recomendedKliniki}>
      <h3>Tavsiya etilgan klinikalar</h3>

      <div className={styles.letterGroupsContainer}>
        {Object.keys(groupedServices)
          .sort()
          .map((letter) => (
            <div key={letter} className={styles.letterGroup}>
              <h4 className={styles.letterHeader}>{letter}</h4>
              <div className={styles.servicesList}>
                {groupedServices[letter].map(({ service, clinicCount }) => (
                  <Link
                    key={service.id}
                    href={`/kliniki/${encodeURIComponent(service.name)}`}
                    className={styles.serviceLink}
                  >
                    <span className={styles.serviceName}>{service.name}</span>
                    <span className={styles.clinicCount}>{clinicCount}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecomendedKliniki;
