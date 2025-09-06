import React from "react";
import styles from "./Doctors.module.css";
import { Button, CatalogCard, Input, Typography } from "./components";
import Link from "next/link";
import CommentsList from "./sections/comments";
import Doctors from "./sections/doctors";
import Catalog from "./sections/catalog";
import { Breadcrumb, PopularClinics } from "@/components";
import CommonlyServices from "./sections/commonServices";
import { useGetAllClinics } from "@/hooks/useClinics";

const DoctorsPage = () => {
  const { data: clinics = [] } = useGetAllClinics();

  const doctorsType = [
    "Akusher",
    "Allergolog",
    "Androlog",
    "Anesteziolog",
    "Aritmolog",
    "Artirolog",
    "Audiolog",
    "Defektolog",
    "Dermatolog",
    "Dermotevonetolog",
    "Diagnost",
    "Diyetolog",
    "Embriolog",
    "Endikrionolog",
    "Fizioterapevt",
    "Flebolog",
    "Foniatr",
    "Ftiziatr",
  ];

  const groupedDoctors = doctorsType.reduce(
    (acc: { [key: string]: string[] }, doctor) => {
      const firstLetter = doctor[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(doctor);
      return acc;
    },
    {}
  );

  const initialShowAll: { [key: string]: boolean } = {};
  Object.keys(groupedDoctors).forEach((letter) => {
    initialShowAll[letter] = false;
  });

  return (
    <div className={styles.miniContainer}>
      <div className={styles.breadContainer}>
        <Breadcrumb
          items={[
            { label: "Bosh sahifa", href: "/" },
            { label: "Shifokorlar", href: "/doctors" },
          ]}
        />
      </div>
      <div className={styles.searchSection}>
        <Input inputPlaceholder="Shifokor ismi, mutaxassislik nomini yoki dori-darmon kiriting" />
        <Button>Qidirish</Button>
      </div>
      <div className={styles.commonCatalogStyle}>
        <Typography size="28" weight="600" bottom="30">
          Ommabop Mutaxassislar
        </Typography>
        <ul>
          <li>
            <CatalogCard title="kardiolog">Kardiolog</CatalogCard>
          </li>
          <li>
            <CatalogCard title="ortoped">Ortoped</CatalogCard>
          </li>
          <li>
            <CatalogCard title="pulmonolog">Pulmonolog</CatalogCard>
          </li>
          <li>
            <CatalogCard title="stomotolog">Stomotolog</CatalogCard>
          </li>
          <li>
            <CatalogCard title="terapevt">Terapevt</CatalogCard>
          </li>
          <li>
            <CatalogCard title="travmatolog">Travmatolog</CatalogCard>
          </li>
        </ul>
      </div>
      <Catalog />
      <div className={styles.popularDoctors}>
        <Doctors />
        <div className={styles.throwTelegram}>
          <Typography size="20" weight="500" bottom="8px" top="0">
            Kerakli ma`lumot topmadingizmi?
          </Typography>
          <Typography size="14" color="#1e1e1e70" bottom="26" top="8">
            Bizga Telegramda yozing, biz sizga shifokor topib, qabuliga yozib
            beramiz
          </Typography>
          <button className={styles.telegramLinkButton}>
            <Link className={styles.telegramLink} href="https://t.me/telegram">
              Telegramda yozish
            </Link>
          </button>
        </div>
      </div>
      <PopularClinics clinics={clinics?.data || clinics} />
      <div className={styles.commentSection}>
        <Typography size="24" weight="500" bottom="20">
          So`nggi sharhlar
        </Typography>
        <div className={styles.commentBlocks}>
          <CommentsList />
        </div>
      </div>
      <CommonlyServices />
      <div className={styles.details}>
        <Typography size="28" bottom="20">
          Shifokor qabuliga onlayn yozilish
        </Typography>
        <div className={styles.content}>
          ed24.uz - bu Toshkent aholisi uchun shifokor yoki klinikani izlash
          hamda tanlashni osonlashtiruvchi onlayn-servis. Servis yordamida
          shifokor qabuliga yozilish esa bir necha barobar osonroq va
          samaraliroq bo`ladi! Endilikda Toshkent shahrida shifokor qabuliga
          yozilish onlayn tarzda amalga oshirilmoqda. Med24.uz sayti sizga
          malakali shifokorlar va birinchi darajali klinikalarning nihoyatda
          katta onlayn ma`lumotlar bazasini taqdim etadi. <br /> <br /> Onlayn
          portalimizda siz bir nechta tugmani bosish orqali shifokor qabuliga
          yozilishingiz mumkin. Shuningdek, saytda bizning xizmatlarimizdan
          foydalanib shifokor ko`rigidan o`tgan foydalanuvchilarning sharhlarini
          o`qing. <br /> <br /> Biz sizni mutaxassislar va klinikalarning
          telefon raqamlarini uzoq izlashdan xalos qilamiz. Shuningdek, biz
          o`qimagan mutaxassis qo’liga tushib qolishingiz xavfidan himoya
          qilamiz. Shifokor qabuliga yozilishingiz kerakmi? Bu bir zumda amalga
          oshiriladi! Shifokorni toping, mutaxassislikni tanlang, o’zingizga
          qulay bo’lgan shahrimiz tumanini yoki metro bekatini belgilang. Boshqa
          foydalanuvchilarning sharhlarini o’qib chiqing va sizga eng yoqqan
          shifokorni tanlang. Murojaatnoma qoldirganingizdan so`ng, ma`lumotni
          aniqlashtirish va savollaringizni muhokama qilish uchun sizga
          qo`ng`iroq qilamiz.
        </div>
        <Typography size="28" bottom="20">
          Saytimizning afzalliklari:
        </Typography>
        <ul className={styles.listDetails}>
          <li>
            Uyda yuqori malakali shifokorga qo`ng`iroq qilish yoki siz uchun
            qulay bo`lgan shifoxonaga yozilish bizning saytimizda mutlaqo bepul
            va kunning istalgan vaqtida, bir necha daqiqada amalga oshiriladi.
          </li>
          <li>
            Med24.uz sayti bilan siz poliklinikalardagi uzoq va charchoqli
            navbatlarni unutasiz. Boshqa hech qachon qabulxona bilan bog’lanish
            uchun uzoq urinishlar qilmaysiz. Endi muammolarsiz Toshkentdagi
            shifokor qabuliga yozilishingiz mumkin.
          </li>
          <li>
            Hamkor klinikalarimiz tufayli siz narx va sifat jihatidan yaxshi
            takliflarni topa olasiz. Takliflarning to’liq katalogi bizning
            onlayn portalimizda, ``Aksiyalar`` sahifasida joylashgan. Bizning
            maxsus takliflarimiz bilan siz qulay narxda sifatli tibbiy xizmatdan
            bahramand bo`lishingiz mumkin!
          </li>
          <li>
            Klinikani va kerakli mutaxassisni tanlash uchun bizning saytimizdan
            foydalaning, sog`ligingizni asrang!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorsPage;
