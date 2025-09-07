import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDoctorById, getAllDoctors } from "@/api/doctors/doctors.api";
import { getAllRegions } from "@/api/regions/regions.api";
import styles from "./doctorDetail.module.css";
import { Typography } from "@/app/Doctors/components";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components";

interface Speciality {
  id: string;
  name: string;
}

interface Doctor {
  id: string;
  name: string;
  surname: string;
  bio: string;
  experience_years: number;
  rating: string;
  image_url: string;
  clinicsId: string;
  Specialities: Speciality;
  reviews: string[];
  appointments: string[];
}

interface Clinic {
  id: string;
  name: string;
  address: string;
  type: string;
  phone?: string;
  working_hours?: string[];
  appointment_duration_minutes?: number;
}

interface Region {
  id: string;
  name: string;
  clinics: Clinic[];
}

const DoctorDetail: React.FC = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : (router.query.id as string | undefined);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [relatedDoctors, setRelatedDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Shifokor ID’si topilmadi");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const doctorData = await getDoctorById(id);
        const doctor = doctorData.data;
        if (!doctor) {
          setError("Shifokor topilmadi");
          setLoading(false);
          return;
        }

        setDoctor(doctor);

        const regionsData = await getAllRegions();
        const regions = Array.isArray(regionsData.data) ? regionsData.data : [];
        const clinic = regions
          .flatMap((region: Region) => region.clinics)
          .find((c: Clinic) => c.id === doctor.clinicsId);
        setClinic(clinic || null);

        // Related doctors: same speciality if possible, else any others
        const allDoctorsRes = await getAllDoctors();
        const allDoctors: Doctor[] = Array.isArray(allDoctorsRes.data)
          ? allDoctorsRes.data
          : [];
        const sameSpec = allDoctors
          .filter((d) => d.id !== doctor.id)
          .filter(
            (d) => d.Specialities?.name && d.Specialities?.name === doctor.Specialities?.name
          );
        const fallback = allDoctors.filter((d) => d.id !== doctor.id);
        setRelatedDoctors((sameSpec.length ? sameSpec : fallback).slice(0, 12));
      } catch (error) {
        setError("Ma'lumotlarni olishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Yuklanmoqda...</p>;

  if (error)
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Qayta urinish
        </button>
      </div>
    );

  if (!doctor)
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Shifokor topilmadi</p>
        <a href="/doctors" className={styles.retryButton}>
          Shifokorlar ro‘yxatiga qaytish
        </a>
      </div>
    );

  return (
    <div className={styles.container}>
      <div>
        <Breadcrumb
          items={[
            { label: "Bosh sahifa", href: "/" },
            { label: "Shifokorlar", href: "/Doctors" },
            { label: `${(doctor.name || "").trim()} ${(doctor.surname || "").trim()}` },
          ]}
        />
      </div>
      <Typography size="28" weight="600" bottom="20">
        {(doctor.name || "").trim()} {(doctor.surname || "").trim()}
      </Typography>
      <div className={styles.doctorDetails}>
        <div className={styles.doctorImageWrapper}>
          {doctor.image_url ? (
            <Image
              src={doctor.image_url}
              alt={`${doctor.name || "Shifokor"} ${doctor.surname || ""}`}
              className={styles.doctorImage}
              width={200}
              height={200}
            />
          ) : (
            <div
              className={styles.avatarFallback}
              aria-label={`${(doctor.name || "").trim()} ${(doctor.surname || "").trim()}`}
              role="img"
            >
              {`${(doctor.name?.[0] || "D").toUpperCase()}${(doctor.surname?.[0] || "").toUpperCase()}`}
            </div>
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.metaRow}>
            <span className={styles.label}>Mutaxassislik:</span>
            <span className={styles.badge}>
              {doctor.Specialities?.name || "Ma'lum emas"}
            </span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.label}>Tajriba:</span>
            <span>{doctor.experience_years || 0} yil</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.label}>Reyting:</span>
            <span className={styles.ratingValue}>{doctor.rating || "-"}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.label}>Bio:</span>
            <span>{doctor.bio || "Ma'lumot yo'q"}</span>
          </div>
          {clinic && (
            <p>
              <strong>Klinika:</strong> {clinic.name}, {clinic.address}
            </p>
          )}
          <p className={styles.reviewsMeta}>
            <strong>Sharhlar soni:</strong> {doctor.reviews?.length || 0}
          </p>
          {(doctor.reviews?.length || 0) > 0 && (
            <div className={styles.reviews}>
              <Typography size="20" weight="500" bottom="10">
                Sharhlar
              </Typography>
              <ul className={styles.reviewList}>
                {(doctor.reviews || []).map((review, index) => (
                  <li className={styles.reviewItem} key={index}>{review}</li>
                ))}
              </ul>
            </div>
          )}
          {relatedDoctors.length > 0 && (
            <div className={styles.relatedSection}>
              <Typography size="22" weight="600" bottom="12">
                O‘xshash shifokorlar
              </Typography>
              <div className={styles.relatedScroller}>
                {relatedDoctors.map((rd) => (
                  <Link key={rd.id} href={`/Doctors/${rd.id}`} className={styles.relatedCard}>
                    {rd.image_url ? (
                      <Image
                        src={rd.image_url}
                        alt={`${rd.name || "Shifokor"} ${rd.surname || ""}`}
                        width={88}
                        height={88}
                        className={styles.relatedAvatar}
                      />
                    ) : (
                      <div className={styles.relatedFallback}>
                        {`${(rd.name?.[0] || "D").toUpperCase()}${(rd.surname?.[0] || "").toUpperCase()}`}
                      </div>
                    )}
                    <div className={styles.relatedMeta}>
                      <div className={styles.relatedName}>
                        {(rd.name || "").trim()} {(rd.surname || "").trim()}
                      </div>
                      <div className={styles.relatedSpec}>{rd.Specialities?.name || ""}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <aside className={styles.sidebar} aria-label="Klinika haqida ma'lumot">
          <div className={styles.clinicCard}>
            <div className={styles.clinicHeader}>
              <span className={styles.clinicBadge}>{clinic?.type || "Klinika"}</span>
              <h3 className={styles.clinicTitle}>{clinic?.name || "Klinika ma'lumoti topilmadi"}</h3>
            </div>
            <div className={styles.clinicBody}>
              <div className={styles.clinicMetaRow}>
                <span className={styles.label}>Manzil:</span>
                <span className={styles.clinicAddress}>{clinic?.address || "Ma'lumot yo'q"}</span>
              </div>
              {Array.isArray(clinic?.working_hours) && clinic!.working_hours!.length > 0 && (
                <div className={styles.clinicMetaRow}>
                  <span className={styles.label}>Ish vaqti:</span>
                  <span>{clinic!.working_hours!.join(", ")}</span>
                </div>
              )}
              {typeof clinic?.appointment_duration_minutes === "number" && (
                <div className={styles.clinicMetaRow}>
                  <span className={styles.label}>Qabul davomiyligi:</span>
                  <span>{clinic!.appointment_duration_minutes} daqiqa</span>
                </div>
              )}
              <div className={styles.actions}>
                <Link href="#qabul" className={styles.primaryButton}>Qabulga yozilish</Link>
                {clinic?.phone ? (
                  <a href={`tel:${clinic.phone}`} className={styles.secondaryButton}>Telefon qilish</a>
                ) : (
                  <button className={styles.secondaryButton} disabled>Telefon yo'q</button>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DoctorDetail;
