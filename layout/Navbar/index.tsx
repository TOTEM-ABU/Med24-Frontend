// components/Navbar/index.tsx
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
            <div className={styles.contactItem}>
              <Phone className={styles.contactIcon} />
              <span>+998 71 123 45 67</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin className={styles.contactIcon} />
              <span>Toshkent, O'zbekiston</span>
            </div>
          </div>
          <div className={styles.topBarRight}>
            24/7 onlayn konsultatsiya
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoText}>
              Med<span className={styles.logoAccent}>24</span>
            </div>
            <span className={styles.logoSuffix}>.uz</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <Link href="/" className={styles.navLink}>
              Bosh sahifa
            </Link>
            
            <div className={styles.dropdown}>
              <button
                onClick={toggleDropdown}
                className={styles.dropdownButton}
              >
                Klinikalar
                <ChevronDown className={styles.dropdownIcon} />
              </button>
              
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/klinikalar" className={styles.dropdownLink}>
                    Barcha klinikalar
                  </Link>
                  <Link href="/klinikalar/davlat" className={styles.dropdownLink}>
                    Davlat klinikalari
                  </Link>
                  <Link href="/klinikalar/xususiy" className={styles.dropdownLink}>
                    Xususiy klinikalar
                  </Link>
                  <Link href="/laboratoryalar" className={styles.dropdownLink}>
                    Laboratoriyalar
                  </Link>
                </div>
              )}
            </div>

            <Link href="/shifokorlar" className={styles.navLink}>
              Shifokorlar
            </Link>
            <Link href="/xizmatlar" className={styles.navLink}>
              Xizmatlar
            </Link>
            <Link href="/sharhlar" className={styles.navLink}>
              Sharhlar
            </Link>
            <Link href="/yangiliklar" className={styles.navLink}>
              Yangiliklar
            </Link>
            <Link href="/aloqa" className={styles.navLink}>
              Aloqa
            </Link>
          </nav>

          {/* Search and CTA */}
          <div className={styles.rightSection}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Qidiruv..."
                className={styles.searchInput}
              />
              <Search className={styles.searchIcon} />
            </div>
            <Link href="/qabul" className={styles.ctaButton}>
              Qabul yozilish
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
              <Link href="/" className={styles.mobileNavLink}>
                Bosh sahifa
              </Link>
              <Link href="/klinikalar" className={styles.mobileNavLink}>
                Klinikalar
              </Link>
              <Link href="/shifokorlar" className={styles.mobileNavLink}>
                Shifokorlar
              </Link>
              <Link href="/xizmatlar" className={styles.mobileNavLink}>
                Xizmatlar
              </Link>
              <Link href="/sharhlar" className={styles.mobileNavLink}>
                Sharhlar
              </Link>
              <Link href="/yangiliklar" className={styles.mobileNavLink}>
                Yangiliklar
              </Link>
              <Link href="/aloqa" className={styles.mobileNavLink}>
                Aloqa
              </Link>
              
              {/* Mobile Search */}
              <div className={styles.mobileSearch}>
                <input
                  type="text"
                  placeholder="Qidiruv..."
                  className={styles.mobileSearchInput}
                />
                <Search className={styles.mobileSearchIcon} />
              </div>
              
              <Link href="/qabul" className={styles.mobileCtaButton}>
                Qabul yozilish
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;