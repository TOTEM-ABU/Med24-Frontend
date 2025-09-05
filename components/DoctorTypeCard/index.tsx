import React from "react";
import Image from "next/image";
import styles from "./DoctorTypeCard.module.css";

interface DoctorTypeCardProps {
  name: string;
  image: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const DoctorTypeCard = ({
  name,
  image,
  className,
  style,
  onClick,
}: DoctorTypeCardProps) => {
  return (
    <div
      className={`${styles["card"]} ${className || ""}`}
      style={style}
      onClick={onClick}
    >
      <p className={styles["name"]}>{name}</p>
      <Image
        src={image}
        alt={`${name} icon`}
        className={styles["image"]}
        width={100}
        height={100}
      />
    </div>
  );
};

export default DoctorTypeCard;
