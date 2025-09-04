"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import styles from "./Press.module.css";

const PressPage = () => {
  const [searchValue, setSearchValue] = useState("");

  const pressArticles = [
    {
      id: "1",
      title: "Nervi uje ne te",
      url: "https://repost.uz/health/nervi-uje-ne-te",
      imageUrl:
        "https://med24.uz/_ipx/f_webp&q_80/images/ef99a5769f4c3c70c465fd8179b4cf25.webp",
      date: "2025-09-04",
      source: "Repost.uz",
    },
    {
      id: "2",
      title: "Vbiraem gde sdelat mrt v Tashkente",
      url: "https://review.uz/post/vbiraem-gde-sdelat-mrt-v-tashkente",
      imageUrl:
        "https://med24.uz/_ipx/f_webp&q_80/images/2679743ce9bb0db2957a2e93dcce7e8b.webp",
      date: "2025-09-04",
      source: "Review.uz",
    },
    {
      id: "3",
      title: "Tibbiy xizmat kompyuterlashmoqda",
      url: "https://zarnews.uz/post/tibbiy-xizmat-kompyuterlashmoqda-zarur-shifokorlarni-topishning-oson-va-tez-usuli",
      imageUrl:
        "https://med24.uz/_ipx/f_webp&q_80/images/73b83c83a355fc527bdd3f93692393bc.webp",
      date: "2025-09-04",
      source: "Zarnews.uz",
    },
    {
      id: "4",
      title: "Udobnyy poisk klinik",
      url: "https://www.thevista.ru/page30489-udobnyy_poisk_klinik_onlayn_s_pomoshchyu_kliniki24uz",
      imageUrl:
        "https://med24.uz/_ipx/f_webp&q_80/images/c8f4c0d5ea0a33a8192be02a5ee73e59.webp",
      date: "2025-09-04",
      source: "Thevista.ru",
    },
    {
      id: "5",
      title: "Shifokor topish endi tez va oson ",
      url: "https://xs.uz/uz/post/shifokor-topish-endi-tez-va-oson",
      imageUrl:
        "https://med24.uz/_ipx/f_webp&q_80/images/f1c7b5c5c7c0a0f4b7a5c5c5c5c5c5c5.webp",
      date: "2025-09-04",
      source: "Xalq So'zi",
    },
  ];

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  const handleSearchClick = () => {
    handleSearch(searchValue);
  };

  return (
    <div className={styles.container}>
      <Breadcrumb
        items={[{ label: "Asosiy", href: "/" }, { label: "Biz haqimizda" }]}
      />

      <div className={styles.searchSection}>
        <SearchBar
          label="Shifokor ismi, mutaxassislik nomini yoki xizmat turini kiriting"
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
        />
        <Button name="Qidirish" onClick={handleSearchClick} variant="primary" />
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Yangiliklar</h1>
      </div>

      <div className={styles.grid}>
        {pressArticles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.imageContainer}>
              <img
                src={article.imageUrl}
                alt={article.title}
                className={styles.image}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.meta}>
                <span className={styles.source}>{article.source}</span>
                <span className={styles.date}>{article.date}</span>
              </div>
              <h3 className={styles.articleTitle}>{article.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PressPage;
