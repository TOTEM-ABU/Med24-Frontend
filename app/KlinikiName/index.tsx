"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./KlinikiName.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DoctorCard } from "@/app/Doctors/components";
import { PopularClinics } from "@/components";

export type ClinicHeaderProps = {
  id?: string;
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
  doctors?: Array<{
    id?: string;
    name?: string;
    surname?: string;
    experience_years?: number;
    Specialties?: { id: string; name?: string } | null;
  }>;
  reviews?: Array<{
    id: string;
    comment?: string;
    rating?: number;
    userId?: string;
    user?: { name?: string; surname?: string };
    createdAt?: string;
  }>;
};

// Review modal component
const ReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Iltimos, ismingizni kiriting");
      return;
    }

    if (!phone.trim()) {
      toast.error("Iltimos, telefon raqamingizni kiriting");
      return;
    }

    // Just show toast and close modal
    toast.success(
      "Sizning sharhingiz muvaffaqiyatli yuborildi. Moderatsiyadan keyin ko'rib chiqamiz."
    );
    onClose();
    onSubmit();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Sharh qoldirish</h3>
          <button className={styles.modalCloseButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <h2 className={styles.reviewTitle}>Sharh qoldirish</h2>
          <p className={styles.reviewSubtitle}>
            Sizning fikringiz biz uchun juda muhim
          </p>

          <div className={styles.starRatingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`${styles.starLarge} ${
                  star <= rating ? styles.starActive : ""
                }`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <div className={styles.formFields}>
            <div className={styles.inputRow}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingiz*"
                className={styles.inputField}
                disabled={isSubmitting}
              />

              <div className={styles.phoneField}>
                <span className={styles.phonePrefix}>+998</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").substring(0, 9))
                  }
                  placeholder=""
                  className={styles.phoneInput}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Sharhingiz matni*"
              className={styles.commentInput}
              disabled={isSubmitting}
            />
          </div>

          <button
            className={styles.submitButtonFull}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Yuborish
          </button>
        </div>
      </div>
    </div>
  );
};

const KlinikiNameHeader: React.FC<{ clinic: ClinicHeaderProps }> = ({
  clinic,
}) => {
  const {
    id,
    name,
    address,
    rating,
    reviewsCount,
    cover_url,
    logo_url,
    description,
    opening_hours,
    clinicservices,
    doctors,
    reviews,
  } = clinic || {};

  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const router = useRouter();

  // Fetch popular clinics data from the backend
  const { data: popularClinics } = useQuery({
    queryKey: ["clinics-popular"],
    queryFn: async () => {
      const include = [
        "Region",
        "doctors.Specialties",
        "clinicservices.Services",
        "reviews",
      ].join(",");
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clinics?include=${include}&limit=20`
        );
        return res.data?.data ?? [];
      } catch (error) {
        console.error("Error fetching popular clinics:", error);
        return [];
      }
    },
  });

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

  // Extract unique specialties from doctors
  const uniqueSpecialties = React.useMemo(() => {
    if (!doctors || doctors.length === 0) return [];

    const specialtiesMap = new Map<string, string>();
    doctors.forEach((doctor) => {
      if (doctor?.Specialties?.id && doctor?.Specialties?.name) {
        specialtiesMap.set(doctor.Specialties.id, doctor.Specialties.name);
      }
    });

    return Array.from(specialtiesMap.values());
  }, [doctors]);

  // Fallback specialties to use if no doctor data is available
  const fallbackSpecialties = [
    "Akusher",
    "Allergolog",
    "Androlog",
    "Dermatovenerelog",
    "Endokrinolog",
    "Endoskopist",
    "Gastroenterolog",
    "Ginekolog",
    "Jarroh",
    "Kardiolog",
    "Laborant",
    "LOR (Otolaringolog)",
    "Nefrolog",
    "Neonatolog",
    "Nevrolog",
    "Oftalmolog",
    "Ortoped",
    "Pediatr",
    "Pulmonolog",
    "Radiolog",
    "Rentgenolog",
    "Revmatolog",
    "Stomatolog",
    "Stomatolog-terapevt",
    "Terapevt",
    "Tez yordam shifokori",
    "Torakal jarroh",
    "Travmatolog",
    "Ultratovush mutaxassisi",
    "Urolog",
    "Vertebrolog",
  ];

  const specialtiesToShow =
    uniqueSpecialties.length > 0 ? uniqueSpecialties : fallbackSpecialties;

  const mainServices =
    clinicservices
      ?.slice(0, 3)
      .map((cs) => cs.Services?.name)
      .filter(Boolean) || [];

  const doctorCount = clinicservices?.length || 45;
  const reviewCount = reviewsCount || 39;

  const clinicInfo = `🏥 ${name || "Klinika"} klinikasi, ${
    address ? address.split(",")[0] : "Toshkent"
  }: ${doctorCount} shifokor, ${reviewCount} fikr-mulohaza. Onlayn yoki telefon orqali qabulga yozilish.`;

  const dynamicDescription = `O'zbekistonda birinchi xususiy tibbiyot markazi ${
    name || "bu klinika"
  } 1996 yilda tashkil etilgan. 30 yillik tajribaga ega ko'p tarmoqli klinika aholiga sifatli tibbiy xizmat ko'rsatishda davom etmoqda. Bu yerda bemorlar ambulator va statsionar sharoitlarda davolanadi. Poliklinika ${
    address ? address.split(",")[0] : "Toshkent shahrining Yashnobod tumanida"
  } joylashgan.`;

  const fullDescription = `${dynamicDescription} ${
    name || "Klinikada"
  } konsultativ poliklinikasi dushanbadan shanbagacha soat 8.30 dan 17.00 gacha bemorlarni qabul qiladi, radiologiya va tez tibbiy yordam bo'limlari kechayu kunduz ishlaydi. ${
    name || "Klinikada"
  } ko'p yillik tajribaga ega malakali mutaxassislar ishlaydi. ${
    mainServices.length > 0
      ? `${mainServices.join(", ")} `
      : "Terapevt, dermatovenerolog, kardiolog, LOR, endokrinolog, urolog, ortoped, pediatr, stomatolog, nevropatolog, oftalmolog, fizioterapevt "
  }mutaxassisliklari bo'yicha shifokorlar faoliyat olib boradi. Yuqori toifadagi jarrohlar turli operatsiyalarni amalga oshiradilar. Bu yerda malakali shifokorlar va hamshiralar tezroq sog'ayishingizga chin dildan yordam beradi. ${
    name || "Klinikada"
  } sog'lig'ingizni professionallarga ishonganingizga amin bo'lishingiz mumkin.`;

  // Group services by category
  const servicesByCategory = React.useMemo(() => {
    if (!clinicservices || clinicservices.length === 0) return {};

    const grouped: Record<string, Array<{ name: string; price: string }>> = {};

    clinicservices.forEach((service) => {
      if (!service.Services?.name) return;

      // Use the first word of the service name as category
      // or "Other Services" if can't determine
      const nameParts = service.Services.name.split(" ");
      const category =
        nameParts.length > 1
          ? `${nameParts[0]} ${nameParts[1]}`
          : "Boshqa xizmatlar";

      if (!grouped[category]) {
        grouped[category] = [];
      }

      grouped[category].push({
        name: service.Services.name,
        price: service.price ? String(service.price) : "0",
      });
    });

    return grouped;
  }, [clinicservices]);

  const [allReviews, setAllReviews] = useState(reviews || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = () => {
    // This function is intentionally empty as we're not saving the review
    // The toast is shown directly in the modal component
    console.log("Review submitted (not saved to database)");
  };

  // Format date for reviews
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.containerWithPadding}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
            maxWidth: "500px",
          },
          success: {
            style: {
              background: "#10B981",
            },
          },
          error: {
            style: {
              background: "#EF4444",
            },
          },
        }}
      />
      <Breadcrumb
        items={[
          { label: "Asosiy sahifa", href: "/" },
          { label: "Klinikalar", href: "/Kliniki" },
          { label: name || "Klinika" },
        ]}
      />

      <div className={styles.miniContainer}>
        <div className={styles.mainLayout}>
          <div className={styles.leftContainer}>
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
                            <span
                              className={styles.reviewText}
                              onClick={() => setIsReviewModalOpen(true)}
                              style={{ cursor: "pointer" }}
                            >
                              {reviewsCount} sharhlar
                            </span>
                          </>
                        )}
                      </>
                    )}
                    {typeof rating === "undefined" &&
                      typeof reviewsCount === "number" && (
                        <span
                          className={styles.reviewText}
                          onClick={() => setIsReviewModalOpen(true)}
                          style={{ cursor: "pointer" }}
                        >
                          {reviewsCount} sharhlar
                        </span>
                      )}
                  </div>
                </div>
              </div>
            </div>

            {/* Add button to open review modal */}
            <div className={styles.reviewButtonContainer}>
              <button
                className={styles.leaveReviewButton}
                onClick={() => setIsReviewModalOpen(true)}
              >
                Sharh qoldirish
              </button>
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

            {/* 1. Shifokorlar mutaxassisliklari - separate section */}
            <div className={styles.servicesSection}>
              <h3 className={styles.servicesTitle}>
                Shifokorlar mutaxassisliklari
              </h3>
              <div className={styles.servicesList}>
                {uniqueSpecialties && uniqueSpecialties.length > 0 ? (
                  uniqueSpecialties.map((specialty, index) => (
                    <span
                      key={`specialty-${index}`}
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick(specialty)}
                    >
                      {specialty}
                    </span>
                  ))
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

            {/* 2. Klinikaning ixtisoslashuvi - pricing section only */}
            <div className={styles.servicesSection}>
              <h3 className={styles.servicesTitle}>
                Klinikaning ixtisoslashuvi &quot;{name || "Klinika"}&quot;
              </h3>

              {/* Services from doctors specialties - BEFORE pricing */}
              <div className={styles.servicesList}>
                {uniqueSpecialties && uniqueSpecialties.length > 0 ? (
                  uniqueSpecialties.map((specialty, index) => (
                    <span
                      key={`specialty-pricing-${index}`}
                      className={styles.serviceItem}
                      onClick={() => handleServiceClick(specialty)}
                    >
                      {specialty}
                    </span>
                  ))
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

              {/* Pricing section */}
              <div className={styles.pricesList}>
                {clinicservices && clinicservices.length > 0
                  ? (showAllServices
                      ? clinicservices
                      : clinicservices.slice(0, 4)
                    ).map(
                      (service, index) =>
                        service.Services?.name && (
                          <div
                            key={`price-${service.id || index}`}
                            className={styles.priceItem}
                          >
                            <span className={styles.serviceName}>
                              {service.Services.name}
                            </span>
                            <span className={styles.servicePrice}>
                              {service.price} so&apos;m
                            </span>
                          </div>
                        )
                    )
                  : (showAllServices
                      ? [
                          { name: "17-OH PROGESTERON", price: "145 000" },
                          {
                            name: "1-toifa + chuqur biopsiya",
                            price: "4 300 000",
                          },
                          { name: "1 soatlik monitoring", price: "330 000" },
                          {
                            name: "Chiqish bilan 1 soatlik monitoring",
                            price: "440 000",
                          },
                          {
                            name: "Kardiolog konsultatsiyasi",
                            price: "250 000",
                          },
                          { name: "Nevropatolog ko'rigi", price: "200 000" },
                          { name: "Oftalmolog tekshiruvi", price: "180 000" },
                          { name: "Ginekolog ko'rigi", price: "220 000" },
                        ]
                      : [
                          { name: "17-OH PROGESTERON", price: "145 000" },
                          {
                            name: "1-toifa + chuqur biopsiya",
                            price: "4 300 000",
                          },
                          { name: "1 soatlik monitoring", price: "330 000" },
                          {
                            name: "Chiqish bilan 1 soatlik monitoring",
                            price: "440 000",
                          },
                        ]
                    ).map((service, index) => (
                      <div
                        key={`default-price-${index}`}
                        className={styles.priceItem}
                      >
                        <span className={styles.serviceName}>
                          {service.name}
                        </span>
                        <span className={styles.servicePrice}>
                          {service.price} so&apos;m
                        </span>
                      </div>
                    ))}
              </div>
              <button
                className={styles.togglePricesButton}
                onClick={() => setShowAllServices(!showAllServices)}
              >
                {showAllServices
                  ? "Kamroq ko&apos;rsatish"
                  : "To&apos;liq praysni ko&apos;rsatish >"}
              </button>
            </div>
          </div>

          <div className={styles.rightContainer}>
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
                    {address || "Manzil ko&apos;rsatilmagan"}
                  </div>
                  <div className={styles.locationSubtext}>
                    {opening_hours
                      ? Object.values(opening_hours).some(
                          (hours) =>
                            hours === "24/7" || hours?.includes("00:00-23:59")
                        )
                        ? "Har doim ochiq"
                        : "Ish vaqti ko&apos;rsatilgan"
                      : "Ish vaqti ma&apos;lum emas"}
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
        <div className={styles.fullWidthDoctorSpecialtiesSection}>
          <h3 className={styles.sectionTitle}>Klinikadagi shifokorlar</h3>
          <div className={styles.specialtiesList}>
            {specialtiesToShow.map((specialty, index) => (
              <span
                key={`doctor-specialty-${index}`}
                className={styles.specialtyLink}
                onClick={() => handleServiceClick(specialty)}
              >
                {specialty}
                {index < specialtiesToShow.length - 1 && (
                  <span className={styles.specialtySeparator}>,</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.servicesListSection}>
          <h3 className={styles.sectionTitle}>Xizmatlar</h3>

          {Object.keys(servicesByCategory).length > 0 ? (
            Object.entries(servicesByCategory).map(
              ([category, services], categoryIndex) => (
                <div key={`category-${categoryIndex}`}>
                  <h4 className={styles.serviceCategory}>{category}</h4>

                  <div className={styles.serviceItemsList}>
                    {services.map((service, serviceIndex) => (
                      <div
                        key={`service-${categoryIndex}-${serviceIndex}`}
                        className={styles.serviceListItem}
                      >
                        <span className={styles.serviceListItemName}>
                          {service.name}
                        </span>
                        <span className={styles.serviceListItemPrice}>
                          {service.price} so&apos;m
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )
          ) : (
            <div>
              <h4 className={styles.serviceCategory}>
                Massaj va manual terapiya
              </h4>

              <div className={styles.serviceItemsList}>
                <div className={styles.serviceListItem}>
                  <span className={styles.serviceListItemName}>
                    Umumiy massaj (60 daqiqa)
                  </span>
                  <span className={styles.serviceListItemPrice}>
                    245 000 so&apos;m
                  </span>
                </div>
                <div className={styles.serviceListItem}>
                  <span className={styles.serviceListItemName}>
                    Bosh massaji (15 daqiqa)
                  </span>
                  <span className={styles.serviceListItemPrice}>
                    50 000 so&apos;m
                  </span>
                </div>
                <div className={styles.serviceListItem}>
                  <span className={styles.serviceListItemName}>
                    Butun orqa massaj (20 daqiqa)
                  </span>
                  <span className={styles.serviceListItemPrice}>
                    75 000 so&apos;m
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Doctor Cards Section */}
        <div className={styles.doctorCardsSection}>
          <h3 className={styles.sectionTitle}>
            {name || "Klinika"} klinikasi shifokorlari
          </h3>

          <div className={styles.specialtyFilterContainer}>
            <div className={styles.filterDropdown}>
              <select
                className={styles.specialtySelect}
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">Mutaxasislkni tanlang</option>
                {specialtiesToShow.map((specialty, index) => (
                  <option key={`specialty-option-${index}`} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <div className={styles.dropdownArrow}>
                <svg
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 0.5L6 5.5L11 0.5"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.doctorCardsContainer}>
            {/* Filter doctors based on selected specialty */}
            {doctors && doctors.length > 0
              ? doctors
                  .filter(
                    (doctor) =>
                      !selectedSpecialty ||
                      doctor.Specialties?.name === selectedSpecialty
                  )
                  .map((doctor, index) => (
                    <DoctorCard
                      key={doctor.id || `doctor-${index}`}
                      fullname={`${doctor.name} ${doctor.surname}`}
                      type={
                        doctor.Specialties?.name ||
                        "Mutaxassislik ko&apos;rsatilmagan"
                      }
                      patients={Math.floor(Math.random() * 100) + 50}
                      experience={doctor.experience_years || 4}
                      qualification="Ikkinchitofali shifokor"
                      priceOne="narx so'rov bo'yicha"
                      priceTwo="narx so'rov bo'yicha"
                      clinicName={name}
                      clinicNumber="+998901234567"
                      clinicPhoto="clinic-logo"
                      telegramBotLink="#"
                      location={address || "Manzil ko&apos;rsatilmagan"}
                      photo={`doctor-${(index % 5) + 1}`}
                    />
                  ))
              : [1, 2, 3].map((index) => (
                  <DoctorCard
                    key={`fallback-doctor-${index}`}
                    fullname={`Abdumutalova Gulzoda Qaxxarovna`}
                    type="Allergolog"
                    patients={5}
                    experience={4}
                    qualification="Ikkinchitofali shifokor"
                    priceOne="narx so'rov bo'yicha"
                    priceTwo="narx so'rov bo'yicha"
                    clinicName={name || "MDS Servis"}
                    clinicNumber="+998901234567"
                    clinicPhoto="clinic-logo"
                    telegramBotLink="#"
                    location={address || "Botkin ko'chasi, 110/3"}
                    photo={`doctor-${index}`}
                  />
                ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className={styles.reviewsSection}>
          <h3 className={styles.sectionTitle}>
            {name || "Klinika"} {allReviews?.length || reviewsCount || 0}{" "}
            Sharhlar
          </h3>

          <div className={styles.ratingInfo}>
            <span className={styles.ratingValue}>⭐ {rating || 0}</span>
            <span className={styles.ratingSeparator}>|</span>
            <span className={styles.ratingText}>
              Reyting va sharhlarga ko&apos;ra, bemorlar ushbu mutaxassisni
              tavsiya qilishadi
            </span>
          </div>

          <button
            className={styles.leaveReviewButtonTop}
            onClick={() => setIsReviewModalOpen(true)}
          >
            Sharh qoldirish
          </button>

          {allReviews && allReviews.length > 0 ? (
            <div className={styles.reviewsList}>
              {allReviews.map((review, index) => (
                <div
                  key={`review-${review.id || index}`}
                  className={styles.reviewItem}
                >
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerInfo}>
                      <div className={styles.reviewerInitial}>
                        {(review.user?.name || "А").charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.reviewerDetails}>
                        <span className={styles.reviewerName}>
                          {review.user?.name || "Анонимно"}
                        </span>
                        {review.createdAt && (
                          <span className={styles.reviewDate}>
                            {formatDate(review.createdAt)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={styles.reviewRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`${styles.reviewStar} ${
                            star <= (review.rating || 0)
                              ? styles.reviewStarActive
                              : ""
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className={styles.reviewComment}>{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noReviews}>
              <p>
                Hozircha sharhlar yo&apos;q. Birinchi bo&apos;lib sharh
                qoldiring!
              </p>
              <button
                className={styles.leaveReviewButton}
                onClick={() => setIsReviewModalOpen(true)}
              >
                Sharh qoldirish
              </button>
            </div>
          )}
        </div>

        {/* Shifokorlarning keng tarqalgan mutaxassisliklari section */}
        <div className={styles.doctorTypesSection}>
          <h3 className={styles.sectionTitle}>
            Shifokorlarning keng tarqalgan mutaxassisliklari
          </h3>
          <div className={styles.doctorTypesGrid}>
            {[
              {
                name: "Kardiolog",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/852/01c/85201ccd5086addac3154451ce472ff3.png",
              },
              {
                name: "Ortoped",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/b9b/591/b9b591e3a36a1251d9a473707709e038.png",
              },
              {
                name: "Pulmonolog",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/f8d/801/f8d8017705ba4af951f9b21eba3a601e.png",
              },
              {
                name: "Stomatolog",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/a16/489/a16489385a3232c436d6db7453ebeb41.png",
              },
              {
                name: "Terapevt",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/acb/81e/acb81ec8aa7fb9d0ca171e77bffe08a4.png",
              },
              {
                name: "Travmatolog",
                image:
                  "https://main.med24.uz/uploads/doctors_specialties/9ba/808/9ba80882f5f169f8d66814f09a1a2fa2.png",
              },
            ].map((item, index) => (
              <div
                key={item.name}
                className={styles.doctorTypeCard}
                style={index === 0 ? { gridColumn: "span 2" } : undefined}
              >
                <p className={styles.doctorTypeName}>{item.name}</p>
                <img
                  src={item.image}
                  alt={`${item.name} icon`}
                  className={styles.doctorTypeImage}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Keng tarqalgan tibbiy xizmatlar section */}
        <div className={styles.commonServicesSection}>
          <h3 className={styles.sectionTitle}>
            Keng tarqalgan tibbiy xizmatlar
          </h3>
          <div className={styles.commonServicesGrid}>
            {clinicservices && clinicservices.length > 0
              ? clinicservices.map(
                  (service, index) =>
                    service.Services?.name && (
                      <a
                        key={service.id || index}
                        href="#"
                        className={styles.commonServiceLink}
                      >
                        {service.Services.name}
                      </a>
                    )
                )
              : // Fallback services if no clinic services are available
                [
                  "Laboratoriya tekshiruvlari",
                  "Rentgenologiya",
                  "Ultratovush tekshiruvlari",
                  "Kompyuter tomografiyasi",
                  "Magnet rezonans tomografiyasi",
                  "EKG",
                  "Spirometriya",
                  "Endoskopiya",
                  "Fizioterapiya",
                  "Massaj",
                  "Manual terapiya",
                  "Ortopedik tuzatish vositalari",
                ].map((service, index) => (
                  <a key={index} href="#" className={styles.commonServiceLink}>
                    {service}
                  </a>
                ))}
          </div>
        </div>

        <PopularClinics
          clinics={
            popularClinics || [
              {
                id: "1",
                name: "MDS Servis",
                logo_url:
                  "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp",
              },
              {
                id: "2",
                name: "Shox Med Center",
                logo_url:
                  "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp",
              },
              {
                id: "3",
                name: "Doctor D",
                logo_url:
                  "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp",
              },
              {
                id: "4",
                name: "Horev Medical",
                logo_url:
                  "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp",
              },
              {
                id: "5",
                name: "M-Clinic",
                logo_url:
                  "https://main.med24.uz/uploads/clinics/group0/part3/3863/200x.webp",
              },
            ]
          }
        />
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleSubmitReview}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default KlinikiNameHeader;
