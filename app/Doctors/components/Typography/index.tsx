import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  color?: string;
  size?: string;
  bottom?: string;
  top?: string;
  weight?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  color = "#000000",
  size = "16px",
  bottom = "0",
  top = "",
  weight = "",
}) => {
  return (
    <p
      style={{
        color: `${color}`,
        fontSize: `${size}px`,
        marginBottom: `${bottom}px`,
        marginTop: `${top}px`,
        fontWeight: `${weight}`,
      }}
    >
      {children}
    </p>
  );
};

export default Typography;
