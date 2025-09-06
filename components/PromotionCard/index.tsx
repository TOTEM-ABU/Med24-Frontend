import React from "react";
import Image from "next/image";
import styles from "./PromotionCard.module.css";

interface PromotionCardProps {
  discount: string;
  image: string;
  clinicLogo: string;
  clinicName: string;
  clinicDescription: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const PromotionCard = (props: PromotionCardProps) => {
  return (
    <div className={styles["promotion-card"]} onClick={props.onClick}>
      <div className={styles["image-section"]}>
        <span className={styles["discount-badge"]}>
          Chegirma {props.discount}%
        </span>
        <Image
          src={props.image}
          alt="clinic-image"
          className={styles["clinic-image"]}
          width={300}
          height={200}
        />
      </div>
      <div className={styles["content-section"]}>
        <div className={styles["clinic-header"]}>
          <Image
            src={props.clinicLogo}
            alt="clinic logo"
            className={styles["clinic-logo"]}
            width={50}
            height={50}
          />
          <h3 className={styles["clinic-name"]}>{props.clinicName}</h3>
        </div>
        <p className={styles["clinic-description"]}>
          {props.clinicDescription}
        </p>
      </div>
    </div>
  );
};

export default PromotionCard;
