"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, MapPin } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);
  const toggleLocationDropdown = () =>
    setIsLocationDropdownOpen(!isLocationDropdownOpen);

  return (
    <div className="container">
      <header className={styles.navbar}>
        <div className={styles.topBar}>
          <div className={styles.topBarContent}>
            <div className={styles.topBarLeft}>
              <span className={styles.addClinicText}>
                Klinika qo&apos;shish
              </span>
            </div>
            <div className={styles.topBarRight}>
              {/* Language Selector */}
              <div className={styles.dropdown}>
                <button
                  onClick={toggleLangDropdown}
                  className={styles.dropdownButton}
                >
                  <div className={styles.flagIcon}></div>
                  <span>O&apos;z</span>
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
                      <span>O&apos;zbek</span>
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
                    <Link
                      href="/?city=tashkent"
                      className={styles.dropdownItem}
                    >
                      <MapPin className={styles.locationIcon} />
                      <span>Toshkent</span>
                    </Link>
                    <Link
                      href="/?city=samarkand"
                      className={styles.dropdownItem}
                    >
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
        <div className={styles.navContainer}>
          <div className={styles.flex}>
            <Link href="/">
              <div className={styles["logo-med"]}>
                <img
                  className={styles["logo-img"]}
                  src="/Images/clinics/med24.webp"
                  alt="Med24 Logo"
                />
                <p className={styles["logoText"]}>med24</p>
              </div>
            </Link>

            {/* Desktop Right Section */}
            <div className={styles.rightSection}>
              <Link href="/#download-app" className={styles.ctaButton}>
                Ilovani yuklab olish &gt;
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={styles.mobileMenuButton}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <Link href="/Doctors" className={styles.navLink}>Shifokor qabuli</Link>
            <Link href="/uslugi" className={styles.navLink}>Analizlar</Link>
            <Link href="/Diagnostika" className={styles.navLink}>Diagnostika</Link>
            <Link href="/uslugi" className={styles.navLink}>Tibbiy xizmatlar</Link>
            <Link href="/Kliniki" className={styles.navLink}>Klinikalar</Link>
            <Link href="/articles" className={styles.navLink}>Maqolalar</Link>
            <Link href="/News" className={styles.navLink}>News</Link>
            <Link href="/products" className={styles.navLink}>Dorilar</Link>
            <Link href="/Promotions" className={styles.navLink}>Aksiya</Link>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className={styles.mobileNav}>
              <div className={styles.mobileNavContent}>
                <Link href="/Doctors" className={styles.mobileNavLink}>Shifokor qabuli</Link>
                <Link href="/uslugi" className={styles.mobileNavLink}>Analizlar</Link>
                <Link href="/Diagnostika" className={styles.mobileNavLink}>Diagnostika</Link>
                <Link href="/uslugi" className={styles.mobileNavLink}>Tibbiy xizmatlar</Link>
                <Link href="/Kliniki" className={styles.mobileNavLink}>Klinikalar</Link>
                <Link href="/articles" className={styles.mobileNavLink}>Maqolalar</Link>
                <Link href="/News" className={styles.mobileNavLink}>News</Link>
                <Link href="/products" className={styles.mobileNavLink}>Dorilar</Link>
                <Link href="/Promotions" className={styles.mobileNavLink}>Aksiya</Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;