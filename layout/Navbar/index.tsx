"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, MapPin } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [showAppBanner, setShowAppBanner] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);
  const toggleLocationDropdown = () =>
    setIsLocationDropdownOpen(!isLocationDropdownOpen);

  return (
    <>
      {/* Mobile App Banner */}
      {showAppBanner && (
        <div className={styles.appBanner}>
          <div className={styles.appBannerContent}>
            <div className={styles.appInfo}>
              <div className={styles.appIcon}>
                <img src="/Images/clinics/med24.webp" alt="Med24" className={styles.appIconImg} />
              </div>
              <div className={styles.appDetails}>
                <span className={styles.appName}>Ilovada qulayroq</span>
                <div className={styles.stars}>
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
            <button className={styles.enterBtn}>Kirish</button>
            <button 
              className={styles.closeBtn}
              onClick={() => setShowAppBanner(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Desktop Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <div className={styles.topBarLeft}>
            <Link href="https://t.me/kliniki24uz_bot" className={styles.addClinicText}>
              Klinika qo'shish
            </Link>
          </div>
          <div className={styles.topBarRight}>
            {/* Language Selector */}
            <div className={styles.dropdown}>
              <button
                onClick={toggleLangDropdown}
                className={styles.dropdownButton}
              >
                <div className={styles.flagIcon}></div>
                <span>O'z</span>
                <ChevronDown
                  className={`${styles.chevronIcon} ${
                    isLangDropdownOpen ? styles.chevronOpen : ""
                  }`}
                />
              </button>
              {isLangDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/?lang=uz" className={styles.dropdownItem}>
                    <div className={styles.flagIcon}></div>
                    <span>O'zbek</span>
                  </Link>
                  <Link href="/?lang=ru" className={styles.dropdownItem}>
                    <div className={styles.flagIconRu}></div>
                    <span>Русский</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Location Selector */}
            <div className={styles.dropdown}>
              <button
                onClick={toggleLocationDropdown}
                className={styles.dropdownButton}
              >
                <MapPin className={styles.locationIcon} />
                <span>Toshkent</span>
                <ChevronDown
                  className={`${styles.chevronIcon} ${
                    isLocationDropdownOpen ? styles.chevronOpen : ""
                  }`}
                />
              </button>
              {isLocationDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/?city=tashkent" className={styles.dropdownItem}>
                    <MapPin className={styles.locationIcon} />
                    <span>Toshkent</span>
                  </Link>
                  <Link href="/?city=samarkand" className={styles.dropdownItem}>
                    <MapPin className={styles.locationIcon} />
                    <span>Samarqand</span>
                  </Link>
                  <Link href="/?city=bukhara" className={styles.dropdownItem}>
                    <MapPin className={styles.locationIcon} />
                    <span>Buxoro</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navContainer}>
          {/* Mobile Layout */}
          <div className={styles.mobileLayout}>
            <button
              onClick={toggleMenu}
              className={styles.hamburger}
            >
              <Menu size={24} />
            </button>
            
            <Link href="/" className={styles.logoCenter}>
              <img src="/Images/clinics/med24.webp" alt="Med24" className={styles.logoImage} />
              <span className={styles.logoText}>med24</span>
            </Link>
            
            <div className={styles.rightSpace}></div>
          </div>

          {/* Desktop Layout */}
          <div className={styles.desktopLayout}>
            <Link href="/" className={styles.logo}>
              <img src="/Images/clinics/med24.webp" alt="Med24" className={styles.logoImage} />
              <span className={styles.logoText}>med24</span>
            </Link>

            <nav className={styles.navigation}>
              <Link href="/Doctors" className={styles.navLink}>Shifokor qabuli</Link>
              <Link href="/uslugi" className={styles.navLink}>Analizlar</Link>
              <Link href="/Diagnostika" className={styles.navLink}>Diagnostika</Link>
              <Link href="/uslugi" className={styles.navLink}>Tibbiy xizmatlar</Link>
              <Link href="/Kliniki" className={styles.navLink}>Klinikalar</Link>
              <Link href="/articles" className={styles.navLink}>Maqolalar</Link>
              <Link href="/products" className={styles.navLink}>Dorilar</Link>
              <Link href="/Promotions" className={styles.navLink}>Aksiya</Link>
            </nav>

            <Link href="/#download-app" className={styles.downloadBtn}>
              Ilovani yuklab olish &gt;
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <div className={styles.mobileMenuContent}>
            <div className={styles.mobileMenuHeader}>
              <Link href="/" className={styles.mobileMenuLogo}>
                <img src="/Images/clinics/med24.webp" alt="Med24" className={styles.logoImage} />
                <span className={styles.logoText}>med24</span>
              </Link>
              <button onClick={toggleMenu} className={styles.closeMenu}>
                <X size={24} />
              </button>
            </div>
            
            <nav className={styles.mobileMenuNav}>
              <Link href="/Doctors" className={styles.mobileNavLink} onClick={toggleMenu}>Shifokor qabuli</Link>
              <Link href="/uslugi" className={styles.mobileNavLink} onClick={toggleMenu}>Analizlar</Link>
              <Link href="/Diagnostika" className={styles.mobileNavLink} onClick={toggleMenu}>Diagnostika</Link>
              <Link href="/uslugi" className={styles.mobileNavLink} onClick={toggleMenu}>Tibbiy xizmatlar</Link>
              <Link href="/Kliniki" className={styles.mobileNavLink} onClick={toggleMenu}>Klinikalar</Link>
              <Link href="/articles" className={styles.mobileNavLink} onClick={toggleMenu}>Maqolalar</Link>
              <Link href="/products" className={styles.mobileNavLink} onClick={toggleMenu}>Dorilar</Link>
              <Link href="/Promotions" className={styles.mobileNavLink} onClick={toggleMenu}>Aksiya</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
