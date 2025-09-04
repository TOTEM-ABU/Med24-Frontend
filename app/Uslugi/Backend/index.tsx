import { useState, useEffect } from "react";
import styles from "./Clinics.Page.module.css";

// Review interfeysi
interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  clinicsId: string;
  doctorsId: string;
  createdAt: string;
}

// Appointment interfeysi
interface Appointment {
  id: string;
  date: string;
  time: string;
  userId: string;
  clinicsId: string;
  doctorsId: string;
  createdAt: string;
}

// Specialty interfeysi
interface Specialty {
  id: string;
  name: string;
  createdAt: string;
}

// Doctor interfeysi
interface Doctor {
  id: string;
  name: string;
  surname: string;
  bio: string;
  experience_years: number;
  rating: string;
  image_url: string;
  clinicsId: string;
  specialtiesId: string;
  createdAt: string;
  Specialties: Specialty;
  reviews: Review[];
}

// Service interfeysi
interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  createdAt: string;
}

// ClinicService interfeysi
interface ClinicService {
  id: string;
  price: string;
  duration_minutes: number;
  clinicsId: string;
  servicesId: string;
  createdAt: string;
  Services: Service;
}

// Promotion interfeysi
interface Promotion {
  id: string;
  title: string;
  description: string;
  discount_percent: number;
  certificate_conditions: string | null;
  clinicsId: string;
  createdAt: string;
}

// OpeningHours interfeysi
interface OpeningHours {
  fri: string;
  mon: string;
  sat: string;
  sun: string;
  thu: string;
  tue: string;
  wed: string;
}

// Region interfeysi
interface Region {
  id: string;
  name: string;
  createdAt: string;
}

// Clinic interfeysi
interface Clinic {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  opening_hours: OpeningHours;
  logo_url: string;
  image_url: string | null;
  yandex_map_url: string | null;
  rating: string;
  type: string;
  regionId: string;
  createdAt: string;
  Region: Region;
  doctors: Doctor[];
  clinicservices: ClinicService[];
  appointments: Appointment[];
  reviews: Review[];
  promotions: Promotion[]; // promotions qo'shildi
}

// ApiResponse interfeysi
interface ApiResponse {
  data: Clinic[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

const ClinicsPage: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch("http://45.76.94.219:3132/api/clinics", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: ApiResponse = await response.json();
        setClinics(data.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className={styles.error}>Xato: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Klinikalar ro&apos;yxati</h1>
      <div className={styles.clinicList}>
        {clinics.map((clinic) => (
          <div key={clinic.id} className={styles.clinicItem}>
            <h2>{clinic.name}</h2>
            <p>{clinic.description}</p>
            <p>
              <strong>Manzil:</strong> {clinic.address}
            </p>
            <p>
              <strong>Telefon:</strong> {clinic.phone}
            </p>
            <p>
              <strong>Email:</strong> {clinic.email}
            </p>
            <p>
              <strong>Veb-sayt:</strong>{" "}
              <a
                href={clinic.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {clinic.website}
              </a>
            </p>
            <p>
              <strong>Reyting:</strong> {clinic.rating}
            </p>
            <p>
              <strong>Turi:</strong> {clinic.type}
            </p>
            <p>
              <strong>Ish vaqti:</strong>
            </p>
            <ul className={styles.hoursList}>
              {Object.entries(clinic.opening_hours).map(([day, hours]) => (
                <li key={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}: {hours}
                </li>
              ))}
            </ul>
            <p>
              <strong>Shifokorlar:</strong>
            </p>
            <ul className={styles.doctorList}>
              {clinic.doctors.map((doctor) => (
                <li key={doctor.id}>
                  {doctor.name} {doctor.surname} - {doctor.Specialties.name} (
                  {doctor.experience_years} yil tajriba)
                </li>
              ))}
            </ul>
            <p>
              <strong>Xizmatlar:</strong>
            </p>
            <ul className={styles.serviceList}>
              {clinic.clinicservices.map((service) => (
                <li key={service.id}>
                  {service.Services.name} - {service.price} UZS,{" "}
                  {service.duration_minutes} daqiqa
                </li>
              ))}
            </ul>
            {clinic.promotions.length > 0 && (
              <div>
                <p>
                  <strong>Aksiyalar:</strong>
                </p>
                <ul className={styles.promotionList}>
                  {clinic.promotions.map((promo: Promotion) => (
                    <li key={promo.id}>
                      {promo.title} - {promo.discount_percent}% chegirma
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {clinic.reviews.length > 0 && (
              <div>
                <p>
                  <strong>Sharhlar:</strong>
                </p>
                <ul className={styles.reviewList}>
                  {clinic.reviews.map((review) => (
                    <li key={review.id}>
                      Reyting: {review.rating} - {review.comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicsPage;
