import React from "react";
import styles from "./Diagnostika.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import RecommendedDiagnostics from "./RecommendedDiagnostics";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PopularClinics } from "@/components";
import PromotionsSwiper from "@/components/PromotionsSwiper";
import DoctorTypeCard from "@/components/DoctorTypeCard";
import CommonServices from "@/app/Kliniki/CommonServices";

const Diagnostika: React.FC = () => {
  const { data: clinics } = useQuery({
    queryKey: ["clinics-popular"],
    queryFn: async () => {
      const include = [
        "Region",
        "doctors.Specialties",
        "clinicservices.Services",
        "reviews",
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

  const { data: recentClinics } = useQuery({
    queryKey: ["clinics-recent"],
    queryFn: async () => {
      const include = [
        "Region",
        "doctors.Specialties",
        "clinicservices.Services",
        "reviews",
      ].join(",");
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clinics?include=${include}&limit=20`
        );
        return res.data?.data ?? [];
      } catch (error) {
        console.error("Error fetching recent clinics:", error);
        return [];
      }
    },
  });

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
          <div style={{ marginTop: 80, marginBottom: 20 }}>
            <PopularClinics
              clinics={clinics}
              customStyles={{
                grid: {
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "16px",
                },
              }}
            />
          </div>
        )}

        {promotions?.length ? (
          <div style={{ marginTop: 84, marginBottom: 20 }}>
            <PromotionsSwiper
              title="Aksiya va chegirmalar"
              promotions={promotions}
            />
          </div>
        ) : null}

        {recentClinics?.length > 0 && (
          <div style={{ marginTop: 80, marginBottom: 20 }}>
            <PopularClinics
              title="Yaqinda kiritilgan klinikalar"
              clinics={recentClinics}
              customStyles={{
                grid: {
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "16px",
                },
              }}
            />
          </div>
        )}

        <div style={{ marginTop: 80, marginBottom: 20 }}>
          <h2
            style={{
              marginTop: 100,
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

        <CommonServices filterCategory="DIAGNOSTICS" />
      </div>
    </div>
  );
};

export default Diagnostika;
