"use client";
import Link from "next/link";
import React from "react";
import styles from "./Districts.module.css";

type District = {
  slug: string;
  title: string;
};

const DISTRICTS: District[] = [
  { slug: "olmazor", title: "Olmazor tumani" },
  { slug: "bektemir", title: "Bektemir tumani" },
  { slug: "mirobod", title: "Mirobod tumani" },
  { slug: "mirzo-ulugbek", title: "Mirzo-Ulug'bek tumani" },
  { slug: "sergeli", title: "Sergeli tumani" },
  { slug: "uchtepa", title: "Uchtepa tumani" },
  { slug: "chilonzor", title: "Chilonzor tumani" },
  { slug: "shayxontohur", title: "Shayxontohur tumani" },
  { slug: "yunusobod", title: "Yunusobod tumani" },
  { slug: "yakkasaroy", title: "Yakkasaroy tumani" },
  { slug: "yangihayot", title: "Yangihayot tumani" },
  { slug: "yashnobod", title: "Yashnobod tumani" },
];

interface DistrictsProps {
  serviceName?: string;
}

const Districts: React.FC<DistrictsProps> = ({ serviceName }) => {
  const title = serviceName
    ? `${serviceName} Toshkent bo'yicha`
    : "Toshkent shahridagi klinikalar";

  return (
    <div className={styles.districts}>
      <h3 className={styles.districtsHeader}>{title}</h3>
      <div className={styles.grid}>
        {DISTRICTS.map((d) => (
          <Link
            key={d.slug}
            href={
              serviceName
                ? `/kliniki/${encodeURIComponent(serviceName)}?district=${
                    d.slug
                  }`
                : `/Kliniki/district/${d.slug}`
            }
            className={styles.link}
          >
            {serviceName
              ? `${serviceName} ${d.title.replace(" tumani", " tumanida")}`
              : d.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Districts;
