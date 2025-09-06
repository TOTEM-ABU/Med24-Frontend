import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllDoctors } from "@/api/doctors/doctors.api";
import { getAllRegions } from "@/api/regions/regions.api";
import { DoctorCard, Select, Typography } from "../../components";
import styles from "./doctors.module.css";

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

interface SelectProps {
  options: { value: string; label: string }[];
  placeholder: string;
  name: string;
  id: string;
  onChange: (value: string) => void;
}

const Doctors = () => {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [filters, setFilters] = useState({
    doctorsType: "",
    districts: "",
    medicalCenter: "",
    doctorGender: "",
  });

  const doctorsType = [
    { value: "", label: "Barcha mutaxassisliklar" },
    ...Array.from(new Set(doctors.map((doctor) => doctor.Specialities?.name)))
      .filter(Boolean)
      .map((name) => ({ value: name, label: name })),
  ];

  const districts = [
    { value: "", label: "Barcha tumanlar" },
    ...Array.from(
      new Set(
        regions
          .flatMap((region) => region.clinics)
          .map((clinic) => clinic.address.split(", ")[1])
      )
    )
      .filter(Boolean)
      .map((district) => ({ value: district, label: district })),
  ];

  const medicalCenters = [
    { value: "", label: "Barcha muassasalar" },
    ...regions
      .flatMap((region) => region.clinics)
      .map((clinic) => ({ value: clinic.id, label: clinic.name })),
  ];

  const doctorGender = [
    { value: "", label: "Barcha jinslar" },
    { value: "Erkak", label: "Erkak" },
    { value: "Ayol", label: "Ayol" },
  ];

  useEffect(() => {
    getAllDoctors()
      .then((res) => {
        const doctorsData = Array.isArray(res.data) ? res.data : [];
        setTotalDoctors(res.meta?.total || 0);
        setDoctors(doctorsData);
        setFilteredDoctors(doctorsData);
      })
      .catch(() => {
        setDoctors([]);
        setFilteredDoctors([]);
      });

    getAllRegions()
      .then((res) => {
        const regionsData = Array.isArray(res.data) ? res.data : [];
        setRegions(regionsData);
      })
      .catch(() => {
        setRegions([]);
      });
  }, []);

  useEffect(() => {
    let filtered = doctors;

    if (filters.doctorsType) {
      filtered = filtered.filter(
        (doctor) => doctor.Specialities?.name === filters.doctorsType
      );
    }

    if (filters.districts) {
      filtered = filtered.filter((doctor) => {
        const clinic = regions
          .flatMap((region) => region.clinics)
          .find((c) => c.id === doctor.clinicsId);
        return clinic?.address.split(", ")[1] === filters.districts;
      });
    }

    if (filters.medicalCenter) {
      filtered = filtered.filter(
        (doctor) => doctor.clinicsId === filters.medicalCenter
      );
    }

    if (filters.doctorGender) {
      filtered = filtered.filter((doctor) => {
        const firstName = doctor.name.toLowerCase();
        const isMale = [
          "john",
          "daniel",
          "abdulloh",
          "bekzod",
          "javlon",
        ].includes(firstName);
        const isFemale = ["alice", "laura", "malika", "sevara"].includes(
          firstName
        );
        return filters.doctorGender === "Erkak" ? isMale : isFemale;
      });
    }

    setFilteredDoctors(filtered);
    setVisibleCount(10);
  }, [filters, doctors, regions]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoctorClick = (doctorId: string) => {
    router.push(`/doctors/${doctorId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <Typography size="27" weight="600" bottom="30">
          Toshkentda shifokorlar mutaxassisligi bo‘yicha
        </Typography>
        <p className={styles.totalCount}>{totalDoctors} mutaxassisliklar</p>
      </div>
      <div className={styles.selections}>
        <Select
          options={doctorsType}
          placeholder="Mutaxassisligi bo'yicha"
          name="doctorsType"
          id="doctorsType"
          onChange={(value: string) => handleFilterChange("doctorsType", value)}
          aria-label="Mutaxassislik bo'yicha filtr"
        />
        <Select
          options={districts}
          placeholder="Tuman"
          name="districts"
          id="districts"
          onChange={(value: string) => handleFilterChange("districts", value)}
          aria-label="Tuman bo'yicha filtr"
        />
        <Select
          options={medicalCenters}
          placeholder="Tibbiyot muassasasi turi"
          name="medicalCenter"
          id="medicalCenter"
          onChange={(value: string) =>
            handleFilterChange("medicalCenter", value)
          }
          aria-label="Tibbiyot muassasasi bo'yicha filtr"
        />
        <Select
          options={doctorGender}
          placeholder="Shifokor jinsi"
          name="doctorGender"
          id="doctorGender"
          onChange={(value: string) =>
            handleFilterChange("doctorGender", value)
          }
          aria-label="Shifokor jinsi bo'yicha filtr"
        />
      </div>

      {filteredDoctors.length === 0 ? (
        <p>Yuklanmoqda yoki shifokorlar topilmadi...</p>
      ) : (
        <>
          <ul className={styles.doctorsList}>
            {filteredDoctors.slice(0, visibleCount).map((doctor) => (
              <li
                key={doctor.id}
                onClick={() => handleDoctorClick(doctor.id)}
                aria-label={`Shifokor ${doctor.name} ${doctor.surname} haqida batafsil`}
                className={styles.doctorCard}
              >
                <DoctorCard
                  fullname={`${doctor.name} ${doctor.surname}`}
                  type={doctor.Specialities?.name || "Mutaxassislik yo'q"}
                  experience={doctor.experience_years}
                  photo={doctor.image_url}
                  clinicPhoto="m-clinic"
                />
              </li>
            ))}
          </ul>

          {totalDoctors > 10 && visibleCount < filteredDoctors.length && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={() => setVisibleCount((prev) => prev + 10)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  background: "#007bff",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Yana ko‘rsatish
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Doctors;
