import React, { useMemo } from "react";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import DoctorTypeSwiper from "@/components/DoctorTypeSwiper";
import ServicesSection from "@/components/ServicesSection";
import PopularClinics from "@/components/PopularClinics";
import ClinicFilters from "@/components/ClinicFilters";
import PromotionsSwiper from "@/components/PromotionsSwiper";
import UsefulArticles from "@/components/UsefulArticles";
import styles from "@/app/Kliniki/Kliniki.module.css";
import pageStyles from "./index.module.css";
import { DOCTOR_SPECIALTIES } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const getInitials = (name?: string, surname?: string): string => {
  const a = (name || "").trim();
  const b = (surname || "").trim();
  const first = a ? a[0] : "";
  const second = b ? b[0] : a.length > 1 ? a[1] : "";
  return (first + second).toUpperCase();
};

const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const Stars: React.FC<{ value: number }> = ({ value }) => {
  const count = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div
      style={{ display: "flex", gap: "4px", margin: "6px 0 8px" }}
      aria-label={`${count} yulduz`}
    >
      {new Array(5).fill(0).map((_, i) => (
        <span key={i} style={{ color: i < count ? "#f59e0b" : "#e5e7eb" }}>
          ★
        </span>
      ))}
    </div>
  );
};

const HomePage = () => {
  const doctorCount = 1000;
  const clinicCount = 230;

  type Review = {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    User?: {
      id: string;
      name: string;
      surname: string;
      avatar_url?: string;
    };
    Clinics?: {
      id: string;
      name: string;
    };
  };

  type Service = {
    id: string;
    name: string;
    description?: string;
    category?: string;
    image_url?: string;
    createdAt?: string;
    clinicservices?: Array<{
      id: string;
      price?: string;
      duration_minutes?: number;
      clinicsId?: string;
      servicesId?: string;
      createdAt?: string;
    }>;
  };

  type Clinic = {
    id: string;
    name: string;
    description?: string;
    address?: string;
    phone?: string;
    website?: string;
    opening_hours?: Record<string, string>;
    logo_url?: string;
    rating?: string | number;
    type?: "PUBLIC" | "PRIVATE" | "VETERINARY";
    Region?: { id: string; name: string } | null;
    doctors?: Array<{
      id?: string;
      name?: string;
      surname?: string;
      specialtiesId?: string;
      Specialties?: {
        id: string;
        name?: string;
      } | null;
    }>;
  };

  const { data: clinics = [] } = useQuery({
    queryKey: ["clinics-popular-home"],
    queryFn: async () => {
      const include = [
        "Region",
        "doctors.Specialties",
        "clinicservices.Services",
        "reviews",
        "opening_hours",
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

  const { data: promotions = [] } = useQuery({
    queryKey: ["promotions-list-home"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/promotions?limit=12`
        );
        return res.data?.data ?? [];
      } catch (error) {
        console.error("Error fetching promotions:", error);
        return [];
      }
    },
  });

  const { data: services = [] } = useQuery({
    queryKey: ["services-list-home"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/services?limit=1000`
        );
        return res.data?.data ?? [];
      } catch (error) {
        console.error("Error fetching services:", error);
        return [];
      }
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["latest-reviews-home"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews?include=User,Clinics&limit=50`
        );
        const list: Review[] = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];
        return list
          .filter((r) => typeof r.rating === "number")
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 6);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
      }
    },
  });

  const publicClinics = useMemo(() => {
    if (!clinics || clinics.length === 0) return [];
    return clinics.filter((clinic: Clinic) => clinic.type === "PUBLIC");
  }, [clinics]);

  const doctorSpecialties = useMemo(() => {
    if (!clinics || clinics.length === 0) return [];

    const specialtiesMap = new Map();

    clinics.forEach((clinic: Clinic) => {
      if (clinic.doctors && clinic.doctors.length > 0) {
        clinic.doctors.forEach((doctor) => {
          if (doctor.Specialties && doctor.Specialties.name) {
            const specialtyId = doctor.Specialties.id;
            if (specialtiesMap.has(specialtyId)) {
              const specialty = specialtiesMap.get(specialtyId);
              specialtiesMap.set(specialtyId, {
                ...specialty,
                count: specialty.count + 1,
              });
            } else {
              specialtiesMap.set(specialtyId, {
                id: doctor.Specialties.id,
                name: doctor.Specialties.name,
                count: 1,
              });
            }
          }
        });
      }
    });

    return Array.from(specialtiesMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [clinics]);

  const commonServices = useMemo(() => {
    if (!services || services.length === 0) return [];
    return services.slice(0, 12);
  }, [services]);

  const diagnosticServices = useMemo(() => {
    if (!services || services.length === 0) return [];
    return services
      .filter((service: Service) => service.category === "DIAGNOSTICS")
      .slice(0, 24);
  }, [services]);

  const categorizedServices = useMemo(() => {
    if (!diagnosticServices.length) return {};

    const categories: Record<string, Service[]> = {
      Angiografiya: [],
      Biopsiya: [],
      Doppler: [],
      "Dupleks skanerlash": [],
      Boshqa: [],
    };

    diagnosticServices.forEach((service: Service) => {
      const name = service.name.toLowerCase();
      if (name.includes("angiograf")) {
        categories["Angiografiya"].push(service);
      } else if (name.includes("biopsiya") || name.includes("aspirat")) {
        categories["Biopsiya"].push(service);
      } else if (
        name.includes("doppler") ||
        name.includes("uzd") ||
        name.includes("uzi")
      ) {
        categories["Doppler"].push(service);
      } else if (name.includes("dupleks") || name.includes("skaner")) {
        categories["Dupleks skanerlash"].push(service);
      } else {
        categories["Boshqa"].push(service);
      }
    });
    return Object.fromEntries(
      Object.entries(categories).filter(([services]) => services.length > 0)
    );
  }, [diagnosticServices]);

  return (
    <div>
      <div className={styles.bigContainer}>
        <div className={styles["search-section"]}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Toshkentda klinikalar va tibbiyot markazlari katalogi
          </h1>
          <div className={styles["input-container"]}>
            <Input
              label="Shifokor ismi, mutaxassislik nomini yoki xizmat turini kiriting"
              width="100%"
            />
            <Button name="Qidirish" variant="primary" padding="0 38px 0 38px" />
          </div>
        </div>

        <div style={{ marginTop: "40px" }}>
          <DoctorTypeSwiper
            doctorTypes={DOCTOR_SPECIALTIES}
            doctorCount={doctorCount}
            clinicCount={clinicCount}
          />
        </div>

        <ServicesSection />

        <div style={{ marginTop: "40px" }}>
          <PopularClinics
            clinics={clinics}
            title="Toshkentdagi mashhur klinikalar va tibbiyot markazlari"
            customStyles={{
              grid: { gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" },
              card: {
                padding: "16px",
                backgroundColor: "#f8f9fa",
                borderRadius: "12px",
                maxHeight: "110px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "none",
              },
            }}
          />
        </div>

        <ClinicFilters />

        {promotions.length > 0 && (
          <div style={{ marginTop: 60, marginBottom: 20 }}>
            <h2>Aksiya va chegirmalar</h2>
            <PromotionsSwiper promotions={promotions} />
          </div>
        )}

        {commonServices.length > 0 && (
          <div
            style={{
              padding: "16px 0",
              marginTop: "60px",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              Keng tarqalgan tibbiy xizmatlar
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "16px 32px",
              }}
            >
              {commonServices.map((service: Service) => (
                <Link
                  key={service.id}
                  href={`/kliniki/${encodeURIComponent(service.name)}`}
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    borderBottom: "1px dashed #999",
                    width: "fit-content",
                  }}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {Object.keys(categorizedServices).length > 0 && (
          <div
            style={{
              padding: "16px 0",
              marginTop: "60px",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "30px",
              }}
            >
              Tekshiruv va diagnostika
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "32px",
              }}
            >
              {Object.entries(categorizedServices).map(
                ([category, services]) => (
                  <div key={category}>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "16px",
                        color: "#333",
                      }}
                    >
                      {category}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {services.slice(0, 5).map((service: Service) => (
                        <Link
                          key={service.id}
                          href={`/Diagnostika/${encodeURIComponent(
                            service.name
                          )}`}
                          style={{
                            color: "#0070f3",
                            textDecoration: "none",
                            borderBottom: "1px dashed #0070f3",
                            width: "fit-content",
                            fontSize: "16px",
                          }}
                        >
                          {service.name}
                        </Link>
                      ))}
                      {services.length > 5 && (
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "#666",
                            cursor: "pointer",
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            marginTop: "8px",
                          }}
                        ></button>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div
          style={{
            padding: "16px 0",
            marginTop: "60px",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "30px",
            }}
          >
            Davlat tibbiyot muassasalari
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px 32px",
            }}
          >
            {publicClinics.map((clinic: Clinic) => {
              const clinicSlug = clinic.name
                ? clinic.name
                    .toLowerCase()
                    .trim()
                    .replace(/[\u2019'`]/g, "")
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")
                : "";
              return (
                <Link
                  key={clinic.id}
                  href={`/klinika/${clinicSlug}`}
                  style={{
                    color: "#0070f3",
                    textDecoration: "none",
                    borderBottom: "1px dashed #0070f3",
                    width: "fit-content",
                    fontSize: "16px",
                    marginBottom: "16px",
                  }}
                >
                  {clinic.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div
          style={{
            padding: "16px 0",
            marginTop: "60px",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "30px",
            }}
          >
            Klinikalar mutaxassisliklari
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px 32px",
            }}
          >
            {doctorSpecialties.map((specialty) => (
              <Link
                key={specialty.id}
                href={`/Doctors?specialty=${encodeURIComponent(
                  specialty.name
                )}`}
                style={{
                  color: "#0070f3",
                  textDecoration: "none",
                  borderBottom: "1px dashed #0070f3",
                  width: "fit-content",
                  fontSize: "16px",
                  marginBottom: "16px",
                }}
              >
                {specialty.name}{" "}
                <span style={{ color: "#666", fontSize: "14px" }}>
                  ({specialty.count})
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: "16px 0",
            marginTop: "60px",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "30px",
            }}
          >
            Shifokorlar mutaxassisliklari
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px 32px",
            }}
          >
            {doctorSpecialties.map((specialty) => (
              <Link
                key={`doc-${specialty.id}`}
                href={`/shifokorlar?specialty=${encodeURIComponent(
                  specialty.name
                )}`}
                style={{
                  color: "#0070f3",
                  textDecoration: "none",
                  borderBottom: "1px dashed #0070f3",
                  width: "fit-content",
                  fontSize: "16px",
                  marginBottom: "16px",
                }}
              >
                {specialty.name}{" "}
                <span style={{ color: "#666", fontSize: "14px" }}>
                  ({specialty.count})
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: "16px 0",
            marginTop: "60px",
            marginBottom: "40px",
            maxWidth: "1400px",
            margin: "60px auto 40px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "40px",
            }}
          >
            So&apos;ngi sharhlar
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  background: "rgb(246 248 249)",
                  borderRadius: "16px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50px",
                      background: "#d1fae5",
                      color: "#065f46",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600",
                    }}
                  >
                    {getInitials(review.User?.name, review.User?.surname)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {review.User?.name} {review.User?.surname}
                    </div>
                    <div
                      style={{
                        color: "#6b7280",
                        fontSize: "12px",
                      }}
                    >
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                </div>
                <Stars value={review.rating} />
                <p
                  style={{
                    color: "#111827",
                    lineHeight: "1.6",
                  }}
                >
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        <UsefulArticles />

        <div className={pageStyles.clinicLogosSection}>
          <h2 className={pageStyles.sectionTitle}>
            Biz bilan - ishlaydigan klinikalar
          </h2>
          <div className={pageStyles.clinicLogosGrid}>
            {clinics.slice(0, 10).map((clinic: Clinic) => {
              const clinicSlug = clinic.name
                ? clinic.name
                    .toLowerCase()
                    .trim()
                    .replace(/[\u2019'`]/g, "")
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")
                : "";

              return (
                <Link
                  key={clinic.id}
                  href={`/klinika/${clinicSlug}`}
                  className={pageStyles.clinicLogoItem}
                >
                  <Image
                    src={clinic.logo_url || "/placeholder-logo.png"}
                    alt={clinic.name}
                    className={pageStyles.clinicLogo}
                    width={300}
                    height={200}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        <div className={pageStyles.pressSection}>
          <div className={pageStyles.header}>
            <h2 className={pageStyles.title}>Biz haqimizda</h2>
          </div>

          <div className={pageStyles.grid}>
            <a
              href="https://repost.uz/health/nervi-uje-ne-te"
              target="_blank"
              rel="noopener noreferrer"
              className={pageStyles.card}
            >
              <div className={pageStyles.imageContainer}>
                <Image
                  src="https://med24.uz/_ipx/f_webp&q_80/images/ef99a5769f4c3c70c465fd8179b4cf25.webp"
                  alt="Med24.uz - Toshkentdagi eng yaxshi klinikalar va shifokorlar"
                  className={pageStyles.image}
                  width={300}
                  height={200}
                />
              </div>
              <div className={pageStyles.content}>
                <span className={pageStyles.date}>2025-09-04</span>
                <h3 className={pageStyles.articleTitle}>
                  Med24.uz - Toshkentdagi eng yaxshi klinikalar va shifokorlar
                </h3>
              </div>
            </a>

            <a
              href="https://review.uz/post/vbiraem-gde-sdelat-mrt-v-tashkente"
              target="_blank"
              rel="noopener noreferrer"
              className={pageStyles.card}
            >
              <div className={pageStyles.imageContainer}>
                <Image
                  src="https://med24.uz/_ipx/f_webp&q_80/images/2679743ce9bb0db2957a2e93dcce7e8b.webp"
                  alt="Toshkentda MRT qayerda qilishni tanlaymiz"
                  className={pageStyles.image}
                  width={300}
                  height={200}
                />
              </div>
              <div className={pageStyles.content}>
                <span className={pageStyles.date}>2025-09-04</span>
                <h3 className={pageStyles.articleTitle}>
                  Toshkentda MRT qayerda qilishni tanlaymiz
                </h3>
              </div>
            </a>

            <a
              href="https://zarnews.uz/post/tibbiy-xizmat-kompyuterlashmoqda-zarur-shifokorlarni-topishning-oson-va-tez-usuli"
              target="_blank"
              rel="noopener noreferrer"
              className={pageStyles.card}
            >
              <div className={pageStyles.imageContainer}>
                <Image
                  src="https://med24.uz/_ipx/f_webp&q_80/images/73b83c83a355fc527bdd3f93692393bc.webp"
                  alt="Tibbiy xizmat kompyuterlashmoqda - zarur shifokorlarni topishning oson va tez usuli"
                  className={pageStyles.image}
                  width={300}
                  height={200}
                />
              </div>
              <div className={pageStyles.content}>
                <span className={pageStyles.date}>2025-09-04</span>
                <h3 className={pageStyles.articleTitle}>
                  Tibbiy xizmat kompyuterlashmoqda - zarur shifokorlarni
                  topishning oson va tez usuli
                </h3>
              </div>
            </a>

            <a
              href="https://www.thevista.ru/page30489-udobnyy_poisk_klinik_onlayn_s_pomoshchyu_kliniki24uz"
              target="_blank"
              rel="noopener noreferrer"
              className={pageStyles.card}
            >
              <div className={pageStyles.imageContainer}>
                <Image
                  src="https://med24.uz/_ipx/f_webp&q_80/images/c8f4c0d5ea0a33a8192be02a5ee73e59.webp"
                  alt="Qulay klinika qidiruvi onlayn - Med24.uz yordamida"
                  className={pageStyles.image}
                  width={300}
                  height={200}
                />
              </div>
              <div className={pageStyles.content}>
                <span className={pageStyles.date}>2025-09-04</span>
                <h3 className={pageStyles.articleTitle}>
                  Qulay klinika qidiruvi onlayn - Med24.uz yordamida
                </h3>
              </div>
            </a>
          </div>

          <div className={pageStyles.viewAllContainer}>
            <Link href="/press" className={pageStyles.viewAll}>
              Barchasini ko&apos;rish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
