import React from "react";
import styles from "./ClinicCard.module.css";

interface ClinicCardProps {
  image: string;
  discount: string;
  title: string;
  description: string;
}

const ClinicCard: React.FC<ClinicCardProps> = ({
  image,
  discount,
  title,
  description,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        {discount && <span className={styles.discount}>{discount}</span>}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default ClinicCard;
