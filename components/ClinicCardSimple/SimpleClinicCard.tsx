import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ClinicCardSimple.module.css";

interface SimpleClinicCardProps {
  title: string;
  logoSrc: string;
  href?: string;
}

const SimpleClinicCard: React.FC<SimpleClinicCardProps> = ({
  title,
  logoSrc,
  href = "#",
}) => {
  return (
    <div className={styles.card}>
      <Link href={href} className={styles.link}>
        <div className={styles.logoContainer}>
          <Image
            src={logoSrc}
            alt={title}
            className={styles.logo}
            width={50}
            height={50}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        </div>
        <div className={styles.title}>{title}</div>
      </Link>
    </div>
  );
};

export default SimpleClinicCard;
