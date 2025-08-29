"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "./DiagnostikaName.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import ClinicCard from "@/components/ClinicCard";

type Service = {
  id: string;
  name: string;
  description?: string;
  category: string;
  image_url?: string;
};

type ClinicService = {
  id: string;
  price: string;
  duration_minutes: number;
  clinicsId: string;
  servicesId: string;
  Clinics: {
    id: string;
    name: string;
    address: string;
    logo_url: string;
  };
  Services: {
    id: string;
    name: string;
  };
};

type Clinic = {
  id: string;
  name: string;
  address: string;
  logo_url: string;
  clinicservices?: ClinicService[];
};

interface DiagnostikaNameProps {
  params: {
    diagnostikaName: string;
  };
}

export default function DiagnostikaName({ params }: DiagnostikaNameProps) {
  const diagnostikaName = params.diagnostikaName;
  const decodedDiagnostikaName = decodeURIComponent(diagnostikaName || "");

  const { data: services } = useQuery({
    queryKey: ["services-all"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/services?limit=1000`
        );
        return res.data?.data as Service[];
      } catch (error) {
        console.error("Error fetching services:", error);
        return [];
      }
    },
  });

  const matchedService = useMemo(() => {
    if (!services || !diagnostikaName) return undefined;
    return services.find(
      (s) => s.name.toLowerCase() === decodedDiagnostikaName.toLowerCase()
    );
  }, [services, diagnostikaName, decodedDiagnostikaName]);

  const { data: clinicServices, isLoading } = useQuery({
    queryKey: ["clinicservices", { servicesId: matchedService?.id }],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clinicservices?servicesId=${matchedService?.id}&limit=20`
        );
        return res.data?.data as ClinicService[];
      } catch (error) {
        console.error("Error fetching clinic services:", error);
        return [];
      }
    },
    enabled: Boolean(matchedService?.id),
  });

  const clinics: Clinic[] = useMemo(() => {
    const source = Array.isArray(clinicServices) ? clinicServices : [];
    const byId = new Map<string, Clinic>();

    for (const cs of source) {
      const c = cs.Clinics;
      if (!c?.id) continue;

      const existing = byId.get(c.id);
      const serviceEntry = {
        id: cs.id,
        price: cs.price,
        duration_minutes: cs.duration_minutes,
        Services: { id: cs.Services?.id, name: cs.Services?.name },
      };

      if (!existing) {
        byId.set(c.id, {
          id: c.id,
          name: c.name,
          address: c.address,
          logo_url: c.logo_url,
          clinicservices: [serviceEntry] as any,
        });
      } else {
        if (Array.isArray(existing.clinicservices)) {
          (existing.clinicservices as any).push(serviceEntry);
        } else {
          existing.clinicservices = [serviceEntry] as any;
        }
      }
    }

    return Array.from(byId.values());
  }, [clinicServices]);

  if (isLoading) {
    return (
      <div className={styles.bigContainer}>
        <Breadcrumb
          items={[
            { label: "Asosiy sahifa", href: "/" },
            { label: "Diagnostika", href: "/Diagnostika" },
            { label: "Yuklanmoqda..." },
          ]}
        />
        <div className={styles.miniContainer}>
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!matchedService && services) {
    return (
      <div className={styles.bigContainer}>
        <Breadcrumb
          items={[
            { label: "Asosiy sahifa", href: "/" },
            { label: "Diagnostika", href: "/Diagnostika" },
            { label: decodedDiagnostikaName },
          ]}
        />
        <div className={styles.miniContainer}>
          <p>Xizmat topilmadi: {decodedDiagnostikaName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bigContainer}>
      <Breadcrumb
        items={[
          { label: "Asosiy sahifa", href: "/" },
          { label: "Diagnostika", href: "/Diagnostika" },
          { label: matchedService?.name || decodedDiagnostikaName },
        ]}
      />

      <div className={styles.miniContainer}>
        <div className={styles.serviceInfo}>
          <h1 className={styles.mainTitle}>
            {matchedService?.name || decodedDiagnostikaName} bo&apos;yicha
            klinikalar
          </h1>

          <div className={styles.clinicsContainer}>
            {clinics.length > 0 ? (
              clinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))
            ) : (
              <p>Bu xizmatni taqdim etadigan klinikalar topilmadi.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
