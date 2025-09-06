import React from "react";
import { Button, Input } from "../Doctors/components";
import ServicesInTashkent from "./ServicesInTashkent";
import CommonServices from "./CommonServices";
import { Breadcrumb, PopularClinics, PromotionsSwiper } from "@/components";

import styles from "./Uslugi.module.css";

const UslugiPage = () => {
  return (
    <div className={styles.Container}>
      <Breadcrumb
        items={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Uslugi", href: "/uslugi" },
        ]}
      />
      <div className={styles.searchSection}>
        <Input inputPlaceholder="Shifokor ismi, mutaxassislik nomini yoki dori-darmon kiriting" />
        <Button>Qidirish</Button>
      </div>
      <ServicesInTashkent />
      <PopularClinics
        clinics={[
          {
            id: "1",
            name: "MDS Servis",
            logo_url:
              "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp",
          },
          {
            id: "2",
            name: "Shox Med Center",
            logo_url:
              "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp",
          },
          {
            id: "3",
            name: "Doctor D",
            logo_url:
              "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp",
          },
          {
            id: "4",
            name: "Horev Medical",
            logo_url:
              "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp",
          },
          {
            id: "5",
            name: "M-Clinic",
            logo_url:
              "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp",
          },
        ]}
      />

      <CommonServices />
    </div>
  );
};

export default UslugiPage;
