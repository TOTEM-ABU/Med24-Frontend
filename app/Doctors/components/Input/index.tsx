import Image from "next/image";
import React from "react";

interface inputProps {
  inputPlaceholder: "";
}

const Input: React.FC<inputProps> = ({ inputPlaceholder }) => {
  return (
    <div>
      <Image src="/icons/image.svg" alt="Search" width={20} height={20} />
      <input placeholder={inputPlaceholder}></input>
    </div>
  );
};

export default Input;
