"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import styles from "./Articles.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import DoctorTypeCard from "@/components/DoctorTypeCard";
import { DOCTOR_SPECIALTIES } from "@/lib/constants";

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
    <div className="container">
      <Breadcrumb
        items={[
          { label: "Asosiy sahifa", href: "/" },
          { label: "Foydali maqolalar" },
        ]}
      />

      <div className={styles.searchSection}>
        <Input
          label="Shifokor ismi, mutaxassislik nomini yoki xizmat turini kiriting"
          width="100%"
        />
        <Button name="Qidirish" variant="primary" padding="0 38px 0 38px" />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>
          Med24.uz saytida sog&#39;liq haqida maqolalar
        </h1>

        {articles.length === 0 ? (
          <p className={styles.noArticles}>Hozircha maqolalar mavjud emas.</p>
        ) : (
          <div className={styles.grid}>
            {articles.map((article) => (
              <a
                href={`/articles/${article.id}`}
                key={article.id}
                className={styles.card}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className={styles.image}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
                <div className={styles.content}>
                  <div className={styles.date}>
                    {new Date(article.createdAt).toLocaleDateString("uz-UZ", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}{" "}
                    {new Date(article.createdAt).toLocaleTimeString("uz-UZ", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
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
            {DOCTOR_SPECIALTIES.slice(0, 6).map((item, index) => (
              <DoctorTypeCard
                key={item.name}
                name={item.name}
                image={item.image}
                style={index === 0 ? { gridColumn: "span 2" } : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
