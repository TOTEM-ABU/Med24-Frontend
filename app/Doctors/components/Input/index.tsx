import Image from "next/image";
import React from "react";

import styles from "./Input.module.css";

interface inputProps {
  inputPlaceholder: string;
}

const Input: React.FC<inputProps> = ({ inputPlaceholder = "" }) => {
  return (
    <div className={styles.searchInputStyle}>
      <Image
        src="/Icons/search.svg"
        alt="Search"
        width={28}
        height={28}
        color="#000000"
      />
      <input placeholder={inputPlaceholder}></input>
    </div>
  );
};

export default Input;
