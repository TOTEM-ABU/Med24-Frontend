"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const DiagnostikaType = () => {
  const searchParams = useSearchParams();
  const diagnostikaName = searchParams?.get("name");
  const router = useRouter();

  useEffect(() => {
    if (diagnostikaName) {
      // Redirect to the new URL structure
      router.replace(`/diagnostika/${encodeURIComponent(diagnostikaName)}`);
    } else {
      router.replace("/Diagnostika");
    }
  }, [diagnostikaName, router]);

  return (
    <div style={{ padding: "100px 20px", textAlign: "center" }}>
      <p>Redirecting...</p>
    </div>
  );
};

export default DiagnostikaType;
