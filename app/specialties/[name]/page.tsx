"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components";
import { Typography } from "@/app/Doctors/components";
import { getAllDoctors } from "@/api/doctors/doctors.api";

interface Speciality {
  id: string;
  name: string;
}

interface Doctor {
  id: string;
  name: string;
  surname: string;
  Specialities?: Speciality;
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

  useEffect(() => {
    setLoading(true);
    getAllDoctors()
      .then((res) => {
        const all: Doctor[] = Array.isArray(res.data) ? res.data : [];
        const target = toSlug(specialtyName);
        const filtered = all.filter((d) => {
          const name = d.Specialities?.name || "";
          return toSlug(name) === target;
        });
        setDoctors(filtered);
      })
      .finally(() => setLoading(false));
  }, [specialtyName]);

  return (
    <div style={{ maxWidth: 894, margin: "0 auto", padding: "24px 16px" }}>
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
        <p>Yuklanmoqda...</p>
      ) : doctors.length === 0 ? (
        <p>Shifokor topilmadi.</p>
      ) : (
        <ul style={{ display: "grid", gap: 12 }}>
          {doctors.map((d) => (
            <li key={d.id} style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 12,
            }}>
              <Link href={`/Doctors/${d.id}`}>
                {(d.name || "").trim()} {(d.surname || "").trim()}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpecialtyPage;


