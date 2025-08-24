"use client";
import React from "react";
import styles from "./Kliniki.module.css";
import RecomendedKliniki from "./RecomendedKliniki";
import RecomendedTypes from "./RecomendedTypes";
import LatestReviews from "./LatestReviews";
import AskTelegram from "./AskTelegram";
import Districts from "./Districts";
import CommonServices from "./CommonServices";

const Kliniki: React.FC = () => {
  return (
    <div className={styles.miniContainer}>
      <RecomendedKliniki />
      <RecomendedTypes />
      <LatestReviews />
      <AskTelegram />
      <Districts />
      <CommonServices />
    </div>
  );
};

export default Kliniki;
