'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, Phone, MapPin, Search } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className={styles.navbar}>
      {/* Top Info Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <div className={styles.topBarLeft}>
            <div className={styles.infoItem}>
              <span>Klinika qo'shish</span>
            </div>
            <div className={styles.infoItem}>
              <img src="/uzb-flag.svg" alt="O'zbekiston" className={styles.flagIcon} />
              <span>O'z</span>
              <ChevronDown className={styles.langIcon} />
            </div>
            <div className={styles.infoItem}>
              <MapPin className={styles.locationIcon} />
              <span>Toshkent</span>
              <ChevronDown className={styles.locationIcon} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoBox}>
              <div className={styles.logoIconBackground}>
                <img src="/med24-logo.svg" alt="Med24 Logo" className={styles.logoIcon} />
              </div>
              <span className={styles.logoText}>med24</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <Link href="/doctors" className={styles.navLink}>
              Shifokor qabuli
            </Link>
            <Link href="/analizlar" className={styles.navLink}>
              Analizlar
            </Link>
            <Link href="/diagnostics" className={styles.navLink}>
              Diagnostika
            </Link>
            <Link href="/services" className={styles.navLink}>
              Tibbiy xizmatlar
            </Link>
            <Link href="/clinics" className={styles.navLink}>
              Klinikalar
            </Link>
            <Link href="/apteka" className={styles.navLink}>
              Dorilar
            </Link>
            <Link href="/promotions" className={styles.navLink}>
              Aksiya
            </Link>
          </nav>

          {/* Right Section */}
          <div className={styles.rightSection}>
            <Link href="/download-app" className={styles.ctaButton}>
              <span className={styles.downloadText}>Ilovani yuklab olish</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.downloadIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className={styles.mobileMenuButton}
          >
            {isMenuOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles.mobileNav}>
            <div className={styles.mobileNavContent}>
              <Link href="/doctors" className={styles.mobileNavLink}>
                Shifokor qabuli
              </Link>
              <Link href="/analizlar" className={styles.mobileNavLink}>
                Analizlar
              </Link>
              <Link href="/diagnostics" className={styles.mobileNavLink}>
                Diagnostika
              </Link>
              <Link href="/services" className={styles.mobileNavLink}>
                Tibbiy xizmatlar
              </Link>
              <Link href="/clinics" className={styles.mobileNavLink}>
                Klinikalar
              </Link>
              <Link href="/apteka" className={styles.mobileNavLink}>
                Dorilar
              </Link>
              <Link href="/promotions" className={styles.mobileNavLink}>
                Aksiya
              </Link>
              <Link href="/download-app" className={styles.mobileCtaButton}>
                Ilovani yuklab olish
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;