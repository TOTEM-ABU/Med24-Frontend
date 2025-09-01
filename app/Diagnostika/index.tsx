import React, { useMemo } from "react";
import styles from "./Diagnostika.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import RecommendedDiagnostics from "./RecommendedDiagnostics";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PromotionsSwiper from "@/components/PromotionsSwiper";
import DoctorTypeCard from "@/components/DoctorTypeCard";
import PopularClinics from "@/components/PopularClinics";
import Link from "next/link";

type Clinic = {
  id: string;
  name: string;
  type?: "PUBLIC" | "PRIVATE" | "VETERINARY";
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  opening_hours?: Record<string, string>;
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

const Diagnostika: React.FC = () => {
  const { data: clinics } = useQuery({
    queryKey: ["clinics-popular"],
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

  const { data: promotions } = useQuery({
    queryKey: ["promotions-list"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/promotions?limit=12`
      );
      return res.data?.data ?? [];
    },
  });

  const { data: diagnosticServices } = useQuery({
    queryKey: ["diagnostic-services"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/services?limit=1000`
      );
      return res.data?.data ?? [];
    },
  });

  const diagnosticServicesFiltered = useMemo(() => {
    if (!diagnosticServices) return [];
    return diagnosticServices.filter(
      (service: Service) => service.category === "DIAGNOSTICS"
    );
  }, [diagnosticServices]);

  return (
    <div className={styles.bigContainer}>
      <Breadcrumb
        items={[
          { label: "Asosiy sahifa", href: "/" },
          { label: "Diagnostika" },
        ]}
      />

      <div className={styles.miniContainer}>
        <div className={styles["search-section"]}>
          <div className={styles["input-container"]}>
            <Input
              label="Shifokor ismi, mutaxassislik nomini yoki xizmat turini kiriting"
              width="100%"
            />
            <Button name="Qidirish" variant="primary" padding="0 38px 0 38px" />
          </div>
        </div>

        <RecommendedDiagnostics />

        {clinics?.length > 0 && (
          <PopularClinics
            clinics={clinics}
            title="Mashhur klinikalar"
            customStyles={{
              grid: { gridTemplateColumns: "repeat(5, 1fr)" },
            }}
          />
        )}

        {promotions?.length ? (
          <div style={{ marginTop: 84, marginBottom: 20 }}>
            <PromotionsSwiper
              title="Aksiya va chegirmalar"
              promotions={promotions}
            />
          </div>
        ) : null}

        {clinics?.length > 0 && (
          <PopularClinics
            clinics={clinics}
            title="Yaqinda kiritilgan klinikalar"
            customStyles={{
              grid: { gridTemplateColumns: "repeat(5, 1fr)" },
            }}
          />
        )}

        <div
          style={{
            marginTop: 80,
            marginBottom: 20,
            borderTop: "1px solid rgb(117, 117, 117)",
            borderBottom: "1px solid rgb(117, 117, 117)",
          }}
        >
          <h2
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: "24px",
              fontWeight: "700",
              color: "#333",
            }}
          >
            Shifokorlarning keng tarqalgan mutaxassisliklari
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 20,
              alignItems: "stretch",
              maxWidth: "100%",
            }}
          >
            {[
              {
                name: "Kardiolog",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/852/01c/85201ccd5086addac3154451ce472ff3.png",
              },
              {
                name: "Ortoped",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/b9b/591/b9b591e3a36a1251d9a473707709e038.png",
              },
              {
                name: "Pulmonolog",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/f8d/801/f8d8017705ba4af951f9b21eba3a601e.png",
              },
              {
                name: "Stomatolog",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/a16/489/a16489385a3232c436d6db7453ebeb41.png",
              },
              {
                name: "Terapevt",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/acb/81e/acb81ec8aa7fb9d0ca171e77bffe08a4.png",
              },
              {
                name: "Travmatolog",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/9ba/808/9ba80882f5f169f8d66814f09a1a2fa2.png",
              },
            ].map((item, index) => (
              <DoctorTypeCard
                key={item.name}
                name={item.name}
                image={item.image}
                style={index === 0 ? { gridColumn: "span 2" } : undefined}
              />
            ))}
          </div>
        </div>

        {diagnosticServicesFiltered.length > 0 && (
          <div
            style={{
              padding: "16px 0",
              marginTop: "40px",
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
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "16px 32px",
              }}
            >
              {diagnosticServicesFiltered.map((service: Service) => (
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

export default Diagnostika;
