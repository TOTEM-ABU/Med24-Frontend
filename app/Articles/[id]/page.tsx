"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import styles from "./ArticleDetail.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import { useRouter } from "next/navigation";

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

const fetchArticle = async (id: string): Promise<Article | null> => {
  try {
    const { data } = await api.get(`/articles/${id}`);
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};

const ArticleDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["article", params.id],
    queryFn: () => fetchArticle(params.id),
    enabled: !!params.id,
  });

  if (isLoading) {
    return <div className={styles.container}>Maqola yuklanmoqda...</div>;
  }

  if (isError || !article) {
    return (
      <div className={styles.container}>
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Asosiy sahifa", href: "/" },
              { label: "Foydali maqolalar", href: "/articles" },
              { label: "Maqola topilmadi" },
            ]}
          />
          <div className={styles.notFound}>
            <h1>Maqola topilmadi</h1>
            <p>So'ralgan maqola mavjud emas yoki o'chirilgan.</p>
            <button
              className={styles.backButton}
              onClick={() => router.push("/articles")}
            >
              Barcha maqolalarga qaytish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="container">
        <Breadcrumb
          items={[
            { label: "Asosiy sahifa", href: "/" },
            { label: "Foydali maqolalar", href: "/articles" },
            { label: article.title },
          ]}
        />

        <article className={styles.article}>
          <h1 className={styles.title}>{article.title}</h1>

          <div className={styles.meta}>
            <span className={styles.author}>
              {article.User.name} {article.User.surname}
            </span>
            <span className={styles.date}>
              {new Date(article.createdAt).toLocaleDateString("uz-UZ", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {article.image_url && (
            <div className={styles.imageContainer}>
              <img
                src={article.image_url}
                alt={article.title}
                className={styles.image}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.parentElement!.style.display = "none";
                }}
              />
            </div>
          )}

          <div className={styles.content}>{article.content}</div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
