"use client"; // client component bo‘lishi kerak chunki useEffect ishlatyapsan

import React, { useEffect, useState } from "react";
import { Doctor, DoctorsResponse } from "../../types";
import api from "../../api/doctorsApi";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get<DoctorsResponse>("/doctors");
        setDoctors(res.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) return <div>Yuklanmoqda...</div>;

  return (
    <div>
      <h2>Shifokorlar ro‘yxati</h2>
      {doctors.length === 0 ? (
        <p>Shifokorlar topilmadi</p>
      ) : (
        doctors.map((doc) => (
          <div key={doc.id}>
            <h3>
              {doc.name} {doc.surname}
            </h3>
            <p>{doc.Specialties?.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DoctorsPage;
