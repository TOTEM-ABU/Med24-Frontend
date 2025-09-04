"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import styles from "./UsefulArticles.module.css";
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

const fetchArticles = async (): Promise<Article[]> => {
  try {
    const { data } = await api.get("/articles");
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const UsefulArticles: React.FC = () => {
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["useful-articles-home"],
    queryFn: fetchArticles,
  });

  if (isLoading) {
    return <div className={styles.container}>Maqolalar yuklanmoqda...</div>;
  }

  if (isError) {
    return (
      <div className={styles.container}>
        Xatolik yuz berdi. Maqolalarni yuklab bo'lmadi.
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  const displayedArticles = articles.slice(0, 3);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Foydali maqolalar</h2>
      </div>

      <div className={styles.grid}>
        {displayedArticles.map((article) => (
          <Link
            href={`/articles/${encodeURIComponent(article.title)}`}
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
              <span className={styles.date}>
                {formatDate(article.createdAt)}
              </span>
              <h3 className={styles.articleTitle}>{article.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.viewAllContainer}>
        <Link href="/articles" className={styles.viewAll}>
          Barchasini ko'rish
        </Link>
      </div>
    </div>
  );
};

export default UsefulArticles;
