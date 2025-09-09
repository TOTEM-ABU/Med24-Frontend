"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ServicesSection.module.css";

const ServicesSection = () => {
  const services = [
    {
      title: "Analizlar",
      description: "Barcha turdagi tahlillar, 200 dan ortiq laboratoriyalar",
      image: "https://med24.uz/_ipx/f_webp&q_100/icons/tests.png",
      link: "/uslugi/analiz",
      bgColor: "#f1f5f9",
    },
    {
      title: "Diagnostika",
      description: "MRT, KT, UTT, Rentgen, EKG Endoskopik tekshiruv",
      image: "https://med24.uz/_ipx/f_webp&q_80/icons/checkup.png",
      link: "/Diagnostika",
      bgColor: "#e6f4ea",
    },
    {
      title: "Tibbiy xizmatlar",
      description: "Tibbiy xizmatlarga borgan holda buyurtma bering",
      image: "https://med24.uz/_ipx/f_webp&q_80/icons/services.png",
      link: "/uslugi",
      bgColor: "#f3e8ff",
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Xizmatlar</h2>

      <div className={styles.cardsContainer}>
        {services.map((service, index) => (
          <div
            key={index}
            className={styles.card}
            style={{ backgroundColor: service.bgColor }}
          >
            <div className={styles.contentWrapper}>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>

              <Link href={service.link} className={styles.link}>
                <span>Qabulga yozilish</span>
                <span className={styles.arrow}>›</span>
              </Link>
            </div>

            <div className={styles.imageContainer}>
              <Image
                src={service.image}
                alt={service.title}
                width={150}
                height={151}
                className={styles.image}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
