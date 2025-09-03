import Breadcrumb from "@/components/Breadcrumb";
import React from "react";
import styles from "./Promotions.module.css";
import PromotionCard from "@/components/PromotionCard";
import Button from "@/components/Button";
import { useGetAllPromotions } from "@/hooks/usePromotions";
import { useRouter } from "next/router";

const PromotionsPage = () => {
  const { data: promotions, isLoading } = useGetAllPromotions();

  const router = useRouter()

  if (isLoading) return <p>Yuklanmoqda...</p>;
  
  const handleCard = () => {
    router.push(`/promotion/clinic/1?name=Jasur`)
  }
  

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
      <div className={styles["card-back"]}>
        <div className="container">
          <div className={styles["cards-container"]}>
            {promotions?.map((promotion) => (
              <div key={promotion.id} className={styles["card-wrapper"]}>
                <PromotionCard 
                onClick={handleCard}
                  clinicName={promotion.Clinics.name}
                  discount={promotion.discount_percent}
                  image={promotion.Clinics.image_url}
                  clinicDescription={promotion.title}
                  clinicLogo={promotion.Clinics.logo_url}
                />
              </div>
            ))}
            <div className={styles["btn-container"]}>
              <Button
                variant="primary"
                name="Yana ko'rsatish"
                className={styles["btn"]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionsPage;
