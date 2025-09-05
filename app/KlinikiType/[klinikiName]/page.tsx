"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import styles from "../KlinikiType.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import ClinicCard from "@/components/ClinicCard";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import AskTelegram from "@/app/Kliniki/AskTelegram";
import Districts from "@/app/Kliniki/Districts";
import type { Clinic } from "@/components/ClinicCard";

interface ServiceNamePageProps {
  params: Promise<{
    klinikiName: string;
  }>;
}

const ServiceNamePage: React.FC<ServiceNamePageProps> = ({ params }) => {
  const { klinikiName } = React.use(params);
  const decodedServiceName = decodeURIComponent(klinikiName);

  const [district, setDistrict] = React.useState<string>("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [timeFilter, setTimeFilter] = React.useState<string>("none");

  const { data: allClinics, isLoading } = useQuery({
    queryKey: ["clinics-by-service", klinikiName],
    queryFn: async () => {
      const include = [
        "Region",
        "doctors.Specialties",
        "clinicservices.Services",
        "reviews",
      ].join(",");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/clinics?include=${include}&limit=1000`
      );

      // Filter clinics that have the specific service
      const clinics = res.data?.data ?? [];
      return clinics.filter((clinic: Clinic) => {
        return clinic.clinicservices?.some((service) =>
          service.Services?.name
            ?.toLowerCase()
            .includes(decodedServiceName.toLowerCase())
        );
      });
    },
  });

  const uniqueDistricts = React.useMemo(() => {
    const set = new Set<string>();
    (allClinics as Clinic[] | undefined)?.forEach((c) => {
      if (c?.address) {
        const addressParts = c.address.split(",");
        if (addressParts.length >= 2) {
          const district = addressParts[1].trim();
          set.add(district);
        }
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [allClinics]);

  const isOpen24x7 = React.useCallback((c: Clinic) => {
    const values = Object.values(c.opening_hours ?? {});
    return values.some((v) => /24\s*\/\s*7|24x7|24-7/i.test(String(v)));
  }, []);

  const isOpenOnDay = React.useCallback((c: Clinic, dayKey: string) => {
    const val = c.opening_hours?.[dayKey as keyof Clinic["opening_hours"]];
    if (!val) return false;
    if (/closed|yopiq/i.test(String(val))) return false;
    return true;
  }, []);

  const isOpenNow = React.useCallback(
    (c: Clinic) => {
      if (isOpen24x7(c)) return true;
      const now = new Date();
      const dayKey = now
        .toLocaleDateString("en-US", { weekday: "short" })
        .toLowerCase();
      const val = c.opening_hours?.[dayKey as keyof Clinic["opening_hours"]];
      if (!val) return false;
      if (/closed|yopiq/i.test(String(val))) return false;
      const match = String(val).match(
        /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
      );
      if (!match) return false;
      const [, sh, sm, eh, em] = match.map((x) => Number(x));
      const start = new Date(now);
      start.setHours(sh, sm, 0, 0);
      const end = new Date(now);
      end.setHours(eh, em, 0, 0);
      return now >= start && now <= end;
    },
    [isOpen24x7]
  );

  const filteredClinics: Clinic[] = React.useMemo(() => {
    let list: Clinic[] = (allClinics as Clinic[]) ?? [];
    if (district !== "all") {
      list = list.filter((c) => {
        if (c?.address) {
          const addressParts = c.address.split(",");
          if (addressParts.length >= 2) {
            const clinicDistrict = addressParts[1].trim();
            return clinicDistrict === district;
          }
        }
        return false;
      });
    }
    if (typeFilter !== "all") {
      list = list.filter((c) => c.type === (typeFilter as Clinic["type"]));
    }
    switch (timeFilter) {
      case "TUESDAY":
        list = list.filter((c) => isOpenOnDay(c, "tue"));
        break;
      case "SUNDAY":
        list = list.filter((c) => isOpenOnDay(c, "sun"));
        break;
      case "OPEN_NOW":
        list = list.filter((c) => isOpenNow(c));
        break;
      case "TWENTY_FOUR_SEVEN":
        list = list.filter((c) => isOpen24x7(c));
        break;
      default:
        break;
    }
    return list;
  }, [
    allClinics,
    district,
    typeFilter,
    timeFilter,
    isOpen24x7,
    isOpenOnDay,
    isOpenNow,
  ]);

  const breadcrumbItems = [
    { label: "Asosiy sahifa", href: "/" },
    { label: "Klinikalar", href: "/Kliniki" },
    { label: decodedServiceName },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbContainer}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className={styles.miniContainer}>
        <div className={styles["search-section"]}>
          <div className={styles["input-container"]}>
            <Input
              label="Shifokor ismi, mutaxassislik nomini yoki xizmat turini kiriting"
              width="100%"
            />
            <Button name="Qidirish" variant="primary" padding="0 38px 0 38px" />
          </div>
        </div>

        {Array.isArray(allClinics) && allClinics.length ? (
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <h1
                className={styles["main-title"]}
                style={{ display: "flex", alignItems: "baseline", gap: 8 }}
              >
                {decodedServiceName} Toshkentda
                <span style={{ color: "#6b7280", fontSize: 14 }}>
                  {filteredClinics.length} Klinikalar
                </span>
              </h1>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={isLoading}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    background: isLoading ? "#f3f4f6" : "#f9fafb",
                    color: "#374151",
                    cursor: isLoading ? "wait" : "pointer",
                  }}
                >
                  <option value="all">
                    {isLoading ? "Yuklanmoqda..." : "Tuman"}
                  </option>
                  {uniqueDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    background: "#f9fafb",
                    color: "#374151",
                  }}
                >
                  <option value="all">Tibbiy muassasa turi</option>
                  <option value="PUBLIC">Davlat</option>
                  <option value="PRIVATE">Xususiy</option>
                </select>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    background: "#f9fafb",
                    color: "#374151",
                  }}
                >
                  <option value="none">Ish vaqti</option>
                  <option value="TUESDAY">Seshanba</option>
                  <option value="SUNDAY">Yakshanba</option>
                  <option value="OPEN_NOW">Hozir ochiq</option>
                  <option value="TWENTY_FOUR_SEVEN">24/7 ishlaydi</option>
                </select>
              </div>
            </div>
            <div
              style={{
                maxWidth: 874,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {filteredClinics.map((c: Clinic) => (
                <ClinicCard
                  key={c.id}
                  clinic={c}
                  filterService={decodedServiceName}
                />
              ))}
            </div>
            <AskTelegram />
          </div>
        ) : isLoading ? (
          <div className={styles.loading}>
            <p>Klinikalar yuklanmoqda...</p>
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>Bu xizmat bo&apos;yicha klinikalar topilmadi.</p>
          </div>
        )}

        <Districts serviceName={decodedServiceName} />

        <div style={{ marginTop: 24, marginBottom: 24 }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#333",
              marginBottom: "20px",
            }}
          >
            Shuningdek sizga qiziq bo&apos;lish mumkin
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px 32px",
            }}
          >
            {[
              "Oositga sperma yuborish",
              "Spermatozoidlarni konservatsiya qilish",
              "Embrionni qayta ekish",
              "IKSI muolajasi",
              "Embrionlarning kriyoprezervatsiyasi",
              "Superovulyatsiyani stimulyatsiya qilish",
              "IKSI+PIKSI",
              "Oosit kryoprezervatsiyasi",
              "Standart EKO",
              "Sun'iy urug'lantirish",
              "Lazerli xetching",
            ].map((service) => (
              <Link
                key={service}
                href={`/Kliniki/${encodeURIComponent(service)}`}
                style={{
                  color: "#000",
                  textDecoration: "none",
                  borderBottom: "1px dashed #999",
                  width: "fit-content",
                  paddingBottom: "4px",
                }}
              >
                {service}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceNamePage;
