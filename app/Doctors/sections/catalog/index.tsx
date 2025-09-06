import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import styles from "./Catalog.module.css";
import { Typography } from "../../components";

interface Speciality {
  id: string;
  name: string;
  createdAt: string;
  doctors: object[];
}

const Catalog = () => {
  const [specialties, setSpecialties] = useState<Speciality[]>([]);
  const [expandedLetters, setExpandedLetters] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    api
      .get("/specialties")
      .then((res) => {
        console.log("API dan kelgan mutaxassisliklar:", res.data);
        const specialtiesData = Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setSpecialties(specialtiesData);
      })
      .catch((error) => {
        console.error("Mutaxassisliklarni olishda xato:", error);
        setSpecialties([]);
      });
  }, []);

  const groupedSpecialties = specialties.reduce(
    (
      acc: { [key: string]: { name: string; doctorCount: number }[] },
      specialty
    ) => {
      const name = specialty.name || "Noma'lum";
      const firstLetter = name[0]?.toUpperCase() || "N";
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      if (!acc[firstLetter].find((item) => item.name === name)) {
        acc[firstLetter].push({ name, doctorCount: specialty.doctors.length });
      }
      return acc;
    },
    {}
  );

  const toggleLetter = (letter: string) => {
    setExpandedLetters((prev) => ({
      ...prev,
      [letter]: !prev[letter],
    }));
  };

  return (
    <div className={styles.catalogStyle}>
      <Typography size="26" weight="600">
        Shifokorlar mutaxassisligi bo`yicha
      </Typography>
      {specialties.length === 0 ? (
        <Typography size="36">Yuklanmoqda...</Typography>
      ) : (
        <div className={styles.catalogListStyle}>
          {Object.keys(groupedSpecialties)
            .sort()
            .map((letter) => (
              <div key={letter}>
                <Typography size="22" weight="500">
                  {letter}
                </Typography>
                <ul className="list-disc pl-6 space-y-2">
                  {groupedSpecialties[letter]
                    .slice(
                      0,
                      expandedLetters[letter]
                        ? groupedSpecialties[letter].length
                        : 5
                    )
                    .map((specialty, index) => (
                      <li key={index} className={styles.linkStyle}>
                        <Link
                          href={`/specialties/${specialty.name}`}
                          className={styles.linkWrapper}
                        >
                          <p className={styles.link}>{specialty.name}</p>
                          <p className={styles.count}>
                            {specialty.doctorCount}
                          </p>
                        </Link>
                      </li>
                    ))}
                </ul>
                {groupedSpecialties[letter].length > 5 && (
                  <button
                    className={styles.showButton}
                    onClick={() => toggleLetter(letter)}
                  >
                    {expandedLetters[letter] ? "Yashirish" : "Hammasi"}
                  </button>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
