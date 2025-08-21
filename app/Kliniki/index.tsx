import React from 'react';
import RecommendedTypes from './RecommendedTypes';
import styles from './Kliniki.module.css';

const Kliniki: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Klinikalar</h1>
        <p className={styles.pageDescription}>
          Eng yaxshi tibbiy xizmatlar ko'rsatadigan klinikalar bilan tanishing
        </p>
      </div>
      
      <RecommendedTypes />
    </div>
  );
};

export default Kliniki;