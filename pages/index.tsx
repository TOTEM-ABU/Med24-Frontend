"use client";
import React, { useMemo } from "react";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import DoctorTypeSwiper from "@/components/DoctorTypeSwiper";
import ServicesSection from "@/components/ServicesSection";
import PopularClinics from "@/components/PopularClinics";
import ClinicFilters from "@/components/ClinicFilters";
import PromotionsSwiper from "@/components/PromotionsSwiper";
import styles from "@/app/Kliniki/Kliniki.module.css";
import { DOCTOR_SPECIALTIES } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const HomePage = () => {
  const doctorCount = 1000;
  const clinicCount = 230;

  type Service = {
    id: string;
    name: string;
    description?: string;
    category?: string;
    image_url?: string;
    createdAt?: string;
    clinicservices?: Array<{
      id: string;
      price?: string;
      duration_minutes?: number;
      clinicsId?: string;
      servicesId?: string;
      createdAt?: string;
    }>;
  };

  const { data: clinics = [] } = useQuery({
    queryKey: ["clinics-popular-home"],
    queryFn: async () => {
      const include = [
        "Region",
        "doctors.Specialties",
        "clinicservices.Services",
        "reviews",
        "opening_hours",
      ].join(",");
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clinics?include=${include}&limit=20`
        );
        return res.data?.data ?? [];
      } catch (error) {
        console.error("Error fetching popular clinics:", error);
        return [];
      }
    },
  });

  const { data: promotions = [] } = useQuery({
    queryKey: ["promotions-list-home"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/promotions?limit=12`
        );
        return res.data?.data ?? [];
      } catch (error) {
        console.error("Error fetching promotions:", error);
        return [];
      }
    },
  });

  const { data: services = [] } = useQuery({
    queryKey: ["services-list-home"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/services?limit=1000`
        );
        return res.data?.data ?? [];
      } catch (error) {
        console.error("Error fetching services:", error);
        return [];
      }
    },
  });

  const commonServices = useMemo(() => {
    if (!services || services.length === 0) return [];
    return services
      .filter((service: Service) => service.category === "DIAGNOSTICS")
      .slice(0, 12); // Limit to 12 services for display
  }, [services]);

  return (
    <div>
      <div className={styles.bigContainer}>
        <div className={styles["search-section"]}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Toshkentda klinikalar va tibbiyot markazlari katalogi
          </h1>
          <div className={styles["input-container"]}>
            <Input
              label="Shifokor ismi, mutaxassislik nomini yoki xizmat turini kiriting"
              width="100%"
            />
            <Button name="Qidirish" variant="primary" padding="0 38px 0 38px" />
          </div>
        </div>

        <div style={{ marginTop: "40px" }}>
          <DoctorTypeSwiper
            doctorTypes={DOCTOR_SPECIALTIES}
            doctorCount={doctorCount}
            clinicCount={clinicCount}
          />
        </div>

        <ServicesSection />

        <div style={{ marginTop: "40px" }}>
          <PopularClinics
            clinics={clinics}
            title="Toshkentdagi mashhur klinikalar va tibbiyot markazlari"
            customStyles={{
              grid: { gridTemplateColumns: "repeat(4, 1fr)" },
            }}
          />
        </div>

        <ClinicFilters />

        {promotions.length > 0 && (
          <div style={{ marginTop: 60, marginBottom: 20 }}>
            <PromotionsSwiper
              title="Aksiya va chegirmalar"
              promotions={promotions}
            />
          </div>
        )}

        {commonServices.length > 0 && (
          <div
            style={{
              padding: "16px 0",
              marginTop: "60px",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              Keng tarqalgan tibbiy xizmatlar
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "16px 32px",
              }}
            >
              {commonServices.map((service: Service) => (
                <Link
                  key={service.id}
                  href={`/kliniki/${encodeURIComponent(service.name)}`}
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    borderBottom: "1px dashed #999",
                    width: "fit-content",
                  }}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
