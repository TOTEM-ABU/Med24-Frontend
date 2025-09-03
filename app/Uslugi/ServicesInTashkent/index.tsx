import React from "react";
import { Typography } from "@/app/Doctors/components";

import styles from "./ServicesInTashkent.module.css";
import Link from "next/link";

const ServicesInTashkent = () => {
  const services = [
    [
      "Oostiga sperma yuborish",
      "Sun'iy urug'lantirish",
      "EKO",
      "Embrionni qayta ekish",
      "Lazerli xetching",
      "IKSI muolajasi",
      "Homiladorlikni boshqarish",
      "Embrionlarning kriyoprezervatsiyasi",
    ],
    [
      "ASIT Staloral",
      "ASIT Alyustal",
      "ASIT Antipollin",
      "ASIT (dori narxidan tashqari)",
      "ASIT Oraleyr",
    ],
    [
      "Hijama",
      "Igna terapiya",
      "Galoterapiya",
      "Apiterapiya",
      "Gomeopatiya",
      "Elektroakupunktura",
      "Zuluk bilan davolash",
    ],
  ];

  const serviceTitles = [
    "Akusherlik va Reproduktologiya",
    "Allergiya-immunologiya",
    "Alternativ tibbiyot",
    "Analizlar",
    "Andrologiya",
    "Dermotologiya",
  ];
  return (
    <div className={styles.servicesInTashkent}>
      <Typography size="26" bottom="20">
        Tibbiy xizmatlar toshkentda
      </Typography>
      <div className={styles.servicesBlock}>
        {services.map((val, idx) => (
          <div key={idx} className={styles.oneColumn}>
            <Typography size="18" weight="600">
              {serviceTitles[idx]}
            </Typography>
            {val.map((v, i) => (
              <Link href={"/"} key={i} className={styles.links}>
                {v}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesInTashkent;
