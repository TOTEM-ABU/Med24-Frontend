'use client'

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          
          {/* Company Info */}
          <div className={styles.logoSection}>
         < Link href="/" >
            <div>
              <div className={styles["logo-med"]}>
                <img className={styles["logo-img"]} src="/Images/clinics/med24.webp" alt="Med24 Logo" />
                <p className={styles["logoText"]}>med24</p>
              </div>
            </div>
          </Link>
            <p className={styles.description}>
              Toshkentdagi barcha klinikalar va shifokorlar. Tibbiyot markazlari, 
              kasalxonalar va klinikalarning sharhlari.
            </p>
            <div className={styles.address}>
              <p>100005, O‘zbekiston, Toshkent shahri, Sayram ko‘chasi, 25</p>
              <a href="mailto:info@med24.uz">info@med24.uz</a>
              <a href="tel:+998712310518">+998 (71) 231-05-18</a>
            </div>
          </div>

          {/* Bemolarga */}
          <div className={styles.footerSection}>
            <h3>Bemorlarga</h3>
            <ul className={styles.linksList}>
              <li><Link href="/Kliniki">Klinikalar</Link></li>
              <li><Link href="/Promotions">Aksiya</Link></li>
              <li><Link href="/Doctors">Shifokorlar</Link></li>
              <li><Link href="/Diagnostika">Diagnostika markazlari</Link></li>
              <li><Link href="/uslugi">Laboratoriyalar</Link></li>
              <li><Link href="/#categories">Tug‘ruqxonalar</Link></li>
              <li><Link href="/#diseases">Kasalliklar ro‘yxati</Link></li>
              <li><Link href="/#symptoms">Kasallik belgilari</Link></li>
              <li><Link href="/Privacy">Maxfiylik siyosati</Link></li>
            </ul>
          </div>

          {/* Ma'lumotnoma */}
          <div className={styles.footerSection}>
            <h3>Ma'lumotnoma</h3>
            <ul className={styles.linksList}>
              <li><Link href="/About">Biz haqimizda</Link></li>
              <li><Link href="/News">Biz haqimizda matbuot</Link></li>
              <li><Link href="/Contact">Kontaktlar</Link></li>
              <li><Link href="/FAQ">Tez-tez beriladigan savollar</Link></li>
              <li><Link href="/#terms">Foydalanuvchi shartnomasi</Link></li>
            </ul>
          </div>

          {/* Xizmatlar */}
          <div className={styles.footerSection}>
            <h3>Xizmatlar</h3>
            <ul className={styles.linksList}>
              <li><Link href="/Kliniki">Klinikalar</Link></li>
              <li><Link href="/press">Yangiliklar</Link></li>
              <li><Link href="/#articles">Maqolalar</Link></li>
              <li><Link href="/products">Apteka.uz</Link></li>
              <li><Link href="/#avitsenna">Avitsenna.uz</Link></li>
            </ul>
          </div>
        </div>

        {/* Download App Section */}
        {/* <div className={styles.downloadAppSection}>
          <div className={styles.downloadAppContent}>
            <div className={styles.downloadAppInfo}>
              <h3 className={styles.downloadTitle}>Med24.uz ilovasida bepul onlayn maslahatlar</h3>
            </div>
            <div className={styles.downloadButtons}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="/app-store.svg" alt="Download on the App Store" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="/google-play.svg" alt="Get it on Google Play" />
              </a>
            </div>
            <div className={styles.qrCode}>
              <img src="/qr-code.svg" alt="QR Code" />
              <p>Med24.uz ilovasini o‘rnatish Mobil telefon kamerangizni QR kodiga qaratiring</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Bottom Footer */}
      <div className='container'>
      <div className={styles.bottomFooter}>
        <div className={styles.bottomContent}>
          <div className={styles.copyright}>
            <p>© 2023–2025 med24.uz. "SMART MEDIA SOLUTIONS" MCHJ</p>
            <p className={styles.disclaimer}>
              Saytda ko'rsatilgan ma'lumot tashxis qo'yish, davolash muolajasi berish uchun 
              foydalanilmaydi va shifokor qabulining o'rnini bosmaydi.
            </p>
          </div>
          <div className={styles.bottomLinks}>
            <Link href="/maxfiylik">Maxfiylik siyosati</Link>
            <Link href="/shartlar">Foydalanish shartlari</Link>
          </div>
        </div>
      </div>
      </div>

    </footer>
  );
};

export default Footer;