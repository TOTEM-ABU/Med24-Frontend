import { Typography } from "@/app/Doctors/components";
import React, { useEffect, useState } from "react";
import styles from "./CommonServices.module.css";
import { getAllServices } from "@/api/services/services.api";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  createdAt: string;
}

const CommonServices = () => {
  const [commonServices, setCommonServices] = useState<Service[]>([]);

  useEffect(() => {
    getAllServices()
      .then((res) => {
        console.log("API dan kelgan:", res);
        setCommonServices(res.data || []);
      })
      .catch((error) => {
        console.error("Xizmatlarni olishda xatolik:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Typography size="24" top="30" bottom="20">
        Keng tarqalgan tibbiy xizmatlar
      </Typography>
      <div className={styles.commonServicesLinks}>
        {commonServices.map((val, idx) => (
          <div key={idx} className={styles.linkStyle}>
            <Link href={`/uslugi/${val.id}`}>{val.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonServices;
