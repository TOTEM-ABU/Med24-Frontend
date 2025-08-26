import React from "react";
import styles from "./ProductDetails.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";

const Product = () => {
    return (
        <div className="container">
            <div className={styles['product-details-container']}>
                <Breadcrumb
                    items={[
                        { label: "Asosiy sahifa", href: "/" },
                        { label: "Dorilar", href: "/products" },
                        {label: "ENDOMASTIN kapsulalar"}
                    ]}
                />

                <div className={styles["input-container"]}>
                    <Input
                        label="Shifokor ismi, mutaxassislik nomini yoki dor-darmon kiriting"
                        width="100%"
                    />
                    <Button
                        name="Qidirish"
                        variant="primary"
                        padding="0 38px 0 38px"
                    />
                </div>

                <div>
                <h2 className={styles['main-text']}>ENDOMASTIN kapsulalar</h2>
                    <div className={styles['details-container']}>
                        <div>
                                <img src="" alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Product;
