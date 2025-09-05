import React, { useState } from "react";
import styles from "./Select.module.css";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  name?: string;
  id?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  label,
  placeholder = "Tanlang",
  onChange,
  value,
  name,
  id,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.selectContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        name={name}
        id={id}
        value={selectedValue}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
