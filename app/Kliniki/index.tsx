import React from "react";
import styles from "./Kliniki.module.css";
import RecomendedKliniki from "./RecomendedKliniki";
import RecomendedTypes from "./RecomendedTypes";
import LatestReviews from "./LatestReviews";
import AskTelegram from "./AskTelegram";
import Districts from "./Districts";
import CommonServices from "./CommonServices";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumb";
import ClinicsSwiper from "@/components/ClinicsSwiper";
import PromotionsSwiper from "@/components/PromotionsSwiper";
import ClinicCard from "@/components/ClinicCard";
import DoctorTypeCard from "@/components/DoctorTypeCard";
import type { Clinic } from "@/components/ClinicCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Kliniki: React.FC = () => {
  const { data: clinics } = useQuery({
    queryKey: ["clinics-popular"],
    queryFn: async () => {
      const include = [
        "Region",
        "doctors.Specialties",
        "clinicservices.Services",
        "reviews",
      ].join(",");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/clinics?include=${include}&limit=20`
      );
      return res.data?.data ?? [];
    },
  });

  const { data: promotions } = useQuery({
    queryKey: ["promotions-list"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/promotions?limit=12`
      );
      return res.data?.data ?? [];
    },
  });

  const { data: allClinics, isLoading: clinicsLoading } = useQuery({
    queryKey: ["clinics-total-count"],
    queryFn: async () => {
      const include = ["Region"].join(",");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/clinics?include=${include}&limit=1000`
      );
      return res.data?.data ?? [];
    },
  });

  const [district, setDistrict] = React.useState<string>("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [timeFilter, setTimeFilter] = React.useState<string>("none");

  const uniqueDistricts = React.useMemo(() => {
    console.log("All clinics data:", allClinics);

    const set = new Set<string>();
    (allClinics as Clinic[] | undefined)?.forEach((c) => {
      if (c?.address) {
        const addressParts = c.address.split(",");
        if (addressParts.length >= 2) {
          const district = addressParts[1].trim();
          console.log("Found district from address:", district);
          set.add(district);
        }
      }
    });
    const result = Array.from(set).sort((a, b) => a.localeCompare(b));
    console.log("Extracted districts from addresses:", result);
    return result;
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

  return (
    <div className="container">
      <Breadcrumb
        items={[{ label: "Asosiy sahifa", href: "/" }, { label: "Klinikalar" }]}
      />

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

        {clinics?.length ? (
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <ClinicsSwiper title="Mashhur klinikalar" clinics={clinics} />
          </div>
        ) : null}

        {promotions?.length ? (
          <div style={{ marginTop: 8, marginBottom: 24 }}>
            <PromotionsSwiper
              title="Aksiya va chegirmalar"
              promotions={promotions}
            />
          </div>
        ) : null}

        <RecomendedKliniki />
        <RecomendedTypes />
        <LatestReviews />

        <div
          style={{ backgroundColor: "rgb(229 231 235/var(--tw-bg-opacity))" }}
        >
          {Array.isArray(allClinics) && allClinics.length ? (
            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <h1
                  className={styles["main-title"]}
                  style={{ display: "flex", alignItems: "baseline", gap: 8 }}
                >
                  Toshkentdagi klinikalar va tibbiyot markazlari
                  <span style={{ color: "#6b7280", fontSize: 14 }}>
                    {filteredClinics.length} Klinikalar
                  </span>
                </h1>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={clinicsLoading}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 12,
                      border: "1px solid #e5e7eb",
                      background: clinicsLoading ? "#f3f4f6" : "#f9fafb",
                      color: "#374151",
                      cursor: clinicsLoading ? "wait" : "pointer",
                    }}
                  >
                    <option value="all">
                      {clinicsLoading ? "Yuklanmoqda..." : "Tuman"}
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
                    <option value="VETERINARY">Veterinariya</option>
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
                  <ClinicCard key={c.id} clinic={c} />
                ))}
              </div>
            </div>
          ) : null}
          <AskTelegram />
        </div>
        <Districts />

        <div style={{ marginTop: 24, marginBottom: 24 }}>
          <h2
            style={{
              marginTop: 100,
              fontSize: "24px",
              fontWeight: "700",
              color: "#333",
            }}
          >
            Shifokorlarning keng tarqalgan mutaxassisliklari
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 20,
              alignItems: "stretch",
              maxWidth: "100%",
            }}
          >
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
              <DoctorTypeCard
                key={item.name}
                name={item.name}
                image={item.image}
                style={index === 0 ? { gridColumn: "span 2" } : undefined}
              />
            ))}
          </div>
        </div>
        <CommonServices />
      </div>
    </div>
  );
};

export default Kliniki;
