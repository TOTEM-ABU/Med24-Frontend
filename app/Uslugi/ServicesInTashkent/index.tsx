import React, { useEffect, useState } from "react";
import { Typography } from "@/app/Doctors/components";
import styles from "./ServicesInTashkent.module.css";
import { getAllServices } from "@/api/services/services.api";

// Interfeyslar API ma'lumotlariga moslashtirildi
interface ClinicService {
  id: string;
  price: string;
  duration_minutes: number;
  clinicsId: string;
  servicesId: string;
  createdAt: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  createdAt: string;
  clinicservices: ClinicService[];
}

const ServicesInTashkent = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    // API dan ma'lumotlarni olish
    getAllServices()
      .then((res) => {
        console.log("API dan kelgan:", res);
        // API massivni `res.data` ichida qaytaradi deb taxmin qilamiz
        setServices(res.data || []);
      })
      .catch((error) => {
        console.error("Xizmatlarni olishda xatolik:", error);
      });
  }, []);

  // Kategoriyalar bo'yicha xizmatlarni guruhlash
  const groupedServices = services.reduce((acc, service) => {
    const category = service.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className={styles.servicesInTashkent}>
      <Typography size="26" bottom="20">
        Tibbiy xizmatlar Toshkentda
      </Typography>
      <div className={styles.servicesBlock}>
        {Object.keys(groupedServices).map((category, idx) => (
          <div key={idx} className={styles.oneColumn}>
            <Typography size="18" weight="600">
              {category}
            </Typography>
            {groupedServices[category].map((service, serviceIdx) => (
              <div key={serviceIdx} className={styles.serviceItem}>
                <Typography size="16" weight="500">
                  {service.name}
                </Typography>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesInTashkent;
