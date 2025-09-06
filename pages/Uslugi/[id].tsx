import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import Image from "next/image";
import { getServiceById } from "@/api/services/services.api";
import { getAllClinics } from "@/api/clinics/clinics.api";
import { Button, Input, Typography } from "@/app/Doctors/components";
import styles from "./id.module.css";
import { Breadcrumb, ClinicCard } from "@/components";
import Link from "next/link";
import CommentsList from "@/app/Doctors/sections/comments";
import { href } from "react-router";

interface ClinicService {
  id: string;
  price?: string | number;
  duration_minutes?: number;
  clinicsId: string;
  servicesId: string;
  createdAt: string;
  Services?: { id: string; name: string };
}

interface Clinic {
  id: string;
  name: string;
  type?: "PUBLIC" | "PRIVATE" | "VETERINARY";
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  opening_hours?: Record<string, string>;
  logo_url?: string;
  rating?: string | number;
  Region?: { id: string; name: string } | null;
  promotions?: Array<{ id: string; title: string; discount_percent?: number }>;
  clinicservices?: Array<ClinicService>;
  doctors?: Array<{
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
  }>;
  reviews?: Array<{ id: string; rating?: number }>;
  email?: string;
  image_url?: string | null;
  yandex_map_url?: string | null;
  regionId?: string;
  createdAt?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url?: string;
  createdAt: string;
}

const ServiceDetail: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [service, setService] = useState<Service | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [districtFilter, setDistrictFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [hoursFilter, setHoursFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const districts = [
    { value: "all", label: "Tuman" },
    { value: "Olmazor", label: "Olmazor" },
    { value: "Chilanzor", label: "Chilanzor" },
    { value: "Yunusobod", label: "Yunusobod" },
    { value: "Mirzo Ulug‘bek", label: "Mirzo Ulug‘bek" },
    { value: "Sergeli", label: "Sergeli" },
    // Qo‘shimcha tumanlarni qo‘shishingiz mumkin
  ];

  // Tibbiyot muassasa turlari
  const types = [
    { value: "all", label: "Tibbiyot muassaasa turi" },
    { value: "VETERINARY", label: "Veterinariya klinikasi" },
    { value: "PUBLIC", label: "Davlat tibbiyot muassasalari" },
    { value: "PRIVATE", label: "Xususiy klinikalar" },
  ];

  // Ish vaqti filtrlari
  const hoursOptions = [
    { value: "all", label: "Barcha ish vaqtlari" },
    { value: "tue", label: "Seshanba" },
    { value: "sun", label: "Yakshanba" },
    { value: "open-now", label: "Hozir ochiq" },
    { value: "24/7", label: "24/7" },
  ];

  // Hozirgi vaqtni aniqlash uchun funksiya
  const isClinicOpenNow = (openingHours?: Record<string, string>) => {
    if (!openingHours) return false;
    const now = new Date();
    const day = now.toLocaleString("en", { weekday: "short" }).toLowerCase();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const hours = openingHours[day as keyof typeof openingHours];
    if (
      !hours ||
      hours === "Dam olish kuni" ||
      hours.toLowerCase().includes("closed")
    )
      return false;
    if (hours.toLowerCase().includes("24/7")) return true;

    try {
      const [open, close] = hours.split("-").map((time) => {
        const [hours, minutes] = time.trim().split(":").map(Number);
        return hours * 60 + (minutes || 0);
      });
      return currentTime >= open && currentTime <= close;
    } catch {
      return false;
    }
  };

  const isClinic24_7 = (openingHours?: Record<string, string>) => {
    if (!openingHours) return false;
    return Object.values(openingHours).some((hours) =>
      /24\s*\/\s*7|24x7|24-7|00:00-23:59|00:00-00:00/i.test(hours)
    );
  };

  useEffect(() => {
    if (!id) {
      setError("Xizmat ID’si topilmadi");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const serviceData = await getServiceById(id);
        const service = serviceData.data;
        if (!service) {
          setError("Xizmat topilmadi");
          setLoading(false);
          return;
        }

        setService(service);

        const clinicsData = await getAllClinics();
        const filteredClinics = clinicsData.data.filter((clinic: Clinic) => {
          if (!clinic.clinicservices || !Array.isArray(clinic.clinicservices)) {
            return false;
          }
          return clinic.clinicservices.some((cs) => cs.servicesId === id);
        });

        setClinics(filteredClinics);
        setFilteredClinics(filteredClinics);
      } catch (err) {
        setError("Ma'lumotlarni olishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const applyFilters = () => {
      let result = [...clinics];

      if (districtFilter !== "all") {
        result = result.filter((clinic) =>
          clinic.address?.toLowerCase().includes(districtFilter.toLowerCase())
        );
      }

      if (typeFilter !== "all") {
        result = result.filter((clinic) => clinic.type === typeFilter);
      }

      if (hoursFilter !== "all") {
        result = result.filter((clinic) => {
          if (hoursFilter === "open-now") {
            return isClinicOpenNow(clinic.opening_hours);
          } else if (hoursFilter === "24/7") {
            return isClinic24_7(clinic.opening_hours);
          } else {
            const hours =
              clinic.opening_hours?.[
                hoursFilter as keyof Record<string, string>
              ];
            return hours && hours !== "Dam olish kuni";
          }
        });
      }

      if (searchQuery) {
        result = result.filter((clinic) =>
          clinic.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredClinics(result);
    };

    applyFilters();
  }, [districtFilter, typeFilter, hoursFilter, clinics, searchQuery]);

  if (loading) return <p>Yuklanmoqda...</p>;

  if (error)
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{error}</p>
        <Button>Qayta urinish</Button>
      </div>
    );

  if (!service) return <p>Xizmat topilmadi</p>;

  return (
    <div className={styles.Container}>
      <Breadcrumb
        items={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Uslugi", href: "/uslugi" },
          { label: `${service.name}`, href: `/${service.id}` },
        ]}
      />
      <div className={styles.searchSection}>
        <Input inputPlaceholder="Shifokor ismi, mutaxassislik nomini yoki dori-darmon kiriting" />
        <Button>Qidirish</Button>
      </div>
      <div className={styles.headerSection}>
        <Typography size="26" weight="600">
          {service.name} Toshkentda
        </Typography>
        <p className={styles.headerText}>{filteredClinics.length} klinikalar</p>
      </div>

      <div className={styles.selectionsContainer}>
        <div>
          <select
            id="district"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className={styles.selectOptions}
            aria-label="Tuman bo'yicha filtr"
          >
            {districts.map((district) => (
              <option key={district.value} value={district.value}>
                {district.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={styles.selectOptions}
            aria-label="Klinika turi bo'yicha filtr"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="hours"
            value={hoursFilter}
            onChange={(e) => setHoursFilter(e.target.value)}
            className={styles.selectOptions}
            aria-label="Ish vaqti bo'yicha filtr"
          >
            {hoursOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredClinics.length === 0 ? (
        <p>Bu xizmatga tegishli klinikalar topilmadi</p>
      ) : (
        <ul className={styles.clinicsContainer}>
          {filteredClinics.map((clinic) => (
            <ClinicCard
              key={clinic.id}
              clinic={clinic}
              filterService={service.name}
            />
          ))}
        </ul>
      )}
      <div>
        <Typography size="26" weight="500" bottom="18">
          {service.name} Toshkent bo`yicha
        </Typography>
        <div className={styles.districtsBlock}>
          {districts.map((district) => (
            <Link
              href={`/${service.id}/${district.label}`}
              key={district.value}
              className={styles.link}
            >
              {service.name} {district.label} tumanida
            </Link>
          ))}
        </div>
      </div>

      <div>
        <Typography size="26" weight="500" bottom="18" top="80">
          So`ngi sharhlar
        </Typography>
        <CommentsList />
      </div>
    </div>
  );
};

export default ServiceDetail;
