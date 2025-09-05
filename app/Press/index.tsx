"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import Image from "next/image";
import styles from "./Press.module.css";

const PressPage = () => {
  const [searchValue, setSearchValue] = useState("");

  const pressArticles = [
    {
      id: "1",
      title: "Med24.uz - Toshkentdagi eng yaxshi klinikalar va shifokorlar",
      url: "https://repost.uz/health/nervi-uje-ne-te",
      imageUrl:
        "https://med24.uz/_ipx/f_webp&q_80/images/ef99a5769f4c3c70c465fd8179b4cf25.webp",
      date: "2025-09-04",
      source: "Repost.uz",
    },
    {
      id: "2",
      title: "Toshkentda MRT qayerda qilishni tanlaymiz",
      url: "https://review.uz/post/vbiraem-gde-sdelat-mrt-v-tashkente",
      imageUrl:
        "https://med24.uz/_ipx/f_webp&q_80/images/2679743ce9bb0db2957a2e93dcce7e8b.webp",
      date: "2025-09-04",
      source: "Review.uz",
    },
    {
      id: "3",
      title:
        "Tibbiy xizmat kompyuterlashmoqda - zarur shifokorlarni topishning oson va tez usuli",
      url: "https://zarnews.uz/post/tibbiy-xizmat-kompyuterlashmoqda-zarur-shifokorlarni-topishning-oson-va-tez-usuli",
      imageUrl:
        "https://med24.uz/_ipx/f_webp&q_80/images/73b83c83a355fc527bdd3f93692393bc.webp",
      date: "2025-09-04",
      source: "Zarnews.uz",
    },
    {
      id: "4",
      title: "Qulay klinika qidiruvi onlayn - Med24.uz yordamida",
      url: "https://www.thevista.ru/page30489-udobnyy_poisk_klinik_onlayn_s_pomoshchyu_kliniki24uz",
      imageUrl:
        "https://med24.uz/_ipx/f_webp&q_80/images/c8f4c0d5ea0a33a8192be02a5ee73e59.webp",
      date: "2025-09-04",
      source: "Thevista.ru",
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
        items={[
          { label: "Asosiy", href: "/" },
          { label: "Biz haqimizda matbuot" },
        ]}
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

      <div className={styles.grid}>
        <h2 className={styles.title}>Biz haqimizda matbuot</h2>
        {pressArticles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.imageContainer}>
              <Image
                src={article.imageUrl}
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
