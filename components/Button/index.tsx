"use client";
import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  name: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  padding?: string;
}

const Button = (props: ButtonProps) => {
  const {
    name,
    width,
    height,
    onClick,
    className,
    disabled = false,
    variant = "primary",
    size = "medium",
    padding,
  } = props;

  const buttonClasses = `
        ${styles.button} 
        ${styles[variant]} 
        ${styles[size]} 
        ${className || ""}
        ${disabled ? styles.disabled : ""}
    `.trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: width,
        height: height,
        padding: padding,
      }}
    >
      {name}
    </button>
  );
};

export default Button;
