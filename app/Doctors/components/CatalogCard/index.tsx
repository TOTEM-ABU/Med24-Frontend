import Image from "next/image";
import React from "react";

import styles from "./CatalogCard.module.css";

interface CatalogCardProps {
  title: string;
  children: React.ReactNode;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ title, children }) => {
  return (
    <div className={styles.catalogCardStyle}>
      <div>
        {children}
        <div>
          <Image
            src={`/Images/${title}.png`}
            alt="loading..."
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
