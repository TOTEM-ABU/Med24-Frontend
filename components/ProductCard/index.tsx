import React from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  image: string;
  price: string;
  name: string;
}

const ProductCard = ({ image, price, name }: ProductCardProps) => {
  return (
    <div className={styles["product-card-container"]}>
      <a href="#" className={styles["link"]}>
        <Image
          src={image}
          alt={name}
          className={styles["image"]}
          width={200}
          height={200}
        />
      </a>
      <p className={styles["price"]}>{price} so&apos;m</p>
      <p className={styles["name"]}>{name}</p>
    </div>
  );
};

export default ProductCard;
