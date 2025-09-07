"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components";
import { Typography } from "@/app/Doctors/components";
import { getAllDoctors } from "@/api/doctors/doctors.api";
import api from "@/lib/api";
import styles from "./SpecialtyPage.module.css"; 

interface Speciality {
  id: string;
  name: string;
}

interface Doctor {
  id: string;
  name: string;
  surname: string;
  image?: string; // Rasm URL
  specialties?: string[]; // Mutaxassisliklar massivi
  rating?: number; // Reyting (1-5)
  experience?: number; // Tajriba yillari
  category?: string; // Kategoriya
  clinic?: string; // Klinika nomi
  address?: string; // Manzil
  schedule?: string; // Ish vaqti
  price?: string; // Narx
  additionalSpecialties?: string[]; // Qo'shimcha mutaxassisliklar
  Specialities?: Speciality; // Legacy
  Specialties?: Speciality; // Current
}

const SpecialtyPage: React.FC = () => {
  const params = useParams<{ name: string }>();
  const specialtyName = decodeURIComponent(params.name || "");

  const toSlug = (value: string) =>
    (value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  // extractSpecialtyNames funksiyasi
  const extractSpecialtyNames = (d: any): string[] => {
    const names: string[] = [];
    if (Array.isArray(d?.Specialities)) {
      d.Specialities.forEach((s: any) => {
        if (s?.name) names.push(String(s.name));
      });
    } else if (d?.Specialities && typeof d.Specialities === "object") {
      if (d.Specialities.name) names.push(String(d.Specialities.name));
    }
    if (Array.isArray(d?.Specialties)) {
      d.Specialties.forEach((s: any) => {
        if (s?.name) names.push(String(s.name));
      });
    } else if (d?.Specialties && typeof d.Specialties === "object") {
      if (d.Specialties.name) names.push(String(d.Specialties.name));
    }
    if (typeof d?.speciality === "string") names.push(d.speciality);
    if (typeof d?.specialization === "string") names.push(d.specialization);
    if (Array.isArray(d?.specialties)) {
      d.specialties.forEach((s: string) => names.push(s));
    }
    return names;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [doctorsRes, specsRes] = await Promise.all([
          getAllDoctors(),
          api.get("/specialties"),
        ]);

        const all: Doctor[] = Array.isArray(doctorsRes.data) ? doctorsRes.data : [];
        const specialtiesList: Array<{ id: string; name: string; doctors?: any[] }> = Array.isArray(specsRes.data?.data)
          ? specsRes.data.data
          : [];
        const target = toSlug(specialtyName);
        console.log("[SpecialtyPage] route param:", specialtyName, "target slug:", target);

        const slugToSpec = specialtiesList.map((s) => ({ ...s, slug: toSlug(s.name) }));
        const matchedSpec =
          slugToSpec.find((s) => s.slug === target) ||
          slugToSpec.find((s) => s.slug.includes(target) || target.includes(s.slug));
        console.log("[SpecialtyPage] matched specialty:", matchedSpec);

        let filtered: Doctor[] = [];
        if (matchedSpec && Array.isArray((matchedSpec as any).doctors)) {
          const specDoctors: any[] = (matchedSpec as any).doctors;
          const idSet = new Set(
            specDoctors
              .map((d: any) => d?.id || d?.doctorId)
              .filter((v: any) => typeof v === "string")
          );
          filtered = all.filter((d: any) => idSet.has(d.id));
          console.log("[SpecialtyPage] filtered by specialties.doctors IDs:", idSet.size, filtered.length);
        }

        if (!filtered.length) {
          filtered = all.filter(
            (d: any) =>
              d?.Specialties?.id === matchedSpec.id ||
              d?.Specialities?.id === matchedSpec.id
          );
        }

        if (!filtered.length) {
          filtered = all.filter((d: any) => d?.specialtiesId === matchedSpec.id);
        }

        if (!filtered.length) {
          const matchesTarget = (names: string[]): boolean => {
            const slugs = names.map((n) => toSlug(n));
            return slugs.some((s) => s === target || s.includes(target) || target.includes(s));
          };
          filtered = all.filter((d) => matchesTarget(extractSpecialtyNames(d)));
        }

        // Vaqtinchalik yechim: matchedSpec.doctors dan foydalanish (agar kerak bo'lsa, ma'lumotlar to'ldirilgan)
        if (!filtered.length && matchedSpec && Array.isArray((matchedSpec as any).doctors)) {
          const specDoctors = (matchedSpec as any).doctors;
          filtered = specDoctors.map((doc: any) => ({
            id: doc.id || doc.doctorId || "",
            name: doc.name || "Noma'lum",
            surname: doc.surname || "",
            specialties: [matchedSpec.name], // Mutaxassislik qo'shish
            rating: doc.rating || 5.0,
            experience: doc.experience || 10,
            category: doc.category || "Oliy kategoriya",
            clinic: doc.clinic || "M-Clinic",
            address: doc.address || "Toshkent, Yunusobod",
            schedule: doc.schedule || "Dush-Pay 08:00-18:00",
            price: doc.price || "300 000 so'm",
            image: doc.image || "/default-doctor.jpg", // Default rasm
          }));
        }

        setDoctors(filtered);
      } catch (error) {
        console.error("[SpecialtyPage] Xato:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [specialtyName]);

  // Reyting yulduzchalarini render qilish funksiyasi
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={styles.star} style={{ color: i <= rating ? '#FFD700' : '#ccc' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <div>
        <Breadcrumb
          items={[
            { label: "Bosh sahifa", href: "/" },
            { label: "Shifokorlar", href: "/Doctors" },
            { label: specialtyName },
          ]}
        />
      </div>
      <Typography size="28" weight="600" bottom="20">
        {specialtyName} mutaxassislari
      </Typography>
      {loading ? (
        <p className={styles.loading}>Yuklanmoqda...</p>
      ) : doctors.length === 0 ? (
        <p className={styles.noDoctors}>Shifokor topilmadi. Konsol loglarini tekshiring.</p>
      ) : (
        <div className={styles.doctorsGrid}>
          {doctors.map((doctor) => {
            const fullName = `${(doctor.name || "").trim()} ${(doctor.surname || "").trim()}`;
            const mainSpecialty = doctor.specialties?.[0] || specialtyName;
            const additionalSpecs = doctor.additionalSpecialties?.join(', ') || '';

            return (
              <Link key={doctor.id} href={`/Doctors/${doctor.id}`} className={styles.doctorCard}>
                <div className={styles.cardImage}>
                  <img src={doctor.image || "/default-doctor.jpg"} alt={fullName} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.doctorName}>{fullName}</h3>
                  <p className={styles.specialty}>{mainSpecialty}</p>
                  {additionalSpecs && <p className={styles.additionalSpecs}>{additionalSpecs}</p>}
                  <div className={styles.rating}>
                    {renderStars(doctor.rating || 5)}
                    <span className={styles.ratingText}>({doctor.rating || 5}.0)</span>
                  </div>
                  <p className={styles.experience}>Tajriba: {doctor.experience || 10} yil</p>
                  <p className={styles.category}>{doctor.category || "Oliy kategoriya"}</p>
                  <p className={styles.clinic}>Klinika: {doctor.clinic || "M-Clinic"}</p>
                  <p className={styles.address}>{doctor.address || "Toshkent"}</p>
                  <p className={styles.schedule}>Ish vaqti: {doctor.schedule || "Dush-Pay 08:00-18:00"}</p>
                  <p className={styles.price}>Narx: {doctor.price || "300 000 so'm"}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SpecialtyPage;