import { Typography } from "@/app/Doctors/components";
import React from "react";

import styles from "./CommonServices.module.css";
import Link from "next/link";

const CommonServices = () => {
  const commonServices = ["Hello", "Salom", "What's up"];
  return (
    <div className={styles.container}>
      <Typography size="24" top="30" bottom="20">
        Keng tarqalgan tibbiy xizmatlar
      </Typography>
      <div className={styles.commonServicesLinks}>
        {commonServices.map((val, idx) => (
          <div key={idx} className={styles.linkStyle}>
            <Link href={`/uslugi/${val}`}>{val}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonServices;
