import React from "react";

import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className={styles.buttonStyle}>{children}</button>;
};

export default Button;
