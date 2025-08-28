import React from "react";
import styles from "./PromotionDetails.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import promoImg from "../Promotions/images/clinicImg.webp"
import promoLogo from "../Promotions/images/clinicLogo.webp"
import YandexMap from "@/components/YandexMap";
import mapImg from "../Promotions/images/mapImg.webp"

const PromotionDetail = () => {
    return (
        <div className="container">
            <Breadcrumb
                items={[
                    { label: "Asosiy", href: "/" },
                    { label: "Aksiya va chegirmalar", href: "/products" },
                    { label: "To'liq diagnostika uchun 30% chegirma beriladi" },
                ]}
            />
            <div className={styles["promotion-detail-container"]}>
              <div className={styles['header-container']}>
                <div className={styles['image-container']}>
                  <img src={promoImg.src} alt="promotion-clinic-image" className={styles['image']}/>
                </div>
                <div>
                  <a href="https://yandex.uz/maps/10335/tashkent/house/YkAYdQVkTEMEQFprfX9zeXllbQ==/?ll=69.324562%2C41.328570&z=17.04">
                    <img src={mapImg.src} alt="map-img" />
                  </a>
                </div>
              </div>
            </div>
        </div>
    );
};

export default PromotionDetail;
