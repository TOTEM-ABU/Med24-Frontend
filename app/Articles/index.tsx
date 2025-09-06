"use client";
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import api from "@/lib/api";
import axios from "axios";
import styles from "./Articles.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import DoctorTypeCard from "@/components/DoctorTypeCard";
import { DOCTOR_SPECIALTIES } from "@/lib/constants";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  content: string;
  image_url: string;
  createdAt: string;
  User: {
    id: string;
    name: string;
    surname: string;
  };
}

type Service = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  image_url?: string;
  createdAt?: string;
  clinicservices?: Array<{
    id: string;
    price?: string;
    duration_minutes?: number;
    clinicsId?: string;
    servicesId?: string;
    createdAt?: string;
  }>;
};

const fetchAllArticles = async (): Promise<Article[]> => {
  try {
    const { data } = await api.get("/articles");
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

const ArticlesPage: React.FC = () => {
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-articles"],
    queryFn: fetchAllArticles,
  });

  const { data: services = [] } = useQuery({
    queryKey: ["all-services"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/services?limit=1000`
        );
        return res.data?.data ?? [];
      } catch (error) {
        console.error("Error fetching services:", error);
        return [];
      }
    },
  });

  const allServices = useMemo(() => {
    return services;
  }, [services]);

  if (isLoading) {
    return <div className={styles.container}>Maqolalar yuklanmoqda...</div>;
  }

  if (isError) {
    return (
      <div className={styles.container}>
        Xatolik yuz berdi. Maqolalarni yuklab bo&#39;lmadi.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Breadcrumb
        items={[{ label: "Asosiy sahifa", href: "/" }, { label: "Maqolalar" }]}
      />

      <div className={styles.searchSection}>
        <Input
          label="Shifokor ismi, mutaxassislik nomini yoki xizmat turini kiriting"
          width="100%"
        />
        <Button name="Qidirish" variant="primary" padding="0 38px 0 38px" />
      </div>

      <h1 className={styles.title}>
        Med24.uz saytida sog&#39;liq haqida maqolalar
      </h1>

      {articles.length === 0 ? (
        <p className={styles.noArticles}>Hozircha maqolalar mavjud emas.</p>
      ) : (
        <div className={styles.grid}>
          {articles.map((article) => (
            <a
              href={`/articles/${encodeURIComponent(article.title)}`}
              key={article.id}
              className={styles.card}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={article.image_url}
                  alt={article.title}
                  className={styles.image}
                  width={300}
                  height={200}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              <div className={styles.content}>
                <div className={styles.date}>
                  {new Date(article.createdAt).toLocaleDateString("uz-UZ", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  {new Date(article.createdAt).toLocaleTimeString("uz-UZ", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <p className={styles.description}>
                  {article.content.length > 150
                    ? `${article.content.substring(0, 150)}...`
                    : article.content}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: 40,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "700",
            color: "#333",
            marginBottom: 20,
          }}
        >
          Shifokorlarning keng tarqalgan mutaxassisliklari
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 20,
            alignItems: "stretch",
            maxWidth: "100%",
          }}
        >
          {DOCTOR_SPECIALTIES.slice(0, 6).map((item, index) => (
            <DoctorTypeCard
              key={item.name}
              name={item.name}
              image={item.image}
              style={index === 0 ? { gridColumn: "span 2" } : undefined}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: "60px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            margin: 0,
            marginBottom: 20,
          }}
        >
          Keng tarqalgan tibbiy xizmatlar
        </h2>
        <div
          style={{
            marginTop: 26,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "16px 32px",
          }}
        >
          {allServices.map((service: Service) => (
            <Link
              key={service.id}
              href={`/kliniki/${encodeURIComponent(service.name)}`}
              style={{
                color: "#000",
                textDecoration: "none",
                borderBottom: "1px dashed #999",
                width: "fit-content",
                paddingBottom: "4px",
                marginBottom: "8px",
              }}
            >
              {service.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
