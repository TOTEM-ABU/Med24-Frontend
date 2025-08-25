"use client";
import React from "react";
import styles from "./Kliniki.module.css";
import RecomendedKliniki from "./RecomendedKliniki";

const Kliniki: React.FC = () => {
  return (
    <div className={styles.miniContainer}>
      <RecomendedKliniki />
    </div>
  );
};

export default Kliniki;
