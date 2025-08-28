import React from "react";
import styles from "./PopularClinics.module.css";

interface PopularClinicsProps {
  clinics: Array<{
    id: string;
    name: string;
    logo_url?: string;
  }>;
  title?: string;
}

const PopularClinics: React.FC<PopularClinicsProps> = ({
  clinics = [],
  title = "Toshkentdagi mashhur klinikalar va tibbiyot markazlari",
}) => {
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

  const defaultClinics = [
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
  ];

  // Use the provided clinics or fallback to the default ones
  const clinicsToShow =
    clinics.length > 0 ? clinics.slice(0, 10) : defaultClinics;

  return (
    <div className={styles.popularClinicsSection}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.popularClinicsGrid}>
        {clinicsToShow.map((clinic) => {
          const clinicSlug = createClinicSlug(clinic.name);
          return (
            <a
              key={clinic.id}
              href={`/klinika/${clinicSlug}`}
              className={styles.clinicCard}
            >
              <img
                src={clinic.logo_url || "/placeholder-logo.png"}
                alt={clinic.name}
                className={styles.clinicLogo}
              />
              <p className={styles.clinicName}>{clinic.name}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default PopularClinics;
