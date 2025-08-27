import React from "react";
import RecommendedDiagnostics from "./RecommendedDiagnostics";
import styles from "./Diagnostika.module.css";
import CommonServices from "../Kliniki/CommonServices";

const Diagnostika: React.FC = () => {
  return (
    <div className={styles.bigContainer}>
      <div className={styles.miniContainer}>
        <RecommendedDiagnostics />
        <CommonServices filterCategory="DIAGNOSTICS" />
      </div>
    </div>
  );
};

export default Diagnostika;
