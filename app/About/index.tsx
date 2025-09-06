import React from 'react'
import styles from './About.module.css';

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      {/* Header Section */}
      <div className={styles.aboutHeader}>
        <h1 className={styles.aboutTitle}>Med24.uz - Toshkentdagi barcha klinikalar va shifokorlar</h1>
      </div>

      {/* Main Content Section */}
      <div className={styles.aboutContent}>
        <h2 className={styles.sectionTitle}>Biz sizning sog'ligingiz haqida qayg'uramiz</h2>
        
        <div className={styles.introText}>
          <p>Xizmat 2019 yilda o'z ishini boshlagan.</p>
          <p>Biz minglab odamlarga yordam olishda ko'maklashdik va tibbiy yordam sifatini oshirishda davom etamiz.</p>
        </div>

        {/* Statistics Cards */}
        <div className={styles.statisticsGrid}>
          <div className={`${styles.statisticCard} ${styles.cardGray}`}>
            <div className={styles.statisticNumber}>1 428</div>
            <div className={styles.statisticText}>Foydalanuvchilar shifokir qabulini muvaffaqiyati yozilishdi.</div>
          </div>
          
          <div className={`${styles.statisticCard} ${styles.cardGreen}`}>
            <div className={styles.statisticNumber}>500+</div>
            <div className={styles.statisticText}>Saytda sharhlar qoldirishdi.</div>
          </div>
          
          <div className={`${styles.statisticCard} ${styles.cardPurple}`}>
            <div className={styles.statisticNumber}>4 075</div>
            <div className={styles.statisticText}>Amaliyot ko'rsatib kelayotgan shifokorlar</div>
          </div>
          
          <div className={`${styles.statisticCard} ${styles.cardBlue}`}>
            <div className={styles.statisticNumber}>1 278</div>
            <div className={styles.statisticText}>xizmatga ulangan klinikalar</div>
          </div>
        </div>

        {/* Company Description */}
        <div className={styles.companyDescription}>
          <p>Med24 - bu Atlas Media guruhining tibbiy platformasi bo'lib, u tematik agregatorlar va savdo maydonchilari bilan shug'ullanadi.</p>
          
          <p>Xizmat 2019 yilda o'z ishini boshlagan va tibbiy muassasalar, shifokorlar va tibbiy xizmatlarning to'liq ma'lumotnomasini o'z ichiga oladi. Xizmat shuningdek, go'zallik va salomatlik haqida foydali ma'lumotlarni taqdim etib boradi. Bu ma'lumotlarning barchasi Med24.uz sayti va telegram botida mavjud.</p>
        </div>

        {/* Mission Statement */}
        <div className={styles.missionSection}>
          <p>Bizning xizmatimizning asosiy vazifasi bemorlarga yordam berish va tibbiy markaz, shifokor va muayyan tibbiy xizmatni tanlash jarayonini imkon qadar shaffof, qulay va tezlashtirishdir. Tibbiyot markazlari uchun esa - internet tarmog'ida ishonchli hamkor bo'lish.</p>
        </div>

        {/* Our Team Section */}
        <div className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Bizning jamoamiz</h2>
          
          <p>Med24.uz bu – bemor va klinika o'rtasida bemor salomatligini samarali boshqarish uchun alogani ta'minlovchi xizmatdir. Bizning xizmatimizning asosiy vazifasi - bemor va tibbiyot o'rtasidagi o'zaro aloqa sifatini yaxshilash, uning barcha bosqichlarida tibbiy yordam olish jarayonini soddalashtirish va tezlashtirishdir.</p>
          
          <p>Med24.uz tibbiyotda zamonaviy IT-texnologiyalarni qo'llash orqali real vaqtda O'zbekistondagi shifokorlar, tibbiyot muassasalari va ularning xizmatl haqida eng so'nggi ma'lumotlarni olish imkonini beradi.</p>
        </div>

        {/* Services Section */}
        <div className={styles.servicesSection}>
          <h2 className={styles.sectionTitle}>Tibbiyot muassasalari va shifokorlar katalogi.</h2>
          
          <p>Har bir foydalanuvchiga ko'rsatilgan barcha tibbiy muassasalarga tegishli ma'lumotnomalar mavjud: manzil, aloqa ma'lumotlari, ish vaqti, sharhlar. Kengaytirilgan formatda to'liq funksionallik mavjud: tashkilot haqida ma'lumot, xizmatlar ro'yxati, ularning tavsifi va narxi, foto va video galereyalari, mutaxassislar haqidagi ma'lumotlar, yangiliklar, aksiyalar va chegirimalar.</p>
          
          <p>Med24.uz saytida ham davlat, ham xususiy tibbiyot muassasalari haqida ma'lumotlar mavjud.</p>
          
          <p><strong>Biz qanday ishlaymiz:</strong></p>
          <ul className={styles.servicesList}>
            <li>Shifokorlar va klinikalarni onlayn yoki qo'ng'iroq markazi orqali topiing</li>
            <li>Shifokorlar bilan onlayn suhbat</li>
            <li>Telegramda qabulga yozilganlik haqida bepul xabarnoma oling</li>
            <li>Shifokorlar va klinikalar haqida fikr-mulohazalaringizni qoldiring</li>
            <li>Har qanday tibbiy xizmatlar uchun bonuslarni to'plang</li>
            <li>Foydali tibbiy paketlarni oling</li>
          </ul>
        </div>

        {/* Pharmacy Section */}
        <div className={styles.pharmacySection}>
          <h2 className={styles.sectionTitle}>Dorixonalarda dori-darmonlarni qidirib topng</h2>
          
          <p>Toshkent shahridagi 400 dan ortiq dorixona dori vositalari qidiruv xizmatiga ulangan bo'lib, ularning soni muttasil ortib bormoqda. Har qanday foydalanuvchi tanlangan hududda kerakli dorini eng arzon narxda tezda topishi mumkin. Dorixonalar, shuningdek, foydalanuvchining joriy manziliga yaqinligi bo'yicha saralanadi va xaritada ko'rsatiladi.</p>
          
          <p><strong>Med24.uz sayti va botda quyidagi imkoniyatlar mavjud:</strong></p>
          <ul className={styles.servicesList}>
            <li>onlayn bron qilish;</li>
            <li>dori vositalari to'plamini qidirish (siz bir vaqtning o'zida bir nechta dori-darmonlarni tanlashingiz va eng past narxda to'liq to'plamni qaerdan topishingiz mumkinligi);</li>
            <li>dori vositalari uchun qo'llanmalar;</li>
            <li>dorlar analoglari.</li>
          </ul>
          
          <p>Foydalanuvchilar uchun dori-darmonlarni qidirish bepul xizmatdir. Xizmatga ulanish ham bepul.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
