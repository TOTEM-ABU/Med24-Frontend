import React from "react";
import styles from "./ProductDetailsCard.module.css";
import { FaFile } from "react-icons/fa6";

interface ProductDetailsCardProps {
    image: string;
    name: string;
    owner: string;
    price: string;
    isReceipt?: Boolean;
}

const ProductDetailsCard = (props: ProductDetailsCardProps) => {
    return (
        <div className={styles["product-card"]}>
            {props.isReceipt && (
                <div className={styles["card-header"]}>
                    <FaFile />
                    <span>Retsepsiz</span>
                </div>
            )}

            <div className={styles["image-container"]}>
                <img
                    src={props.image}
                    alt={props.name}
                    className={styles["product-image"]}
                />
            </div>

            <h3 className={styles["product-name"]}>{props.name}</h3>

            <p className={styles["product-brand"]}>{props.owner}</p>

            <ul className={styles["features-list"]}>
                <li>Olib ketish imkonsiz</li>
                <li>Yetkazib berish imkonsiz</li>
            </ul>


            <div className={styles["price-section"]}>
                <span className={styles["price-label"]}>Narx:</span>
                <span className={styles["price-value"]}>{props.price} so'm</span>
            </div>

            <button className={styles["details-button"]}>Batafsil</button>
        </div>
    );
};

export default ProductDetailsCard;
