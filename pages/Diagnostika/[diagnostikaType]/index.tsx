import { useRouter } from "next/router";
import React, { useMemo, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

// Components
import Breadcrumb from "@/components/Breadcrumb";
import ClinicCardSimple from "@/components/ClinicCardSimple";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import DoctorTypeCard from "@/components/DoctorTypeCard";

// API
import api from "@/lib/api";

// Types
interface Service {
  id: string;
  name: string;
  description?: string;
  category: string;
  image_url?: string;
}

interface Doctor {
  id?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  surname?: string;
  specialty?: string;
  specialtiesId?: string;
  image_url?: string;
  rating?: number;
  reviews_count?: number;
  reviews?: Array<{ id: string; rating?: number }>;
  education?: string;
  qualification?: string;
  title?: string;
  degree?: string;
  experience_years?: number;
  experience?: string;
  bio?: string;
  Specialties?: { id: string; name?: string } | null;
}

interface Clinic {
  id: string;
  name: string;
  type?: "PUBLIC" | "PRIVATE" | "VETERINARY";
  address: string;
  description?: string;
  logo_url: string;
  doctors?: Doctor[];
  opening_hours?: Record<string, string>;
  clinicservices?: ServiceEntry[];
}

interface ServiceEntry {
  id: string;
  price: string;
  duration_minutes: number;
  Services: {
    id: string;
    name: string;
  };
}

interface ClinicService {
  id: string;
  price: string;
  duration_minutes: number;
  clinicsId: string;
  servicesId: string;
  Clinics: Clinic;
  Services: {
    id: string;
    name: string;
  };
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  User?: {
    name?: string;
    surname?: string;
  };
}

interface District {
  slug: string;
  title: string;
}

interface DoctorSpecialty {
  name: string;
  image: string;
}

// Constants
const DISTRICTS: District[] = [
  { slug: "olmazor", title: "Olmazor tumani" },
  { slug: "bektemir", title: "Bektemir tumani" },
  { slug: "mirobod", title: "Mirobod tumani" },
  { slug: "mirzo-ulugbek", title: "Mirzo-Ulug'bek tumani" },
  { slug: "sergeli", title: "Sergeli tumani" },
  { slug: "uchtepa", title: "Uchtepa tumani" },
  { slug: "chilonzor", title: "Chilonzor tumani" },
  { slug: "shayxontohur", title: "Shayxontohur tumani" },
  { slug: "yunusobod", title: "Yunusobod tumani" },
  { slug: "yakkasaroy", title: "Yakkasaroy tumani" },
  { slug: "yangihayot", title: "Yangihayot tumani" },
  { slug: "yashnobod", title: "Yashnobod tumani" },
];

const DOCTOR_SPECIALTIES: DoctorSpecialty[] = [
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
];

// Utility functions
const getInitials = (name?: string, surname?: string): string => {
  const firstName = (name || "").trim();
  const lastName = (surname || "").trim();
  const first = firstName ? firstName[0] : "";
  const second = lastName
    ? lastName[0]
    : firstName.length > 1
    ? firstName[1]
    : "";
  return (first + second).toUpperCase();
};

const formatDate = (iso: string): string => {
  try {
    const date = new Date(iso);
    return date.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

// Stars component
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

// Latest Reviews Section Component
const LatestReviewsSection: React.FC = () => {
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: async (): Promise<Review[]> => {
      try {
        const { data } = await api.get("/reviews", {
          params: {
            include: "User,Clinics",
            limit: 50,
          },
        });
        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];
        return list
          .filter((r: Review) => typeof r.rating === "number")
          .sort(
            (a: Review, b: Review) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 6);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
      }
    },
  });

  return (
    <div style={{ marginTop: "40px", marginBottom: "40px" }}>
      <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "40px" }}>
        So&apos;nggi sharhlari
      </h3>
      {reviewsLoading && <p>Yuklanmoqda...</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {reviews?.map((review) => (
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: "600", color: "#111827" }}>
                  {review.User?.name} {review.User?.surname}
                </div>
                <div style={{ color: "#6b7280", fontSize: "12px" }}>
                  {formatDate(review.createdAt)}
                </div>
              </div>
            </div>
            <Stars value={review.rating} />
            <p style={{ color: "#111827", lineHeight: "1.6" }}>
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component
const DiagnostikaTypePage: React.FC = () => {
  const router = useRouter();
  const { diagnostikaType } = router.query;
  const decodedDiagnostikaName = diagnostikaType
    ? decodeURIComponent(diagnostikaType as string)
    : "";

  // State
  const [searchValue, setSearchValue] = useState("");
  const [district, setDistrict] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("none");

  // Event handlers
  const handleSearch = useCallback((value: string) => {
    console.log("Searching for:", value);
  }, []);

  // Queries
  const { data: services } = useQuery({
    queryKey: ["services-all"],
    queryFn: async (): Promise<Service[]> => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/services?limit=1000`
        );
        return res.data?.data as Service[];
      } catch (error) {
        console.error("Error fetching services:", error);
        return [];
      }
    },
  });

  const matchedService = useMemo(() => {
    if (!services || !diagnostikaType) return undefined;
    return services.find(
      (s) => s.name.toLowerCase() === decodedDiagnostikaName.toLowerCase()
    );
  }, [services, diagnostikaType, decodedDiagnostikaName]);

  const { data: clinicServices, isLoading } = useQuery({
    queryKey: ["clinicservices", { servicesId: matchedService?.id }],
    queryFn: async (): Promise<ClinicService[]> => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clinicservices?servicesId=${matchedService?.id}&limit=20&include=Clinics.description,Clinics.doctors,Clinics.opening_hours,Clinics.type`
        );
        return res.data?.data as ClinicService[];
      } catch (error) {
        console.error("Error fetching clinic services:", error);
        return [];
      }
    },
    enabled: Boolean(matchedService?.id),
  });

  // Computed values
  const clinics: Clinic[] = useMemo(() => {
    const source = Array.isArray(clinicServices) ? clinicServices : [];
    const byId = new Map<string, Clinic>();

    for (const cs of source) {
      const clinic = cs.Clinics;
      if (!clinic?.id) continue;

      const existing = byId.get(clinic.id);
      const serviceEntry: ServiceEntry = {
        id: cs.id,
        price: cs.price,
        duration_minutes: cs.duration_minutes,
        Services: { id: cs.Services?.id, name: cs.Services?.name },
      };

      if (!existing) {
        byId.set(clinic.id, {
          id: clinic.id,
          name: clinic.name,
          type: clinic.type,
          address: clinic.address,
          description: clinic.description,
          logo_url: clinic.logo_url,
          doctors: clinic.doctors,
          opening_hours: clinic.opening_hours,
          clinicservices: [serviceEntry],
        });
      } else {
        if (Array.isArray(existing.clinicservices)) {
          existing.clinicservices.push(serviceEntry);
        } else {
          existing.clinicservices = [serviceEntry];
        }

        if (clinic.description && !existing.description) {
          existing.description = clinic.description;
        }

        if (
          clinic.doctors &&
          (!existing.doctors || existing.doctors.length === 0)
        ) {
          existing.doctors = clinic.doctors;
        }

        if (clinic.opening_hours && !existing.opening_hours) {
          existing.opening_hours = clinic.opening_hours;
        }

        if (clinic.type && !existing.type) {
          existing.type = clinic.type;
        }
      }
    }

    return Array.from(byId.values());
  }, [clinicServices]);

  const uniqueDistricts = useMemo(() => {
    const set = new Set<string>();
    clinics.forEach((clinic) => {
      if (clinic?.address) {
        const addressParts = clinic.address.split(",");
        if (addressParts.length >= 2) {
          const district = addressParts[1].trim();
          set.add(district);
        }
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [clinics]);

  // Utility functions for clinic filtering
  const isOpen24x7 = useCallback((clinic: Clinic) => {
    const values = Object.values(clinic.opening_hours ?? {});
    return values.some((v) => /24\s*\/\s*7|24x7|24-7/i.test(String(v)));
  }, []);

  const isOpenOnDay = useCallback((clinic: Clinic, dayKey: string) => {
    const val = clinic.opening_hours?.[dayKey as keyof Clinic["opening_hours"]];
    if (!val) return false;
    if (/closed|yopiq/i.test(String(val))) return false;
    return true;
  }, []);

  const isOpenNow = useCallback(
    (clinic: Clinic) => {
      if (isOpen24x7(clinic)) return true;
      const now = new Date();
      const dayKey = now
        .toLocaleDateString("en-US", { weekday: "short" })
        .toLowerCase();
      const val =
        clinic.opening_hours?.[dayKey as keyof Clinic["opening_hours"]];
      if (!val) return false;
      if (/closed|yopiq/i.test(String(val))) return false;
      const match = String(val).match(
        /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
      );
      if (!match) return false;
      const [, startHour, startMinute, endHour, endMinute] = match.map((x) =>
        Number(x)
      );
      const start = new Date(now);
      start.setHours(startHour, startMinute, 0, 0);
      const end = new Date(now);
      end.setHours(endHour, endMinute, 0, 0);
      return now >= start && now <= end;
    },
    [isOpen24x7]
  );

  const filteredClinics: Clinic[] = useMemo(() => {
    let list: Clinic[] = clinics ?? [];

    if (district !== "all") {
      list = list.filter((clinic) => {
        if (clinic?.address) {
          const addressParts = clinic.address.split(",");
          if (addressParts.length >= 2) {
            const clinicDistrict = addressParts[1].trim();
            return clinicDistrict === district;
          }
        }
        return false;
      });
    }

    if (typeFilter !== "all") {
      list = list.filter(
        (clinic) => clinic.type === (typeFilter as Clinic["type"])
      );
    }

    switch (timeFilter) {
      case "TUESDAY":
        list = list.filter((clinic) => isOpenOnDay(clinic, "tue"));
        break;
      case "SUNDAY":
        list = list.filter((clinic) => isOpenOnDay(clinic, "sun"));
        break;
      case "OPEN_NOW":
        list = list.filter((clinic) => isOpenNow(clinic));
        break;
      case "TWENTY_FOUR_SEVEN":
        list = list.filter((clinic) => isOpen24x7(clinic));
        break;
      default:
        break;
    }

    return list;
  }, [
    clinics,
    district,
    typeFilter,
    timeFilter,
    isOpen24x7,
    isOpenOnDay,
    isOpenNow,
  ]);

  // Loading state
  if (!diagnostikaType || isLoading) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "1052px",
          margin: "0 auto",
          padding: "30px 0",
        }}
      >
        <Breadcrumb
          items={[
            { label: "Asosiy sahifa", href: "/" },
            { label: "Diagnostika", href: "/Diagnostika" },
            { label: "Yuklanmoqda..." },
          ]}
        />
        <div
          style={{
            width: "100%",
            maxWidth: "874px",
            margin: "0 auto",
          }}
        >
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  // Service not found state
  if (!matchedService && services) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "1052px",
          margin: "0 auto",
          padding: "30px 0",
        }}
      >
        <Breadcrumb
          items={[
            { label: "Asosiy sahifa", href: "/" },
            { label: "Diagnostika", href: "/Diagnostika" },
            { label: decodedDiagnostikaName },
          ]}
        />
        <div
          style={{
            width: "100%",
            maxWidth: "874px",
            margin: "0 auto",
          }}
        >
          <p>Xizmat topilmadi: {decodedDiagnostikaName}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1052px",
        margin: "0 auto",
        padding: "30px 0",
      }}
    >
      <Breadcrumb
        items={[
          { label: "Asosiy sahifa", href: "/" },
          { label: "Diagnostika", href: "/Diagnostika" },
          { label: matchedService?.name || decodedDiagnostikaName },
        ]}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "874px",
          margin: "0 auto",
        }}
      >
        {/* Search Section */}
        <div style={{ margin: "24px 0" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Input
              label="Shifokor ismi, mutaxassislik nomini yoki xizmat turini kiriting"
              width="100%"
              value={searchValue}
              onChange={setSearchValue}
              onSearch={handleSearch}
            />
            <Button
              name="Qidirish"
              variant="primary"
              padding="0 38px 0 38px"
              onClick={() => handleSearch(searchValue)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div style={{ marginTop: "24px", marginBottom: "24px" }}>
          {/* Page Title */}
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            {matchedService?.name || decodedDiagnostikaName} Toshkent
            bo&apos;yicha
            <span style={{ color: "#6b7280", fontSize: 16 }}>
              {filteredClinics.length} Klinikalar
            </span>
          </h1>

          {/* Filters */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                background: "#f9fafb",
                color: "#374151",
              }}
            >
              <option value="all">Tuman (hammasi)</option>
              {uniqueDistricts.map((districtName) => (
                <option key={districtName} value={districtName}>
                  {districtName}
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
              <option value="all">Tibbiy muassasa turi (hammasi)</option>
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
              <option value="none">Ish vaqti (hammasi)</option>
              <option value="TUESDAY">Seshanba</option>
              <option value="SUNDAY">Yakshanba</option>
              <option value="OPEN_NOW">Hozir ochiq</option>
              <option value="TWENTY_FOUR_SEVEN">24/7 ishlaydi</option>
            </select>
          </div>

          {/* Clinics List */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {filteredClinics.length > 0 ? (
              filteredClinics.map((clinic) => (
                <ClinicCardSimple key={clinic.id} clinic={clinic} />
              ))
            ) : (
              <p>Bu xizmatni taqdim etadigan klinikalar topilmadi.</p>
            )}
          </div>

          {/* Districts Section */}
          <div style={{ marginTop: "40px", marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              {matchedService?.name || decodedDiagnostikaName} Toshkent
              shahridagi klinikalar
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "16px 32px",
              }}
            >
              {DISTRICTS.map((districtItem) => (
                <Link
                  key={districtItem.slug}
                  href={`/Diagnostika/${encodeURIComponent(
                    matchedService?.name || decodedDiagnostikaName
                  )}?district=${districtItem.slug}`}
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    borderBottom: "1px dashed #999",
                    width: "fit-content",
                  }}
                >
                  {districtItem.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Latest Reviews Section */}
          <LatestReviewsSection />

          {/* Doctor Specialties Section */}
          <div style={{ marginTop: "80px", marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#333",
                marginBottom: "20px",
              }}
            >
              Shifokorlarning keng tarqalgan mutaxassisliklari
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                alignItems: "stretch",
                maxWidth: "100%",
              }}
            >
              {DOCTOR_SPECIALTIES.map((specialty, index) => (
                <DoctorTypeCard
                  key={specialty.name}
                  name={specialty.name}
                  image={specialty.image}
                  style={index === 0 ? { gridColumn: "span 2" } : undefined}
                />
              ))}
            </div>
          </div>

          {/* Common Medical Services Section */}
          <div style={{ marginTop: "80px", marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#333",
                marginBottom: "20px",
              }}
            >
              Keng tarqalgan tibbiy xizmatlar
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "16px 32px",
              }}
            >
              {services?.map((service) => (
                <Link
                  key={service.id}
                  href={`/uslugi/${encodeURIComponent(service.name)}`}
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
        </div>
      </div>
    </div>
  );
};

export default DiagnostikaTypePage;
