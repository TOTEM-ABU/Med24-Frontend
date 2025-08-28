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
  priceOne?: number | string;
  priceTwo?: number | string;
  clinicNumber?: number;
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
  priceOne,
  priceTwo,
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
            src={`/Images/doctors/${photo}.webp`}
            alt="loading..."
            width={72}
            height={72}
          />
        </div>
        <div className={styles.centerStyle}>
          <div className={styles.doctorDocs}>
            <Typography size="14" color="#757575" bottom="0" top="0">
              {type}
            </Typography>
            <Typography size="18" weight="500" bottom="0" top="5">
              {fullname}
            </Typography>
            <Typography size="15" color="#757575" bottom="0" top="5">
              {patients} bemorlar
            </Typography>
          </div>
          <div className={styles.servicePrices}>
            <div>
              <Typography size="12" bottom="10">
                Birinchi konsultatsiya
              </Typography>
              <Typography size="12">{priceOne}</Typography>
            </div>
            <div>
              <Typography size="12" bottom="10">
                Ikkinchi konsultatsiya
              </Typography>
              <Typography size="12">{priceTwo}</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.clinicStyle}>
          <Image
            src={`/Images/clinics/${clinicPhoto}.webp`}
            alt="loading..."
            width={20}
            height={20}
          />
          <button>{clinicName}</button>
        </div>
        <Typography color="#757575" top="15" bottom="15">
          {location}
        </Typography>
        <Link href={`${clinicNumber}`} className={styles.callToClinic}>
          Klinikaga telefon qilish
        </Link>
        <Link href={`${telegramBotLink}`} className={styles.throwBot}>
          Qabulga yozilish
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
