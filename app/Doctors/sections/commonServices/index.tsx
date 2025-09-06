import React from "react";
import { Typography } from "../../components";
import Link from "next/link";
import styles from "./commonService.module.css";

const CommonlyServices = () => {
  return (
    <div className={styles.commonServices}>
      <Typography size="22" bottom="24" weight="600">
        Keng tarqalgan tibbiy xizmatlar
      </Typography>
      <div className={styles.commonServicesLinks}>
        <Link href="/" className={styles.navLink}>
          Breket o`rnatish
        </Link>
        <Link href="/" className={styles.navLink}>
          Buyrakdagi toshlarni olib tashlash
        </Link>
        <Link href="/" className={styles.navLink}>
          Doppler (ultratovushli doppler)
        </Link>
        <Link href="/" className={styles.navLink}>
          Elektroansefalografika (EEG)
        </Link>
        <Link href="/" className={styles.navLink}>
          Exokardiyografiya (EXOKG)
        </Link>
        <Link href="/" className={styles.navLink}>
          Gastroskopiya
        </Link>
        <Link href="/" className={styles.navLink}>
          Gemoroyni lazer yordamida olib tashlash
        </Link>
        <Link href="/" className={styles.navLink}>
          Hollarni olib tashlash
        </Link>
        <Link href="/" className={styles.navLink}>
          Ko`z lazer operatsiyasi
        </Link>
      </div>
    </div>
  );
};

export default CommonlyServices;
