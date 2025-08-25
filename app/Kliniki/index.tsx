import React from "react";
import styles from "./Kliniki.module.css";
import RecomendedKliniki from "./RecomendedKliniki";
import RecomendedTypes from "./RecomendedTypes";
import LatestReviews from "./LatestReviews";
import AskTelegram from "./AskTelegram";
import Districts from "./Districts";
import CommonServices from "./CommonServices";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumb";
import { ClinicsSwiper, PromotionsSwiper, ClinicCard } from "@/components";
import type { Clinic } from "@/components/ClinicCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Kliniki: React.FC = () => {
  const { data: clinics } = useQuery({
    queryKey: ["clinics-popular"],
    queryFn: async () => {
      const include = [
        "Region",
        "doctors.Specialties",
        "clinicservices.Services",
        "reviews",
      ].join(",");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/clinics?include=${include}&limit=20`
      );
      return res.data?.data ?? [];
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

  return (
    <div className="container">
      <Breadcrumb
        items={[{ label: "Asosiy sahifa", href: "/" }, { label: "Klinikalar" }]}
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

        {clinics?.length ? (
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <ClinicsSwiper title="Mashhur klinikalar" clinics={clinics} />
          </div>
        ) : null}

        {promotions?.length ? (
          <div style={{ marginTop: 8, marginBottom: 24 }}>
            <PromotionsSwiper
              title="Aksiya va chegirmalar"
              promotions={promotions}
            />
          </div>
        ) : null}

        <RecomendedKliniki />
        <RecomendedTypes />
        <LatestReviews />

        {clinics?.length ? (
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <h2 style={{ marginBottom: 12 }}>Barcha klinikalar</h2>
            <div
              style={{
                maxWidth: 874,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {clinics.map((c: Clinic) => (
                <ClinicCard key={c.id} clinic={c} />
              ))}
            </div>
          </div>
        ) : null}
        <AskTelegram />
        <Districts />
        <CommonServices />
      </div>
    </div>
  );
};

export default Kliniki;
