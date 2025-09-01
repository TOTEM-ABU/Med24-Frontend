"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const KlinikiTypeIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/Kliniki");
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "16px",
        color: "#6b7280",
      }}
    >
      Qayta yo'naltirilmoqda...
    </div>
  );
};

export default KlinikiTypeIndex;
