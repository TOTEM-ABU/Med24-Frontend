import { getAllDoctors } from "@/api/doctors/doctors.api";
import { getAllRegions } from "@/api/regions/regions.api"; // getAllRegions import qilindi
import React, { useEffect, useState } from "react";
import { DoctorCard, Select } from "../../components";
import styles from "./doctors.module.css";

interface Speciality {
  id: string;
  name: string;
}

interface Doctor {
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

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
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
          .map((clinic) => clinic.address.split(", ")[1]) // Manzil ichidan tuman
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

  // Ma'lumotlarni olish
  useEffect(() => {
    // Shifokorlarni olish
    getAllDoctors()
      .then((res) => {
        console.log("API dan kelgan shifokorlar:", res);
        const doctorsData = Array.isArray(res.data) ? res.data : [];
        setDoctors(doctorsData);
        setFilteredDoctors(doctorsData);
      })
      .catch((error) => {
        console.error("Shifokorlarni olishda xato:", error);
        setDoctors([]);
        setFilteredDoctors([]);
      });

    // Regionlarni olish
    getAllRegions()
      .then((res) => {
        console.log("API dan kelgan regionlar:", res);
        const regionsData = Array.isArray(res.data) ? res.data : [];
        setRegions(regionsData);
      })
      .catch((error) => {
        console.error("Regionlarni olishda xato:", error);
        setRegions([]);
      });
  }, []);

  // Filtrlarni yangilash
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
        // Jinsni taxminiy aniqlash (ism orqali)
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
  }, [filters, doctors, regions]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.selections}>
        <Select
          options={doctorsType}
          placeholder="Mutaxassisligi bo'yicha"
          name="doctorsType"
          id="doctorsType"
          onChange={(value: string) => handleFilterChange("doctorsType", value)}
        />
        <Select
          options={districts}
          placeholder="Tuman"
          name="districts"
          id="districts"
          onChange={(value: string) => handleFilterChange("districts", value)}
        />
        <Select
          options={medicalCenters}
          placeholder="Tibbiyot muassas turi"
          name="medicalCenter"
          id="medicalCenter"
          onChange={(value: string) =>
            handleFilterChange("medicalCenter", value)
          }
        />
        <Select
          options={doctorGender}
          placeholder="Shifokor jinsi"
          name="doctorGender"
          id="doctorGender"
          onChange={(value: string) =>
            handleFilterChange("doctorGender", value)
          }
        />
      </div>
      {filteredDoctors.length === 0 ? (
        <p>Yuklanmoqda yoki shifokorlar topilmadi...</p>
      ) : (
        filteredDoctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            fullname={`${doctor.name} ${doctor.surname}`}
            type={doctor.Specialities?.name || "Mutaxassislik yo'q"}
            experience={doctor.experience_years}
            photo={doctor.image_url}
            clinicPhoto="m-clinic"
          />
        ))
      )}
    </div>
  );
};

export default Doctors;
