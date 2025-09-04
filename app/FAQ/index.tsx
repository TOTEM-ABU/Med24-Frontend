import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./faq.module.css";

const FAQPage = () => {
  // Barcha savollar default ochiq bo'lishi uchun
  const [openItems, setOpenItems] = useState(
    new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
  );

  const faqSections = [
    {
      id: "general",
      title: "Med24.uz haqida",
      questions: [
        {
          id: 1,
          question: "Med24.uz nima?",
          answer:
            "Med24.uz – bu shifokorlarni qidirish va ularga qabulga yozilish uchun xizmat. Biz tashrif buyuruvchilarimizga uyga yaqin va arzon narxlarda yaxshi mutaxassisni tanlashda yordam beramiz.",
        },
        {
          id: 2,
          question: "Med24.uz – bu klinika?",
          answer:
            "Yo'q, Med24.uz – bu mos klinikani topish va yozilish uchun xizmat. Med24.uz portali tibbiy xizmatlarni ko'rsatmaydi.",
        },
        {
          id: 3,
          question: "Med24.uz bemorlar uchun bepulmi?",
          answer:
            "Ha, shifokor qidirish xizmati bemorlar uchun mutlaqo bepul. To'lov bemor murojaat qilgan klinikada amalga oshiriladi.",
        },
      ],
    },
    {
      id: "appointment",
      title: "Shifokorga yozilish haqida",
      questions: [
        {
          id: 4,
          question: "Shifokorga yozilish qancha turadi?",
          answer:
            "Shifokorga yozilish narxi u ishlaydigan klinikaga bog'liq. Biz o'z navbatimizda xizmatlar narxini oshirmasligimizni va narxlarning klinikaning rasmiy narxlari ro'yxatiga mos kelishini kafolatlaymiz.",
        },
        {
          id: 5,
          question: "Med24.uz saytida shifokorni qanday tanlashim mumkin?",
          answer:
            "Shifokorni Med24.uz saytida tanlash uchun mutaxassislikni va qulay hududni tanlang. Sizga taqdim etilgan mutaxassislar orasidan o'zingizga mos shifokorni tanlashingiz mumkin. Yaxshi shifokorni sizga bizning bepul kol-tsentrimiz telefon orqali maslahat beradi.",
        },
        {
          id: 6,
          question: "Qanday qilib qabulga yozilishim mumkin?",
          answer:
            "Qabulga yozilish uchun telefon orqali yoki telegram-botimiz orqali ariza qoldirishingiz mumkin.",
        },
        {
          id: 7,
          question: "Shifokorga yozilish qanday amalga oshiriladi?",
          answer:
            "Shifokorga yozilish uchun klinikada to'lov amalga oshiriladi. Med24.uz to'lovni qabul qiladi.",
        },
        {
          id: 8,
          question: "Sharh qoldirishim mumkinmi?",
          answer:
            "Bizning veb-saytimizda barcha sharhlar haqiqiyligini tekshirish uchun qat'iy tekshiruvdan o'tadi. Siz shifokor sahifasida sharh qoldirishingiz mumkin, shundan so'ng u moderatsiyadan o'tadi, tekshiriladi va veb-saytda paydo bo'ladi.",
        },
      ],
    },
    {
      id: "cooperation",
      title: "Biz bilan ishlash haqida",
      questions: [
        {
          id: 9,
          question: "Med24.uz bilan hamkor bo'lishim mumkinmi?",
          answer:
            "Bizning veb-saytimizdagi barcha partnerlik xizmatlari haqida qo'llanma. Manzil: info@med24.uz yoki telefon raqami: +998(71) 268-31-10",
        },
      ],
    },
  ];

  const toggleAccordion = (id: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="container">
      <div className={styles.faqContainer}>
        <main className={styles.faqMain}>
          {/* Page Title */}
          <div className={styles.faqHeader}>
            <h1 className={styles.faqTitle}>Ko&apos;p beriladigan savollar</h1>
          </div>

          {/* FAQ Sections */}
          {faqSections.map((section) => (
            <div key={section.id} className={styles.faqSection}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>

              <div className={styles.faqList}>
                {section.questions.map((item) => (
                  <div key={item.id} className={styles.faqItem}>
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className={styles.faqButton}
                    >
                      <span className={styles.faqQuestion}>
                        {item.question}
                      </span>
                      <div className={styles.chevronIcon}>
                        {openItems.has(item.id) ? (
                          <ChevronUp className={styles.chevronOpen} size={20} />
                        ) : (
                          <ChevronDown
                            className={styles.chevronClosed}
                            size={20}
                          />
                        )}
                      </div>
                    </button>

                    <div
                      className={`${styles.faqAnswer} ${
                        openItems.has(item.id)
                          ? styles.faqAnswerVisible
                          : styles.faqAnswerHidden
                      }`}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default FAQPage;
