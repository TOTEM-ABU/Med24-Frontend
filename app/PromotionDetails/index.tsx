import React from "react";
import styles from "./PromotionDetails.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import promoImg from "../Promotions/images/clinicImg.webp";
import promoLogo from "../Promotions/images/clinicLogo.webp";
import YandexMap from "@/components/YandexMap";
import mapImg from "../Promotions/images/mapImg.webp";
import { FaStar } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Button, DoctorTypeCard, PromotionsSwiper } from "@/components";
import {
    useGetAllPromotions,
    useGetPromotionById,
} from "@/hooks/usePromotions";
import { useRouter } from "next/router";
import DOCTOR_SPECIALTIES from "@/lib/constants";

const PromotionDetail = (param: { id: string }) => {
    const router = useRouter();

    const { data } = useGetPromotionById(param.id);

    const { data: promotions } = useGetAllPromotions();

    const promotion = data?.data;

    const promotionWithClick = promotions?.map((p) => ({
        ...p,
        onClick: () => {
            router.push(`/promotion/clinic/${p.id}`);
        },
    }));

    return (
        <div className="container">
            <Breadcrumb
                items={[
                    { label: "Asosiy", href: "/" },
                    { label: "Aksiya va chegirmalar", href: "/products" },
                    { label: `${promotion?.title}` },
                ]}
            />
            <div className={styles["promotion-detail-container"]}>
                <div className={styles["header-container"]}>
                    <div className={styles["image-container"]}>
                        <img
                            src={promotion?.Clinics.image_url}
                            alt="promotion-clinic-image"
                            className={styles["image"]}
                        />
                        <div className={styles["detail"]}>
                            <div className={styles["logo"]}>
                                <a href="">
                                    <img
                                        src={promotion?.Clinics.logo_url}
                                        alt="clinic-logo"
                                    />
                                </a>
                            </div>
                            <h1 className={styles["h1"]}>
                                {promotion?.Clinics.name}
                            </h1>
                            <div className={styles["in-detail"]}>
                                <FaStar className={styles["star"]} />
                                <span>4.8</span>
                                <span>|</span>
                                <a href="#">
                                    <FaRegCommentDots />
                                    <span>20 Sharhlar </span>
                                    <MdKeyboardArrowRight
                                        className={styles["arrow"]}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles["map-container"]}>
                        <a href={promotion?.Clinics.yandex_map_url}>
                            <img src={mapImg.src} alt="map-img" />
                        </a>
                        <div className={styles["text"]}>
                            <p>{promotion?.Clinics.address}</p>
                        </div>
                    </div>
                </div>

                <div className={styles["certificate"]}>
                    <h3>{promotion?.title}</h3>
                    <Button
                        variant="primary"
                        name="Sertifikat olish"
                        className={styles["button"]}
                    />
                </div>

                <div className={styles["text-container"]}>
                    <h3>Sertifikat olish shartlari:</h3>
                    <div className={styles["p"]}>
                        <p>
                            <strong>Sertifikat shartlari:</strong>
                        </p>
                        <p>
                            Quyidagi xizmatlarga birinchi qabul uchun 10% va
                            qayta tashriflar uchun 5% chegirma beriladi:
                        </p>
                        <p>Shifobaxsh jismoniy tarbiya (LFK);</p>
                        <p>Kinezioterapevt konsultatsiyasi va muolajalari;</p>
                        <p>Manual terapevt konsultatsiyasi va muolajalari;</p>
                        <p>Osteopat konsultatsiyasi va muolajalari;</p>
                        <p>Reabilitolog konsultatsiyasi;</p>
                        <p>
                            Reabilitolog shifokor bilan individual mashg‘ulot;
                        </p>
                        <p>Viseral terapevt muolajasi;</p>
                        <p>Nevropatolog konsultatsiyasi;</p>
                        <p>Blokada;</p>
                        <p>Osteopatik yondashuvli massaj;</p>
                        <p>Pediatr-osteopat konsultatsiyasi va muolajalari;</p>
                        <p>Bolalar uchun osteopatik yondashuvli massaj;</p>
                        <p>Shifobaxsh sog‘lomlashtiruvchi massaj;</p>
                        <p>Sport shifokori bilan LFK;</p>
                        <p>Statika;</p>
                        <p>Fizioterapiya;</p>
                        <p>Iglorefleksoterapiya.</p>

                        <p>
                            To‘liq diagnostika (qomat va yurish dinamik tahlili)
                            uchun 30% chegirma beriladi.
                        </p>

                        <p>Chegirma quyidagi xizmatlarga taalluqli emas:</p>
                        <p>Ortopedik stelka(lar);</p>
                        <p>Tibbiy sarf materiallari;</p>
                        <p>Dorilar.</p>

                        <p>
                            Chegirma boshqa amaldagi aksiyalar/takliflar bilan
                            qo‘shilmaydi.
                        </p>
                    </div>
                </div>

                <div className={styles["use-certificate"]}>
                    <h3>Sertifikatdan qanday foydalanish mumkin?</h3>
                    <div>
                        <p>
                            Sertifikat raqamli formatda (mobil qurilma ekranida)
                            yoki bosma ko‘rinishda taqdim etilishi mumkin.
                        </p>
                    </div>
                </div>

                <div className={styles["swiper-container"]}>
                    <h2>Aksiya va chegirmalar</h2>
                    <div>
                        <PromotionsSwiper
                            promotions={promotionWithClick as []}
                        />
                    </div>
                </div>

                <div className={styles["links-container"]}>
                    <h2>Shifokorlarning keng tarqalgan mutaxassisliklari</h2>
                    <div className={styles["doctor-types"]}>
                        {DOCTOR_SPECIALTIES.slice(0, 6).map(
                            (specialty, index) => (
                                <DoctorTypeCard
                                    key={specialty.name}
                                    image={specialty.image}
                                    name={specialty.name}
                                    className={
                                        index === 0 ? styles["wide"] : ""
                                    }
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionDetail;
