import React from "react";
import styles from "./DoctorTypeCard.module.css";

interface DoctorTypeCardProps {
  name: string;
  image: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void
}

const DoctorTypeCard = ({
  name,
  image,
  className,
  style,
  onClick
}: DoctorTypeCardProps) => {
  return (
    <div className={`${styles["card"]} ${className || ""}`} style={style} onClick={onClick}>
      <p className={styles["name"]}>{name}</p>
      <img src={image} alt={`${name} icon`} className={styles["image"]} />
    </div>
  );
};

export default DoctorTypeCard;
