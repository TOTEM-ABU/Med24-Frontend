import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDoctorById } from "@/api/doctors/doctors.api";
import { getAllRegions } from "@/api/regions/regions.api";
import styles from "./doctorDetail.module.css";
import { Typography } from "@/app/Doctors/components";
import Image from "next/image";

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
}

interface Region {
  id: string;
  name: string;
  clinics: Clinic[];
}

const DoctorDetail: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [clinic, setClinic] = useState<Clinic | null>(null);
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
      <Typography size="28" weight="600" bottom="20">
        {doctor.name} {doctor.surname}
      </Typography>
      <div className={styles.doctorDetails}>
        <Image
          src={doctor.image_url || "/default-doctor.jpg"}
          alt={`${doctor.name} ${doctor.surname}`}
          className={styles.doctorImage}
          width={200}
          height={200}
        />
        <div className={styles.info}>
          <p>
            <strong>Mutaxassislik:</strong>{" "}
            {doctor.Specialities?.name || "Ma'lum emas"}
          </p>
          <p>
            <strong>Tajriba:</strong> {doctor.experience_years} yil
          </p>
          <p>
            <strong>Reyting:</strong> {doctor.rating}
          </p>
          <p>
            <strong>Bio:</strong> {doctor.bio || "Ma'lumot yo'q"}
          </p>
          {clinic && (
            <p>
              <strong>Klinika:</strong> {clinic.name}, {clinic.address}
            </p>
          )}
          <p>
            <strong>Sharhlar soni:</strong> {doctor.reviews.length}
          </p>
          {doctor.reviews.length > 0 && (
            <div className={styles.reviews}>
              <Typography size="20" weight="500" bottom="10">
                Sharhlar
              </Typography>
              <ul>
                {doctor.reviews.map((review, index) => (
                  <li key={index}>{review}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
