import React, { useEffect, useState } from "react";
import { Button, Input } from "../Doctors/components";
import ServicesInTashkent from "./ServicesInTashkent";
import CommonServices from "./CommonServices";
import {
  Breadcrumb,
  PopularClinics,
  DoctorTypeCard,
  PromotionsSwiper,
} from "@/components";
import { getAllClinics } from "@/api/clinics/clinics.api";
import { DOCTOR_SPECIALTIES } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import styles from "./Uslugi.module.css";
import UslugiClinics from "./UslugiClinics/UslugiClinics";

interface Clinic {
  id: string;
  name: string;
  logo_url?: string;
}

const UslugiPage = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: promotions } = useQuery({
    queryKey: ["promotions-list"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/promotions?limit=12`
      );
      return res.data?.data ?? [];
    },
  });

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await getAllClinics();
        setClinics(response.data || []);
      } catch (error) {
        console.error("Failed to fetch clinics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  if (loading) {
    return <div>Loading clinics...</div>;
  }

  return (
    <div className={styles.Container}>
      <Breadcrumb
        items={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Uslugi", href: "/uslugi" },
        ]}
      />
      <div className={styles.miniContainer}>
        <div className={styles.searchSection}>
          <Input inputPlaceholder="Shifokor ismi, mutaxassislik nomini yoki dori-darmon kiriting" />
          <Button>Qidirish</Button>
        </div>
        <ServicesInTashkent />
        <UslugiClinics clinics={clinics} />
        {promotions?.length ? (
          <div className={styles.sectionContainer}>
            <h2 style={{ margin: 0, marginBottom: 30, marginTop: 30 }}>
              Aksiya va chegirmalar
            </h2>
            <PromotionsSwiper promotions={promotions} />
          </div>
        ) : null}
        <div className={styles.sectionContainer}>
          <PopularClinics clinics={clinics} />
        </div>
        <div className={styles.sectionContainer}>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#333",
              marginBottom: "20px",
            }}
          >
            Shifokorlarning keng tarqalgan mutaxassisliklari
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
              alignItems: "stretch",
              maxWidth: "100%",
            }}
          >
            {DOCTOR_SPECIALTIES.slice(0, 6).map((item, index) => (
              <DoctorTypeCard
                key={item.name}
                name={item.name}
                image={item.image}
                style={index === 0 ? { gridColumn: "span 2" } : undefined}
              />
            ))}
          </div>
        </div>
        <CommonServices />
      </div>
    </div>
  );
};

export default UslugiPage;
