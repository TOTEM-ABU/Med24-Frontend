import Breadcrumb from "@/components/Breadcrumb";
import React from "react";
import styles from "./Promotions.module.css";
import clinicImg from "./images/clinicImg.webp";
import PromotionCard from "@/components/PromotionCard";
import clinicLogo from "./images/clinicLogo.webp";
import Button from "@/components/Button";

const PromotionsPage = () => {
    const promotions = [
        {
            image: clinicImg.src,
            clinicName: "Biolife - birinchi osteopad kl...",
            description: "To'liq diagnostika uchun 30% chegirma beriladi",
            discount: "30%",
            logo: clinicLogo.src,
        },
        {
            image: clinicImg.src,
            clinicName: "Medion Clinic 24/7",
            description:
                "Shifokor konsultatsiyasi va diagnostika uchun 20% chegirma",
            discount: "20%",
            logo: clinicLogo.src,
        },
        {
            image: clinicImg.src,
            clinicName: "Vitros Diagnostics",
            description: "Laboratoriya tahlillariga 30% chegirma.",
            discount: "30%",
            logo: clinicLogo.src,
        },
        {
            image: clinicImg.src,
            clinicName: "Stomatologiya Sadaf",
            description: "Jarrohlik va terapiya xizmatlariga 20% chegirma.",
            discount: "20%",
            logo: clinicLogo.src,
        },
        {
            image: clinicImg.src,
            clinicName: "Biogen Med",
            description: "Laboratoriya tekshiruvlariga 15% chegirma",
            discount: "15%",
            logo: clinicLogo.src,
        },
        {
            image: clinicImg.src,
            clinicName: "Medion Family Hospital",
            description: "Shifokor maslahati va diagnostika uchun 20% chegirma",
            discount: "20%",
            logo: clinicLogo.src,
        },
    ];

    return (
        <>
            <div className="container">
                <div className="promotions-container">
                    <div className={styles["header-container"]}>
                        <Breadcrumb
                            items={[
                                { label: "Asosiy sahifa", href: "/" },
                                { label: "Aksiyalar va chegirmalar" },
                            ]}
                        />
                        <h1>Aksiya va chegirmalar</h1>
                    </div>
                </div>
            </div>
            <div className={styles['card-back']}>
                            <div className="container">
                                                <div className={styles["cards-container"]}>
                    {promotions.map((promotion, index) => (
                        <div key={index} className={styles["card-wrapper"]}>
                            <PromotionCard
                                clinicName={promotion.clinicName}
                                discount={promotion.discount}
                                image={promotion.image}
                                clinicDescription={promotion.description}
                                clinicLogo={promotion.logo}
                            />
                        </div>
                    ))}
                    <div className={styles['btn-container']}>
                    <Button variant="primary" name="Yana ko'rsatish" className={styles['btn']}/>
                    </div>
                </div>
                            </div>
            </div>
        </>
    );
};

export default PromotionsPage;
