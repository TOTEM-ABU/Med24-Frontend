"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import api from "@/lib/api";
import styles from "./ArticleDetail.module.css";
import cardStyles from "./ServiceCards.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DoctorTypeCard from "@/components/DoctorTypeCard";
import { DOCTOR_SPECIALTIES } from "@/lib/constants";
import Input from "@/components/SearchBar";
import { Button } from "@/components";

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

interface Service {
  id: string;
  name: string;
  description?: string;
  category?: string;
  image_url?: string;
  createdAt?: string;
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

const fetchServices = async (): Promise<Service[]> => {
  try {
    const res = await api.get("/services?limit=1000");
    return res.data?.data ?? [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

const ArticleDetailPage = ({
  params,
}: {
  params: Promise<{ articletitle: string }>;
}) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const decodedTitle = decodeURIComponent(resolvedParams.articletitle);

  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-articles"],
    queryFn: fetchAllArticles,
  });

  const { data: services = [] } = useQuery({
    queryKey: ["all-services-articles"],
    queryFn: fetchServices,
  });

  const article = React.useMemo(() => {
    if (!articles.length) return null;

    return articles.find(
      (a) => a.title.toLowerCase() === decodedTitle.toLowerCase()
    );
  }, [articles, decodedTitle]);

  console.log("Decoded Title:", decodedTitle);
  console.log(
    "Available Articles:",
    articles.map((a) => a.title)
  );
  console.log("Found Article:", article);

  if (isLoading) {
    return <div className={styles.container}>Maqola yuklanmoqda...</div>;
  }

  if (isError || !article) {
    return (
      <div className={styles.container}>
        <Breadcrumb
          items={[
            { label: "Asosiy sahifa", href: "/" },
            { label: "Foydali maqolalar", href: "/articles" },
            { label: "Maqola topilmadi" },
          ]}
        />
        <div className={styles.notFound}>
          <h1>Maqola topilmadi</h1>
          <p>So&apos;ralgan maqola mavjud emas yoki o&apos;chirilgan.</p>
          <button
            className={styles.backButton}
            onClick={() => router.push("/articles")}
          >
            Barcha maqolalarga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Breadcrumb
        items={[
          { label: "Asosiy sahifa", href: "/" },
          { label: "Foydali maqolalar", href: "/articles" },
          { label: article.title },
        ]}
      />

      <div className={styles.searchSection}>
        <Input
          label="Shifokor ismi, mutaxassislik nomini yoki xizmat turini kiriting"
          width="100%"
        />
        <Button name="Qidirish" variant="primary" padding="0 38px 0 38px" />
      </div>

      <h1 className={styles.articleTitle}>{article.title}</h1>

      <div className={styles.articleDate}>
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

      {article.image_url && (
        <div className={styles.articleImageContainer}>
          <Image
            src={article.image_url}
            alt={article.title}
            className={styles.articleImage}
            width={800}
            height={400}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.parentElement!.style.display = "none";
            }}
          />
        </div>
      )}

      <div className={styles.articleContent}>{article.content}</div>

      <div className={cardStyles.warningBox}>
        <div className={cardStyles.warningIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="32"
            fill="none"
          >
            <path
              fill="#FF9500"
              d="M0 32 18.54 0l18.54 32zm3.44-2h30.2L18.54 4zm15.1-2.768q.524 0 .878-.354T19.77 26a1.2 1.2 0 0 0-.354-.876 1.2 1.2 0 0 0-.876-.356 1.17 1.17 0 0 0-.876.354 1.2 1.2 0 0 0-.354.878q-.002.52.354.878t.876.354m-1-4.462h2v-10h-2z"
            ></path>
          </svg>
        </div>
        <div className={cardStyles.warningText}>
          Если Вы обнаружили у себя схожие симптомы, незамедлительно обратитесь
          к врачу. Легче предупредить болезнь, чем бороться с последствиями.
        </div>
      </div>

      <div>
        <h2
          style={{
            marginTop: 20,
            fontSize: "24px",
            fontWeight: "700",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Foydali ma&apos;lumotlar
        </h2>
        <div className={cardStyles.serviceCardsContainer}>
          <div className={cardStyles.serviceCard}>
            <div className={cardStyles.serviceImageContainer}>
              <div className={cardStyles.serviceIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="45"
                  fill="none"
                >
                  <path
                    fill="#0166FF"
                    d="M18.281 12.656a1.406 1.406 0 1 0-2.812 0v1.783l-1.544-.891a1.406 1.406 0 1 0-1.407 2.435l1.544.892-1.544.892a1.406 1.406 0 1 0 1.407 2.435l1.544-.891v1.783a1.406 1.406 0 1 0 2.812 0V19.31l1.544.891a1.406 1.406 0 1 0 1.407-2.435l-1.544-.892 1.544-.892a1.406 1.406 0 1 0-1.407-2.435l-1.544.891zM9.844 25.313a1.406 1.406 0 0 0 0 2.812h14.062a1.406 1.406 0 0 0 0-2.812zm0 5.625a1.406 1.406 0 0 0 0 2.812h14.062a1.406 1.406 0 0 0 0-2.812z"
                  ></path>
                  <path
                    fill="#0166FF"
                    d="M0 5.625A5.625 5.625 0 0 1 5.625 0h22.5a5.625 5.625 0 0 1 5.625 5.625v33.75A5.625 5.625 0 0 1 28.125 45h-22.5A5.625 5.625 0 0 1 0 39.375zm28.125-2.812h-22.5a2.813 2.813 0 0 0-2.812 2.812v33.75a2.81 2.81 0 0 0 2.812 2.813h22.5a2.81 2.81 0 0 0 2.813-2.813V5.625a2.81 2.81 0 0 0-2.813-2.812"
                  ></path>
                </svg>
              </div>
            </div>
            <div className={cardStyles.serviceContent}>
              <h3 className={cardStyles.serviceTitle}>
                Diagnostika markazlari
              </h3>
              <p className={cardStyles.serviceDescription}>
                Ixtisoslashgan Med portali 24.uz uy yaqinidagi diagnostika
                markazini tanlashga yordam beradi
              </p>
              <Link href="/Diagnostika" className={cardStyles.serviceLink}>
                Batafsil
              </Link>
            </div>
          </div>

          <div className={cardStyles.serviceCard}>
            <div className={cardStyles.serviceImageContainer}>
              <div className={cardStyles.serviceIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="41"
                  fill="none"
                >
                  <path
                    fill="#0166FF"
                    d="M14.85 26.48v1.195a9.225 9.225 0 1 0 18.45 0v-3.424a6.151 6.151 0 1 1 4.1 0v3.424a13.325 13.325 0 1 1-26.65 0V26.48A12.3 12.3 0 0 1 .502 14.35V4.1a4.1 4.1 0 0 1 4.1-4.1h2.05a2.05 2.05 0 0 1 0 4.1H4.6v10.25a8.2 8.2 0 1 0 16.399 0V4.1h-2.05a2.05 2.05 0 0 1 0-4.1H21a4.1 4.1 0 0 1 4.1 4.1v10.25a12.3 12.3 0 0 1-10.25 12.13m20.5-5.98a2.05 2.05 0 1 0 0-4.1 2.05 2.05 0 0 0 0 4.1"
                  ></path>
                </svg>
              </div>
            </div>
            <div className={cardStyles.serviceContent}>
              <h3 className={cardStyles.serviceTitle}>Analizlar</h3>
              <p className={cardStyles.serviceDescription}>
                Med24.uz sizga yaqin atrofdagi klinikani topishga yordam beradi,
                u erda siz barcha laboratoriya tekshiruvlaridan o&apos;tishingiz
                mumkin
              </p>
              <Link href="/uslugi/analizy" className={cardStyles.serviceLink}>
                Batafsil
              </Link>
            </div>
          </div>

          <div className={cardStyles.serviceCard}>
            <div className={cardStyles.serviceImageContainer}>
              <div className={cardStyles.serviceIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="43"
                  height="48"
                  fill="none"
                >
                  <path
                    stroke="#0166FF"
                    stroke-width="3"
                    d="M7.472 14.326a1.48 1.48 0 0 0 1.48-1.479V3.48A1.48 1.48 0 0 1 10.43 2h21.694a1.48 1.48 0 0 1 1.48 1.48v9.367a1.48 1.48 0 0 0 1.478 1.48h4.438A1.48 1.48 0 0 1 41 15.805v29.09a1.48 1.48 0 0 1-1.48 1.479H3.036a1.48 1.48 0 0 1-1.48-1.48v-29.09a1.48 1.48 0 0 1 1.48-1.479z"
                  ></path>
                  <path
                    stroke="#0166FF"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M16.327 14.326h4.93m0 0h4.93m-4.93 0v-4.93m0 4.93v4.93m9.881 17.282.025-.027m-.025-9.834.025-.027m-9.886.027.025-.027m-9.886.027.025-.027m-.025 9.888.025-.027m9.836.027.025-.027"
                  ></path>
                </svg>
              </div>
            </div>
            <div className={cardStyles.serviceContent}>
              <h3 className={cardStyles.serviceTitle}>Tibbiy xizmatlar</h3>
              <p className={cardStyles.serviceDescription}>
                Turli klinikalarda tibbiy xizmatlar qancha turishini bilib oling
              </p>
              <Link href="/uslugi" className={cardStyles.serviceLink}>
                Batafsil
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 40,
          marginBottom: 20,
          paddingTop: 30,
          paddingBottom: 30,
        }}
      >
        <h2
          style={{
            marginTop: 20,
            fontSize: "24px",
            fontWeight: "700",
            color: "#333",
            marginBottom: "20px",
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
          marginTop: 40,
          marginBottom: 20,
          paddingTop: 30,
          paddingBottom: 30,
        }}
      >
        <h2
          style={{
            marginTop: 20,
            fontSize: "24px",
            fontWeight: "700",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Keng tarqalgan tibbiy xizmatlar
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/kliniki/${encodeURIComponent(service.name)}`}
              style={{
                color: "#1e1e1e",
                borderBottom: "1px dashed #b2b2b2",
                width: "fit-content",
                display: "inline",
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

export default ArticleDetailPage;
