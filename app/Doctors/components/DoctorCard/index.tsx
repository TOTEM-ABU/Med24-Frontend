import React from "react";
import styles from "./DoctorCard.module.css";
import Image from "next/image";
import Typography from "../Typography";
import Link from "next/link";

interface DoctorCardProps {
  photo?: string;
  fullname?: string;
  type?: string;
  patients?: number;
  experience?: number; // Years of experience
  qualification?: string; // Doctor qualification/status
  priceOne?: number | string;
  priceTwo?: number | string;
  clinicNumber?: number | string;
  telegramBotLink?: string;
  location?: string;
  clinicName?: string;
  clinicPhoto?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  photo,
  fullname,
  type,
  patients,
  experience = 4,
  qualification = "Ikkinchitofali shifokor",
  priceOne = "narx so'rov bo'yicha",
  priceTwo = "narx so'rov bo'yicha",
  clinicName,
  clinicNumber,
  clinicPhoto,
  telegramBotLink,
  location,
}) => {
  return (
    <div className={styles.doctorCardContainer}>
      <div className={styles.leftSide}>
        <div className={styles.doctorImage}>
          <Image
            src={photo ? `/Images/doctors/${photo}.webp` : "/doctor.jpg"}
            alt={fullname || "Doctor"}
            width={72}
            height={72}
          />
        </div>
        <div className={styles.doctorInfo}>
          <div className={styles.doctorType}>{type}</div>
          <h3 className={styles.doctorName}>{fullname}</h3>
          <div className={styles.patientCount}>{patients} bemorlar</div>

          <div className={styles.experienceSection}>
            <span className={styles.experience}>{experience} yil Tajriba</span>
            <span className={styles.qualification}>{qualification}</span>
          </div>

          <div className={styles.consultationPrices}>
            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>
                Birinchi konsultatsiyasi
              </span>
              <span className={styles.priceValue}>{priceOne}</span>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>
                Takroriy konsultatsiyasi
              </span>
              <span className={styles.priceValue}>{priceTwo}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.clinicInfo}>
          <div className={styles.clinicStyle}>
            <Image
              src={
                clinicPhoto
                  ? `/Images/clinics/${clinicPhoto}.webp`
                  : "/Images/clinics/clinic-logo.webp"
              }
              alt={clinicName || "Clinic"}
              width={20}
              height={20}
            />
            <span className={styles.clinicName}>{clinicName}</span>
          </div>
          <div className={styles.clinicAddress}>{location}</div>
        </div>

        <div className={styles.actionButtons}>
          <Link href={`${clinicNumber}`} className={styles.callToClinic}>
            Klinikaga telefon qilish
          </Link>
          <Link href={`${telegramBotLink}`} className={styles.throwBot}>
            Qabulga yozilish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
