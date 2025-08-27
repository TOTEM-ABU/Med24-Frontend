"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./KlinikiName.module.css";
import Breadcrumb from "@/components/Breadcrumb";

export type ClinicHeaderProps = {
  name?: string;
  address?: string;
  rating?: number | string;
  reviewsCount?: number;
  cover_url?: string | null;
  logo_url?: string | null;
  description?: string;
  opening_hours?: Record<string, string>;
  clinicservices?: Array<{
    id: string;
    price?: string | number;
    Services?: { id?: string; name?: string };
  }>;
};

const KlinikiNameHeader: React.FC<{ clinic: ClinicHeaderProps }> = ({
  clinic,
}) => {
  const {
    name,
    address,
    rating,
    reviewsCount,
    cover_url,
    logo_url,
    description,
    opening_hours,
    clinicservices,
  } = clinic || {};

  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const createServiceSlug = (serviceName: string) => {
    return serviceName
      .toLowerCase()
      .trim()
      .replace(/[\u2019'`]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleServiceClick = (serviceName: string) => {
    const slug = createServiceSlug(serviceName);
    router.push(`/Kliniki/${slug}`);
  };

  const mainServices =
    clinicservices
      ?.slice(0, 3)
      .map((cs) => cs.Services?.name)
      .filter(Boolean) || [];

  const doctorCount = clinicservices?.length || 45;
  const reviewCount = reviewsCount || 39;

  const clinicInfo = `🏥 ${name || "MDS Servis"} klinikasi, ${
    address ? address.split(",")[0] : "Toshkent"
  }: ${doctorCount} shifokor, ${reviewCount} fikr-mulohaza. Onlayn yoki telefon orqali qabulga yozilish.`;

  const dynamicDescription = `O'zbekistonda birinchi xususiy tibbiyot markazi ${
    name || "MDS-Servis"
  } 1996 yilda tashkil etilgan. 30 yillik tajribaga ega ko'p tarmoqli klinika aholiga sifatli tibbiy xizmat ko'rsatishda davom etmoqda. Bu yerda bemorlar ambulator va statsionar sharoitlarda davolanadi. Poliklinika ${
    address ? address.split(",")[0] : "Toshkent shahrining Yashnobod tumanida"
  } joylashgan.`;

  const fullDescription = `${dynamicDescription} ${
    name || "Klinika"
  } konsultativ poliklinikasi dushanbadan shanbagacha soat 8.30 dan 17.00 gacha bemorlarni qabul qiladi, radiologiya va tez tibbiy yordam bo'limlari kechayu kunduz ishlaydi. ${
    name || "Klinikada"
  } ko'p yillik tajribaga ega malakali mutaxassislar ishlaydi. ${
    mainServices.length > 0
      ? `${mainServices.join(", ")} `
      : "Terapevt, dermatovenerolog, kardiolog, LOR, endokrinolog, urolog, ortoped, pediatr, stomatolog, nevropatolog, oftalmolog, fizioterapevt "
  }mutaxassisliklari bo'yicha shifokorlar faoliyat olib boradi. Yuqori toifadagi jarrohlar turli operatsiyalarni amalga oshiradilar. Bu yerda malakali shifokorlar va hamshiralar tezroq sog'ayishingizga chin dildan yordam beradi. ${
    name || "Klinikada"
  } sog'lig'ingizni professionallarga ishonganingizga amin bo'lishingiz mumkin.`;

  return (
    <div className={styles.containerWithPadding}>
      <Breadcrumb
        items={[
          { label: "Asosiy sahifa", href: "/" },
          { label: "Klinikalar", href: "/Kliniki" },
          { label: name || "Klinika" },
        ]}
      />

      <div className={styles.miniContainer}>
        <div className={styles.mainLayout}>
          <div className={styles.backgroundImageSection}>
            <img
              className={styles.backgroundImage}
              src="https://main.med24.uz/uploads/clinic_images/group0/part0/591/1000x500.webp"
              alt={name || "Clinic Background"}
            />
            <div className={styles.clinicInfoOverlay}>
              <img
                className={styles.clinicLogo}
                src={
                  logo_url ||
                  "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp"
                }
                alt={name || "Clinic Logo"}
              />
              <div className={styles.clinicInfo}>
                <h1 className={styles.clinicName}>{name}</h1>
                <div className={styles.statsRow}>
                  {typeof rating !== "undefined" && (
                    <>
                      <span className={styles.ratingText}>
                        ⭐ {String(rating)}
                      </span>
                      {typeof reviewsCount === "number" && (
                        <>
                          <span className={styles.separator}>|</span>
                          <span className={styles.reviewText}>
                            {reviewsCount} sharhlar
                          </span>
                        </>
                      )}
                    </>
                  )}
                  {typeof rating === "undefined" &&
                    typeof reviewsCount === "number" && (
                      <span className={styles.reviewText}>
                        {reviewsCount} sharhlar
                      </span>
                    )}
                </div>
              </div>
            </div>
            <p className={styles.descriptionText}>{clinicInfo}</p>
            <p className={styles.descriptionText}>
              {isExpanded ? fullDescription : dynamicDescription}
            </p>
            <button
              className={styles.toggleButton}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "yashirmoq" : "yana"}
            </button>

            <div className={styles.servicesSection}>
              <h3 className={styles.servicesTitle}>
                Shifokorlar mutaxassisliklari
              </h3>
              <div className={styles.servicesList}>
                {clinicservices && clinicservices.length > 0 ? (
                  clinicservices.map(
                    (service, index) =>
                      service.Services?.name && (
                        <span
                          key={service.id || index}
                          className={styles.serviceItem}
                          onClick={() =>
                            service.Services?.name &&
                            handleServiceClick(service.Services.name)
                          }
                        >
                          {service.Services.name}
                        </span>
                      )
                  )
                ) : (
                  <>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Akusher")}
                    >
                      Akusher
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Allergolog")}
                    >
                      Allergolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Androlog")}
                    >
                      Androlog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Dermatovenerelog")}
                    >
                      Dermatovenerelog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Endokrinolog")}
                    >
                      Endokrinolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Endoskopist")}
                    >
                      Endoskopist
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Gastroenterolog")}
                    >
                      Gastroenterolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Ginekolog")}
                    >
                      Ginekolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Jarroh")}
                    >
                      Jarroh
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Kardiolog")}
                    >
                      Kardiolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Laborant")}
                    >
                      Laborant
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("LOR (Otolaringolog)")}
                    >
                      LOR (Otolaringolog)
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Nevrolog")}
                    >
                      Nevrolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Neonatolog")}
                    >
                      Neonatolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Oftalmolog")}
                    >
                      Oftalmolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Ortoped")}
                    >
                      Ortoped
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Pediatr")}
                    >
                      Pediatr
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Pulmonolog")}
                    >
                      Pulmonolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Radiolog")}
                    >
                      Radiolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Rentgenolog")}
                    >
                      Rentgenolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Revmatolog")}
                    >
                      Revmatolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Stomatolog")}
                    >
                      Stomatolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Stomatolog-terapevt")}
                    >
                      Stomatolog-terapevt
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Terapevt")}
                    >
                      Terapevt
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Tez yordam shifokori")}
                    >
                      Tez yordam shifokori
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Torakal jarroh")}
                    >
                      Torakal jarroh
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Travmatolog")}
                    >
                      Travmatolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() =>
                        handleServiceClick("Ultratovush mutaxassisi")
                      }
                    >
                      Ultratovush mutaxassisi
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Urolog")}
                    >
                      Urolog
                    </span>
                    <span
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick("Vertebrolog")}
                    >
                      Vertebrolog
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.mapSection}>
            <div className={styles.mapContainer}>
              <iframe
                className={styles.mapImage}
                src="https://www.openstreetmap.org/export/embed.html?bbox=69.235562%2C41.306081%2C69.245562%2C41.316081&layer=mapnik&marker=41.311081%2C69.240562"
                title="Clinic Location"
                style={{ border: 0 }}
              />
            </div>
            <div className={styles.mapInfo}>
              <div className={styles.addressText}>
                <div className={styles.locationName}>
                  {address || "Manzil ko\u2019rsatilmagan"}
                </div>
                <div className={styles.locationSubtext}>
                  {opening_hours
                    ? Object.values(opening_hours).some(
                        (hours) =>
                          hours === "24/7" || hours?.includes("00:00-23:59")
                      )
                      ? "Har doim ochiq"
                      : "Ish vaqti ko\u2019rsatilgan"
                    : "Ish vaqti ma\u2019lum emas"}
                </div>
              </div>
              <div className={styles.actionButtons}>
                <button className={styles.callButton}>
                  Klinikaga telefon qilish
                </button>
                <button className={styles.appointmentButton}>
                  Qabulga yozilish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KlinikiNameHeader;
